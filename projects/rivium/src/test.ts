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
  }

  // All //

  testingAll (): void {
    console.log('BEGIN TESTING ALL')
    this.testingMemory()
    this.testingVcore()
    console.log('END TESTING ALL')
  }
}
