import * as memory from './memory.js'
import * as common from './common.js'
import * as vcore from './vcore.js'

export class Test {
  // Memory //

  testingMemory (): void {
    const mem = new memory.Memory(
      common.Xlen.word,
      common.Vcount.one,
      common.Mrcount.default,
      common.Mempow.med
    )
    mem.setByte(1, 257)
    mem.setByte(mem.length, 2)
    if (mem.getByte(0) !== 2) {
      throw Error('testing memory 1')
    }
    if (mem.getByte(mem.length + 1) !== 1) {
      throw Error('testing memory 2')
    }
  }

  // Vcore //

  testingVcore (): void {
    const mem = new memory.Memory(
      common.Xlen.word,
      common.Vcount.one,
      common.Mrcount.default,
      common.Mempow.med
    )
    const core = new vcore.Vcore(mem, common.Vnum.zero, common.Ialign.word, common.Ilen.word)

    // PC-register
    try {
      core.fetchInstruction()
    } catch (error) {
      const instruction = (((error as Error).message).split(':')).pop()
      if (instruction !== '00000000000000000000000000000000') {
        console.log((error as Error).message)
        throw Error('testing vcore 1')
      }
    }
    mem.setByte(4, 255)
    mem.setByte(5, 255)
    mem.setByte(6, 255)
    mem.setByte(7, 255)
    try {
      core.fetchInstruction()
    } catch (error) {
      const instruction = (((error as Error).message).split(':')).pop()
      if (instruction !== '11111111111111111111111111111111') {
        throw Error('testing vcore 2')
      }
    }
    mem.setByte(8, 1)
    mem.setByte(9, 3)
    mem.setByte(10, 7)
    mem.setByte(11, 15)
    try {
      core.fetchInstruction()
    } catch (error) {
      const instruction = (((error as Error).message).split(':')).pop()
      if (instruction !== '00001111000001110000001100000001') {
        throw Error('testing vcore 3')
      }
    }

    // ADDI
    let instruction = 0 | vcore.Opcode.OP_IMM // opcode
    instruction |= vcore.Regs.x31 * (2 ** 7) // rd
    instruction |= 0b000 * (2 ** 12) // funct3
    instruction |= vcore.Regs.x30 * (2 ** 15) // rs1
    instruction |= 64 * (2 ** 20) // I-imm
    mem.setByte(12, instruction)
    mem.setByte(13, instruction >>> 8)
    mem.setByte(14, instruction >>> 16)
    mem.setByte(15, instruction >>> 24)
    core.fetchInstruction()
    if (core.getRegisterValue(vcore.Regs.x31) !== 64) {
      throw Error('testing vcore 4')
    }
    if (core.getRegisterValue(vcore.Regs.x30) !== 64) {
      throw Error('testing vcore 5')
    }
    instruction = 0 | vcore.Opcode.OP_IMM // opcode
    instruction |= vcore.Regs.x31 * (2 ** 7) // rd
    instruction |= 0b000 * (2 ** 12) // funct3
    instruction |= vcore.Regs.x30 * (2 ** 15) // rs1
    instruction |= -70 * (2 ** 20) // I-imm
    mem.setByte(16, instruction)
    mem.setByte(17, instruction >>> 8)
    mem.setByte(18, instruction >>> 16)
    mem.setByte(19, instruction >>> 24)
    core.fetchInstruction()
    if (core.getRegisterValue(vcore.Regs.x31) !== -6) {
      throw Error('testing vcore 6')
    }
    if (core.getRegisterValue(vcore.Regs.x30) !== -6) {
      throw Error('testing vcore 7')
    }

    // SLTI
    instruction = 0 | vcore.Opcode.OP_IMM // opcode
    instruction |= vcore.Regs.x20 * (2 ** 7) // rd
    instruction |= 0b010 * (2 ** 12) // funct3
    instruction |= vcore.Regs.x10 * (2 ** 15) // rs1
    instruction |= 64 * (2 ** 20) // I-imm
    mem.setByte(20, instruction)
    mem.setByte(21, instruction >>> 8)
    mem.setByte(22, instruction >>> 16)
    mem.setByte(23, instruction >>> 24)
    core.fetchInstruction()
    if (core.getRegisterValue(vcore.Regs.x20) !== 1) {
      throw Error('testing vcore 8')
    }
    if (core.getRegisterValue(vcore.Regs.x10) !== 0) {
      throw Error('testing vcore 9')
    }
    instruction = 0 | vcore.Opcode.OP_IMM // opcode
    instruction |= vcore.Regs.x20 * (2 ** 7) // rd
    instruction |= 0b010 * (2 ** 12) // funct3
    instruction |= vcore.Regs.x20 * (2 ** 15) // rs1
    instruction |= -1 * (2 ** 20) // I-imm
    mem.setByte(24, instruction)
    mem.setByte(25, instruction >>> 8)
    mem.setByte(26, instruction >>> 16)
    mem.setByte(27, instruction >>> 24)
    core.fetchInstruction()
    if (core.getRegisterValue(vcore.Regs.x20) !== 0) {
      throw Error('testing vcore 10')
    }

    // SLTIU
    instruction = 0 | vcore.Opcode.OP_IMM // opcode
    instruction |= vcore.Regs.x30 * (2 ** 7) // rd
    instruction |= 0b011 * (2 ** 12) // funct3
    instruction |= vcore.Regs.x31 * (2 ** 15) // rs1
    instruction |= 64 * (2 ** 20) // I-imm
    mem.setByte(28, instruction)
    mem.setByte(29, instruction >>> 8)
    mem.setByte(30, instruction >>> 16)
    mem.setByte(31, instruction >>> 24)
    core.fetchInstruction()
    if (core.getRegisterValue(vcore.Regs.x30) !== 0) {
      throw Error('testing vcore 11')
    }

    // ANDI
    instruction = 0 | vcore.Opcode.OP_IMM // opcode
    instruction |= vcore.Regs.x30 * (2 ** 7) // rd
    instruction |= 0b111 * (2 ** 12) // funct3
    instruction |= vcore.Regs.x31 * (2 ** 15) // rs1
    instruction |= 6 * (2 ** 20) // I-imm
    mem.setByte(32, instruction)
    mem.setByte(33, instruction >>> 8)
    mem.setByte(34, instruction >>> 16)
    mem.setByte(35, instruction >>> 24)
    core.fetchInstruction()
    if (core.getRegisterValue(vcore.Regs.x30) !== 2) {
      throw Error('testing vcore 12')
    }

    // ORI
    instruction = 0 | vcore.Opcode.OP_IMM // opcode
    instruction |= vcore.Regs.x30 * (2 ** 7) // rd
    instruction |= 0b110 * (2 ** 12) // funct3
    instruction |= vcore.Regs.x31 * (2 ** 15) // rs1
    instruction |= 6 * (2 ** 20) // I-imm
    mem.setByte(36, instruction)
    mem.setByte(37, instruction >>> 8)
    mem.setByte(38, instruction >>> 16)
    mem.setByte(39, instruction >>> 24)
    core.fetchInstruction()
    if (core.getRegisterValue(vcore.Regs.x30) !== -2) {
      throw Error('testing vcore 13')
    }

    // XORI
    instruction = 0 | vcore.Opcode.OP_IMM // opcode
    instruction |= vcore.Regs.x30 * (2 ** 7) // rd
    instruction |= 0b100 * (2 ** 12) // funct3
    instruction |= vcore.Regs.x31 * (2 ** 15) // rs1
    instruction |= 6 * (2 ** 20) // I-imm
    mem.setByte(40, instruction)
    mem.setByte(41, instruction >>> 8)
    mem.setByte(42, instruction >>> 16)
    mem.setByte(43, instruction >>> 24)
    core.fetchInstruction()
    if (core.getRegisterValue(vcore.Regs.x30) !== -4) {
      throw Error('testing vcore 14')
    }

    // SLLI
    instruction = 0 | vcore.Opcode.OP_IMM // opcode
    instruction |= vcore.Regs.x30 * (2 ** 7) // rd
    instruction |= 0b001 * (2 ** 12) // funct3
    instruction |= vcore.Regs.x31 * (2 ** 15) // rs1
    let shamt = 1 * (2 ** 20)
    let upperImm = 0 * (2 ** 25)
    instruction |= shamt | upperImm // I-imm
    mem.setByte(44, instruction)
    mem.setByte(45, instruction >>> 8)
    mem.setByte(46, instruction >>> 16)
    mem.setByte(47, instruction >>> 24)
    core.fetchInstruction()
    if (core.getRegisterValue(vcore.Regs.x30) !== -12) {
      throw Error('testing vcore 15')
    }

    // SRAI
    instruction = 0 | vcore.Opcode.OP_IMM // opcode
    instruction |= vcore.Regs.x30 * (2 ** 7) // rd
    instruction |= 0b101 * (2 ** 12) // funct3
    instruction |= vcore.Regs.x31 * (2 ** 15) // rs1
    shamt = 1 * (2 ** 20)
    upperImm = 32 * (2 ** 25)
    instruction |= shamt | upperImm // I-imm
    mem.setByte(48, instruction)
    mem.setByte(49, instruction >>> 8)
    mem.setByte(50, instruction >>> 16)
    mem.setByte(51, instruction >>> 24)
    core.fetchInstruction()
    if (core.getRegisterValue(vcore.Regs.x30) !== -3) {
      throw Error('testing vcore 16')
    }

    // SRLI
    instruction = 0 | vcore.Opcode.OP_IMM // opcode
    instruction |= vcore.Regs.x30 * (2 ** 7) // rd
    instruction |= 0b101 * (2 ** 12) // funct3
    instruction |= vcore.Regs.x31 * (2 ** 15) // rs1
    shamt = 1 * (2 ** 20)
    upperImm = 0 * (2 ** 25)
    instruction |= shamt | upperImm // I-imm
    mem.setByte(52, instruction)
    mem.setByte(53, instruction >>> 8)
    mem.setByte(54, instruction >>> 16)
    mem.setByte(55, instruction >>> 24)
    core.fetchInstruction()
    if (core.getRegisterValue(vcore.Regs.x30) !== 0b01111111111111111111111111111101) {
      throw Error('testing vcore 17')
    }

    // LUI
    instruction = 0 | vcore.Opcode.LUI // opcode
    instruction |= vcore.Regs.x10 * (2 ** 7) // rd
    instruction |= 1 * (2 ** 31) // U-imm
    mem.setByte(56, instruction)
    mem.setByte(57, instruction >>> 8)
    mem.setByte(58, instruction >>> 16)
    mem.setByte(59, instruction >>> 24)
    core.fetchInstruction()
    if ((core.getRegisterValue(vcore.Regs.x10) >>> 0) !== 0b10000000000000000000000000000000) {
      throw Error('testing vcore 18')
    }

    // AUIPC
    instruction = 0 | vcore.Opcode.AUIPC // opcode
    instruction |= vcore.Regs.x10 * (2 ** 7) // rd
    instruction |= 1 * (2 ** 31) // U-imm
    mem.setByte(60, instruction)
    mem.setByte(61, instruction >>> 8)
    mem.setByte(62, instruction >>> 16)
    mem.setByte(63, instruction >>> 24)
    core.fetchInstruction()
    if ((core.getRegisterValue(vcore.Regs.x10) >>> 0) !== 0b10000000000000000000000000111100) {
      throw Error('testing vcore 19')
    }

    // ADD
    instruction = 0 | vcore.Opcode.OP // opcode
    instruction |= vcore.Regs.x9 * (2 ** 7) // rd
    instruction |= 0b000 * (2 ** 12) // funct3
    instruction |= vcore.Regs.x30 * (2 ** 15) // rs1
    instruction |= vcore.Regs.x31 * (2 ** 20) // rs2
    instruction |= 0 * (2 ** 25) // funct7
    mem.setByte(64, instruction)
    mem.setByte(65, instruction >>> 8)
    mem.setByte(66, instruction >>> 16)
    mem.setByte(67, instruction >>> 24)
    core.fetchInstruction()
    if ((core.getRegisterValue(vcore.Regs.x9) >>> 0) !== 0b01111111111111111111111111110111) {
      throw Error('testing vcore 20')
    }

    // SLT
    instruction = 0 | vcore.Opcode.OP // opcode
    instruction |= vcore.Regs.x9 * (2 ** 7) // rd
    instruction |= 0b010 * (2 ** 12) // funct3
    instruction |= vcore.Regs.x30 * (2 ** 15) // rs1
    instruction |= vcore.Regs.x31 * (2 ** 20) // rs2
    instruction |= 0 * (2 ** 25) // funct7
    mem.setByte(68, instruction)
    mem.setByte(69, instruction >>> 8)
    mem.setByte(70, instruction >>> 16)
    mem.setByte(71, instruction >>> 24)
    core.fetchInstruction()
    if ((core.getRegisterValue(vcore.Regs.x9) >>> 0) !== 0) {
      throw Error('testing vcore 21')
    }

    // SLTU
    instruction = 0 | vcore.Opcode.OP // opcode
    instruction |= vcore.Regs.x9 * (2 ** 7) // rd
    instruction |= 0b011 * (2 ** 12) // funct3
    instruction |= vcore.Regs.x30 * (2 ** 15) // rs1
    instruction |= vcore.Regs.x31 * (2 ** 20) // rs2
    instruction |= 0 * (2 ** 25) // funct7
    mem.setByte(72, instruction)
    mem.setByte(73, instruction >>> 8)
    mem.setByte(74, instruction >>> 16)
    mem.setByte(75, instruction >>> 24)
    core.fetchInstruction()
    if ((core.getRegisterValue(vcore.Regs.x9) >>> 0) !== 1) {
      throw Error('testing vcore 22')
    }

    // AND
    instruction = 0 | vcore.Opcode.OP // opcode
    instruction |= vcore.Regs.x9 * (2 ** 7) // rd
    instruction |= 0b111 * (2 ** 12) // funct3
    instruction |= vcore.Regs.x30 * (2 ** 15) // rs1
    instruction |= vcore.Regs.x31 * (2 ** 20) // rs2
    instruction |= 0 * (2 ** 25) // funct7
    mem.setByte(76, instruction)
    mem.setByte(77, instruction >>> 8)
    mem.setByte(78, instruction >>> 16)
    mem.setByte(79, instruction >>> 24)
    core.fetchInstruction()
    if ((core.getRegisterValue(vcore.Regs.x9) >>> 0) !== 0b01111111111111111111111111111000) {
      throw Error('testing vcore 23')
    }

    // OR
    instruction = 0 | vcore.Opcode.OP // opcode
    instruction |= vcore.Regs.x9 * (2 ** 7) // rd
    instruction |= 0b110 * (2 ** 12) // funct3
    instruction |= vcore.Regs.x30 * (2 ** 15) // rs1
    instruction |= vcore.Regs.x31 * (2 ** 20) // rs2
    instruction |= 0 * (2 ** 25) // funct7
    mem.setByte(80, instruction)
    mem.setByte(81, instruction >>> 8)
    mem.setByte(82, instruction >>> 16)
    mem.setByte(83, instruction >>> 24)
    core.fetchInstruction()
    if ((core.getRegisterValue(vcore.Regs.x9) >>> 0) !== 0b11111111111111111111111111111111) {
      throw Error('testing vcore 24')
    }

    // XOR
    instruction = 0 | vcore.Opcode.OP // opcode
    instruction |= vcore.Regs.x9 * (2 ** 7) // rd
    instruction |= 0b100 * (2 ** 12) // funct3
    instruction |= vcore.Regs.x30 * (2 ** 15) // rs1
    instruction |= vcore.Regs.x31 * (2 ** 20) // rs2
    instruction |= 0 * (2 ** 25) // funct7
    mem.setByte(84, instruction)
    mem.setByte(85, instruction >>> 8)
    mem.setByte(86, instruction >>> 16)
    mem.setByte(87, instruction >>> 24)
    core.fetchInstruction()
    if ((core.getRegisterValue(vcore.Regs.x9) >>> 0) !== 0b10000000000000000000000000000111) {
      throw Error('testing vcore 25')
    }

    // SLL
    instruction = 0 | vcore.Opcode.OP // opcode
    instruction |= vcore.Regs.x9 * (2 ** 7) // rd
    instruction |= 0b001 * (2 ** 12) // funct3
    instruction |= vcore.Regs.x30 * (2 ** 15) // rs1
    instruction |= vcore.Regs.x31 * (2 ** 20) // rs2
    instruction |= 0 * (2 ** 25) // funct7
    mem.setByte(88, instruction)
    mem.setByte(89, instruction >>> 8)
    mem.setByte(90, instruction >>> 16)
    mem.setByte(91, instruction >>> 24)
    core.fetchInstruction()
    if ((core.getRegisterValue(vcore.Regs.x9) >>> 0) !== 0b11110100000000000000000000000000) {
      throw Error('testing vcore 26')
    }

    // SRL
    instruction = 0 | vcore.Opcode.OP // opcode
    instruction |= vcore.Regs.x9 * (2 ** 7) // rd
    instruction |= 0b101 * (2 ** 12) // funct3
    instruction |= vcore.Regs.x30 * (2 ** 15) // rs1
    instruction |= vcore.Regs.x31 * (2 ** 20) // rs2
    instruction |= 0 * (2 ** 25) // funct7
    mem.setByte(92, instruction)
    mem.setByte(93, instruction >>> 8)
    mem.setByte(94, instruction >>> 16)
    mem.setByte(95, instruction >>> 24)
    core.fetchInstruction()
    if ((core.getRegisterValue(vcore.Regs.x9) >>> 0) !== 0b00000000000000000000000000011111) {
      throw Error('testing vcore 27')
    }

    // SUB
    instruction = 0 | vcore.Opcode.OP // opcode
    instruction |= vcore.Regs.x9 * (2 ** 7) // rd
    instruction |= 0b000 * (2 ** 12) // funct3
    instruction |= vcore.Regs.x30 * (2 ** 15) // rs1
    instruction |= vcore.Regs.x31 * (2 ** 20) // rs2
    instruction |= 32 * (2 ** 25) // funct7
    mem.setByte(96, instruction)
    mem.setByte(97, instruction >>> 8)
    mem.setByte(98, instruction >>> 16)
    mem.setByte(99, instruction >>> 24)
    core.fetchInstruction()
    if ((core.getRegisterValue(vcore.Regs.x9) >>> 0) !== 0b10000000000000000000000000000011) {
      throw Error('testing vcore 28')
    }

    // SRA
    instruction = 0 | vcore.Opcode.OP // opcode
    instruction |= vcore.Regs.x9 * (2 ** 7) // rd
    instruction |= 0b101 * (2 ** 12) // funct3
    instruction |= vcore.Regs.x30 * (2 ** 15) // rs1
    instruction |= vcore.Regs.x31 * (2 ** 20) // rs2
    instruction |= 32 * (2 ** 25) // funct7
    mem.setByte(100, instruction)
    mem.setByte(101, instruction >>> 8)
    mem.setByte(102, instruction >>> 16)
    mem.setByte(103, instruction >>> 24)
    core.fetchInstruction()
    if ((core.getRegisterValue(vcore.Regs.x9) >>> 0) !== 0b00000000000000000000000000011111) {
      throw Error('testing vcore 29')
    }

    // JAL
    instruction = 0 | vcore.Opcode.JAL // opcode
    instruction |= vcore.Regs.x15 * (2 ** 7) // rd
    instruction |= core.valueToJimm(112) // imm
    mem.setByte(104, instruction)
    mem.setByte(105, instruction >>> 8)
    mem.setByte(106, instruction >>> 16)
    mem.setByte(107, instruction >>> 24)
    mem.setByte(112, 0b11111111)
    mem.setByte(113, 0b11111111)
    mem.setByte(114, 0b11111111)
    mem.setByte(115, 0b11111111)
    try {
      core.fetchInstruction()
    } catch (error) {
      const instruction = (((error as Error).message).split(':')).pop()
      if (instruction !== '11111111111111111111111111111111') {
        throw Error('testing vcore 30')
      }
    }
    if ((core.getRegisterValue(vcore.Regs.x15) >>> 0) !== 108) {
      throw Error('testing vcore 31')
    }

    // JALR
    // misaligned exception test
  }

  // All //

  testingAll (): void {
    console.log('BEGIN TESTING ALL')
    this.testingMemory()
    this.testingVcore()
    console.log('END TESTING ALL')
  }
}
