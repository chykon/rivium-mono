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
        // ADDI
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

  throwInstructionAddressMisalignedException (previousJump: boolean): void {
    // fatal trap
    if (previousJump) {
      throw Error('exception:instruction-address-misaligned:jump')
    } else {
      throw Error('exception:instruction-address-misaligned')
    }
  }

  throwIllegalInstructionException (instruction: string): void {
    // fatal trap
    throw new Error('exception:illegal-instruction:' + instruction)
  }
}
