import * as memory from './memory.js'
import * as common from './common.js'
import * as vcore from './vcore.js'
import * as asm from './assembler.js'

function runAssembly() {
  const machineCode = asm.assembly(textArea.value, core)
  for (let i = 0; i < machineCode.length; ++i) {
    mem.setByte(i, machineCode[i])
  }
  textAreaMachineCode.value = ''
  for (let i = 0; i < machineCode.length; i += 4) {
    let instruction = 0
    instruction |= machineCode[i + 0] * (2 ** 0)
    instruction |= machineCode[i + 1] * (2 ** 8)
    instruction |= machineCode[i + 2] * (2 ** 16)
    instruction |= machineCode[i + 3] * (2 ** 24)
    textAreaMachineCode.value += ((instruction >>> 0).toString(2)).padStart(32, '0') + '\n'
  }
  while (true) {
    try {
      core.fetchInstruction()
    } catch (error) {
      // regs
      const regs = []
      for (let i = 0; i < 33; ++i) {
        regs.push(core.getRegisterValue(i, true))
      }
      for (let i = 0; i < regs.length; ++i) {
        const row = tableRegs.rows[i]
        if (row === undefined) { throw Error(); }
        if (row.cells[1] === undefined) { throw Error(); }
        row.cells[1].innerHTML = regs[i].toString(10)
      }
      // mem
      const memo = []
      for (let i = 0; i < mem.length; ++i) {
        memo.push(mem.getByte(i))
      }
      for (let i = 0; i < memo.length / 10; ++i) {
        const row = tableMem.rows[i]
        if (row === undefined) { throw Error(); }
        if (row.cells[1] === undefined) { throw Error(); }
        row.cells[1].innerHTML = memo[i].toString(10)
      }
      console.log(core.getRegisterValue(3))
      console.log(core.getRegisterValue(6))
      core.setRegisterValue(vcore.Regs.x0, 0)
      core.setRegisterValue(vcore.Regs.x1, 0)
      core.setRegisterValue(vcore.Regs.x2, 0)
      core.setRegisterValue(vcore.Regs.x3, 0)
      core.setRegisterValue(vcore.Regs.x4, 0)
      core.setRegisterValue(vcore.Regs.x5, 0)
      core.setRegisterValue(vcore.Regs.x6, 0)
      core.setRegisterValue(vcore.Regs.x7, 0)
      core.setRegisterValue(vcore.Regs.x8, 0)
      core.setRegisterValue(vcore.Regs.x9, 0)
      core.setRegisterValue(vcore.Regs.x10, 0)
      core.setRegisterValue(vcore.Regs.x11, 0)
      core.setRegisterValue(vcore.Regs.x12, 0)
      core.setRegisterValue(vcore.Regs.x13, 0)
      core.setRegisterValue(vcore.Regs.x14, 0)
      core.setRegisterValue(vcore.Regs.x15, 0)
      core.setRegisterValue(vcore.Regs.x16, 0)
      core.setRegisterValue(vcore.Regs.x17, 0)
      core.setRegisterValue(vcore.Regs.x18, 0)
      core.setRegisterValue(vcore.Regs.x19, 0)
      core.setRegisterValue(vcore.Regs.x20, 0)
      core.setRegisterValue(vcore.Regs.x21, 0)
      core.setRegisterValue(vcore.Regs.x22, 0)
      core.setRegisterValue(vcore.Regs.x23, 0)
      core.setRegisterValue(vcore.Regs.x24, 0)
      core.setRegisterValue(vcore.Regs.x25, 0)
      core.setRegisterValue(vcore.Regs.x26, 0)
      core.setRegisterValue(vcore.Regs.x27, 0)
      core.setRegisterValue(vcore.Regs.x28, 0)
      core.setRegisterValue(vcore.Regs.x29, 0)
      core.setRegisterValue(vcore.Regs.x30, 0)
      core.setRegisterValue(vcore.Regs.x31, 0)
      core.setRegisterValue(vcore.Regs.pc, 0, true)
      core.setRegisterValue(vcore.Regs.ppc, 0, true)
      throw error
    }
  }
}
