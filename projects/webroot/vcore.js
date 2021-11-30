export var Regs;
(function (Regs) {
    Regs[Regs["x0"] = 0] = "x0";
    Regs[Regs["x1"] = 1] = "x1";
    Regs[Regs["x2"] = 2] = "x2";
    Regs[Regs["x3"] = 3] = "x3";
    Regs[Regs["x4"] = 4] = "x4";
    Regs[Regs["x5"] = 5] = "x5";
    Regs[Regs["x6"] = 6] = "x6";
    Regs[Regs["x7"] = 7] = "x7";
    Regs[Regs["x8"] = 8] = "x8";
    Regs[Regs["x9"] = 9] = "x9";
    Regs[Regs["x10"] = 10] = "x10";
    Regs[Regs["x11"] = 11] = "x11";
    Regs[Regs["x12"] = 12] = "x12";
    Regs[Regs["x13"] = 13] = "x13";
    Regs[Regs["x14"] = 14] = "x14";
    Regs[Regs["x15"] = 15] = "x15";
    Regs[Regs["x16"] = 16] = "x16";
    Regs[Regs["x17"] = 17] = "x17";
    Regs[Regs["x18"] = 18] = "x18";
    Regs[Regs["x19"] = 19] = "x19";
    Regs[Regs["x20"] = 20] = "x20";
    Regs[Regs["x21"] = 21] = "x21";
    Regs[Regs["x22"] = 22] = "x22";
    Regs[Regs["x23"] = 23] = "x23";
    Regs[Regs["x24"] = 24] = "x24";
    Regs[Regs["x25"] = 25] = "x25";
    Regs[Regs["x26"] = 26] = "x26";
    Regs[Regs["x27"] = 27] = "x27";
    Regs[Regs["x28"] = 28] = "x28";
    Regs[Regs["x29"] = 29] = "x29";
    Regs[Regs["x30"] = 30] = "x30";
    Regs[Regs["x31"] = 31] = "x31";
    Regs[Regs["pc"] = 32] = "pc";
    Regs[Regs["ppc"] = 33] = "ppc"; // previous pc
})(Regs || (Regs = {}));
export var Opcode;
(function (Opcode) {
    Opcode[Opcode["LOAD"] = 3] = "LOAD";
    Opcode[Opcode["STORE"] = 35] = "STORE";
    Opcode[Opcode["MADD"] = 67] = "MADD";
    Opcode[Opcode["BRANCH"] = 99] = "BRANCH";
    Opcode[Opcode["LOAD_FP"] = 7] = "LOAD_FP";
    Opcode[Opcode["STORE_FP"] = 39] = "STORE_FP";
    Opcode[Opcode["MSUB"] = 71] = "MSUB";
    Opcode[Opcode["JALR"] = 103] = "JALR";
    // custom-0: 0b00_010_11
    // custom-1: 0b01_010_11
    Opcode[Opcode["NMSUB"] = 75] = "NMSUB";
    // reserved: 0b11_010_11
    Opcode[Opcode["MISC_MEM"] = 15] = "MISC_MEM";
    Opcode[Opcode["AMO"] = 47] = "AMO";
    Opcode[Opcode["NMADD"] = 79] = "NMADD";
    Opcode[Opcode["JAL"] = 111] = "JAL";
    Opcode[Opcode["OP_IMM"] = 19] = "OP_IMM";
    Opcode[Opcode["OP"] = 51] = "OP";
    Opcode[Opcode["OP_FP"] = 83] = "OP_FP";
    Opcode[Opcode["SYSTEM"] = 115] = "SYSTEM";
    Opcode[Opcode["AUIPC"] = 23] = "AUIPC";
    Opcode[Opcode["LUI"] = 55] = "LUI";
    // reserved: 0b10_101_11
    // reserved: 0b11_101_11
    Opcode[Opcode["OP_IMM_32"] = 27] = "OP_IMM_32";
    Opcode[Opcode["OP_32"] = 59] = "OP_32";
    // custom-2/rv128: 0b10_110_11
    // custom-3/rv128: 0b11_110_11
    // inst[4:2] = 111 (> 32b)
    // inst[6:5] = 00 (48b)
    // inst[6:5] = 01 (64b)
    // inst[6:5] = 10 (48b)
    // inst[6:5] = 11 (>= 80b)
})(Opcode || (Opcode = {}));
export class Vcore {
    mem;
    vnum;
    ialign;
    ialignByte; // IALIGN/8
    ilen;
    ilenByte; // ILEN/8
    constructor(mem, vnum, ialign, ilen) {
        this.mem = mem;
        this.vnum = vnum;
        this.ialign = ialign;
        this.ilen = ilen;
        this.ialignByte = this.ialign / 8;
        this.ilenByte = this.ilen / 8;
    }
    // Register value //
    setRegisterValue(regnum, value, counter = false) {
        if (!counter && ((regnum === Regs.pc) || (regnum === Regs.ppc))) {
            throw Error('set-access to counters');
        }
        else if (regnum === Regs.x0) {
            return;
        }
        const i32arr = new Int32Array(this.mem.buffer);
        const regOffset = this.mem.mrcount * this.vnum;
        i32arr[(i32arr.length - 1) - (regOffset + regnum)] = value;
    }
    getRegisterValue(regnum, counter = false) {
        if (!counter && ((regnum === Regs.pc) || (regnum === Regs.ppc))) {
            throw Error('get-access to counters');
        }
        else if (regnum === Regs.x0) {
            return 0;
        }
        const i32arr = new Int32Array(this.mem.buffer);
        const regOffset = this.mem.mrcount * this.vnum;
        const value = i32arr[(i32arr.length - 1) - (regOffset + regnum)];
        if (value === undefined) {
            throw Error('value === undefined');
        }
        return value;
    }
    // Fetcher //
    fetchInstruction() {
        const pcValue = this.getRegisterValue(Regs.pc, true);
        const ppcValue = this.getRegisterValue(Regs.ppc, true);
        if ((pcValue % 4) !== 0) {
            this.throwInstructionAddressMisalignedException(pcValue, ppcValue);
            return;
        }
        this.setRegisterValue(Regs.ppc, this.getRegisterValue(Regs.pc, true), true);
        const byte1 = (this.mem.getByte(this.getRegisterValue(Regs.pc, true)) * (2 ** 0)) >>> 0;
        this.setRegisterValue(Regs.pc, this.getRegisterValue(Regs.pc, true) + 1, true);
        const byte2 = (this.mem.getByte(this.getRegisterValue(Regs.pc, true)) * (2 ** 8)) >>> 0;
        this.setRegisterValue(Regs.pc, this.getRegisterValue(Regs.pc, true) + 1, true);
        const byte3 = (this.mem.getByte(this.getRegisterValue(Regs.pc, true)) * (2 ** 16)) >>> 0;
        this.setRegisterValue(Regs.pc, this.getRegisterValue(Regs.pc, true) + 1, true);
        const byte4 = (this.mem.getByte(this.getRegisterValue(Regs.pc, true)) * (2 ** 24)) >>> 0;
        this.setRegisterValue(Regs.pc, this.getRegisterValue(Regs.pc, true) + 1, true);
        const instruction = (0 | byte1 | byte2 | byte3 | byte4) >>> 0;
        const opcode = instruction & 0b00000000000000000000000001111111;
        if (opcode === Opcode.OP_IMM) {
            // Integer Register-Immediate Instructions
            const rd = (instruction >>> 7) & 0b11111;
            const rs1 = (instruction >>> 15) & 0b11111;
            const funct3 = (instruction >>> 12) & 0b111;
            if (funct3 === 0b000) {
                // ADDI; NOP (ADDI x0, x0, 0)
                // rd = rs1 = rs1 + imm
                const immValue = this.iimmToValue(instruction) >> 0;
                this.setRegisterValue(rs1, this.getRegisterValue(rs1) + immValue);
                this.setRegisterValue(rd, this.getRegisterValue(rs1));
            }
            else if (funct3 === 0b010) {
                // SLTI
                // if (rs1 < imm) {rd = 1} else {rd = 0}
                const immValue = this.iimmToValue(instruction) >> 0;
                let result = 0;
                if (this.getRegisterValue(rs1) < immValue) {
                    result = 1;
                }
                else {
                    result = 0;
                }
                this.setRegisterValue(rd, result);
            }
            else if (funct3 === 0b011) {
                // SLTIU
                // if ((rs1>>>0) < (imm>>>0)) {rd = 1} else {rd = 0}
                const immValue = this.iimmToValue(instruction);
                let result = 0;
                if ((this.getRegisterValue(rs1) >>> 0) < (immValue >>> 0)) {
                    result = 1;
                }
                else {
                    result = 0;
                }
                this.setRegisterValue(rd, result);
            }
            else if (funct3 === 0b111) {
                // ANDI
                // rd = rs1 AND imm
                const immValue = this.iimmToValue(instruction);
                this.setRegisterValue(rd, this.getRegisterValue(rs1) & immValue);
            }
            else if (funct3 === 0b110) {
                // ORI
                // rd = rs1 OR imm
                const immValue = this.iimmToValue(instruction);
                this.setRegisterValue(rd, this.getRegisterValue(rs1) | immValue);
            }
            else if (funct3 === 0b100) {
                // XORI
                // rd = rs1 XOR imm
                const immValue = this.iimmToValue(instruction);
                this.setRegisterValue(rd, this.getRegisterValue(rs1) ^ immValue);
            }
            else if (funct3 === 0b001) {
                // SLLI
                // rd = rs1 << (imm & 0b11111)
                const immValue = this.iimmToValue(instruction);
                const shamt = immValue & 0b11111;
                this.setRegisterValue(rd, this.getRegisterValue(rs1) * (2 ** shamt));
            }
            else if (funct3 === 0b101) {
                const immValue = this.iimmToValue(instruction);
                const shamt = immValue & 0b11111;
                const shiftType = immValue & 0b010000000000;
                if (shiftType === 0) {
                    // SRLI
                    // rd = rs1 >>> shamt
                    this.setRegisterValue(rd, this.getRegisterValue(rs1) >>> shamt);
                }
                else if (shiftType === 0b010000000000) {
                    // SRAI
                    // rd = rs1 >> shamt
                    this.setRegisterValue(rd, this.getRegisterValue(rs1) >> shamt);
                }
                else {
                    let instructionBinary = (instruction >>> 0).toString(2);
                    instructionBinary = instructionBinary.padStart(this.ilen, '0');
                    this.throwIllegalInstructionException(instructionBinary);
                }
            }
            else {
                let instructionBinary = (instruction >>> 0).toString(2);
                instructionBinary = instructionBinary.padStart(this.ilen, '0');
                this.throwIllegalInstructionException(instructionBinary);
            }
        }
        else if (opcode === Opcode.LUI) {
            // LUI
            // rd = imm & 0b11111111111111111111000000000000
            const rd = (instruction >>> 7) & 0b11111;
            const immValue = this.uimmToValue(instruction) >> 0;
            this.setRegisterValue(rd, immValue);
        }
        else if (opcode === Opcode.AUIPC) {
            // AUIPC
            // rd = imm + ppc
            const rd = (instruction >>> 7) & 0b11111;
            const immValue = this.uimmToValue(instruction) >> 0;
            this.setRegisterValue(rd, (immValue + this.getRegisterValue(Regs.ppc, true)));
        }
        else if (opcode === Opcode.OP) {
            // Integer Register-Register Operations
            const rd = (instruction >>> 7) & 0b11111;
            const rs1 = (instruction >>> 15) & 0b11111;
            const rs2 = (instruction >>> 20) & 0b11111;
            const funct3 = (instruction >>> 12) & 0b111;
            const funct7 = (instruction >>> 25) & 0b1111111;
            if (funct7 === 0) {
                if (funct3 === 0b000) {
                    // ADD
                    // rd = rs1 + rs2
                    const result = this.getRegisterValue(rs1) + this.getRegisterValue(rs2);
                    this.setRegisterValue(rd, result);
                }
                else if (funct3 === 0b010) {
                    // SLT
                    // rd = 1 if (rs1 < rs2) else 0
                    let result = 0;
                    if (this.getRegisterValue(rs1) < this.getRegisterValue(rs2)) {
                        result = 1;
                    }
                    else {
                        result = 0;
                    }
                    this.setRegisterValue(rd, result);
                }
                else if (funct3 === 0b011) {
                    // SLTU
                    // rd = 1 if ((rs1>>>0) < (rs2>>>0)) else 0
                    let result = 0;
                    if ((this.getRegisterValue(rs1) >>> 0) < (this.getRegisterValue(rs2) >>> 0)) {
                        result = 1;
                    }
                    else {
                        result = 0;
                    }
                    this.setRegisterValue(rd, result);
                }
                else if (funct3 === 0b111) {
                    // AND
                    // rd = rs1 & rs2
                    const result = this.getRegisterValue(rs1) & this.getRegisterValue(rs2);
                    this.setRegisterValue(rd, result);
                }
                else if (funct3 === 0b110) {
                    // OR
                    // rd = rs1 | rs2
                    const result = this.getRegisterValue(rs1) | this.getRegisterValue(rs2);
                    this.setRegisterValue(rd, result);
                }
                else if (funct3 === 0b100) {
                    // XOR
                    // rd = rs1 ^ rs2
                    const result = this.getRegisterValue(rs1) ^ this.getRegisterValue(rs2);
                    this.setRegisterValue(rd, result);
                }
                else if (funct3 === 0b001) {
                    // SLL
                    // rd = rs1 << (rs2 & 0b11111)
                    const result = this.getRegisterValue(rs1) * (2 ** (this.getRegisterValue(rs2) & 0b11111));
                    this.setRegisterValue(rd, result);
                }
                else if (funct3 === 0b101) {
                    // SRL
                    // rd = rs1 >>> (rs2 & 0b11111)
                    const result = this.getRegisterValue(rs1) >>> (this.getRegisterValue(rs2) & 0b11111);
                    this.setRegisterValue(rd, result);
                }
                else {
                    let instructionBinary = (instruction >>> 0).toString(2);
                    instructionBinary = instructionBinary.padStart(this.ilen, '0');
                    this.throwIllegalInstructionException(instructionBinary);
                }
            }
            else if (funct7 === 0b0100000) {
                if (funct3 === 0b000) {
                    // SUB
                    // rd = rs1 - rs2
                    const result = this.getRegisterValue(rs1) - this.getRegisterValue(rs2);
                    this.setRegisterValue(rd, result);
                }
                else if (funct3 === 0b101) {
                    // SRA
                    // rd = rs1 >> (rs2 & 0b11111)
                    const result = this.getRegisterValue(rs1) >> (this.getRegisterValue(rs2) & 0b11111);
                    this.setRegisterValue(rd, result);
                }
                else {
                    let instructionBinary = (instruction >>> 0).toString(2);
                    instructionBinary = instructionBinary.padStart(this.ilen, '0');
                    this.throwIllegalInstructionException(instructionBinary);
                }
            }
            else {
                let instructionBinary = (instruction >>> 0).toString(2);
                instructionBinary = instructionBinary.padStart(this.ilen, '0');
                this.throwIllegalInstructionException(instructionBinary);
            }
        }
        else if (opcode === Opcode.JAL) {
            // Control Transfer Instructions
            // Unconditional Jumps
            // JAL
            // rd = pc
            // pc = ppc + imm
            const rd = (instruction >>> 7) & 0b11111;
            const immValue = this.jimmToValue(instruction) >> 0;
            this.setRegisterValue(rd, this.getRegisterValue(Regs.pc, true));
            this.setRegisterValue(Regs.pc, this.getRegisterValue(Regs.ppc, true) + immValue, true);
        }
        else if (opcode === Opcode.JALR) {
            // JALR
            // rd = pc
            // pc = ppc + (0b11111111111111111111111111111110 & (rs1 + imm))
            const rd = (instruction >>> 7) & 0b11111;
            const rs1 = (instruction >>> 15) & 0b11111;
            const funct3 = (instruction >>> 12) & 0b111;
            if (funct3 === 0b000) {
                const immValue = this.iimmToValue(instruction) >> 0;
                let result = this.getRegisterValue(rs1) + immValue;
                result &= 0b11111111111111111111111111111110;
                result += this.getRegisterValue(Regs.ppc, true);
                this.setRegisterValue(rd, this.getRegisterValue(Regs.pc, true));
                this.setRegisterValue(Regs.pc, result, true);
            }
            else {
                let instructionBinary = (instruction >>> 0).toString(2);
                instructionBinary = instructionBinary.padStart(this.ilen, '0');
                this.throwIllegalInstructionException(instructionBinary);
            }
        }
        else if (opcode === Opcode.BRANCH) {
            // Conditional Branches
            // branch: pc = ppc + imm
            const rs1 = (instruction >>> 15) & 0b11111;
            const rs2 = (instruction >>> 20) & 0b11111;
            const funct3 = (instruction >>> 12) & 0b111;
            const immValue = this.bimmToValue(instruction) >>> 0;
            if (funct3 === 0b000) {
                // BEQ
                // if (rs1 === rs2) {branch}
                if (this.getRegisterValue(rs1) === this.getRegisterValue(rs2)) {
                    const adr = this.getRegisterValue(Regs.ppc, true) + immValue;
                    this.setRegisterValue(Regs.pc, adr, true);
                }
            }
            else if (funct3 === 0b001) {
                // BNE
                // if (rs1 !== rs2) {branch}
                if (this.getRegisterValue(rs1) !== this.getRegisterValue(rs2)) {
                    const adr = this.getRegisterValue(Regs.ppc, true) + immValue;
                    this.setRegisterValue(Regs.pc, adr, true);
                }
            }
            else if (funct3 === 0b100) {
                // BLT
                // if (rs1 < rs2) {branch}
                if (this.getRegisterValue(rs1) < this.getRegisterValue(rs2)) {
                    const adr = this.getRegisterValue(Regs.ppc, true) + immValue;
                    this.setRegisterValue(Regs.pc, adr, true);
                }
            }
            else if (funct3 === 0b110) {
                // BLTU
                // if ((rs1>>>0) < (rs2>>>0)) {branch}
                if ((this.getRegisterValue(rs1) >>> 0) < (this.getRegisterValue(rs2) >>> 0)) {
                    const adr = this.getRegisterValue(Regs.ppc, true) + immValue;
                    this.setRegisterValue(Regs.pc, adr, true);
                }
            }
            else if (funct3 === 0b101) {
                // BGE
                // if (rs1 >= rs2) {branch}
                if (this.getRegisterValue(rs1) >= this.getRegisterValue(rs2)) {
                    const adr = this.getRegisterValue(Regs.ppc, true) + immValue;
                    this.setRegisterValue(Regs.pc, adr, true);
                }
            }
            else if (funct3 === 0b111) {
                // BGEU
                // if ((rs1>>>0) >= (rs2>>>0)) {branch}
                if ((this.getRegisterValue(rs1) >>> 0) >= (this.getRegisterValue(rs2) >>> 0)) {
                    const adr = this.getRegisterValue(Regs.ppc, true) + immValue;
                    this.setRegisterValue(Regs.pc, adr, true);
                }
            }
            else {
                let instructionBinary = (instruction >>> 0).toString(2);
                instructionBinary = instructionBinary.padStart(this.ilen, '0');
                this.throwIllegalInstructionException(instructionBinary);
            }
        }
        else if (opcode === Opcode.LOAD) {
            // Load and Store Instructions
            // adr = rs1 + imm
            const rd = (instruction >>> 7) & 0b11111;
            if (rd === Regs.x0) {
                let instructionBinary = (instruction >>> 0).toString(2);
                instructionBinary = instructionBinary.padStart(this.ilen, '0');
                this.throwIllegalInstructionException(instructionBinary);
            }
            const rs1 = (instruction >>> 15) & 0b11111;
            const funct3 = (instruction >>> 12) & 0b111;
            const immValue = this.iimmToValue(instruction) >> 0;
            const adr = this.getRegisterValue(rs1) + immValue;
            if (funct3 === 0b000) {
                // LB
                // rd = signExt(mem[adr])
                const memData = this.mem.getByte(adr);
                this.setRegisterValue(rd, memData);
            }
            else if (funct3 === 0b001) {
                // LH
                // rd = signExt(mem[adr..adr+1])
                let memData = this.mem.getByte(adr);
                memData |= this.mem.getByte(adr + 1) * (2 ** 8);
                if (((this.mem.getByte(adr + 1) >>> 7) & 0b1) === 0b1) {
                    memData |= 0b11111111111111110000000000000000;
                }
                else {
                    memData &= 0b00000000000000001111111111111111;
                }
                this.setRegisterValue(rd, memData);
            }
            else if (funct3 === 0b010) {
                // LW
                // rd = signExt(mem[adr..adr+3])
                let memData = this.mem.getByte(adr);
                memData |= this.mem.getByte(adr + 1) * (2 ** 8);
                memData |= this.mem.getByte(adr + 2) * (2 ** 16);
                memData |= this.mem.getByte(adr + 3) * (2 ** 24);
                this.setRegisterValue(rd, memData);
            }
            else if (funct3 === 0b100) {
                // LBU
                // rd = zeroExt(mem[adr])
                const memData = (this.mem.getByte(adr) >>> 0);
                this.setRegisterValue(rd, memData);
            }
            else if (funct3 === 0b101) {
                // LHU
                // rd = zeroExt(mem[adr..adr+1])
                let memData = (this.mem.getByte(adr)) >>> 0;
                memData |= (this.mem.getByte(adr + 1) * (2 ** 8)) >>> 0;
                memData >>>= 0;
                this.setRegisterValue(rd, memData);
            }
            else {
                let instructionBinary = (instruction >>> 0).toString(2);
                instructionBinary = instructionBinary.padStart(this.ilen, '0');
                this.throwIllegalInstructionException(instructionBinary);
            }
        }
        else if (opcode === Opcode.STORE) {
            const rs1 = (instruction >>> 15) & 0b11111;
            const rs2 = (instruction >>> 20) & 0b11111;
            const funct3 = (instruction >>> 12) & 0b111;
            const immValue = this.simmToValue(instruction) >> 0;
            const adr = this.getRegisterValue(rs1) + immValue;
            if (funct3 === 0b000) {
                // SB
                // mem[adr] = rs2[0]
                this.mem.setByte(adr, this.getRegisterValue(rs2));
            }
            else if (funct3 === 0b001) {
                // SH
                // mem[adr..adr+1] = rs2[0..1]
                this.mem.setByte(adr + 0, this.getRegisterValue(rs2));
                this.mem.setByte(adr + 1, this.getRegisterValue(rs2) >> 8);
            }
            else if (funct3 === 0b010) {
                // SW
                // mem[adr..adr+3] = rs2[0..3]
                this.mem.setByte(adr + 0, this.getRegisterValue(rs2));
                this.mem.setByte(adr + 1, this.getRegisterValue(rs2) >> 8);
                this.mem.setByte(adr + 2, this.getRegisterValue(rs2) >> 16);
                this.mem.setByte(adr + 3, this.getRegisterValue(rs2) >> 24);
            }
            else {
                let instructionBinary = (instruction >>> 0).toString(2);
                instructionBinary = instructionBinary.padStart(this.ilen, '0');
                this.throwIllegalInstructionException(instructionBinary);
            }
        }
        else if (opcode === Opcode.MISC_MEM) {
            // Memory Ordering Instructions
            const funct3 = (instruction >>> 12) & 0b111;
            if (funct3 === 0b000) {
                // FENCE = NOP
            }
            else {
                let instructionBinary = (instruction >>> 0).toString(2);
                instructionBinary = instructionBinary.padStart(this.ilen, '0');
                this.throwIllegalInstructionException(instructionBinary);
            }
        }
        else if (opcode === Opcode.SYSTEM) {
            // Environment Call and Breakpoints
            const rd = (instruction >>> 7) & 0b11111;
            const rs1 = (instruction >>> 15) & 0b11111;
            const funct3 = (instruction >>> 12) & 0b111;
            const funct12 = (instruction >>> 20) & 0b111111111111;
            if ((rd !== 0) || (rs1 !== 0) || (funct3 !== 0)) {
                let instructionBinary = (instruction >>> 0).toString(2);
                instructionBinary = instructionBinary.padStart(this.ilen, '0');
                this.throwIllegalInstructionException(instructionBinary);
            }
            if (funct12 === 0) {
                // ECALL
                throw Error('ECALL');
            }
            else if (funct12 === 1) {
                // EBREAK
                throw Error('EBREAK');
            }
            else {
                let instructionBinary = (instruction >>> 0).toString(2);
                instructionBinary = instructionBinary.padStart(this.ilen, '0');
                this.throwIllegalInstructionException(instructionBinary);
            }
        }
        else {
            let instructionBinary = (instruction >>> 0).toString(2);
            instructionBinary = instructionBinary.padStart(this.ilen, '0');
            this.throwIllegalInstructionException(instructionBinary);
        }
    }
    // Immediates //
    // I-immediate
    valueToIimm(value) {
        const part1 = (value * (2 ** 20)) & 0b00000000000100000000000000000000;
        const part2 = (value * (2 ** 20)) & 0b00000001111000000000000000000000;
        const part3 = (value * (2 ** 20)) & 0b01111110000000000000000000000000;
        const part4 = value & 0b10000000000000000000000000000000;
        const imm = 0 | part1 | part2 | part3 | part4;
        return imm;
    }
    iimmToValue(instruction) {
        const part1 = (instruction >>> 20) & 0b00000000000000000000000000000001;
        const part2 = (instruction >>> 20) & 0b00000000000000000000000000011110;
        const part3 = (instruction >>> 20) & 0b00000000000000000000011111100000;
        let part4 = 0;
        const sign = (instruction & 0b10000000000000000000000000000000) >>> 0;
        if (sign === 0b10000000000000000000000000000000) {
            part4 = 0b11111111111111111111100000000000;
        }
        else {
            part4 = 0b00000000000000000000000000000000;
        }
        const value = 0 | part1 | part2 | part3 | part4;
        return value;
    }
    // S-immediate
    valueToSimm(value) {
        const part1 = (value * (2 ** 7)) & 0b00000000000000000000000010000000;
        const part2 = (value * (2 ** 7)) & 0b00000000000000000000111100000000;
        const part3 = (value * (2 ** (7 + 13))) & 0b01111110000000000000000000000000;
        const part4 = value & 0b10000000000000000000000000000000;
        const imm = 0 | part1 | part2 | part3 | part4;
        return imm;
    }
    simmToValue(instruction) {
        const part1 = (instruction >>> 7) & 0b00000000000000000000000000000001;
        const part2 = (instruction >>> 7) & 0b00000000000000000000000000011110;
        const part3 = (instruction >>> (7 + 13)) & 0b00000000000000000000011111100000;
        let part4 = 0;
        const sign = (instruction & 0b10000000000000000000000000000000) >>> 0;
        if (sign === 0b10000000000000000000000000000000) {
            part4 = 0b11111111111111111111100000000000;
        }
        else {
            part4 = 0b00000000000000000000000000000000;
        }
        const value = 0 | part1 | part2 | part3 | part4;
        return value;
    }
    // B-immediate
    valueToBimm(value) {
        const part1 = 0;
        const part2 = (value * (2 ** 7)) & 0b00000000000000000000111100000000;
        const part3 = (value * (2 ** (7 + 13))) & 0b01111110000000000000000000000000;
        const part4 = (value >>> 4) & 0b00000000000000000000000010000000;
        const part5 = value & 0b10000000000000000000000000000000;
        const imm = 0 | part1 | part2 | part3 | part4 | part5;
        return imm;
    }
    bimmToValue(instruction) {
        const part1 = 0;
        const part2 = (instruction >>> 7) & 0b00000000000000000000000000011110;
        const part3 = (instruction >>> (7 + 13)) & 0b00000000000000000000011111100000;
        const part4 = (instruction * (2 ** 4)) & 0b00000000000000000000100000000000;
        let part5 = 0;
        const sign = (instruction & 0b10000000000000000000000000000000) >>> 0;
        if (sign === 0b10000000000000000000000000000000) {
            part5 = 0b11111111111111111111000000000000;
        }
        else {
            part5 = 0b00000000000000000000000000000000;
        }
        const value = 0 | part1 | part2 | part3 | part4 | part5;
        return value;
    }
    // U-immediate
    valueToUimm(value) {
        const part1 = 0;
        const part2 = value & 0b00000000000011111111000000000000;
        const part3 = value & 0b01111111111100000000000000000000;
        const part4 = value & 0b10000000000000000000000000000000;
        const imm = 0 | part1 | part2 | part3 | part4;
        return imm;
    }
    uimmToValue(instruction) {
        const part1 = 0;
        const part2 = instruction & 0b00000000000011111111000000000000;
        const part3 = instruction & 0b01111111111100000000000000000000;
        let part4 = 0;
        const sign = (instruction & 0b10000000000000000000000000000000) >>> 0;
        if (sign === 0b10000000000000000000000000000000) {
            part4 = 0b10000000000000000000000000000000;
        }
        else {
            part4 = 0b00000000000000000000000000000000;
        }
        const value = 0 | part1 | part2 | part3 | part4;
        return value;
    }
    // J-immediate
    valueToJimm(value) {
        const part1 = 0;
        const part2 = (value * (2 ** 20)) & 0b00000001111000000000000000000000;
        const part3 = (value * (2 ** 20)) & 0b01111110000000000000000000000000;
        const part4 = (value * (2 ** 9)) & 0b00000000000100000000000000000000;
        const part5 = value & 0b00000000000011111111000000000000;
        const part6 = value & 0b10000000000000000000000000000000;
        const imm = 0 | part1 | part2 | part3 | part4 | part5 | part6;
        return imm;
    }
    jimmToValue(instruction) {
        const part1 = 0;
        const part2 = (instruction >>> 20) & 0b00000000000000000000000000011110;
        const part3 = (instruction >>> 20) & 0b00000000000000000000011111100000;
        const part4 = (instruction >>> 9) & 0b00000000000000000000100000000000;
        const part5 = instruction & 0b00000000000011111111000000000000;
        let part6 = 0;
        const sign = (instruction & 0b10000000000000000000000000000000) >>> 0;
        if (sign === 0b10000000000000000000000000000000) {
            part6 = 0b11111111111100000000000000000000;
        }
        else {
            part6 = 0b00000000000000000000000000000000;
        }
        const value = 0 | part1 | part2 | part3 | part4 | part5 | part6;
        return value;
    }
    // Exceptions //
    throwInstructionAddressMisalignedException(pcValue, ppcValue) {
        // fatal trap
        const info = ':pc:' + pcValue.toString() + ':ppc:' + ppcValue.toString();
        throw Error('exception:instruction-address-misaligned' + info);
    }
    throwIllegalInstructionException(instruction) {
        // fatal trap
        throw new Error('exception:illegal-instruction:' + instruction);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmNvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdmNvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsTUFBTSxDQUFOLElBQVksSUFtQ1g7QUFuQ0QsV0FBWSxJQUFJO0lBQ2QsMkJBQUUsQ0FBQTtJQUNGLDJCQUFFLENBQUE7SUFDRiwyQkFBRSxDQUFBO0lBQ0YsMkJBQUUsQ0FBQTtJQUNGLDJCQUFFLENBQUE7SUFDRiwyQkFBRSxDQUFBO0lBQ0YsMkJBQUUsQ0FBQTtJQUNGLDJCQUFFLENBQUE7SUFDRiwyQkFBRSxDQUFBO0lBQ0YsMkJBQUUsQ0FBQTtJQUNGLDhCQUFHLENBQUE7SUFDSCw4QkFBRyxDQUFBO0lBQ0gsOEJBQUcsQ0FBQTtJQUNILDhCQUFHLENBQUE7SUFDSCw4QkFBRyxDQUFBO0lBQ0gsOEJBQUcsQ0FBQTtJQUNILDhCQUFHLENBQUE7SUFDSCw4QkFBRyxDQUFBO0lBQ0gsOEJBQUcsQ0FBQTtJQUNILDhCQUFHLENBQUE7SUFDSCw4QkFBRyxDQUFBO0lBQ0gsOEJBQUcsQ0FBQTtJQUNILDhCQUFHLENBQUE7SUFDSCw4QkFBRyxDQUFBO0lBQ0gsOEJBQUcsQ0FBQTtJQUNILDhCQUFHLENBQUE7SUFDSCw4QkFBRyxDQUFBO0lBQ0gsOEJBQUcsQ0FBQTtJQUNILDhCQUFHLENBQUE7SUFDSCw4QkFBRyxDQUFBO0lBQ0gsOEJBQUcsQ0FBQTtJQUNILDhCQUFHLENBQUE7SUFDSCw0QkFBRSxDQUFBO0lBQ0YsOEJBQUcsQ0FBQSxDQUFDLGNBQWM7QUFDcEIsQ0FBQyxFQW5DVyxJQUFJLEtBQUosSUFBSSxRQW1DZjtBQUVELE1BQU0sQ0FBTixJQUFZLE1BeUNYO0FBekNELFdBQVksTUFBTTtJQUNoQixtQ0FBa0IsQ0FBQTtJQUNsQixzQ0FBbUIsQ0FBQTtJQUNuQixvQ0FBa0IsQ0FBQTtJQUNsQix3Q0FBb0IsQ0FBQTtJQUVwQix5Q0FBcUIsQ0FBQTtJQUNyQiw0Q0FBc0IsQ0FBQTtJQUN0QixvQ0FBa0Is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QUssR0FBRyxLQUFLLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUMvRCxPQUFPLEtBQUssQ0FBQTtJQUNkLENBQUM7SUFFRCxnQkFBZ0I7SUFFaEIsMENBQTBDLENBQUUsT0FBZSxFQUFFLFFBQWdCO1FBQzNFLGFBQWE7UUFDYixNQUFNLElBQUksR0FBRyxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLE9BQU8sR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDeEUsTUFBTSxLQUFLLENBQUMsMENBQTBDLEdBQUcsSUFBSSxDQUFDLENBQUE7SUFDaEUsQ0FBQztJQUVELGdDQUFnQyxDQUFFLFdBQW1CO1FBQ25ELGFBQWE7UUFDYixNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxHQUFHLFdBQVcsQ0FBQyxDQUFBO0lBQ2pFLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG1lbW9yeSBmcm9tICcuL21lbW9yeS5qcydcbmltcG9ydCAqIGFzIGNvbW1vbiBmcm9tICcuL2NvbW1vbi5qcydcblxuZXhwb3J0IGVudW0gUmVncyB7XG4gIHgwLFxuICB4MSxcbiAgeDIsXG4gIHgzLFxuICB4NCxcbiAgeDUsXG4gIHg2LFxuICB4NyxcbiAgeDgsXG4gIHg5LFxuICB4MTAsXG4gIHgxMSxcbiAgeDEyLFxuICB4MTMsXG4gIHgxNCxcbiAgeDE1LFxuICB4MTYsXG4gIHgxNyxcbiAgeDE4LFxuICB4MTksXG4gIHgyMCxcbiAgeDIxLFxuICB4MjIsXG4gIHgyMyxcbiAgeDI0LFxuICB4MjUsXG4gIHgyNixcbiAgeDI3LFxuICB4MjgsXG4gIHgyOSxcbiAgeDMwLFxuICB4MzEsXG4gIHBjLFxuICBwcGMgLy8gcHJldmlvdXMgcGNcbn1cblxuZXhwb3J0IGVudW0gT3Bjb2RlIHtcbiAgTE9BRCA9IDBiMDBfMDAwXzExLFxuICBTVE9SRSA9IDBiMDFfMDAwXzExLFxuICBNQUREID0gMGIxMF8wMDBfMTEsXG4gIEJSQU5DSCA9IDBiMTFfMDAwXzExLFxuXG4gIExPQURfRlAgPSAwYjAwXzAwMV8xMSxcbiAgU1RPUkVfRlAgPSAwYjAxXzAwMV8xMSxcbiAgTVNVQiA9IDBiMTBfMDAxXzExLFxuICBKQUxSID0gMGIxMV8wMDFfMTEsXG5cbiAgLy8gY3VzdG9tLTA6IDBiMDBfMDEwXzExXG4gIC8vIGN1c3RvbS0xOiAwYjAxXzAxMF8xMVxuICBOTVNVQiA9IDBiMTBfMDEwXzExLFxuICAvLyByZXNlcnZlZDogMGIxMV8wMTBfMTFcblxuICBNSVNDX01FTSA9IDBiMDBfMDExXzExLFxuICBBTU8gPSAwYjAxXzAxMV8xMSxcbiAgTk1BREQgPSAwYjEwXzAxMV8xMSxcbiAgSkFMID0gMGIxMV8wMTFfMTEsXG5cbiAgT1BfSU1NID0gMGIwMF8xMDBfMTEsXG4gIE9QID0gMGIwMV8xMDBfMTEsXG4gIE9QX0ZQID0gMGIxMF8xMDBfMTEsXG4gIFNZU1RFTSA9IDBiMTFfMTAwXzExLFxuXG4gIEFVSVBDID0gMGIwMF8xMDFfMTEsXG4gIExVSSA9IDBiMDFfMTAxXzExLFxuICAvLyByZXNlcnZlZDogMGIxMF8xMDFfMTFcbiAgLy8gcmVzZXJ2ZWQ6IDBiMTFfMTAxXzExXG5cbiAgT1BfSU1NXzMyID0gMGIwMF8xMTBfMTEsXG4gIE9QXzMyID0gMGIwMV8xMTBfMTFcbiAgLy8gY3VzdG9tLTIvcnYxMjg6IDBiMTBfMTEwXzExXG4gIC8vIGN1c3RvbS0zL3J2MTI4OiAwYjExXzExMF8xMVxuXG4gIC8vIGluc3RbNDoyXSA9IDExMSAoPiAzMmIpXG4gIC8vIGluc3RbNjo1XSA9IDAwICg0OGIpXG4gIC8vIGluc3RbNjo1XSA9IDAxICg2NGIpXG4gIC8vIGluc3RbNjo1XSA9IDEwICg0OGIpXG4gIC8vIGluc3RbNjo1XSA9IDExICg+PSA4MGIpXG59XG5cbmV4cG9ydCBjbGFzcyBWY29yZSB7XG4gIHJlYWRvbmx5IG1lbTogbWVtb3J5Lk1lbW9yeVxuICByZWFkb25seSB2bnVtOiBjb21tb24uVm51bVxuICByZWFkb25seSBpYWxpZ246IGNvbW1vbi5JYWxpZ25cbiAgcmVhZG9ubHkgaWFsaWduQnl0ZTogbnVtYmVyIC8vIElBTElHTi84XG4gIHJlYWRvbmx5IGlsZW46IGNvbW1vbi5JbGVuXG4gIHJlYWRvbmx5IGlsZW5CeXRlOiBudW1iZXIgLy8gSUxFTi84XG5cbiAgY29uc3RydWN0b3IgKFxuICAgIG1lbTogbWVtb3J5Lk1lbW9yeSxcbiAgICB2bnVtOiBjb21tb24uVm51bSxcbiAgICBpYWxpZ246IGNvbW1vbi5JYWxpZ24sXG4gICAgaWxlbjogY29tbW9uLklsZW5cbiAgKSB7XG4gICAgdGhpcy5tZW0gPSBtZW1cbiAgICB0aGlzLnZudW0gPSB2bnVtXG4gICAgdGhpcy5pYWxpZ24gPSBpYWxpZ25cbiAgICB0aGlzLmlsZW4gPSBpbGVuXG5cbiAgICB0aGlzLmlhbGlnbkJ5dGUgPSB0aGlzLmlhbGlnbiAvIDhcbiAgICB0aGlzLmlsZW5CeXRlID0gdGhpcy5pbGVuIC8gOFxuICB9XG5cbiAgLy8gUmVnaXN0ZXIgdmFsdWUgLy9cblxuICBzZXRSZWdpc3RlclZhbHVlIChyZWdudW06IFJlZ3MsIHZhbHVlOiBudW1iZXIsIGNvdW50ZXIgPSBmYWxzZSk6IHZvaWQge1xuICAgIGlmICghY291bnRlciAmJiAoKHJlZ251bSA9PT0gUmVncy5wYykgfHwgKHJlZ251bSA9PT0gUmVncy5wcGMpKSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ3NldC1hY2Nlc3MgdG8gY291bnRlcnMnKVxuICAgIH0gZWxzZSBpZiAocmVnbnVtID09PSBSZWdzLngwKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgaTMyYXJyID0gbmV3IEludDMyQXJyYXkodGhpcy5tZW0uYnVmZmVyKVxuICAgIGNvbnN0IHJlZ09mZnNldCA9IHRoaXMubWVtLm1yY291bnQgKiB0aGlzLnZudW1cbiAgICBpMzJhcnJbKGkzMmFyci5sZW5ndGggLSAxKSAtIChyZWdPZmZzZXQgKyByZWdudW0pXSA9IHZhbHVlXG4gIH1cblxuICBnZXRSZWdpc3RlclZhbHVlIChyZWdudW06IFJlZ3MsIGNvdW50ZXIgPSBmYWxzZSk6IG51bWJlciB7XG4gICAgaWYgKCFjb3VudGVyICYmICgocmVnbnVtID09PSBSZWdzLnBjKSB8fCAocmVnbnVtID09PSBSZWdzLnBwYykpKSB7XG4gICAgICB0aHJvdyBFcnJvcignZ2V0LWFjY2VzcyB0byBjb3VudGVycycpXG4gICAgfSBlbHNlIGlmIChyZWdudW0gPT09IFJlZ3MueDApIHtcbiAgICAgIHJldHVybiAwXG4gICAgfVxuICAgIGNvbnN0IGkzMmFyciA9IG5ldyBJbnQzMkFycmF5KHRoaXMubWVtLmJ1ZmZlcilcbiAgICBjb25zdCByZWdPZmZzZXQgPSB0aGlzLm1lbS5tcmNvdW50ICogdGhpcy52bnVtXG4gICAgY29uc3QgdmFsdWUgPSBpMzJhcnJbKGkzMmFyci5sZW5ndGggLSAxKSAtIChyZWdPZmZzZXQgKyByZWdudW0pXVxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBFcnJvcigndmFsdWUgPT09IHVuZGVmaW5lZCcpXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgLy8gRmV0Y2hlciAvL1xuXG4gIGZldGNoSW5zdHJ1Y3Rpb24gKCk6IHZvaWQge1xuICAgIGNvbnN0IHBjVmFsdWUgPSB0aGlzLmdldFJlZ2lzdGVyVmFsdWUoUmVncy5wYywgdHJ1ZSlcbiAgICBjb25zdCBwcGNWYWx1ZSA9IHRoaXMuZ2V0UmVnaXN0ZXJWYWx1ZShSZWdzLnBwYywgdHJ1ZSlcbiAgICBpZiAoKHBjVmFsdWUgJSA0KSAhPT0gMCkge1xuICAgICAgdGhpcy50aHJvd0luc3RydWN0aW9uQWRkcmVzc01pc2FsaWduZWRFeGNlcHRpb24ocGNWYWx1ZSwgcHBjVmFsdWUpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLnNldFJlZ2lzdGVyVmFsdWUoUmVncy5wcGMsIHRoaXMuZ2V0UmVnaXN0ZXJWYWx1ZShSZWdzLnBjLCB0cnVlKSwgdHJ1ZSlcblxuICAgIGNvbnN0IGJ5dGUxID0gKHRoaXMubWVtLmdldEJ5dGUodGhpcy5nZXRSZWdpc3RlclZhbHVlKFJlZ3MucGMsIHRydWUpKSAqICgyICoqIDApKSA+Pj4gMFxuICAgIHRoaXMuc2V0UmVnaXN0ZXJWYWx1ZShSZWdzLnBjLCB0aGlzLmdldFJlZ2lzdGVyVmFsdWUoUmVncy5wYywgdHJ1ZSkgKyAxLCB0cnVlKVxuICAgIGNvbnN0IGJ5dGUyID0gKHRoaXMubWVtLmdldEJ5dGUodGhpcy5nZXRSZWdpc3RlclZhbHVlKFJlZ3MucGMsIHRydWUpKSAqICgyICoqIDgpKSA+Pj4gMFxuICAgIHRoaXMuc2V0UmVnaXN0ZXJWYWx1ZShSZWdzLnBjLCB0aGlzLmdldFJlZ2lzdGVyVmFsdWUoUmVncy5wYywgdHJ1ZSkgKyAxLCB0cnVlKVxuICAgIGNvbnN0IGJ5dGUzID0gKHRoaXMubWVtLmdldEJ5dGUodGhpcy5nZXRSZWdpc3RlclZhbHVlKFJlZ3MucGMsIHRydWUpKSAqICgyICoqIDE2KSkgPj4+IDBcbiAgICB0aGlzLnNldFJlZ2lzdGVyVmFsdWUoUmVncy5wYywgdGhpcy5nZXRSZWdpc3RlclZhbHVlKFJlZ3MucGMsIHRydWUpICsgMSwgdHJ1ZSlcbiAgICBjb25zdCBieXRlNCA9ICh0aGlzLm1lbS5nZXRCeXRlKHRoaXMuZ2V0UmVnaXN0ZXJWYWx1ZShSZWdzLnBjLCB0cnVlKSkgKiAoMiAqKiAyNCkpID4+PiAwXG4gICAgdGhpcy5zZXRSZWdpc3RlclZhbHVlKFJlZ3MucGMsIHRoaXMuZ2V0UmVnaXN0ZXJWYWx1ZShSZWdzLnBjLCB0cnVlKSArIDEsIHRydWUpXG4gICAgY29uc3QgaW5zdHJ1Y3Rpb24gPSAoMCB8IGJ5dGUxIHwgYnl0ZTIgfCBieXRlMyB8IGJ5dGU0KSA+Pj4gMFxuXG4gICAgY29uc3Qgb3Bjb2RlID0gaW5zdHJ1Y3Rpb24gJiAwYjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxMTExMTExXG4gICAgaWYgKG9wY29kZSA9PT0gT3Bjb2RlLk9QX0lNTSkge1xuICAgICAgLy8gSW50ZWdlciBSZWdpc3Rlci1JbW1lZGlhdGUgSW5zdHJ1Y3Rpb25zXG4gICAgICBjb25zdCByZCA9IChpbnN0cnVjdGlvbiA+Pj4gNykgJiAwYjExMTExXG4gICAgICBjb25zdCByczEgPSAoaW5zdHJ1Y3Rpb24gPj4+IDE1KSAmIDBiMTExMTFcbiAgICAgIGNvbnN0IGZ1bmN0MyA9IChpbnN0cnVjdGlvbiA+Pj4gMTIpICYgMGIxMTFcbiAgICAgIGlmIChmdW5jdDMgPT09IDBiMDAwKSB7XG4gICAgICAgIC8vIEFEREk7IE5PUCAoQURESSB4MCwgeDAsIDApXG4gICAgICAgIC8vIHJkID0gcnMxID0gcnMxICsgaW1tXG4gICAgICAgIGNvbnN0IGltbVZhbHVlID0gdGhpcy5paW1tVG9WYWx1ZShpbnN0cnVjdGlvbikgPj4gMFxuICAgICAgICB0aGlzLnNldFJlZ2lzdGVyVmFsdWUocnMxLCB0aGlzLmdldFJlZ2lzdGVyVmFsdWUocnMxKSArIGltbVZhbHVlKVxuICAgICAgICB0aGlzLnNldFJlZ2lzdGVyVmFsdWUocmQsIHRoaXMuZ2V0UmVnaXN0ZXJWYWx1ZShyczEpKVxuICAgICAgfSBlbHNlIGlmIChmdW5jdDMgPT09IDBiMDEwKSB7XG4gICAgICAgIC8vIFNMVElcbiAgICAgICAgLy8gaWYgKHJzMSA8IGltbSkge3JkID0gMX0gZWxzZSB7cmQgPSAwfVxuICAgICAgICBjb25zdCBpbW1WYWx1ZSA9IHRoaXMuaWltbVRvVmFsdWUoaW5zdHJ1Y3Rpb24pID4+IDBcbiAgICAgICAgbGV0IHJlc3VsdCA9IDBcbiAgICAgICAgaWYgKHRoaXMuZ2V0UmVnaXN0ZXJWYWx1ZShyczEpIDwgaW1tVmFsdWUpIHtcbiAgICAgICAgICByZXN1bHQgPSAxXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzdWx0ID0gMFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0UmVnaXN0ZXJWYWx1ZShyZCwgcmVzdWx0KVxuICAgICAgfSBlbHNlIGlmIChmdW5jdDMgPT09IDBiMDExKSB7XG4gICAgICAgIC8vIFNMVElVXG4gICAgICAgIC8vIGlmICgocnMxPj4+MCkgPCAoaW1tPj4+MCkpIHtyZCA9IDF9IGVsc2Uge3JkID0gMH1cbiAgICAgICAgY29uc3QgaW1tVmFsdWUgPSB0aGlzLmlpbW1Ub1ZhbHVlKGluc3RydWN0aW9uKVxuICAgICAgICBsZXQgcmVzdWx0ID0gMFxuICAgICAgICBpZiAoKHRoaXMuZ2V0UmVnaXN0ZXJWYWx1ZShyczEpID4+PiAwKSA8IChpbW1WYWx1ZSA+Pj4gMCkpIHtcbiAgICAgICAgICByZXN1bHQgPSAxXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzdWx0ID0gMFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0UmVnaXN0ZXJWYWx1ZShyZCwgcmVzdWx0KVxuICAgICAgfSBlbHNlIGlmIChmdW5jdDMgPT09IDBiMTExKSB7XG4gICAgICAgIC8vIEFORElcbiAgICAgICAgLy8gcmQgPSByczEgQU5EIGltbVxuICAgICAgICBjb25zdCBpbW1WYWx1ZSA9IHRoaXMuaWltbVRvVmFsdWUoaW5zdHJ1Y3Rpb24pXG4gICAgICAgIHRoaXMuc2V0UmVnaXN0ZXJWYWx1ZShyZCwgdGhpcy5nZXRSZWdpc3RlclZhbHVlKHJzMSkgJiBpbW1WYWx1ZSlcbiAgICAgIH0gZWxzZSBpZiAoZnVuY3QzID09PSAwYjExMCkge1xuICAgICAgICAvLyBPUklcbiAgICAgICAgLy8gcmQgPSByczEgT1IgaW1tXG4gICAgICAgIGNvbnN0IGltbVZhbHVlID0gdGhpcy5paW1tVG9WYWx1ZShpbnN0cnVjdGlvbilcbiAgICAgICAgdGhpcy5zZXRSZWdpc3RlclZhbHVlKHJkLCB0aGlzLmdldFJlZ2lzdGVyVmFsdWUocnMxKSB8IGltbVZhbHVlKVxuICAgICAgfSBlbHNlIGlmIChmdW5jdDMgPT09IDBiMTAwKSB7XG4gICAgICAgIC8vIFhPUklcbiAgICAgICAgLy8gcmQgPSByczEgWE9SIGltbVxuICAgICAgICBjb25zdCBpbW1WYWx1ZSA9IHRoaXMuaWltbVRvVmFsdWUoaW5zdHJ1Y3Rpb24pXG4gICAgICAgIHRoaXMuc2V0UmVnaXN0ZXJWYWx1ZShyZCwgdGhpcy5nZXRSZWdpc3RlclZhbHVlKHJzMSkgXiBpbW1WYWx1ZSlcbiAgICAgIH0gZWxzZSBpZiAoZnVuY3QzID09PSAwYjAwMSkge1xuICAgICAgICAvLyBTTExJXG4gICAgICAgIC8vIHJkID0gcnMxIDw8IChpbW0gJiAwYjExMTExKVxuICAgICAgICBjb25zdCBpbW1WYWx1ZSA9IHRoaXMuaWltbVRvVmFsdWUoaW5zdHJ1Y3Rpb24pXG4gICAgICAgIGNvbnN0IHNoYW10ID0gaW1tVmFsdWUgJiAwYjExMTExXG4gICAgICAgIHRoaXMuc2V0UmVnaXN0ZXJWYWx1ZShyZCwgdGhpcy5nZXRSZWdpc3RlclZhbHVlKHJzMSkgKiAoMiAqKiBzaGFtdCkpXG4gICAgICB9IGVsc2UgaWYgKGZ1bmN0MyA9PT0gMGIxMDEpIHtcbiAgICAgICAgY29uc3QgaW1tVmFsdWUgPSB0aGlzLmlpbW1Ub1ZhbHVlKGluc3RydWN0aW9uKVxuICAgICAgICBjb25zdCBzaGFtdCA9IGltbVZhbHVlICYgMGIxMTExMVxuICAgICAgICBjb25zdCBzaGlmdFR5cGUgPSBpbW1WYWx1ZSAmIDBiMDEwMDAwMDAwMDAwXG4gICAgICAgIGlmIChzaGlmdFR5cGUgPT09IDApIHtcbiAgICAgICAgICAvLyBTUkxJXG4gICAgICAgICAgLy8gcmQgPSByczEgPj4+IHNoYW10XG4gICAgICAgICAgdGhpcy5zZXRSZWdpc3RlclZhbHVlKHJkLCB0aGlzLmdldFJlZ2lzdGVyVmFsdWUocnMxKSA+Pj4gc2hhbXQpXG4gICAgICAgIH0gZWxzZSBpZiAoc2hpZnRUeXBlID09PSAwYjAxMDAwMDAwMDAwMCkge1xuICAgICAgICAgIC8vIFNSQUlcbiAgICAgICAgICAvLyByZCA9IHJzMSA+PiBzaGFtdFxuICAgICAgICAgIHRoaXMuc2V0UmVnaXN0ZXJWYWx1ZShyZCwgdGhpcy5nZXRSZWdpc3RlclZhbHVlKHJzMSkgPj4gc2hhbXQpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IGluc3RydWN0aW9uQmluYXJ5ID0gKGluc3RydWN0aW9uID4+PiAwKS50b1N0cmluZygyKVxuICAgICAgICAgIGluc3RydWN0aW9uQmluYXJ5ID0gaW5zdHJ1Y3Rpb25CaW5hcnkucGFkU3RhcnQodGhpcy5pbGVuLCAnMCcpXG4gICAgICAgICAgdGhpcy50aHJvd0lsbGVnYWxJbnN0cnVjdGlvbkV4Y2VwdGlvbihpbnN0cnVjdGlvbkJpbmFyeSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGluc3RydWN0aW9uQmluYXJ5ID0gKGluc3RydWN0aW9uID4+PiAwKS50b1N0cmluZygyKVxuICAgICAgICBpbnN0cnVjdGlvbkJpbmFyeSA9IGluc3RydWN0aW9uQmluYXJ5LnBhZFN0YXJ0KHRoaXMuaWxlbiwgJzAnKVxuICAgICAgICB0aGlzLnRocm93SWxsZWdhbEluc3RydWN0aW9uRXhjZXB0aW9uKGluc3RydWN0aW9uQmluYXJ5KVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3Bjb2RlID09PSBPcGNvZGUuTFVJKSB7XG4gICAgICAvLyBMVUlcbiAgICAgIC8vIHJkID0gaW1tICYgMGIxMTExMTExMTExMTExMTExMTExMTAwMDAwMDAwMDAwMFxuICAgICAgY29uc3QgcmQgPSAoaW5zdHJ1Y3Rpb24gPj4+IDcpICYgMGIxMTExMVxuICAgICAgY29uc3QgaW1tVmFsdWUgPSB0aGlzLnVpbW1Ub1ZhbHVlKGluc3RydWN0aW9uKSA+PiAwXG4gICAgICB0aGlzLnNldFJlZ2lzdGVyVmFsdWUocmQsIGltbVZhbHVlKVxuICAgIH0gZWxzZSBpZiAob3Bjb2RlID09PSBPcGNvZGUuQVVJUEMpIHtcbiAgICAgIC8vIEFVSVBDXG4gICAgICAvLyByZCA9IGltbSArIHBwY1xuICAgICAgY29uc3QgcmQgPSAoaW5zdHJ1Y3Rpb24gPj4+IDcpICYgMGIxMTExMVxuICAgICAgY29uc3QgaW1tVmFsdWUgPSB0aGlzLnVpbW1Ub1ZhbHVlKGluc3RydWN0aW9uKSA+PiAwXG4gICAgICB0aGlzLnNldFJlZ2lzdGVyVmFsdWUocmQsIChpbW1WYWx1ZSArIHRoaXMuZ2V0UmVnaXN0ZXJWYWx1ZShSZWdzLnBwYywgdHJ1ZSkpKVxuICAgIH0gZWxzZSBpZiAob3Bjb2RlID09PSBPcGNvZGUuT1ApIHtcbiAgICAgIC8vIEludGVnZXIgUmVnaXN0ZXItUmVnaXN0ZXIgT3BlcmF0aW9uc1xuICAgICAgY29uc3QgcmQgPSAoaW5zdHJ1Y3Rpb24gPj4+IDcpICYgMGIxMTExMVxuICAgICAgY29uc3QgcnMxID0gKGluc3RydWN0aW9uID4+PiAxNSkgJiAwYjExMTExXG4gICAgICBjb25zdCByczIgPSAoaW5zdHJ1Y3Rpb24gPj4+IDIwKSAmIDBiMTExMTFcbiAgICAgIGNvbnN0IGZ1bmN0MyA9IChpbnN0cnVjdGlvbiA+Pj4gMTIpICYgMGIxMTFcbiAgICAgIGNvbnN0IGZ1bmN0NyA9IChpbnN0cnVjdGlvbiA+Pj4gMjUpICYgMGIxMTExMTExXG4gICAgICBpZiAoZnVuY3Q3ID09PSAwKSB7XG4gICAgICAgIGlmIChmdW5jdDMgPT09IDBiMDAwKSB7XG4gICAgICAgICAgLy8gQUREXG4gICAgICAgICAgLy8gcmQgPSByczEgKyByczJcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmdldFJlZ2lzdGVyVmFsdWUocnMxKSArIHRoaXMuZ2V0UmVnaXN0ZXJWYWx1ZShyczIpXG4gICAgICAgICAgdGhpcy5zZXRSZWdpc3RlclZhbHVlKHJkLCByZXN1bHQpXG4gICAgICAgIH0gZWxzZSBpZiAoZnVuY3QzID09PSAwYjAxMCkge1xuICAgICAgICAgIC8vIFNMVFxuICAgICAgICAgIC8vIHJkID0gMSBpZiAocnMxIDwgcnMyKSBlbHNlIDBcbiAgICAgICAgICBsZXQgcmVzdWx0ID0gMFxuICAgICAgICAgIGlmICh0aGlzLmdldFJlZ2lzdGVyVmFsdWUocnMxKSA8IHRoaXMuZ2V0UmVnaXN0ZXJWYWx1ZShyczIpKSB7XG4gICAgICAgICAgICByZXN1bHQgPSAxXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDBcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5zZXRSZWdpc3RlclZhbHVlKHJkLCByZXN1bHQpXG4gICAgICAgIH0gZWxzZSBpZiAoZnVuY3QzID09PSAwYjAxMSkge1xuICAgICAgICAgIC8vIFNMVFVcbiAgICAgICAgICAvLyByZCA9IDEgaWYgKChyczE+Pj4wKSA8IChyczI+Pj4wKSkgZWxzZSAwXG4gICAgICAgICAgbGV0IHJlc3VsdCA9IDBcbiAgICAgICAgICBpZiAoKHRoaXMuZ2V0UmVnaXN0ZXJWYWx1ZShyczEpID4+PiAwKSA8ICh0aGlzLmdldFJlZ2lzdGVyVmFsdWUocnMyKSA+Pj4gMCkpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDFcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnNldFJlZ2lzdGVyVmFsdWUocmQsIHJlc3VsdClcbiAgICAgICAgfSBlbHNlIGlmIChmdW5jdDMgPT09IDBiMTExKSB7XG4gICAgICAgICAgLy8gQU5EXG4gICAgICAgICAgLy8gcmQgPSByczEgJiByczJcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmdldFJlZ2lzdGVyVmFsdWUocnMxKSAmIHRoaXMuZ2V0UmVnaXN0ZXJWYWx1ZShyczIpXG4gICAgICAgICAgdGhpcy5zZXRSZWdpc3RlclZhbHVlKHJkLCByZXN1bHQpXG4gICAgICAgIH0gZWxzZSBpZiAoZnVuY3QzID09PSAwYjExMCkge1xuICAgICAgICAgIC8vIE9SXG4gICAgICAgICAgLy8gcmQgPSByczEgfCByczJcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmdldFJlZ2lzdGVyVmFsdWUocnMxKSB8IHRoaXMuZ2V0UmVnaXN0ZXJWYWx1ZShyczIpXG4gICAgICAgICAgdGhpcy5zZXRSZWdpc3RlclZhbHVlKHJkLCByZXN1bHQpXG4gICAgICAgIH0gZWxzZSBpZiAoZnVuY3QzID09PSAwYjEwMCkge1xuICAgICAgICAgIC8vIFhPUlxuICAgICAgICAgIC8vIHJkID0gcnMxIF4gcnMyXG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5nZXRSZWdpc3RlclZhbHVlKHJzMSkgXiB0aGlzLmdldFJlZ2lzdGVyVmFsdWUocnMyKVxuICAgICAgICAgIHRoaXMuc2V0UmVnaXN0ZXJWYWx1ZShyZCwgcmVzdWx0KVxuICAgICAgICB9IGVsc2UgaWYgKGZ1bmN0MyA9PT0gMGIwMDEpIHtcbiAgICAgICAgICAvLyBTTExcbiAgICAgICAgICAvLyByZCA9IHJzMSA8PCAocnMyICYgMGIxMTExMSlcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmdldFJlZ2lzdGVyVmFsdWUocnMxKSAqICgyICoqICh0aGlzLmdldFJlZ2lzdGVyVmFsdWUocnMyKSAmIDBiMTExMTEpKVxuICAgICAgICAgIHRoaXMuc2V0UmVnaXN0ZXJWYWx1ZShyZCwgcmVzdWx0KVxuICAgICAgICB9IGVsc2UgaWYgKGZ1bmN0MyA9PT0gMGIxMDEpIHtcbiAgICAgICAgICAvLyBTUkxcbiAgICAgICAgICAvLyByZCA9IHJzMSA+Pj4gKHJzMiAmIDBiMTExMTEpXG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5nZXRSZWdpc3RlclZhbHVlKHJzMSkgPj4+ICh0aGlzLmdldFJlZ2lzdGVyVmFsdWUocnMyKSAmIDBiMTExMTEpXG4gICAgICAgICAgdGhpcy5zZXRSZWdpc3RlclZhbHVlKHJkLCByZXN1bHQpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IGluc3RydWN0aW9uQmluYXJ5ID0gKGluc3RydWN0aW9uID4+PiAwKS50b1N0cmluZygyKVxuICAgICAgICAgIGluc3RydWN0aW9uQmluYXJ5ID0gaW5zdHJ1Y3Rpb25CaW5hcnkucGFkU3RhcnQodGhpcy5pbGVuLCAnMCcpXG4gICAgICAgICAgdGhpcy50aHJvd0lsbGVnYWxJbnN0cnVjdGlvbkV4Y2VwdGlvbihpbnN0cnVjdGlvbkJpbmFyeSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChmdW5jdDcgPT09IDBiMDEwMDAwMCkge1xuICAgICAgICBpZiAoZnVuY3QzID09PSAwYjAwMCkge1xuICAgICAgICAgIC8vIFNVQlxuICAgICAgICAgIC8vIHJkID0gcnMxIC0gcnMyXG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5nZXRSZWdpc3RlclZhbHVlKHJzMSkgLSB0aGlzLmdldFJlZ2lzdGVyVmFsdWUocnMyKVxuICAgICAgICAgIHRoaXMuc2V0UmVnaXN0ZXJWYWx1ZShyZCwgcmVzdWx0KVxuICAgICAgICB9IGVsc2UgaWYgKGZ1bmN0MyA9PT0gMGIxMDEpIHtcbiAgICAgICAgICAvLyBTUkFcbiAgICAgICAgICAvLyByZCA9IHJzMSA+PiAocnMyICYgMGIxMTExMSlcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmdldFJlZ2lzdGVyVmFsdWUocnMxKSA+PiAodGhpcy5nZXRSZWdpc3RlclZhbHVlKHJzMikgJiAwYjExMTExKVxuICAgICAgICAgIHRoaXMuc2V0UmVnaXN0ZXJWYWx1ZShyZCwgcmVzdWx0KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCBpbnN0cnVjdGlvbkJpbmFyeSA9IChpbnN0cnVjdGlvbiA+Pj4gMCkudG9TdHJpbmcoMilcbiAgICAgICAgICBpbnN0cnVjdGlvbkJpbmFyeSA9IGluc3RydWN0aW9uQmluYXJ5LnBhZFN0YXJ0KHRoaXMuaWxlbiwgJzAnKVxuICAgICAgICAgIHRoaXMudGhyb3dJbGxlZ2FsSW5zdHJ1Y3Rpb25FeGNlcHRpb24oaW5zdHJ1Y3Rpb25CaW5hcnkpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBpbnN0cnVjdGlvbkJpbmFyeSA9IChpbnN0cnVjdGlvbiA+Pj4gMCkudG9TdHJpbmcoMilcbiAgICAgICAgaW5zdHJ1Y3Rpb25CaW5hcnkgPSBpbnN0cnVjdGlvbkJpbmFyeS5wYWRTdGFydCh0aGlzLmlsZW4sICcwJylcbiAgICAgICAgdGhpcy50aHJvd0lsbGVnYWxJbnN0cnVjdGlvbkV4Y2VwdGlvbihpbnN0cnVjdGlvbkJpbmFyeSlcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wY29kZSA9PT0gT3Bjb2RlLkpBTCkge1xuICAgICAgLy8gQ29udHJvbCBUcmFuc2ZlciBJbnN0cnVjdGlvbnNcbiAgICAgIC8vIFVuY29uZGl0aW9uYWwgSnVtcHNcbiAgICAgIC8vIEpBTFxuICAgICAgLy8gcmQgPSBwY1xuICAgICAgLy8gcGMgPSBwcGMgKyBpbW1cbiAgICAgIGNvbnN0IHJkID0gKGluc3RydWN0aW9uID4+PiA3KSAmIDBiMTExMTFcbiAgICAgIGNvbnN0IGltbVZhbHVlID0gdGhpcy5qaW1tVG9WYWx1ZShpbnN0cnVjdGlvbikgPj4gMFxuICAgICAgdGhpcy5zZXRSZWdpc3RlclZhbHVlKHJkLCB0aGlzLmdldFJlZ2lzdGVyVmFsdWUoUmVncy5wYywgdHJ1ZSkpXG4gICAgICB0aGlzLnNldFJlZ2lzdGVyVmFsdWUoUmVncy5wYywgdGhpcy5nZXRSZWdpc3RlclZhbHVlKFJlZ3MucHBjLCB0cnVlKSArIGltbVZhbHVlLCB0cnVlKVxuICAgIH0gZWxzZSBpZiAob3Bjb2RlID09PSBPcGNvZGUuSkFMUikge1xuICAgICAgLy8gSkFMUlxuICAgICAgLy8gcmQgPSBwY1xuICAgICAgLy8gcGMgPSBwcGMgKyAoMGIxMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMCAmIChyczEgKyBpbW0pKVxuICAgICAgY29uc3QgcmQgPSAoaW5zdHJ1Y3Rpb24gPj4+IDcpICYgMGIxMTExMVxuICAgICAgY29uc3QgcnMxID0gKGluc3RydWN0aW9uID4+PiAxNSkgJiAwYjExMTExXG4gICAgICBjb25zdCBmdW5jdDMgPSAoaW5zdHJ1Y3Rpb24gPj4+IDEyKSAmIDBiMTExXG4gICAgICBpZiAoZnVuY3QzID09PSAwYjAwMCkge1xuICAgICAgICBjb25zdCBpbW1WYWx1ZSA9IHRoaXMuaWltbVRvVmFsdWUoaW5zdHJ1Y3Rpb24pID4+IDBcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuZ2V0UmVnaXN0ZXJWYWx1ZShyczEpICsgaW1tVmFsdWVcbiAgICAgICAgcmVzdWx0ICY9IDBiMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTBcbiAgICAgICAgcmVzdWx0ICs9IHRoaXMuZ2V0UmVnaXN0ZXJWYWx1ZShSZWdzLnBwYywgdHJ1ZSlcbiAgICAgICAgdGhpcy5zZXRSZWdpc3RlclZhbHVlKHJkLCB0aGlzLmdldFJlZ2lzdGVyVmFsdWUoUmVncy5wYywgdHJ1ZSkpXG4gICAgICAgIHRoaXMuc2V0UmVnaXN0ZXJWYWx1ZShSZWdzLnBjLCByZXN1bHQsIHRydWUpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgaW5zdHJ1Y3Rpb25CaW5hcnkgPSAoaW5zdHJ1Y3Rpb24gPj4+IDApLnRvU3RyaW5nKDIpXG4gICAgICAgIGluc3RydWN0aW9uQmluYXJ5ID0gaW5zdHJ1Y3Rpb25CaW5hcnkucGFkU3RhcnQodGhpcy5pbGVuLCAnMCcpXG4gICAgICAgIHRoaXMudGhyb3dJbGxlZ2FsSW5zdHJ1Y3Rpb25FeGNlcHRpb24oaW5zdHJ1Y3Rpb25CaW5hcnkpXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcGNvZGUgPT09IE9wY29kZS5CUkFOQ0gpIHtcbiAgICAgIC8vIENvbmRpdGlvbmFsIEJyYW5jaGVzXG4gICAgICAvLyBicmFuY2g6IHBjID0gcHBjICsgaW1tXG4gICAgICBjb25zdCByczEgPSAoaW5zdHJ1Y3Rpb24gPj4+IDE1KSAmIDBiMTExMTFcbiAgICAgIGNvbnN0IHJzMiA9IChpbnN0cnVjdGlvbiA+Pj4gMjApICYgMGIxMTExMVxuICAgICAgY29uc3QgZnVuY3QzID0gKGluc3RydWN0aW9uID4+PiAxMikgJiAwYjExMVxuICAgICAgY29uc3QgaW1tVmFsdWUgPSB0aGlzLmJpbW1Ub1ZhbHVlKGluc3RydWN0aW9uKSA+Pj4gMFxuICAgICAgaWYgKGZ1bmN0MyA9PT0gMGIwMDApIHtcbiAgICAgICAgLy8gQkVRXG4gICAgICAgIC8vIGlmIChyczEgPT09IHJzMikge2JyYW5jaH1cbiAgICAgICAgaWYgKHRoaXMuZ2V0UmVnaXN0ZXJWYWx1ZShyczEpID09PSB0aGlzLmdldFJlZ2lzdGVyVmFsdWUocnMyKSkge1xuICAgICAgICAgIGNvbnN0IGFkciA9IHRoaXMuZ2V0UmVnaXN0ZXJWYWx1ZShSZWdzLnBwYywgdHJ1ZSkgKyBpbW1WYWx1ZVxuICAgICAgICAgIHRoaXMuc2V0UmVnaXN0ZXJWYWx1ZShSZWdzLnBjLCBhZHIsIHRydWUpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZnVuY3QzID09PSAwYjAwMSkge1xuICAgICAgICAvLyBCTkVcbiAgICAgICAgLy8gaWYgKHJzMSAhPT0gcnMyKSB7YnJhbmNofVxuICAgICAgICBpZiAodGhpcy5nZXRSZWdpc3RlclZhbHVlKHJzMSkgIT09IHRoaXMuZ2V0UmVnaXN0ZXJWYWx1ZShyczIpKSB7XG4gICAgICAgICAgY29uc3QgYWRyID0gdGhpcy5nZXRSZWdpc3RlclZhbHVlKFJlZ3MucHBjLCB0cnVlKSArIGltbVZhbHVlXG4gICAgICAgICAgdGhpcy5zZXRSZWdpc3RlclZhbHVlKFJlZ3MucGMsIGFkciwgdHJ1ZSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChmdW5jdDMgPT09IDBiMTAwKSB7XG4gICAgICAgIC8vIEJMVFxuICAgICAgICAvLyBpZiAocnMxIDwgcnMyKSB7YnJhbmNofVxuICAgICAgICBpZiAodGhpcy5nZXRSZWdpc3RlclZhbHVlKHJzMSkgPCB0aGlzLmdldFJlZ2lzdGVyVmFsdWUocnMyKSkge1xuICAgICAgICAgIGNvbnN0IGFkciA9IHRoaXMuZ2V0UmVnaXN0ZXJWYWx1ZShSZWdzLnBwYywgdHJ1ZSkgKyBpbW1WYWx1ZVxuICAgICAgICAgIHRoaXMuc2V0UmVnaXN0ZXJWYWx1ZShSZWdzLnBjLCBhZHIsIHRydWUpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZnVuY3QzID09PSAwYjExMCkge1xuICAgICAgICAvLyBCTFRVXG4gICAgICAgIC8vIGlmICgocnMxPj4+MCkgPCAocnMyPj4+MCkpIHticmFuY2h9XG4gICAgICAgIGlmICgodGhpcy5nZXRSZWdpc3RlclZhbHVlKHJzMSkgPj4+IDApIDwgKHRoaXMuZ2V0UmVnaXN0ZXJWYWx1ZShyczIpID4+PiAwKSkge1xuICAgICAgICAgIGNvbnN0IGFkciA9IHRoaXMuZ2V0UmVnaXN0ZXJWYWx1ZShSZWdzLnBwYywgdHJ1ZSkgKyBpbW1WYWx1ZVxuICAgICAgICAgIHRoaXMuc2V0UmVnaXN0ZXJWYWx1ZShSZWdzLnBjLCBhZHIsIHRydWUpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZnVuY3QzID09PSAwYjEwMSkge1xuICAgICAgICAvLyBCR0VcbiAgICAgICAgLy8gaWYgKHJzMSA+PSByczIpIHticmFuY2h9XG4gICAgICAgIGlmICh0aGlzLmdldFJlZ2lzdGVyVmFsdWUocnMxKSA+PSB0aGlzLmdldFJlZ2lzdGVyVmFsdWUocnMyKSkge1xuICAgICAgICAgIGNvbnN0IGFkciA9IHRoaXMuZ2V0UmVnaXN0ZXJWYWx1ZShSZWdzLnBwYywgdHJ1ZSkgKyBpbW1WYWx1ZVxuICAgICAgICAgIHRoaXMuc2V0UmVnaXN0ZXJWYWx1ZShSZWdzLnBjLCBhZHIsIHRydWUpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZnVuY3QzID09PSAwYjExMSkge1xuICAgICAgICAvLyBCR0VVXG4gICAgICAgIC8vIGlmICgocnMxPj4+MCkgPj0gKHJzMj4+PjApKSB7YnJhbmNofVxuICAgICAgICBpZiAoKHRoaXMuZ2V0UmVnaXN0ZXJWYWx1ZShyczEpID4+PiAwKSA+PSAodGhpcy5nZXRSZWdpc3RlclZhbHVlKHJzMikgPj4+IDApKSB7XG4gICAgICAgICAgY29uc3QgYWRyID0gdGhpcy5nZXRSZWdpc3RlclZhbHVlKFJlZ3MucHBjLCB0cnVlKSArIGltbVZhbHVlXG4gICAgICAgICAgdGhpcy5zZXRSZWdpc3RlclZhbHVlKFJlZ3MucGMsIGFkciwgdHJ1ZSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGluc3RydWN0aW9uQmluYXJ5ID0gKGluc3RydWN0aW9uID4+PiAwKS50b1N0cmluZygyKVxuICAgICAgICBpbnN0cnVjdGlvbkJpbmFyeSA9IGluc3RydWN0aW9uQmluYXJ5LnBhZFN0YXJ0KHRoaXMuaWxlbiwgJzAnKVxuICAgICAgICB0aGlzLnRocm93SWxsZWdhbEluc3RydWN0aW9uRXhjZXB0aW9uKGluc3RydWN0aW9uQmluYXJ5KVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3Bjb2RlID09PSBPcGNvZGUuTE9BRCkge1xuICAgICAgLy8gTG9hZCBhbmQgU3RvcmUgSW5zdHJ1Y3Rpb25zXG4gICAgICAvLyBhZHIgPSByczEgKyBpbW1cbiAgICAgIGNvbnN0IHJkID0gKGluc3RydWN0aW9uID4+PiA3KSAmIDBiMTExMTFcbiAgICAgIGlmIChyZCA9PT0gUmVncy54MCkge1xuICAgICAgICBsZXQgaW5zdHJ1Y3Rpb25CaW5hcnkgPSAoaW5zdHJ1Y3Rpb24gPj4+IDApLnRvU3RyaW5nKDIpXG4gICAgICAgIGluc3RydWN0aW9uQmluYXJ5ID0gaW5zdHJ1Y3Rpb25CaW5hcnkucGFkU3RhcnQodGhpcy5pbGVuLCAnMCcpXG4gICAgICAgIHRoaXMudGhyb3dJbGxlZ2FsSW5zdHJ1Y3Rpb25FeGNlcHRpb24oaW5zdHJ1Y3Rpb25CaW5hcnkpXG4gICAgICB9XG4gICAgICBjb25zdCByczEgPSAoaW5zdHJ1Y3Rpb24gPj4+IDE1KSAmIDBiMTExMTFcbiAgICAgIGNvbnN0IGZ1bmN0MyA9IChpbnN0cnVjdGlvbiA+Pj4gMTIpICYgMGIxMTFcbiAgICAgIGNvbnN0IGltbVZhbHVlID0gdGhpcy5paW1tVG9WYWx1ZShpbnN0cnVjdGlvbikgPj4gMFxuICAgICAgY29uc3QgYWRyID0gdGhpcy5nZXRSZWdpc3RlclZhbHVlKHJzMSkgKyBpbW1WYWx1ZVxuICAgICAgaWYgKGZ1bmN0MyA9PT0gMGIwMDApIHtcbiAgICAgICAgLy8gTEJcbiAgICAgICAgLy8gcmQgPSBzaWduRXh0KG1lbVthZHJdKVxuICAgICAgICBjb25zdCBtZW1EYXRhID0gdGhpcy5tZW0uZ2V0Qnl0ZShhZHIpXG4gICAgICAgIHRoaXMuc2V0UmVnaXN0ZXJWYWx1ZShyZCwgbWVtRGF0YSlcbiAgICAgIH0gZWxzZSBpZiAoZnVuY3QzID09PSAwYjAwMSkge1xuICAgICAgICAvLyBMSFxuICAgICAgICAvLyByZCA9IHNpZ25FeHQobWVtW2Fkci4uYWRyKzFdKVxuICAgICAgICBsZXQgbWVtRGF0YSA9IHRoaXMubWVtLmdldEJ5dGUoYWRyKVxuICAgICAgICBtZW1EYXRhIHw9IHRoaXMubWVtLmdldEJ5dGUoYWRyICsgMSkgKiAoMiAqKiA4KVxuICAgICAgICBpZiAoKCh0aGlzLm1lbS5nZXRCeXRlKGFkciArIDEpID4+PiA3KSAmIDBiMSkgPT09IDBiMSkge1xuICAgICAgICAgIG1lbURhdGEgfD0gMGIxMTExMTExMTExMTExMTExMDAwMDAwMDAwMDAwMDAwMFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1lbURhdGEgJj0gMGIwMDAwMDAwMDAwMDAwMDAwMTExMTExMTExMTExMTExMVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0UmVnaXN0ZXJWYWx1ZShyZCwgbWVtRGF0YSlcbiAgICAgIH0gZWxzZSBpZiAoZnVuY3QzID09PSAwYjAxMCkge1xuICAgICAgICAvLyBMV1xuICAgICAgICAvLyByZCA9IHNpZ25FeHQobWVtW2Fkci4uYWRyKzNdKVxuICAgICAgICBsZXQgbWVtRGF0YSA9IHRoaXMubWVtLmdldEJ5dGUoYWRyKVxuICAgICAgICBtZW1EYXRhIHw9IHRoaXMubWVtLmdldEJ5dGUoYWRyICsgMSkgKiAoMiAqKiA4KVxuICAgICAgICBtZW1EYXRhIHw9IHRoaXMubWVtLmdldEJ5dGUoYWRyICsgMikgKiAoMiAqKiAxNilcbiAgICAgICAgbWVtRGF0YSB8PSB0aGlzLm1lbS5nZXRCeXRlKGFkciArIDMpICogKDIgKiogMjQpXG4gICAgICAgIHRoaXMuc2V0UmVnaXN0ZXJWYWx1ZShyZCwgbWVtRGF0YSlcbiAgICAgIH0gZWxzZSBpZiAoZnVuY3QzID09PSAwYjEwMCkge1xuICAgICAgICAvLyBMQlVcbiAgICAgICAgLy8gcmQgPSB6ZXJvRXh0KG1lbVthZHJdKVxuICAgICAgICBjb25zdCBtZW1EYXRhID0gKHRoaXMubWVtLmdldEJ5dGUoYWRyKSA+Pj4gMClcbiAgICAgICAgdGhpcy5zZXRSZWdpc3RlclZhbHVlKHJkLCBtZW1EYXRhKVxuICAgICAgfSBlbHNlIGlmIChmdW5jdDMgPT09IDBiMTAxKSB7XG4gICAgICAgIC8vIExIVVxuICAgICAgICAvLyByZCA9IHplcm9FeHQobWVtW2Fkci4uYWRyKzFdKVxuICAgICAgICBsZXQgbWVtRGF0YSA9ICh0aGlzLm1lbS5nZXRCeXRlKGFkcikpID4+PiAwXG4gICAgICAgIG1lbURhdGEgfD0gKHRoaXMubWVtLmdldEJ5dGUoYWRyICsgMSkgKiAoMiAqKiA4KSkgPj4+IDBcbiAgICAgICAgbWVtRGF0YSA+Pj49IDBcbiAgICAgICAgdGhpcy5zZXRSZWdpc3RlclZhbHVlKHJkLCBtZW1EYXRhKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGluc3RydWN0aW9uQmluYXJ5ID0gKGluc3RydWN0aW9uID4+PiAwKS50b1N0cmluZygyKVxuICAgICAgICBpbnN0cnVjdGlvbkJpbmFyeSA9IGluc3RydWN0aW9uQmluYXJ5LnBhZFN0YXJ0KHRoaXMuaWxlbiwgJzAnKVxuICAgICAgICB0aGlzLnRocm93SWxsZWdhbEluc3RydWN0aW9uRXhjZXB0aW9uKGluc3RydWN0aW9uQmluYXJ5KVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3Bjb2RlID09PSBPcGNvZGUuU1RPUkUpIHtcbiAgICAgIGNvbnN0IHJzMSA9IChpbnN0cnVjdGlvbiA+Pj4gMTUpICYgMGIxMTExMVxuICAgICAgY29uc3QgcnMyID0gKGluc3RydWN0aW9uID4+PiAyMCkgJiAwYjExMTExXG4gICAgICBjb25zdCBmdW5jdDMgPSAoaW5zdHJ1Y3Rpb24gPj4+IDEyKSAmIDBiMTExXG4gICAgICBjb25zdCBpbW1WYWx1ZSA9IHRoaXMuc2ltbVRvVmFsdWUoaW5zdHJ1Y3Rpb24pID4+IDBcbiAgICAgIGNvbnN0IGFkciA9IHRoaXMuZ2V0UmVnaXN0ZXJWYWx1ZShyczEpICsgaW1tVmFsdWVcbiAgICAgIGlmIChmdW5jdDMgPT09IDBiMDAwKSB7XG4gICAgICAgIC8vIFNCXG4gICAgICAgIC8vIG1lbVthZHJdID0gcnMyWzBdXG4gICAgICAgIHRoaXMubWVtLnNldEJ5dGUoYWRyLCB0aGlzLmdldFJlZ2lzdGVyVmFsdWUocnMyKSlcbiAgICAgIH0gZWxzZSBpZiAoZnVuY3QzID09PSAwYjAwMSkge1xuICAgICAgICAvLyBTSFxuICAgICAgICAvLyBtZW1bYWRyLi5hZHIrMV0gPSByczJbMC4uMV1cbiAgICAgICAgdGhpcy5tZW0uc2V0Qnl0ZShhZHIgKyAwLCB0aGlzLmdldFJlZ2lzdGVyVmFsdWUocnMyKSlcbiAgICAgICAgdGhpcy5tZW0uc2V0Qnl0ZShhZHIgKyAxLCB0aGlzLmdldFJlZ2lzdGVyVmFsdWUocnMyKSA+PiA4KVxuICAgICAgfSBlbHNlIGlmIChmdW5jdDMgPT09IDBiMDEwKSB7XG4gICAgICAgIC8vIFNXXG4gICAgICAgIC8vIG1lbVthZHIuLmFkciszXSA9IHJzMlswLi4zXVxuICAgICAgICB0aGlzLm1lbS5zZXRCeXRlKGFkciArIDAsIHRoaXMuZ2V0UmVnaXN0ZXJWYWx1ZShyczIpKVxuICAgICAgICB0aGlzLm1lbS5zZXRCeXRlKGFkciArIDEsIHRoaXMuZ2V0UmVnaXN0ZXJWYWx1ZShyczIpID4+IDgpXG4gICAgICAgIHRoaXMubWVtLnNldEJ5dGUoYWRyICsgMiwgdGhpcy5nZXRSZWdpc3RlclZhbHVlKHJzMikgPj4gMTYpXG4gICAgICAgIHRoaXMubWVtLnNldEJ5dGUoYWRyICsgMywgdGhpcy5nZXRSZWdpc3RlclZhbHVlKHJzMikgPj4gMjQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgaW5zdHJ1Y3Rpb25CaW5hcnkgPSAoaW5zdHJ1Y3Rpb24gPj4+IDApLnRvU3RyaW5nKDIpXG4gICAgICAgIGluc3RydWN0aW9uQmluYXJ5ID0gaW5zdHJ1Y3Rpb25CaW5hcnkucGFkU3RhcnQodGhpcy5pbGVuLCAnMCcpXG4gICAgICAgIHRoaXMudGhyb3dJbGxlZ2FsSW5zdHJ1Y3Rpb25FeGNlcHRpb24oaW5zdHJ1Y3Rpb25CaW5hcnkpXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcGNvZGUgPT09IE9wY29kZS5NSVNDX01FTSkge1xuICAgICAgLy8gTWVtb3J5IE9yZGVyaW5nIEluc3RydWN0aW9uc1xuICAgICAgY29uc3QgZnVuY3QzID0gKGluc3RydWN0aW9uID4+PiAxMikgJiAwYjExMVxuICAgICAgaWYgKGZ1bmN0MyA9PT0gMGIwMDApIHtcbiAgICAgICAgLy8gRkVOQ0UgPSBOT1BcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBpbnN0cnVjdGlvbkJpbmFyeSA9IChpbnN0cnVjdGlvbiA+Pj4gMCkudG9TdHJpbmcoMilcbiAgICAgICAgaW5zdHJ1Y3Rpb25CaW5hcnkgPSBpbnN0cnVjdGlvbkJpbmFyeS5wYWRTdGFydCh0aGlzLmlsZW4sICcwJylcbiAgICAgICAgdGhpcy50aHJvd0lsbGVnYWxJbnN0cnVjdGlvbkV4Y2VwdGlvbihpbnN0cnVjdGlvbkJpbmFyeSlcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wY29kZSA9PT0gT3Bjb2RlLlNZU1RFTSkge1xuICAgICAgLy8gRW52aXJvbm1lbnQgQ2FsbCBhbmQgQnJlYWtwb2ludHNcbiAgICAgIGNvbnN0IHJkID0gKGluc3RydWN0aW9uID4+PiA3KSAmIDBiMTExMTFcbiAgICAgIGNvbnN0IHJzMSA9IChpbnN0cnVjdGlvbiA+Pj4gMTUpICYgMGIxMTExMVxuICAgICAgY29uc3QgZnVuY3QzID0gKGluc3RydWN0aW9uID4+PiAxMikgJiAwYjExMVxuICAgICAgY29uc3QgZnVuY3QxMiA9IChpbnN0cnVjdGlvbiA+Pj4gMjApICYgMGIxMTExMTExMTExMTFcbiAgICAgIGlmICgocmQgIT09IDApIHx8IChyczEgIT09IDApIHx8IChmdW5jdDMgIT09IDApKSB7XG4gICAgICAgIGxldCBpbnN0cnVjdGlvbkJpbmFyeSA9IChpbnN0cnVjdGlvbiA+Pj4gMCkudG9TdHJpbmcoMilcbiAgICAgICAgaW5zdHJ1Y3Rpb25CaW5hcnkgPSBpbnN0cnVjdGlvbkJpbmFyeS5wYWRTdGFydCh0aGlzLmlsZW4sICcwJylcbiAgICAgICAgdGhpcy50aHJvd0lsbGVnYWxJbnN0cnVjdGlvbkV4Y2VwdGlvbihpbnN0cnVjdGlvbkJpbmFyeSlcbiAgICAgIH1cbiAgICAgIGlmIChmdW5jdDEyID09PSAwKSB7XG4gICAgICAgIC8vIEVDQUxMXG4gICAgICAgIHRocm93IEVycm9yKCdFQ0FMTCcpXG4gICAgICB9IGVsc2UgaWYgKGZ1bmN0MTIgPT09IDEpIHtcbiAgICAgICAgLy8gRUJSRUFLXG4gICAgICAgIHRocm93IEVycm9yKCdFQlJFQUsnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGluc3RydWN0aW9uQmluYXJ5ID0gKGluc3RydWN0aW9uID4+PiAwKS50b1N0cmluZygyKVxuICAgICAgICBpbnN0cnVjdGlvbkJpbmFyeSA9IGluc3RydWN0aW9uQmluYXJ5LnBhZFN0YXJ0KHRoaXMuaWxlbiwgJzAnKVxuICAgICAgICB0aGlzLnRocm93SWxsZWdhbEluc3RydWN0aW9uRXhjZXB0aW9uKGluc3RydWN0aW9uQmluYXJ5KVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgaW5zdHJ1Y3Rpb25CaW5hcnkgPSAoaW5zdHJ1Y3Rpb24gPj4+IDApLnRvU3RyaW5nKDIpXG4gICAgICBpbnN0cnVjdGlvbkJpbmFyeSA9IGluc3RydWN0aW9uQmluYXJ5LnBhZFN0YXJ0KHRoaXMuaWxlbiwgJzAnKVxuICAgICAgdGhpcy50aHJvd0lsbGVnYWxJbnN0cnVjdGlvbkV4Y2VwdGlvbihpbnN0cnVjdGlvbkJpbmFyeSlcbiAgICB9XG4gIH1cblxuICAvLyBJbW1lZGlhdGVzIC8vXG5cbiAgLy8gSS1pbW1lZGlhdGVcblxuICB2YWx1ZVRvSWltbSAodmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgcGFydDEgPSAodmFsdWUgKiAoMiAqKiAyMCkpICYgMGIwMDAwMDAwMDAwMDEwMDAwMDAwMDAwMDAwMDAwMDAwMFxuICAgIGNvbnN0IHBhcnQyID0gKHZhbHVlICogKDIgKiogMjApKSAmIDBiMDAwMDAwMDExMTEwMDAwMDAwMDAwMDAwMDAwMDAwMDBcbiAgICBjb25zdCBwYXJ0MyA9ICh2YWx1ZSAqICgyICoqIDIwKSkgJiAwYjAxMTExMTEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwXG4gICAgY29uc3QgcGFydDQgPSB2YWx1ZSAmIDBiMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDBcbiAgICBjb25zdCBpbW0gPSAwIHwgcGFydDEgfCBwYXJ0MiB8IHBhcnQzIHwgcGFydDRcbiAgICByZXR1cm4gaW1tXG4gIH1cblxuICBpaW1tVG9WYWx1ZSAoaW5zdHJ1Y3Rpb246IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgcGFydDEgPSAoaW5zdHJ1Y3Rpb24gPj4+IDIwKSAmIDBiMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDFcbiAgICBjb25zdCBwYXJ0MiA9IChpbnN0cnVjdGlvbiA+Pj4gMjApICYgMGIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxMTExMFxuICAgIGNvbnN0IHBhcnQzID0gKGluc3RydWN0aW9uID4+PiAyMCkgJiAwYjAwMDAwMDAwMDAwMDAwMDAwMDAwMDExMTExMTAwMDAwXG4gICAgbGV0IHBhcnQ0ID0gMFxuICAgIGNvbnN0IHNpZ24gPSAoaW5zdHJ1Y3Rpb24gJiAwYjEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwKSA+Pj4gMFxuICAgIGlmIChzaWduID09PSAwYjEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwKSB7XG4gICAgICBwYXJ0NCA9IDBiMTExMTExMTExMTExMTExMTExMTExMDAwMDAwMDAwMDBcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydDQgPSAwYjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwXG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gMCB8IHBhcnQxIHwgcGFydDIgfCBwYXJ0MyB8IHBhcnQ0XG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICAvLyBTLWltbWVkaWF0ZVxuXG4gIHZhbHVlVG9TaW1tICh2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBwYXJ0MSA9ICh2YWx1ZSAqICgyICoqIDcpKSAmIDBiMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMTAwMDAwMDBcbiAgICBjb25zdCBwYXJ0MiA9ICh2YWx1ZSAqICgyICoqIDcpKSAmIDBiMDAwMDAwMDAwMDAwMDAwMDAwMDAxMTExMDAwMDAwMDBcbiAgICBjb25zdCBwYXJ0MyA9ICh2YWx1ZSAqICgyICoqICg3ICsgMTMpKSkgJiAwYjAxMTExMTEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwXG4gICAgY29uc3QgcGFydDQgPSB2YWx1ZSAmIDBiMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDBcbiAgICBjb25zdCBpbW0gPSAwIHwgcGFydDEgfCBwYXJ0MiB8IHBhcnQzIHwgcGFydDRcbiAgICByZXR1cm4gaW1tXG4gIH1cblxuICBzaW1tVG9WYWx1ZSAoaW5zdHJ1Y3Rpb246IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgcGFydDEgPSAoaW5zdHJ1Y3Rpb24gPj4+IDcpICYgMGIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMVxuICAgIGNvbnN0IHBhcnQyID0gKGluc3RydWN0aW9uID4+PiA3KSAmIDBiMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMTExMTBcbiAgICBjb25zdCBwYXJ0MyA9IChpbnN0cnVjdGlvbiA+Pj4gKDcgKyAxMykpICYgMGIwMDAwMDAwMDAwMDAwMDAwMDAwMDAxMTExMTEwMDAwMFxuICAgIGxldCBwYXJ0NCA9IDBcbiAgICBjb25zdCBzaWduID0gKGluc3RydWN0aW9uICYgMGIxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCkgPj4+IDBcbiAgICBpZiAoc2lnbiA9PT0gMGIxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCkge1xuICAgICAgcGFydDQgPSAwYjExMTExMTExMTExMTExMTExMTExMTAwMDAwMDAwMDAwXG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnQ0ID0gMGIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMFxuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IDAgfCBwYXJ0MSB8IHBhcnQyIHwgcGFydDMgfCBwYXJ0NFxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgLy8gQi1pbW1lZGlhdGVcblxuICB2YWx1ZVRvQmltbSAodmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgcGFydDEgPSAwXG4gICAgY29uc3QgcGFydDIgPSAodmFsdWUgKiAoMiAqKiA3KSkgJiAwYjAwMDAwMDAwMDAwMDAwMDAwMDAwMTExMTAwMDAwMDAwXG4gICAgY29uc3QgcGFydDMgPSAodmFsdWUgKiAoMiAqKiAoNyArIDEzKSkpICYgMGIwMTExMTExMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMFxuICAgIGNvbnN0IHBhcnQ0ID0gKHZhbHVlID4+PiA0KSAmIDBiMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMTAwMDAwMDBcbiAgICBjb25zdCBwYXJ0NSA9IHZhbHVlICYgMGIxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMFxuICAgIGNvbnN0IGltbSA9IDAgfCBwYXJ0MSB8IHBhcnQyIHwgcGFydDMgfCBwYXJ0NCB8IHBhcnQ1XG4gICAgcmV0dXJuIGltbVxuICB9XG5cbiAgYmltbVRvVmFsdWUgKGluc3RydWN0aW9uOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IHBhcnQxID0gMFxuICAgIGNvbnN0IHBhcnQyID0gKGluc3RydWN0aW9uID4+PiA3KSAmIDBiMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMTExMTBcbiAgICBjb25zdCBwYXJ0MyA9IChpbnN0cnVjdGlvbiA+Pj4gKDcgKyAxMykpICYgMGIwMDAwMDAwMDAwMDAwMDAwMDAwMDAxMTExMTEwMDAwMFxuICAgIGNvbnN0IHBhcnQ0ID0gKGluc3RydWN0aW9uICogKDIgKiogNCkpICYgMGIwMDAwMDAwMDAwMDAwMDAwMDAwMDEwMDAwMDAwMDAwMFxuICAgIGxldCBwYXJ0NSA9IDBcbiAgICBjb25zdCBzaWduID0gKGluc3RydWN0aW9uICYgMGIxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCkgPj4+IDBcbiAgICBpZiAoc2lnbiA9PT0gMGIxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCkge1xuICAgICAgcGFydDUgPSAwYjExMTExMTExMTExMTExMTExMTExMDAwMDAwMDAwMDAwXG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnQ1ID0gMGIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMFxuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IDAgfCBwYXJ0MSB8IHBhcnQyIHwgcGFydDMgfCBwYXJ0NCB8IHBhcnQ1XG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICAvLyBVLWltbWVkaWF0ZVxuXG4gIHZhbHVlVG9VaW1tICh2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBwYXJ0MSA9IDBcbiAgICBjb25zdCBwYXJ0MiA9IHZhbHVlICYgMGIwMDAwMDAwMDAwMDAxMTExMTExMTAwMDAwMDAwMDAwMFxuICAgIGNvbnN0IHBhcnQzID0gdmFsdWUgJiAwYjAxMTExMTExMTExMTAwMDAwMDAwMDAwMDAwMDAwMDAwXG4gICAgY29uc3QgcGFydDQgPSB2YWx1ZSAmIDBiMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDBcbiAgICBjb25zdCBpbW0gPSAwIHwgcGFydDEgfCBwYXJ0MiB8IHBhcnQzIHwgcGFydDRcbiAgICByZXR1cm4gaW1tXG4gIH1cblxuICB1aW1tVG9WYWx1ZSAoaW5zdHJ1Y3Rpb246IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgcGFydDEgPSAwXG4gICAgY29uc3QgcGFydDIgPSBpbnN0cnVjdGlvbiAmIDBiMDAwMDAwMDAwMDAwMTExMTExMTEwMDAwMDAwMDAwMDBcbiAgICBjb25zdCBwYXJ0MyA9IGluc3RydWN0aW9uICYgMGIwMTExMTExMTExMTEwMDAwMDAwMDAwMDAwMDAwMDAwMFxuICAgIGxldCBwYXJ0NCA9IDBcbiAgICBjb25zdCBzaWduID0gKGluc3RydWN0aW9uICYgMGIxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCkgPj4+IDBcbiAgICBpZiAoc2lnbiA9PT0gMGIxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCkge1xuICAgICAgcGFydDQgPSAwYjEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwXG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnQ0ID0gMGIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMFxuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IDAgfCBwYXJ0MSB8IHBhcnQyIHwgcGFydDMgfCBwYXJ0NFxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgLy8gSi1pbW1lZGlhdGVcblxuICB2YWx1ZVRvSmltbSAodmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgcGFydDEgPSAwXG4gICAgY29uc3QgcGFydDIgPSAodmFsdWUgKiAoMiAqKiAyMCkpICYgMGIwMDAwMDAwMTExMTAwMDAwMDAwMDAwMDAwMDAwMDAwMFxuICAgIGNvbnN0IHBhcnQzID0gKHZhbHVlICogKDIgKiogMjApKSAmIDBiMDExMTExMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDBcbiAgICBjb25zdCBwYXJ0NCA9ICh2YWx1ZSAqICgyICoqIDkpKSAmIDBiMDAwMDAwMDAwMDAxMDAwMDAwMDAwMDAwMDAwMDAwMDBcbiAgICBjb25zdCBwYXJ0NSA9IHZhbHVlICYgMGIwMDAwMDAwMDAwMDAxMTExMTExMTAwMDAwMDAwMDAwMFxuICAgIGNvbnN0IHBhcnQ2ID0gdmFsdWUgJiAwYjEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwXG4gICAgY29uc3QgaW1tID0gMCB8IHBhcnQxIHwgcGFydDIgfCBwYXJ0MyB8IHBhcnQ0IHwgcGFydDUgfCBwYXJ0NlxuICAgIHJldHVybiBpbW1cbiAgfVxuXG4gIGppbW1Ub1ZhbHVlIChpbnN0cnVjdGlvbjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBwYXJ0MSA9IDBcbiAgICBjb25zdCBwYXJ0MiA9IChpbnN0cnVjdGlvbiA+Pj4gMjApICYgMGIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxMTExMFxuICAgIGNvbnN0IHBhcnQzID0gKGluc3RydWN0aW9uID4+PiAyMCkgJiAwYjAwMDAwMDAwMDAwMDAwMDAwMDAwMDExMTExMTAwMDAwXG4gICAgY29uc3QgcGFydDQgPSAoaW5zdHJ1Y3Rpb24gPj4+IDkpICYgMGIwMDAwMDAwMDAwMDAwMDAwMDAwMDEwMDAwMDAwMDAwMFxuICAgIGNvbnN0IHBhcnQ1ID0gaW5zdHJ1Y3Rpb24gJiAwYjAwMDAwMDAwMDAwMDExMTExMTExMDAwMDAwMDAwMDAwXG4gICAgbGV0IHBhcnQ2ID0gMFxuICAgIGNvbnN0IHNpZ24gPSAoaW5zdHJ1Y3Rpb24gJiAwYjEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwKSA+Pj4gMFxuICAgIGlmIChzaWduID09PSAwYjEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwKSB7XG4gICAgICBwYXJ0NiA9IDBiMTExMTExMTExMTExMDAwMDAwMDAwMDAwMDAwMDAwMDBcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydDYgPSAwYjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwXG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gMCB8IHBhcnQxIHwgcGFydDIgfCBwYXJ0MyB8IHBhcnQ0IHwgcGFydDUgfCBwYXJ0NlxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgLy8gRXhjZXB0aW9ucyAvL1xuXG4gIHRocm93SW5zdHJ1Y3Rpb25BZGRyZXNzTWlzYWxpZ25lZEV4Y2VwdGlvbiAocGNWYWx1ZTogbnVtYmVyLCBwcGNWYWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgLy8gZmF0YWwgdHJhcFxuICAgIGNvbnN0IGluZm8gPSAnOnBjOicgKyBwY1ZhbHVlLnRvU3RyaW5nKCkgKyAnOnBwYzonICsgcHBjVmFsdWUudG9TdHJpbmcoKVxuICAgIHRocm93IEVycm9yKCdleGNlcHRpb246aW5zdHJ1Y3Rpb24tYWRkcmVzcy1taXNhbGlnbmVkJyArIGluZm8pXG4gIH1cblxuICB0aHJvd0lsbGVnYWxJbnN0cnVjdGlvbkV4Y2VwdGlvbiAoaW5zdHJ1Y3Rpb246IHN0cmluZyk6IHZvaWQge1xuICAgIC8vIGZhdGFsIHRyYXBcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2V4Y2VwdGlvbjppbGxlZ2FsLWluc3RydWN0aW9uOicgKyBpbnN0cnVjdGlvbilcbiAgfVxufVxuIl19