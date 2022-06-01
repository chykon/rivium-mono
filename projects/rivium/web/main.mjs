import * as memory from './old/memory.js'
import * as common from './old/common.js'
import * as vcore from './old/vcore.js'
import * as assembler from './old/assembler.js'
import * as test from './old/test.js'
import * as rivium from './rust/rivium.js'

export class Rivium {
  constructor () {
    this.mem = null
    this.core = null
  }

  async init () {
    await rivium.default()
    rivium.set_panic_hook()
    this.mem = new memory.Memory(
      common.Xlen.word,
      common.Vcount.one,
      common.Mrcount.default,
      common.Mempow.min
    )
    this.core = new vcore.Vcore(
      this.mem,
      common.Vnum.zero,
      common.Ialign.word,
      common.Ilen.word
    )
  }

  test () {
    new test.Test().testingAll()
  }

  assemblySourceCode (sourceCode) {
    return assembler.assembly(sourceCode, this.core)
  }

  loadMachineCode (machineCode) {
    for (let i = 0; i < machineCode.length; ++i) {
      this.mem?.setByte(i, machineCode[i])
    }
    return machineCode
  }

  translateIntermediate (arrayCode) {
    return rivium.jsonify_intermediate(arrayCode)
  }

  fetchInstruction () {
    this.core?.fetchInstruction()
  }

  disassembly (byte1, byte2, byte3, byte4) {
    const mem = new memory.Memory(
      common.Xlen.word,
      common.Vcount.one,
      common.Mrcount.default,
      common.Mempow.min
    )
    const core = new vcore.Vcore(
      mem,
      common.Vnum.zero,
      common.Ialign.word,
      common.Ilen.word
    )
    mem.setByte(0, byte1)
    mem.setByte(1, byte2)
    mem.setByte(2, byte3)
    mem.setByte(3, byte4)
    const intermediate = []
    core.fetchInstruction(intermediate)
    return intermediate.pop()
  }

  intermediateToText (string) {
    return rivium.intermediate_to_text(string)
  }

  analyze (string) {
    return rivium.analyze(string)
  }
}

// ???

const rv = new Rivium()
await rv.init()
rv.test()

//console.log(rv.translateIntermediate('{"0":["LB", "1", "31", "-3"],"1":["JAL", "15", "8"],"2":["ADD", "9", "30",]}'))


console.log(rv.translateIntermediate('[["XOR", "9", "30", "31"],["JAL", "15", "8"],["LH", "1", "31", "-113"]]'))

console.log('1\n2\n3\n')

console.log(rv.intermediateToText(rv.translateIntermediate('[["XOR", "9", "30", "31"],["JAL", "15", "8"],["LH", "1", "31", "-113"]]')))

console.log(rv.translateIntermediate('[["JAL", "15", "8"]]'))

console.log(rv.analyze(rv.translateIntermediate('[["JAL", "15", "99999999999990"]]')))



'[["XOR", "9", "30", "31"],["JAL", "15", "8"],["LH", "1", "31", "-113"]]'
