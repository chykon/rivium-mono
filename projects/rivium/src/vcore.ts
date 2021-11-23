import * as memory from './memory.js'
import * as common from './common.js'

export enum Regs {
  x0,
  x1,
  x2,
  x3,
  x4,
  x5,
  x6,
  x7,
  x8,
  x9,
  x10,
  x11,
  x12,
  x13,
  x14,
  x15,
  x16,
  x17,
  x18,
  x19,
  x20,
  x21,
  x22,
  x23,
  x24,
  x25,
  x26,
  x27,
  x28,
  x29,
  x30,
  x31,
  pc,
  ppc // previous pc
}

export enum Opcode {
  LOAD = 0b00_000_11,
  STORE = 0b01_000_11,
  MADD = 0b10_000_11,
  BRANCH = 0b11_000_11,

  LOAD_FP = 0b00_001_11,
  STORE_FP = 0b01_001_11,
  MSUB = 0b10_001_11,
  JALR = 0b11_001_11,

  // custom-0: 0b00_010_11
  // custom-1: 0b01_010_11
  NMSUB = 0b10_010_11,
  // reserved: 0b11_010_11

  MISC_MEM = 0b00_011_11,
  AMO = 0b01_011_11,
  NMADD = 0b10_011_11,
  JAL = 0b11_011_11,

  OP_IMM = 0b00_100_11,
  OP = 0b01_100_11,
  OP_FP = 0b10_100_11,
  SYSTEM = 0b11_100_11,

  AUIPC = 0b00_101_11,
  LUI = 0b01_101_11,
  // reserved: 0b10_101_11
  // reserved: 0b11_101_11

  OP_IMM_32 = 0b00_110_11,
  OP_32 = 0b01_110_11
  // custom-2/rv128: 0b10_110_11
  // custom-3/rv128: 0b11_110_11

  // inst[4:2] = 111 (> 32b)
  // inst[6:5] = 00 (48b)
  // inst[6:5] = 01 (64b)
  // inst[6:5] = 10 (48b)
  // inst[6:5] = 11 (>= 80b)
}

export class Vcore {
  readonly mem: memory.Memory
  readonly vnum: common.Vnum
  readonly ialign: common.Ialign
  readonly ialignByte: number // IALIGN/8
  readonly ilen: common.Ilen
  readonly ilenByte: number // ILEN/8

  constructor (
    mem: memory.Memory,
    vnum: common.Vnum,
    ialign: common.Ialign,
    ilen: common.Ilen
  ) {
    this.mem = mem
    this.vnum = vnum
    this.ialign = ialign
    this.ilen = ilen

    this.ialignByte = this.ialign / 8
    this.ilenByte = this.ilen / 8
  }

  // Register value //

  setRegisterValue (regnum: Regs, value: number, counter = false): void {
    if (!counter && ((regnum === Regs.pc) || (regnum === Regs.ppc))) {
      throw Error('set-access to counters')
    } else if (regnum === Regs.x0) {
      return
    }
    const i32arr = new Int32Array(this.mem.buffer)
    const regOffset = this.mem.mrcount * this.vnum
    i32arr[(i32arr.length - 1) - (regOffset + regnum)] = value
  }

  getRegisterValue (regnum: Regs, counter = false): number {
    if (!counter && ((regnum === Regs.pc) || (regnum === Regs.ppc))) {
      throw Error('get-access to counters')
    } else if (regnum === Regs.x0) {
      return 0
    }
    const i32arr = new Int32Array(this.mem.buffer)
    const regOffset = this.mem.mrcount * this.vnum
    const value = i32arr[(i32arr.length - 1) - (regOffset + regnum)]
    if (value === undefined) {
      throw Error('value === undefined')
    }
    return value
  }

  // Fetcher //

  fetchInstruction (): void {
    const pcValue = this.getRegisterValue(Regs.pc, true)
    const ppcValue = this.getRegisterValue(Regs.ppc, true)
    if ((pcValue % 4) !== 0) {
      this.throwInstructionAddressMisalignedException(pcValue, ppcValue)
      return
    }

    this.setRegisterValue(Regs.ppc, this.getRegisterValue(Regs.pc, true), true)

    const byte1 = (this.mem.getByte(this.getRegisterValue(Regs.pc, true)) * (2 ** 0)) >>> 0
    this.setRegisterValue(Regs.pc, this.getRegisterValue(Regs.pc, true) + 1, true)
    const byte2 = (this.mem.getByte(this.getRegisterValue(Regs.pc, true)) * (2 ** 8)) >>> 0
    this.setRegisterValue(Regs.pc, this.getRegisterValue(Regs.pc, true) + 1, true)
    const byte3 = (this.mem.getByte(this.getRegisterValue(Regs.pc, true)) * (2 ** 16)) >>> 0
    this.setRegisterValue(Regs.pc, this.getRegisterValue(Regs.pc, true) + 1, true)
    const byte4 = (this.mem.getByte(this.getRegisterValue(Regs.pc, true)) * (2 ** 24)) >>> 0
    this.setRegisterValue(Regs.pc, this.getRegisterValue(Regs.pc, true) + 1, true)
    const instruction = (0 | byte1 | byte2 | byte3 | byte4) >>> 0

    const opcode = instruction & 0b00000000000000000000000001111111
    if (opcode === Opcode.OP_IMM) {
      // Integer Register-Immediate Instructions
      const rd = (instruction >>> 7) & 0b11111
      const rs1 = (instruction >>> 15) & 0b11111
      const funct3 = (instruction >>> 12) & 0b111
      if (funct3 === 0b000) {
        // ADDI; NOP (ADDI x0, x0, 0)
        // rd = rs1 = rs1 + imm
        const immValue = this.iimmToValue(instruction) >> 0
        this.setRegisterValue(rs1, this.getRegisterValue(rs1) + immValue)
        this.setRegisterValue(rd, this.getRegisterValue(rs1))
      } else if (funct3 === 0b010) {
        // SLTI
        // if (rs1 < imm) {rd = 1} else {rd = 0}
        const immValue = this.iimmToValue(instruction) >> 0
        let result = 0
        if (this.getRegisterValue(rs1) < immValue) {
          result = 1
        } else {
          result = 0
        }
        this.setRegisterValue(rd, result)
      } else if (funct3 === 0b011) {
        // SLTIU
        // if ((rs1>>>0) < (imm>>>0)) {rd = 1} else {rd = 0}
        const immValue = this.iimmToValue(instruction)
        let result = 0
        if ((this.getRegisterValue(rs1) >>> 0) < (immValue >>> 0)) {
          result = 1
        } else {
          result = 0
        }
        this.setRegisterValue(rd, result)
      } else if (funct3 === 0b111) {
        // ANDI
        // rd = rs1 AND imm
        const immValue = this.iimmToValue(instruction)
        this.setRegisterValue(rd, this.getRegisterValue(rs1) & immValue)
      } else if (funct3 === 0b110) {
        // ORI
        // rd = rs1 OR imm
        const immValue = this.iimmToValue(instruction)
        this.setRegisterValue(rd, this.getRegisterValue(rs1) | immValue)
      } else if (funct3 === 0b100) {
        // XORI
        // rd = rs1 XOR imm
        const immValue = this.iimmToValue(instruction)
        this.setRegisterValue(rd, this.getRegisterValue(rs1) ^ immValue)
      } else if (funct3 === 0b001) {
        // SLLI
        // rd = rs1 << (imm & 0b11111)
        const immValue = this.iimmToValue(instruction)
        const shamt = immValue & 0b11111
        this.setRegisterValue(rd, this.getRegisterValue(rs1) * (2 ** shamt))
      } else if (funct3 === 0b101) {
        const immValue = this.iimmToValue(instruction)
        const shamt = immValue & 0b11111
        const shiftType = immValue & 0b010000000000
        if (shiftType === 0) {
          // SRLI
          // rd = rs1 >>> shamt
          this.setRegisterValue(rd, this.getRegisterValue(rs1) >>> shamt)
        } else if (shiftType === 0b010000000000) {
          // SRAI
          // rd = rs1 >> shamt
          this.setRegisterValue(rd, this.getRegisterValue(rs1) >> shamt)
        } else {
          let instructionBinary = (instruction >>> 0).toString(2)
          instructionBinary = instructionBinary.padStart(this.ilen, '0')
          this.throwIllegalInstructionException(instructionBinary)
        }
      } else {
        let instructionBinary = (instruction >>> 0).toString(2)
        instructionBinary = instructionBinary.padStart(this.ilen, '0')
        this.throwIllegalInstructionException(instructionBinary)
      }
    } else if (opcode === Opcode.LUI) {
      // LUI
      // rd = imm & 0b11111111111111111111000000000000
      const rd = (instruction >>> 7) & 0b11111
      const immValue = this.uimmToValue(instruction) >> 0
      this.setRegisterValue(rd, immValue)
    } else if (opcode === Opcode.AUIPC) {
      // AUIPC
      // rd = imm + ppc
      const rd = (instruction >>> 7) & 0b11111
      const immValue = this.uimmToValue(instruction) >> 0
      this.setRegisterValue(rd, (immValue + this.getRegisterValue(Regs.ppc, true)))
    } else if (opcode === Opcode.OP) {
      // Integer Register-Register Operations
      const rd = (instruction >>> 7) & 0b11111
      const rs1 = (instruction >>> 15) & 0b11111
      const rs2 = (instruction >>> 20) & 0b11111
      const funct3 = (instruction >>> 12) & 0b111
      const funct7 = (instruction >>> 25) & 0b1111111
      if (funct7 === 0) {
        if (funct3 === 0b000) {
          // ADD
          // rd = rs1 + rs2
          const result = this.getRegisterValue(rs1) + this.getRegisterValue(rs2)
          this.setRegisterValue(rd, result)
        } else if (funct3 === 0b010) {
          // SLT
          // rd = 1 if (rs1 < rs2) else 0
          let result = 0
          if (this.getRegisterValue(rs1) < this.getRegisterValue(rs2)) {
            result = 1
          } else {
            result = 0
          }
          this.setRegisterValue(rd, result)
        } else if (funct3 === 0b011) {
          // SLTU
          // rd = 1 if ((rs1>>>0) < (rs2>>>0)) else 0
          let result = 0
          if ((this.getRegisterValue(rs1) >>> 0) < (this.getRegisterValue(rs2) >>> 0)) {
            result = 1
          } else {
            result = 0
          }
          this.setRegisterValue(rd, result)
        } else if (funct3 === 0b111) {
          // AND
          // rd = rs1 & rs2
          const result = this.getRegisterValue(rs1) & this.getRegisterValue(rs2)
          this.setRegisterValue(rd, result)
        } else if (funct3 === 0b110) {
          // OR
          // rd = rs1 | rs2
          const result = this.getRegisterValue(rs1) | this.getRegisterValue(rs2)
          this.setRegisterValue(rd, result)
        } else if (funct3 === 0b100) {
          // XOR
          // rd = rs1 ^ rs2
          const result = this.getRegisterValue(rs1) ^ this.getRegisterValue(rs2)
          this.setRegisterValue(rd, result)
        } else if (funct3 === 0b001) {
          // SLL
          // rd = rs1 << (rs2 & 0b11111)
          const result = this.getRegisterValue(rs1) * (2 ** (this.getRegisterValue(rs2) & 0b11111))
          this.setRegisterValue(rd, result)
        } else if (funct3 === 0b101) {
          // SRL
          // rd = rs1 >>> (rs2 & 0b11111)
          const result = this.getRegisterValue(rs1) >>> (this.getRegisterValue(rs2) & 0b11111)
          this.setRegisterValue(rd, result)
        } else {
          let instructionBinary = (instruction >>> 0).toString(2)
          instructionBinary = instructionBinary.padStart(this.ilen, '0')
          this.throwIllegalInstructionException(instructionBinary)
        }
      } else if (funct7 === 0b0100000) {
        if (funct3 === 0b000) {
          // SUB
          // rd = rs1 - rs2
          const result = this.getRegisterValue(rs1) - this.getRegisterValue(rs2)
          this.setRegisterValue(rd, result)
        } else if (funct3 === 0b101) {
          // SRA
          // rd = rs1 >> (rs2 & 0b11111)
          const result = this.getRegisterValue(rs1) >> (this.getRegisterValue(rs2) & 0b11111)
          this.setRegisterValue(rd, result)
        } else {
          let instructionBinary = (instruction >>> 0).toString(2)
          instructionBinary = instructionBinary.padStart(this.ilen, '0')
          this.throwIllegalInstructionException(instructionBinary)
        }
      } else {
        let instructionBinary = (instruction >>> 0).toString(2)
        instructionBinary = instructionBinary.padStart(this.ilen, '0')
        this.throwIllegalInstructionException(instructionBinary)
      }
    } else if (opcode === Opcode.JAL) {
      // Control Transfer Instructions
      // Unconditional Jumps
      // JAL
      // rd = pc
      // pc = ppc + imm
      const rd = (instruction >>> 7) & 0b11111
      const immValue = this.jimmToValue(instruction) >> 0
      this.setRegisterValue(rd, this.getRegisterValue(Regs.pc, true))
      this.setRegisterValue(Regs.pc, this.getRegisterValue(Regs.ppc, true) + immValue, true)
    } else if (opcode === Opcode.JALR) {
      // JALR
      // rd = pc
      // pc = ppc + (0b11111111111111111111111111111110 & (rs1 + imm))
      const rd = (instruction >>> 7) & 0b11111
      const rs1 = (instruction >>> 15) & 0b11111
      const funct3 = (instruction >>> 12) & 0b111
      if (funct3 === 0b000) {
        const immValue = this.iimmToValue(instruction) >> 0
        let result = this.getRegisterValue(rs1) + immValue
        result &= 0b11111111111111111111111111111110
        result += this.getRegisterValue(Regs.ppc, true)
        this.setRegisterValue(rd, this.getRegisterValue(Regs.pc, true))
        this.setRegisterValue(Regs.pc, result, true)
      } else {
        let instructionBinary = (instruction >>> 0).toString(2)
        instructionBinary = instructionBinary.padStart(this.ilen, '0')
        this.throwIllegalInstructionException(instructionBinary)
      }
    } else if (opcode === Opcode.BRANCH) {
      // Conditional Branches
      // branch: pc = ppc + imm
      const rs1 = (instruction >>> 15) & 0b11111
      const rs2 = (instruction >>> 20) & 0b11111
      const funct3 = (instruction >>> 12) & 0b111
      const immValue = this.bimmToValue(instruction) >>> 0
      if (funct3 === 0b000) {
        // BEQ
        // if (rs1 === rs2) {branch}
        if (this.getRegisterValue(rs1) === this.getRegisterValue(rs2)) {
          const adr = this.getRegisterValue(Regs.ppc, true) + immValue
          this.setRegisterValue(Regs.pc, adr, true)
        }
      } else if (funct3 === 0b001) {
        // BNE
        // if (rs1 !== rs2) {branch}
        if (this.getRegisterValue(rs1) !== this.getRegisterValue(rs2)) {
          const adr = this.getRegisterValue(Regs.ppc, true) + immValue
          this.setRegisterValue(Regs.pc, adr, true)
        }
      } else if (funct3 === 0b100) {
        // BLT
        // if (rs1 < rs2) {branch}
        if (this.getRegisterValue(rs1) < this.getRegisterValue(rs2)) {
          const adr = this.getRegisterValue(Regs.ppc, true) + immValue
          this.setRegisterValue(Regs.pc, adr, true)
        }
      } else if (funct3 === 0b110) {
        // BLTU
        // if ((rs1>>>0) < (rs2>>>0)) {branch}
        if ((this.getRegisterValue(rs1) >>> 0) < (this.getRegisterValue(rs2) >>> 0)) {
          const adr = this.getRegisterValue(Regs.ppc, true) + immValue
          this.setRegisterValue(Regs.pc, adr, true)
        }
      } else if (funct3 === 0b101) {
        // BGE
        // if (rs1 >= rs2) {branch}
        if (this.getRegisterValue(rs1) >= this.getRegisterValue(rs2)) {
          const adr = this.getRegisterValue(Regs.ppc, true) + immValue
          this.setRegisterValue(Regs.pc, adr, true)
        }
      } else if (funct3 === 0b111) {
        // BGEU
        // if ((rs1>>>0) >= (rs2>>>0)) {branch}
        if ((this.getRegisterValue(rs1) >>> 0) >= (this.getRegisterValue(rs2) >>> 0)) {
          const adr = this.getRegisterValue(Regs.ppc, true) + immValue
          this.setRegisterValue(Regs.pc, adr, true)
        }
      } else {
        let instructionBinary = (instruction >>> 0).toString(2)
        instructionBinary = instructionBinary.padStart(this.ilen, '0')
        this.throwIllegalInstructionException(instructionBinary)
      }
    } else if (opcode === Opcode.LOAD) {
      // Load and Store Instructions
      // adr = rs1 + imm
      const rd = (instruction >>> 7) & 0b11111
      if (rd === Regs.x0) {
        let instructionBinary = (instruction >>> 0).toString(2)
        instructionBinary = instructionBinary.padStart(this.ilen, '0')
        this.throwIllegalInstructionException(instructionBinary)
      }
      const rs1 = (instruction >>> 15) & 0b11111
      const funct3 = (instruction >>> 12) & 0b111
      const immValue = this.iimmToValue(instruction) >> 0
      const adr = this.getRegisterValue(rs1) + immValue
      if (funct3 === 0b000) {
        // LB
        // rd = signExt(mem[adr])
        const memData = this.mem.getByte(adr)
        this.setRegisterValue(rd, memData)
      } else if (funct3 === 0b001) {
        // LH
        // rd = signExt(mem[adr..adr+1])
        let memData = this.mem.getByte(adr)
        memData |= this.mem.getByte(adr + 1) * (2 ** 8)
        if (((this.mem.getByte(adr + 1) >>> 7) & 0b1) === 0b1) {
          memData |= 0b11111111111111110000000000000000
        } else {
          memData &= 0b00000000000000001111111111111111
        }
        this.setRegisterValue(rd, memData)
      } else if (funct3 === 0b010) {
        // LW
        // rd = signExt(mem[adr..adr+3])
        let memData = this.mem.getByte(adr)
        memData |= this.mem.getByte(adr + 1) * (2 ** 8)
        memData |= this.mem.getByte(adr + 2) * (2 ** 16)
        memData |= this.mem.getByte(adr + 3) * (2 ** 24)
        this.setRegisterValue(rd, memData)
      } else if (funct3 === 0b100) {
        // LBU
        // rd = zeroExt(mem[adr])
        const memData = (this.mem.getByte(adr) >>> 0)
        this.setRegisterValue(rd, memData)
      } else if (funct3 === 0b101) {
        // LHU
        // rd = zeroExt(mem[adr..adr+1])
        let memData = (this.mem.getByte(adr)) >>> 0
        memData |= (this.mem.getByte(adr + 1) * (2 ** 8)) >>> 0
        memData >>>= 0
        this.setRegisterValue(rd, memData)
      } else {
        let instructionBinary = (instruction >>> 0).toString(2)
        instructionBinary = instructionBinary.padStart(this.ilen, '0')
        this.throwIllegalInstructionException(instructionBinary)
      }
    } else if (opcode === Opcode.STORE) {
      const rs1 = (instruction >>> 15) & 0b11111
      const rs2 = (instruction >>> 20) & 0b11111
      const funct3 = (instruction >>> 12) & 0b111
      const immValue = this.simmToValue(instruction) >> 0
      const adr = this.getRegisterValue(rs1) + immValue
      if (funct3 === 0b000) {
        // SB
        // mem[adr] = rs2[0]
        this.mem.setByte(adr, this.getRegisterValue(rs2))
      } else if (funct3 === 0b001) {
        // SH
        // mem[adr..adr+1] = rs2[0..1]
        this.mem.setByte(adr + 0, this.getRegisterValue(rs2))
        this.mem.setByte(adr + 1, this.getRegisterValue(rs2) >> 8)
      } else if (funct3 === 0b010) {
        // SW
        // mem[adr..adr+3] = rs2[0..3]
        this.mem.setByte(adr + 0, this.getRegisterValue(rs2))
        this.mem.setByte(adr + 1, this.getRegisterValue(rs2) >> 8)
        this.mem.setByte(adr + 2, this.getRegisterValue(rs2) >> 16)
        this.mem.setByte(adr + 3, this.getRegisterValue(rs2) >> 24)
      } else {
        let instructionBinary = (instruction >>> 0).toString(2)
        instructionBinary = instructionBinary.padStart(this.ilen, '0')
        this.throwIllegalInstructionException(instructionBinary)
      }
    } else if (opcode === Opcode.MISC_MEM) {
      // Memory Ordering Instructions
      const funct3 = (instruction >>> 12) & 0b111
      if (funct3 === 0b000) {
        // FENCE = NOP
      } else {
        let instructionBinary = (instruction >>> 0).toString(2)
        instructionBinary = instructionBinary.padStart(this.ilen, '0')
        this.throwIllegalInstructionException(instructionBinary)
      }
    } else if (opcode === Opcode.SYSTEM) {
      // Environment Call and Breakpoints
      const rd = (instruction >>> 7) & 0b11111
      const rs1 = (instruction >>> 15) & 0b11111
      const funct3 = (instruction >>> 12) & 0b111
      const funct12 = (instruction >>> 20) & 0b111111111111
      if ((rd !== 0) || (rs1 !== 0) || (funct3 !== 0)) {
        let instructionBinary = (instruction >>> 0).toString(2)
        instructionBinary = instructionBinary.padStart(this.ilen, '0')
        this.throwIllegalInstructionException(instructionBinary)
      }
      if (funct12 === 0) {
        // ECALL
        throw Error('ECALL')
      } else if (funct12 === 1) {
        // EBREAK
        throw Error('EBREAK')
      } else {
        let instructionBinary = (instruction >>> 0).toString(2)
        instructionBinary = instructionBinary.padStart(this.ilen, '0')
        this.throwIllegalInstructionException(instructionBinary)
      }
    } else {
      let instructionBinary = (instruction >>> 0).toString(2)
      instructionBinary = instructionBinary.padStart(this.ilen, '0')
      this.throwIllegalInstructionException(instructionBinary)
    }
  }

  // Immediates //

  // I-immediate

  valueToIimm (value: number): number {
    const part1 = (value * (2 ** 20)) & 0b00000000000100000000000000000000
    const part2 = (value * (2 ** 20)) & 0b00000001111000000000000000000000
    const part3 = (value * (2 ** 20)) & 0b01111110000000000000000000000000
    const part4 = value & 0b10000000000000000000000000000000
    const imm = 0 | part1 | part2 | part3 | part4
    return imm
  }

  iimmToValue (instruction: number): number {
    const part1 = (instruction >>> 20) & 0b00000000000000000000000000000001
    const part2 = (instruction >>> 20) & 0b00000000000000000000000000011110
    const part3 = (instruction >>> 20) & 0b00000000000000000000011111100000
    let part4 = 0
    const sign = (instruction & 0b10000000000000000000000000000000) >>> 0
    if (sign === 0b10000000000000000000000000000000) {
      part4 = 0b11111111111111111111100000000000
    } else {
      part4 = 0b00000000000000000000000000000000
    }
    const value = 0 | part1 | part2 | part3 | part4
    return value
  }

  // S-immediate

  valueToSimm (value: number): number {
    const part1 = (value * (2 ** 7)) & 0b00000000000000000000000010000000
    const part2 = (value * (2 ** 7)) & 0b00000000000000000000111100000000
    const part3 = (value * (2 ** (7 + 13))) & 0b01111110000000000000000000000000
    const part4 = value & 0b10000000000000000000000000000000
    const imm = 0 | part1 | part2 | part3 | part4
    return imm
  }

  simmToValue (instruction: number): number {
    const part1 = (instruction >>> 7) & 0b00000000000000000000000000000001
    const part2 = (instruction >>> 7) & 0b00000000000000000000000000011110
    const part3 = (instruction >>> (7 + 13)) & 0b00000000000000000000011111100000
    let part4 = 0
    const sign = (instruction & 0b10000000000000000000000000000000) >>> 0
    if (sign === 0b10000000000000000000000000000000) {
      part4 = 0b11111111111111111111100000000000
    } else {
      part4 = 0b00000000000000000000000000000000
    }
    const value = 0 | part1 | part2 | part3 | part4
    return value
  }

  // B-immediate

  valueToBimm (value: number): number {
    const part1 = 0
    const part2 = (value * (2 ** 7)) & 0b00000000000000000000111100000000
    const part3 = (value * (2 ** (7 + 13))) & 0b01111110000000000000000000000000
    const part4 = (value >>> 4) & 0b00000000000000000000000010000000
    const part5 = value & 0b10000000000000000000000000000000
    const imm = 0 | part1 | part2 | part3 | part4 | part5
    return imm
  }

  bimmToValue (instruction: number): number {
    const part1 = 0
    const part2 = (instruction >>> 7) & 0b00000000000000000000000000011110
    const part3 = (instruction >>> (7 + 13)) & 0b00000000000000000000011111100000
    const part4 = (instruction * (2 ** 4)) & 0b00000000000000000000100000000000
    let part5 = 0
    const sign = (instruction & 0b10000000000000000000000000000000) >>> 0
    if (sign === 0b10000000000000000000000000000000) {
      part5 = 0b11111111111111111111000000000000
    } else {
      part5 = 0b00000000000000000000000000000000
    }
    const value = 0 | part1 | part2 | part3 | part4 | part5
    return value
  }

  // U-immediate

  valueToUimm (value: number): number {
    const part1 = 0
    const part2 = value & 0b00000000000011111111000000000000
    const part3 = value & 0b01111111111100000000000000000000
    const part4 = value & 0b10000000000000000000000000000000
    const imm = 0 | part1 | part2 | part3 | part4
    return imm
  }

  uimmToValue (instruction: number): number {
    const part1 = 0
    const part2 = instruction & 0b00000000000011111111000000000000
    const part3 = instruction & 0b01111111111100000000000000000000
    let part4 = 0
    const sign = (instruction & 0b10000000000000000000000000000000) >>> 0
    if (sign === 0b10000000000000000000000000000000) {
      part4 = 0b10000000000000000000000000000000
    } else {
      part4 = 0b00000000000000000000000000000000
    }
    const value = 0 | part1 | part2 | part3 | part4
    return value
  }

  // J-immediate

  valueToJimm (value: number): number {
    const part1 = 0
    const part2 = (value * (2 ** 20)) & 0b00000001111000000000000000000000
    const part3 = (value * (2 ** 20)) & 0b01111110000000000000000000000000
    const part4 = (value * (2 ** 9)) & 0b00000000000100000000000000000000
    const part5 = value & 0b00000000000011111111000000000000
    const part6 = value & 0b10000000000000000000000000000000
    const imm = 0 | part1 | part2 | part3 | part4 | part5 | part6
    return imm
  }

  jimmToValue (instruction: number): number {
    const part1 = 0
    const part2 = (instruction >>> 20) & 0b00000000000000000000000000011110
    const part3 = (instruction >>> 20) & 0b00000000000000000000011111100000
    const part4 = (instruction >>> 9) & 0b00000000000000000000100000000000
    const part5 = instruction & 0b00000000000011111111000000000000
    let part6 = 0
    const sign = (instruction & 0b10000000000000000000000000000000) >>> 0
    if (sign === 0b10000000000000000000000000000000) {
      part6 = 0b11111111111100000000000000000000
    } else {
      part6 = 0b00000000000000000000000000000000
    }
    const value = 0 | part1 | part2 | part3 | part4 | part5 | part6
    return value
  }

  // Exceptions //

  throwInstructionAddressMisalignedException (pcValue: number, ppcValue: number): void {
    // fatal trap
    const info = ':pc:' + pcValue.toString() + ':ppc:' + ppcValue.toString()
    throw Error('exception:instruction-address-misaligned' + info)
  }

  throwIllegalInstructionException (instruction: string): void {
    // fatal trap
    throw new Error('exception:illegal-instruction:' + instruction)
  }
}
