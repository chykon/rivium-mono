// XLEN - register width
export var Xlen;
(function (Xlen) {
  Xlen[Xlen.word = 32] = 'word' // bits
})(Xlen || (Xlen = {}))

// VCOUNT - vcore count
export var Vcount;
(function (Vcount) {
  Vcount[Vcount.one = 1] = 'one'
})(Vcount || (Vcount = {}))

// MRCOUNT - max registers count
export var Mrcount;
(function (Mrcount) {
  Mrcount[Mrcount.default = 128] = 'default'
})(Mrcount || (Mrcount = {}))

// MEMPOW - powers of 2 for memory length
export var Mempow;
(function (Mempow) {
  Mempow[Mempow.min = 16] = 'min'
  Mempow[Mempow.med = 24] = 'med'
  Mempow[Mempow.max = 32] = 'max'
})(Mempow || (Mempow = {}))

// VNUM - vcore number
export var Vnum;
(function (Vnum) {
  Vnum[Vnum.zero = 0] = 'zero'
})(Vnum || (Vnum = {}))

// IALIGN - instruction alignment
export var Ialign;
(function (Ialign) {
  Ialign[Ialign.word = 32] = 'word'
})(Ialign || (Ialign = {}))

// ILEN - instruction length
export var Ilen;
(function (Ilen) {
  Ilen[Ilen.word = 32] = 'word'
})(Ilen || (Ilen = {}))
