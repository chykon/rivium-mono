import * as memory from './memory.js'
import * as common from './common.js'
import * as vcore from './vcore.js'
import * as asm from './assembler.js'

// hub & connector //

const mem = new memory.Memory(
  common.Xlen.word,
  common.Vcount.one,
  common.Mrcount.default,
  common.Mempow.min
)
const core = new vcore.Vcore(mem, common.Vnum.zero, common.Ialign.word, common.Ilen.word)

const textArea = document.createElement('textarea')
const textAreaMachineCode = document.createElement('textarea')

const tableRegs = document.createElement('table')
const tableMem = document.createElement('table')

export function main (): void {
  // editor //

  textArea.cols = 75
  textArea.rows = 25
  textArea.spellcheck = false
  textArea.value =
    '; let i = 0 ' + '\n' +
    '; let shft = 1 ' + '\n' +
    '; let memStart = 1024' + '\n' +
    '; while (i !== 8) {' + '\n' +
    ';   mem[memStart + i] = shft << i' + '\n' +
    ';   ++i' + '\n' +
    '; }' + '\n' +
    'addi x1,x1,0' + '\n' +
    'addi x10,x10,8' + '\n' +
    'addi x2,x2,1' + '\n' +
    'addi x3,x3,1024' + '\n' +
    'add x4,x3,x1' + '\n' +
    'sll x5,x2,x1' + '\n' +
    'sb x4,x5,0' + '\n' +
    'addi x1,x1,1' + '\n' +
    'bne x1,x10,-16' + '\n'
  document.body.appendChild(textArea)
  const editorButton = document.createElement('button')
  editorButton.innerText = 'assembly & run'
  editorButton.onclick = runAssembly
  document.body.appendChild(editorButton)
  textAreaMachineCode.cols = 75
  textAreaMachineCode.rows = 25
  textAreaMachineCode.spellcheck = false
  document.body.appendChild(textAreaMachineCode)

  // debugger //

  // registers
  const regs: number[] = []
  for (let i = 0; i < 33; ++i) {
    regs.push(core.getRegisterValue(i, true))
  }
  tableRegs.style.border = '1px solid black'
  for (let i = 0; i < regs.length; ++i) {
    const tr = tableRegs.insertRow()
    let regName = ''
    if (i === regs.length - 1) {
      regName = 'pc'
    } else {
      regName = 'x' + i.toString(10)
    }
    const regValue = regs[i] as number
    const tdName = tr.insertCell()
    const tdValue = tr.insertCell()
    tdName.appendChild(document.createTextNode(regName))
    tdValue.appendChild(document.createTextNode(regValue.toString(10)))
  }
  document.body.appendChild(tableRegs)
  // memory
  const memo: number[] = []
  for (let i = 0; i < mem.length; ++i) {
    memo.push(mem.getByte(i))
  }
  tableMem.style.border = '1px solid black'
  for (let i = 0; i < memo.length / 10; ++i) {
    const tr = tableMem.insertRow()
    const memAddr = i.toString(10)
    const memValue = (memo[i] as number).toString(10)
    const tdAddr = tr.insertCell()
    const tdValue = tr.insertCell()
    tdAddr.appendChild(document.createTextNode(memAddr))
    tdValue.appendChild(document.createTextNode(memValue))
  }
  document.body.appendChild(tableMem)
}

function runAssembly (): void {
  const machineCode = asm.assembly(textArea.value, core)
  for (let i = 0; i < machineCode.length; ++i) {
    mem.setByte(i, machineCode[i] as number)
  }
  textAreaMachineCode.value = ''
  for (let i = 0; i < machineCode.length; i += 4) {
    let instruction = 0
    instruction |= (machineCode[i + 0] as number) * (2 ** 0)
    instruction |= (machineCode[i + 1] as number) * (2 ** 8)
    instruction |= (machineCode[i + 2] as number) * (2 ** 16)
    instruction |= (machineCode[i + 3] as number) * (2 ** 24)
    textAreaMachineCode.value += ((instruction >>> 0).toString(2)).padStart(32, '0') + '\n'
  }
  while (true) {
    try {
      core.fetchInstruction()
    } catch (error) {
      // regs
      const regs: number[] = []
      for (let i = 0; i < 33; ++i) {
        regs.push(core.getRegisterValue(i, true))
      }
      for (let i = 0; i < regs.length; ++i) {
        const row = tableRegs.rows[i] as HTMLTableRowElement
        if (row === undefined) throw Error()
        if (row.cells[1] === undefined) throw Error()
        row.cells[1].innerHTML = (regs[i] as number).toString(10)
      }
      // mem
      const memo: number[] = []
      for (let i = 0; i < mem.length; ++i) {
        memo.push(mem.getByte(i))
      }
      for (let i = 0; i < memo.length / 10; ++i) {
        const row = tableMem.rows[i] as HTMLTableRowElement
        if (row === undefined) throw Error()
        if (row.cells[1] === undefined) throw Error()
        row.cells[1].innerHTML = (memo[i] as number).toString(10)
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
