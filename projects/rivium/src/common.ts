// XLEN - register width
export enum Xlen {
  word = 32 // bits
}

// VCOUNT - vcore count
export enum Vcount {
  one = 1
}

// MRCOUNT - max registers count
export enum Mrcount {
  default = 128
}

// MEMPOW - powers of 2 for memory length
export enum Mempow {
  min = 16,
  med = 24,
  max = 32
}

// VNUM - vcore number
export enum Vnum {
  zero = 0
}

// IALIGN - instruction alignment
export enum Ialign {
  word = 32
}

// ILEN - instruction length
export enum Ilen {
  word = 32
}
