import * as common from './common.js'

export class Memory {
  readonly xlen: common.Xlen
  readonly space: number // maximum length in bytes, 2^XLEN
  readonly vcount: common.Vcount
  readonly mrcount: common.Mrcount
  readonly regres: number // reserve for registers, MRCOUNT*XLEN*VCOUNT
  readonly mempow: common.Mempow
  readonly length: number // actual length, (2^MEMPOW)-REGRES
  readonly buffer: ArrayBuffer // memory data

  constructor (
    xlen: common.Xlen,
    vcount: common.Vcount,
    mrcount: common.Mrcount,
    mempow: common.Mempow
  ) {
    this.xlen = xlen
    this.vcount = vcount
    this.mrcount = mrcount
    this.mempow = mempow

    this.space = 2 ** this.xlen
    this.regres = this.mrcount * this.xlen * this.vcount
    this.length = (2 ** this.mempow) - this.regres

    const wasmMemoryPageSize = 65536
    const pages = Math.ceil(this.length / wasmMemoryPageSize)
    const wasmMemory = new WebAssembly.Memory({ initial: pages, maximum: pages, shared: false })
    this.buffer = wasmMemory.buffer
  }

  setByte (address: number, byte: number): void {
    const u8arr = new Uint8Array(this.buffer)
    u8arr[this.computeAddress(address)] = byte
  }

  getByte (address: number): number {
    const u8arr = new Uint8Array(this.buffer)
    const byte = u8arr[this.computeAddress(address)]
    if (byte === undefined) {
      throw Error('byte === undefined')
    } else {
      return byte
    }
  }

  private computeAddress (address: number): number {
    return address % this.length
  }
}
