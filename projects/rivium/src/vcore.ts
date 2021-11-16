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

  setRegisterValue (regnum: Regs, value: number, counter = false): void {
    if (!counter && ((regnum === Regs.pc) || (regnum === Regs.ppc))) {
      throw Error('set-access to counters')
    } else if (regnum === Regs.x0) {
      return
    }
    const u32arr = new Uint32Array(this.mem.buffer)
    const regOffset = this.mem.mrcount * this.vnum
    u32arr[(u32arr.length - 1) - (regOffset + regnum)] = value
  }

  getRegisterValue (regnum: Regs, counter = false): number {
    if (!counter && ((regnum === Regs.pc) || (regnum === Regs.ppc))) {
      throw Error('get-access to counters')
    } else if (regnum === Regs.x0) {
      return 0
    }
    const u32arr = new Uint32Array(this.mem.buffer)
    const regOffset = this.mem.mrcount * this.vnum
    const value = u32arr[(u32arr.length - 1) - (regOffset + regnum)]
    if (value === undefined) {
      throw Error('value === undefined')
    }
    return value
  }

  fetchInstruction (): void {
    this.setRegisterValue(Regs.ppc, this.getRegisterValue(Regs.pc, true), true)

    const byte1 = this.mem.getByte(this.getRegisterValue(Regs.pc, true)) * (2 ** 0)
    this.setRegisterValue(Regs.pc, this.getRegisterValue(Regs.pc, true) + 1, true)
    const byte2 = this.mem.getByte(this.getRegisterValue(Regs.pc, true)) * (2 ** 8)
    this.setRegisterValue(Regs.pc, this.getRegisterValue(Regs.pc, true) + 1, true)
    const byte3 = this.mem.getByte(this.getRegisterValue(Regs.pc, true)) * (2 ** 16)
    this.setRegisterValue(Regs.pc, this.getRegisterValue(Regs.pc, true) + 1, true)
    const byte4 = this.mem.getByte(this.getRegisterValue(Regs.pc, true)) * (2 ** 24)
    this.setRegisterValue(Regs.pc, this.getRegisterValue(Regs.pc, true) + 1, true)
    const instruction = 0 | byte1 | byte2 | byte3 | byte4

    if (instruction === 1) {
      throw Error('ERROR')
    } else {
      let instructionBinary = (instruction >>> 0).toString(2)
      instructionBinary = instructionBinary.padStart(this.ilen, '0')
      this.throwIllegalInstructionException(instructionBinary)
    }
  }

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
