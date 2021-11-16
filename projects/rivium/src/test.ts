import * as memory from './memory.js'
import * as common from './common.js'
import * as vcore from './vcore.js'

export class Test {
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

  testingVcore (): void {
    const mem = new memory.Memory(
      common.Xlen.word,
      common.Vcount.one,
      common.Mrcount.default,
      common.Mempow.med
    )
    const core = new vcore.Vcore(mem, common.Vnum.zero, common.Ialign.word, common.Ilen.word)
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
  }

  testingAll (): void {
    console.log('BEGIN TESTING ALL')
    this.testingMemory()
    this.testingVcore()
    console.log('END TESTING ALL')
  }
}
