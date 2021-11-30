import * as memory from './memory.js';
import * as common from './common.js';
import * as vcore from './vcore.js';
export class Test {
    // Memory //
    testingMemory() {
        const mem = new memory.Memory(common.Xlen.word, common.Vcount.one, common.Mrcount.default, common.Mempow.med);
        mem.setByte(1, 257);
        mem.setByte(mem.length, 2);
        if (mem.getByte(0) !== 2) {
            throw Error('testing memory 1');
        }
        if (mem.getByte(mem.length + 1) !== 1) {
            throw Error('testing memory 2');
        }
    }
    // Vcore //
    testingVcore() {
        const mem = new memory.Memory(common.Xlen.word, common.Vcount.one, common.Mrcount.default, common.Mempow.med);
        const core = new vcore.Vcore(mem, common.Vnum.zero, common.Ialign.word, common.Ilen.word);
        // PC-register
        try {
            core.fetchInstruction();
        }
        catch (error) {
            const instruction = ((error.message).split(':')).pop();
            if (instruction !== '00000000000000000000000000000000') {
                console.log(error.message);
                throw Error('testing vcore 1');
            }
        }
        mem.setByte(4, 255);
        mem.setByte(5, 255);
        mem.setByte(6, 255);
        mem.setByte(7, 255);
        try {
            core.fetchInstruction();
        }
        catch (error) {
            const instruction = ((error.message).split(':')).pop();
            if (instruction !== '11111111111111111111111111111111') {
                throw Error('testing vcore 2');
            }
        }
        mem.setByte(8, 1);
        mem.setByte(9, 3);
        mem.setByte(10, 7);
        mem.setByte(11, 15);
        try {
            core.fetchInstruction();
        }
        catch (error) {
            const instruction = ((error.message).split(':')).pop();
            if (instruction !== '00001111000001110000001100000001') {
                throw Error('testing vcore 3');
            }
        }
        // ADDI
        let instruction = 0 | vcore.Opcode.OP_IMM; // opcode
        instruction |= vcore.Regs.x31 * (2 ** 7); // rd
        instruction |= 0b000 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x30 * (2 ** 15); // rs1
        instruction |= 64 * (2 ** 20); // I-imm
        mem.setByte(12, instruction);
        mem.setByte(13, instruction >>> 8);
        mem.setByte(14, instruction >>> 16);
        mem.setByte(15, instruction >>> 24);
        core.fetchInstruction();
        if (core.getRegisterValue(vcore.Regs.x31) !== 64) {
            throw Error('testing vcore 4');
        }
        if (core.getRegisterValue(vcore.Regs.x30) !== 64) {
            throw Error('testing vcore 5');
        }
        instruction = 0 | vcore.Opcode.OP_IMM; // opcode
        instruction |= vcore.Regs.x31 * (2 ** 7); // rd
        instruction |= 0b000 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x30 * (2 ** 15); // rs1
        instruction |= -70 * (2 ** 20); // I-imm
        mem.setByte(16, instruction);
        mem.setByte(17, instruction >>> 8);
        mem.setByte(18, instruction >>> 16);
        mem.setByte(19, instruction >>> 24);
        core.fetchInstruction();
        if (core.getRegisterValue(vcore.Regs.x31) !== -6) {
            throw Error('testing vcore 6');
        }
        if (core.getRegisterValue(vcore.Regs.x30) !== -6) {
            throw Error('testing vcore 7');
        }
        // SLTI
        instruction = 0 | vcore.Opcode.OP_IMM; // opcode
        instruction |= vcore.Regs.x20 * (2 ** 7); // rd
        instruction |= 0b010 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x10 * (2 ** 15); // rs1
        instruction |= 64 * (2 ** 20); // I-imm
        mem.setByte(20, instruction);
        mem.setByte(21, instruction >>> 8);
        mem.setByte(22, instruction >>> 16);
        mem.setByte(23, instruction >>> 24);
        core.fetchInstruction();
        if (core.getRegisterValue(vcore.Regs.x20) !== 1) {
            throw Error('testing vcore 8');
        }
        if (core.getRegisterValue(vcore.Regs.x10) !== 0) {
            throw Error('testing vcore 9');
        }
        instruction = 0 | vcore.Opcode.OP_IMM; // opcode
        instruction |= vcore.Regs.x20 * (2 ** 7); // rd
        instruction |= 0b010 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x20 * (2 ** 15); // rs1
        instruction |= -1 * (2 ** 20); // I-imm
        mem.setByte(24, instruction);
        mem.setByte(25, instruction >>> 8);
        mem.setByte(26, instruction >>> 16);
        mem.setByte(27, instruction >>> 24);
        core.fetchInstruction();
        if (core.getRegisterValue(vcore.Regs.x20) !== 0) {
            throw Error('testing vcore 10');
        }
        // SLTIU
        instruction = 0 | vcore.Opcode.OP_IMM; // opcode
        instruction |= vcore.Regs.x30 * (2 ** 7); // rd
        instruction |= 0b011 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x31 * (2 ** 15); // rs1
        instruction |= 64 * (2 ** 20); // I-imm
        mem.setByte(28, instruction);
        mem.setByte(29, instruction >>> 8);
        mem.setByte(30, instruction >>> 16);
        mem.setByte(31, instruction >>> 24);
        core.fetchInstruction();
        if (core.getRegisterValue(vcore.Regs.x30) !== 0) {
            throw Error('testing vcore 11');
        }
        // ANDI
        instruction = 0 | vcore.Opcode.OP_IMM; // opcode
        instruction |= vcore.Regs.x30 * (2 ** 7); // rd
        instruction |= 0b111 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x31 * (2 ** 15); // rs1
        instruction |= 6 * (2 ** 20); // I-imm
        mem.setByte(32, instruction);
        mem.setByte(33, instruction >>> 8);
        mem.setByte(34, instruction >>> 16);
        mem.setByte(35, instruction >>> 24);
        core.fetchInstruction();
        if (core.getRegisterValue(vcore.Regs.x30) !== 2) {
            throw Error('testing vcore 12');
        }
        // ORI
        instruction = 0 | vcore.Opcode.OP_IMM; // opcode
        instruction |= vcore.Regs.x30 * (2 ** 7); // rd
        instruction |= 0b110 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x31 * (2 ** 15); // rs1
        instruction |= 6 * (2 ** 20); // I-imm
        mem.setByte(36, instruction);
        mem.setByte(37, instruction >>> 8);
        mem.setByte(38, instruction >>> 16);
        mem.setByte(39, instruction >>> 24);
        core.fetchInstruction();
        if (core.getRegisterValue(vcore.Regs.x30) !== -2) {
            throw Error('testing vcore 13');
        }
        // XORI
        instruction = 0 | vcore.Opcode.OP_IMM; // opcode
        instruction |= vcore.Regs.x30 * (2 ** 7); // rd
        instruction |= 0b100 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x31 * (2 ** 15); // rs1
        instruction |= 6 * (2 ** 20); // I-imm
        mem.setByte(40, instruction);
        mem.setByte(41, instruction >>> 8);
        mem.setByte(42, instruction >>> 16);
        mem.setByte(43, instruction >>> 24);
        core.fetchInstruction();
        if (core.getRegisterValue(vcore.Regs.x30) !== -4) {
            throw Error('testing vcore 14');
        }
        // SLLI
        instruction = 0 | vcore.Opcode.OP_IMM; // opcode
        instruction |= vcore.Regs.x30 * (2 ** 7); // rd
        instruction |= 0b001 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x31 * (2 ** 15); // rs1
        let shamt = 1 * (2 ** 20);
        let upperImm = 0 * (2 ** 25);
        instruction |= shamt | upperImm; // I-imm
        mem.setByte(44, instruction);
        mem.setByte(45, instruction >>> 8);
        mem.setByte(46, instruction >>> 16);
        mem.setByte(47, instruction >>> 24);
        core.fetchInstruction();
        if (core.getRegisterValue(vcore.Regs.x30) !== -12) {
            throw Error('testing vcore 15');
        }
        // SRAI
        instruction = 0 | vcore.Opcode.OP_IMM; // opcode
        instruction |= vcore.Regs.x30 * (2 ** 7); // rd
        instruction |= 0b101 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x31 * (2 ** 15); // rs1
        shamt = 1 * (2 ** 20);
        upperImm = 32 * (2 ** 25);
        instruction |= shamt | upperImm; // I-imm
        mem.setByte(48, instruction);
        mem.setByte(49, instruction >>> 8);
        mem.setByte(50, instruction >>> 16);
        mem.setByte(51, instruction >>> 24);
        core.fetchInstruction();
        if (core.getRegisterValue(vcore.Regs.x30) !== -3) {
            throw Error('testing vcore 16');
        }
        // SRLI
        instruction = 0 | vcore.Opcode.OP_IMM; // opcode
        instruction |= vcore.Regs.x30 * (2 ** 7); // rd
        instruction |= 0b101 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x31 * (2 ** 15); // rs1
        shamt = 1 * (2 ** 20);
        upperImm = 0 * (2 ** 25);
        instruction |= shamt | upperImm; // I-imm
        mem.setByte(52, instruction);
        mem.setByte(53, instruction >>> 8);
        mem.setByte(54, instruction >>> 16);
        mem.setByte(55, instruction >>> 24);
        core.fetchInstruction();
        if (core.getRegisterValue(vcore.Regs.x30) !== 0b01111111111111111111111111111101) {
            throw Error('testing vcore 17');
        }
        // LUI
        instruction = 0 | vcore.Opcode.LUI; // opcode
        instruction |= vcore.Regs.x10 * (2 ** 7); // rd
        instruction |= 1 * (2 ** 31); // U-imm
        mem.setByte(56, instruction);
        mem.setByte(57, instruction >>> 8);
        mem.setByte(58, instruction >>> 16);
        mem.setByte(59, instruction >>> 24);
        core.fetchInstruction();
        if ((core.getRegisterValue(vcore.Regs.x10) >>> 0) !== 0b10000000000000000000000000000000) {
            throw Error('testing vcore 18');
        }
        // AUIPC
        instruction = 0 | vcore.Opcode.AUIPC; // opcode
        instruction |= vcore.Regs.x10 * (2 ** 7); // rd
        instruction |= 1 * (2 ** 31); // U-imm
        mem.setByte(60, instruction);
        mem.setByte(61, instruction >>> 8);
        mem.setByte(62, instruction >>> 16);
        mem.setByte(63, instruction >>> 24);
        core.fetchInstruction();
        if ((core.getRegisterValue(vcore.Regs.x10) >>> 0) !== 0b10000000000000000000000000111100) {
            throw Error('testing vcore 19');
        }
        // ADD
        instruction = 0 | vcore.Opcode.OP; // opcode
        instruction |= vcore.Regs.x9 * (2 ** 7); // rd
        instruction |= 0b000 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x30 * (2 ** 15); // rs1
        instruction |= vcore.Regs.x31 * (2 ** 20); // rs2
        instruction |= 0 * (2 ** 25); // funct7
        mem.setByte(64, instruction);
        mem.setByte(65, instruction >>> 8);
        mem.setByte(66, instruction >>> 16);
        mem.setByte(67, instruction >>> 24);
        core.fetchInstruction();
        if ((core.getRegisterValue(vcore.Regs.x9) >>> 0) !== 0b01111111111111111111111111110111) {
            throw Error('testing vcore 20');
        }
        // SLT
        instruction = 0 | vcore.Opcode.OP; // opcode
        instruction |= vcore.Regs.x9 * (2 ** 7); // rd
        instruction |= 0b010 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x30 * (2 ** 15); // rs1
        instruction |= vcore.Regs.x31 * (2 ** 20); // rs2
        instruction |= 0 * (2 ** 25); // funct7
        mem.setByte(68, instruction);
        mem.setByte(69, instruction >>> 8);
        mem.setByte(70, instruction >>> 16);
        mem.setByte(71, instruction >>> 24);
        core.fetchInstruction();
        if ((core.getRegisterValue(vcore.Regs.x9) >>> 0) !== 0) {
            throw Error('testing vcore 21');
        }
        // SLTU
        instruction = 0 | vcore.Opcode.OP; // opcode
        instruction |= vcore.Regs.x9 * (2 ** 7); // rd
        instruction |= 0b011 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x30 * (2 ** 15); // rs1
        instruction |= vcore.Regs.x31 * (2 ** 20); // rs2
        instruction |= 0 * (2 ** 25); // funct7
        mem.setByte(72, instruction);
        mem.setByte(73, instruction >>> 8);
        mem.setByte(74, instruction >>> 16);
        mem.setByte(75, instruction >>> 24);
        core.fetchInstruction();
        if ((core.getRegisterValue(vcore.Regs.x9) >>> 0) !== 1) {
            throw Error('testing vcore 22');
        }
        // AND
        instruction = 0 | vcore.Opcode.OP; // opcode
        instruction |= vcore.Regs.x9 * (2 ** 7); // rd
        instruction |= 0b111 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x30 * (2 ** 15); // rs1
        instruction |= vcore.Regs.x31 * (2 ** 20); // rs2
        instruction |= 0 * (2 ** 25); // funct7
        mem.setByte(76, instruction);
        mem.setByte(77, instruction >>> 8);
        mem.setByte(78, instruction >>> 16);
        mem.setByte(79, instruction >>> 24);
        core.fetchInstruction();
        if ((core.getRegisterValue(vcore.Regs.x9) >>> 0) !== 0b01111111111111111111111111111000) {
            throw Error('testing vcore 23');
        }
        // OR
        instruction = 0 | vcore.Opcode.OP; // opcode
        instruction |= vcore.Regs.x9 * (2 ** 7); // rd
        instruction |= 0b110 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x30 * (2 ** 15); // rs1
        instruction |= vcore.Regs.x31 * (2 ** 20); // rs2
        instruction |= 0 * (2 ** 25); // funct7
        mem.setByte(80, instruction);
        mem.setByte(81, instruction >>> 8);
        mem.setByte(82, instruction >>> 16);
        mem.setByte(83, instruction >>> 24);
        core.fetchInstruction();
        if ((core.getRegisterValue(vcore.Regs.x9) >>> 0) !== 0b11111111111111111111111111111111) {
            throw Error('testing vcore 24');
        }
        // XOR
        instruction = 0 | vcore.Opcode.OP; // opcode
        instruction |= vcore.Regs.x9 * (2 ** 7); // rd
        instruction |= 0b100 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x30 * (2 ** 15); // rs1
        instruction |= vcore.Regs.x31 * (2 ** 20); // rs2
        instruction |= 0 * (2 ** 25); // funct7
        mem.setByte(84, instruction);
        mem.setByte(85, instruction >>> 8);
        mem.setByte(86, instruction >>> 16);
        mem.setByte(87, instruction >>> 24);
        core.fetchInstruction();
        if ((core.getRegisterValue(vcore.Regs.x9) >>> 0) !== 0b10000000000000000000000000000111) {
            throw Error('testing vcore 25');
        }
        // SLL
        instruction = 0 | vcore.Opcode.OP; // opcode
        instruction |= vcore.Regs.x9 * (2 ** 7); // rd
        instruction |= 0b001 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x30 * (2 ** 15); // rs1
        instruction |= vcore.Regs.x31 * (2 ** 20); // rs2
        instruction |= 0 * (2 ** 25); // funct7
        mem.setByte(88, instruction);
        mem.setByte(89, instruction >>> 8);
        mem.setByte(90, instruction >>> 16);
        mem.setByte(91, instruction >>> 24);
        core.fetchInstruction();
        if ((core.getRegisterValue(vcore.Regs.x9) >>> 0) !== 0b11110100000000000000000000000000) {
            throw Error('testing vcore 26');
        }
        // SRL
        instruction = 0 | vcore.Opcode.OP; // opcode
        instruction |= vcore.Regs.x9 * (2 ** 7); // rd
        instruction |= 0b101 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x30 * (2 ** 15); // rs1
        instruction |= vcore.Regs.x31 * (2 ** 20); // rs2
        instruction |= 0 * (2 ** 25); // funct7
        mem.setByte(92, instruction);
        mem.setByte(93, instruction >>> 8);
        mem.setByte(94, instruction >>> 16);
        mem.setByte(95, instruction >>> 24);
        core.fetchInstruction();
        if ((core.getRegisterValue(vcore.Regs.x9) >>> 0) !== 0b00000000000000000000000000011111) {
            throw Error('testing vcore 27');
        }
        // SUB
        instruction = 0 | vcore.Opcode.OP; // opcode
        instruction |= vcore.Regs.x9 * (2 ** 7); // rd
        instruction |= 0b000 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x30 * (2 ** 15); // rs1
        instruction |= vcore.Regs.x31 * (2 ** 20); // rs2
        instruction |= 32 * (2 ** 25); // funct7
        mem.setByte(96, instruction);
        mem.setByte(97, instruction >>> 8);
        mem.setByte(98, instruction >>> 16);
        mem.setByte(99, instruction >>> 24);
        core.fetchInstruction();
        if ((core.getRegisterValue(vcore.Regs.x9) >>> 0) !== 0b10000000000000000000000000000011) {
            throw Error('testing vcore 28');
        }
        // SRA
        instruction = 0 | vcore.Opcode.OP; // opcode
        instruction |= vcore.Regs.x9 * (2 ** 7); // rd
        instruction |= 0b101 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x30 * (2 ** 15); // rs1
        instruction |= vcore.Regs.x31 * (2 ** 20); // rs2
        instruction |= 32 * (2 ** 25); // funct7
        mem.setByte(100, instruction);
        mem.setByte(101, instruction >>> 8);
        mem.setByte(102, instruction >>> 16);
        mem.setByte(103, instruction >>> 24);
        core.fetchInstruction();
        if ((core.getRegisterValue(vcore.Regs.x9) >>> 0) !== 0b00000000000000000000000000011111) {
            throw Error('testing vcore 29');
        }
        // JAL
        instruction = 0 | vcore.Opcode.JAL; // opcode
        instruction |= vcore.Regs.x15 * (2 ** 7); // rd
        instruction |= core.valueToJimm(8); // imm
        mem.setByte(104, instruction);
        mem.setByte(105, instruction >>> 8);
        mem.setByte(106, instruction >>> 16);
        mem.setByte(107, instruction >>> 24);
        mem.setByte(112, 0b11111111);
        mem.setByte(113, 0b11111111);
        mem.setByte(114, 0b11111111);
        mem.setByte(115, 0b11111111);
        core.fetchInstruction();
        if ((core.getRegisterValue(vcore.Regs.x15) >>> 0) !== 108) {
            throw Error('testing vcore 30');
        }
        try {
            core.fetchInstruction();
        }
        catch (error) {
            const instruction = ((error.message).split(':')).pop();
            if (instruction !== '11111111111111111111111111111111') {
                throw Error('testing vcore 31');
            }
        }
        // JALR
        instruction = 0 | vcore.Opcode.JALR; // opcode
        instruction |= vcore.Regs.x31 * (2 ** 7); // rd
        instruction |= 0b000 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x0 * (2 ** 15); // rs1
        instruction |= 2 * (2 ** 20); // I-imm
        mem.setByte(116, instruction);
        mem.setByte(117, instruction >>> 8);
        mem.setByte(118, instruction >>> 16);
        mem.setByte(119, instruction >>> 24);
        core.fetchInstruction();
        if (core.getRegisterValue(vcore.Regs.x31) !== 120) {
            throw Error('testing vcore 32');
        }
        try {
            core.fetchInstruction();
        }
        catch (error) {
            const msg = (error.message).split(':');
            const ppcValue = msg.pop();
            msg.pop();
            const pcValue = msg.pop();
            if ((ppcValue !== '116') || (pcValue !== '118')) {
                throw Error('testing vcore 33');
            }
        }
        core.setRegisterValue(vcore.Regs.pc, 120, true);
        // BEQ
        instruction = 0 | vcore.Opcode.BRANCH; // opcode
        instruction |= 0b000 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x0 * (2 ** 15); // rs1
        instruction |= vcore.Regs.x0 * (2 ** 20); // rs2
        instruction |= core.valueToBimm(8); // imm
        mem.setByte(120, instruction);
        mem.setByte(121, instruction >>> 8);
        mem.setByte(122, instruction >>> 16);
        mem.setByte(123, instruction >>> 24);
        core.fetchInstruction();
        let pcValue = core.getRegisterValue(vcore.Regs.pc, true) >>> 0;
        let ppcValue = core.getRegisterValue(vcore.Regs.ppc, true) >>> 0;
        if ((pcValue !== 128) || (ppcValue !== 120)) {
            throw Error('testing vcore 34');
        }
        // BNE
        instruction = 0 | vcore.Opcode.BRANCH; // opcode
        instruction |= 0b001 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x0 * (2 ** 15); // rs1
        instruction |= vcore.Regs.x0 * (2 ** 20); // rs2
        instruction |= core.valueToBimm(8); // imm
        mem.setByte(128, instruction);
        mem.setByte(129, instruction >>> 8);
        mem.setByte(130, instruction >>> 16);
        mem.setByte(131, instruction >>> 24);
        core.fetchInstruction();
        pcValue = core.getRegisterValue(vcore.Regs.pc, true) >>> 0;
        ppcValue = core.getRegisterValue(vcore.Regs.ppc, true) >>> 0;
        if ((pcValue !== 132) || (ppcValue !== 128)) {
            throw Error('testing vcore 35');
        }
        // BLT
        instruction = 0 | vcore.Opcode.BRANCH; // opcode
        instruction |= 0b100 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x31 * (2 ** 15); // rs1
        instruction |= vcore.Regs.x0 * (2 ** 20); // rs2
        instruction |= core.valueToBimm(100); // imm
        mem.setByte(132, instruction);
        mem.setByte(133, instruction >>> 8);
        mem.setByte(134, instruction >>> 16);
        mem.setByte(135, instruction >>> 24);
        core.fetchInstruction();
        pcValue = core.getRegisterValue(vcore.Regs.pc, true) >>> 0;
        ppcValue = core.getRegisterValue(vcore.Regs.ppc, true) >>> 0;
        if ((pcValue !== 136) || (ppcValue !== 132)) {
            throw Error('testing vcore 36');
        }
        core.setRegisterValue(vcore.Regs.x1, -1);
        // BLTU
        instruction = 0 | vcore.Opcode.BRANCH; // opcode
        instruction |= 0b110 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x31 * (2 ** 15); // rs1
        instruction |= vcore.Regs.x1 * (2 ** 20); // rs2
        instruction |= core.valueToBimm(100); // imm
        mem.setByte(136, instruction);
        mem.setByte(137, instruction >>> 8);
        mem.setByte(138, instruction >>> 16);
        mem.setByte(139, instruction >>> 24);
        core.fetchInstruction();
        pcValue = core.getRegisterValue(vcore.Regs.pc, true) >>> 0;
        ppcValue = core.getRegisterValue(vcore.Regs.ppc, true) >>> 0;
        if ((pcValue !== 236) || (ppcValue !== 136)) {
            throw Error('testing vcore 37');
        }
        // BGE
        instruction = 0 | vcore.Opcode.BRANCH; // opcode
        instruction |= 0b101 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x31 * (2 ** 15); // rs1
        instruction |= vcore.Regs.x1 * (2 ** 20); // rs2
        instruction |= core.valueToBimm(8); // imm
        mem.setByte(236, instruction);
        mem.setByte(237, instruction >>> 8);
        mem.setByte(238, instruction >>> 16);
        mem.setByte(239, instruction >>> 24);
        core.fetchInstruction();
        pcValue = core.getRegisterValue(vcore.Regs.pc, true) >>> 0;
        ppcValue = core.getRegisterValue(vcore.Regs.ppc, true) >>> 0;
        if ((pcValue !== 244) || (ppcValue !== 236)) {
            throw Error('testing vcore 38');
        }
        // BGEU
        instruction = 0 | vcore.Opcode.BRANCH; // opcode
        instruction |= 0b111 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x31 * (2 ** 15); // rs1
        instruction |= vcore.Regs.x1 * (2 ** 20); // rs2
        instruction |= core.valueToBimm(8); // imm
        mem.setByte(244, instruction);
        mem.setByte(245, instruction >>> 8);
        mem.setByte(246, instruction >>> 16);
        mem.setByte(247, instruction >>> 24);
        core.fetchInstruction();
        pcValue = core.getRegisterValue(vcore.Regs.pc, true) >>> 0;
        ppcValue = core.getRegisterValue(vcore.Regs.ppc, true) >>> 0;
        if ((pcValue !== 248) || (ppcValue !== 244)) {
            throw Error('testing vcore 39');
        }
        // LB
        instruction = 0 | vcore.Opcode.LOAD; // opcode
        instruction |= vcore.Regs.x0 * (2 ** 7); // rd
        instruction |= 0b000 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x31 * (2 ** 15); // rs1
        instruction |= core.valueToIimm(1); // I-imm
        mem.setByte(248, instruction);
        mem.setByte(249, instruction >>> 8);
        mem.setByte(250, instruction >>> 16);
        mem.setByte(251, instruction >>> 24);
        try {
            core.fetchInstruction();
        }
        catch (error) {
            const msg = (error.message).split(':');
            if (msg.pop() !== '00000000000111111000000000000011') {
                throw Error('testing vcore 40');
            }
        }
        instruction = 0 | vcore.Opcode.LOAD; // opcode
        instruction |= vcore.Regs.x1 * (2 ** 7); // rd
        instruction |= 0b000 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x31 * (2 ** 15); // rs1 (120)
        instruction |= core.valueToIimm(-3); // I-imm
        mem.setByte(252, instruction);
        mem.setByte(253, instruction >>> 8);
        mem.setByte(254, instruction >>> 16);
        mem.setByte(255, instruction >>> 24);
        core.fetchInstruction();
        if ((core.getRegisterValue(vcore.Regs.x1)) !== 0b1111) {
            throw Error('testing vcore 41');
        }
        // LH
        instruction = 0 | vcore.Opcode.LOAD; // opcode
        instruction |= vcore.Regs.x1 * (2 ** 7); // rd
        instruction |= 0b001 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x31 * (2 ** 15); // rs1 (120)
        instruction |= core.valueToIimm(-113); // I-imm
        mem.setByte(256, instruction);
        mem.setByte(257, instruction >>> 8);
        mem.setByte(258, instruction >>> 16);
        mem.setByte(259, instruction >>> 24);
        core.fetchInstruction();
        if ((core.getRegisterValue(vcore.Regs.x1)) !== 0b111111111) {
            throw Error('testing vcore 42');
        }
        // LW
        instruction = 0 | vcore.Opcode.LOAD; // opcode
        instruction |= vcore.Regs.x1 * (2 ** 7); // rd
        instruction |= 0b010 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x31 * (2 ** 15); // rs1 (120)
        instruction |= core.valueToIimm(-113); // I-imm
        mem.setByte(260, instruction);
        mem.setByte(261, instruction >>> 8);
        mem.setByte(262, instruction >>> 16);
        mem.setByte(263, instruction >>> 24);
        core.fetchInstruction();
        if ((core.getRegisterValue(vcore.Regs.x1)) !== 0b111000000110000000111111111) {
            throw Error('testing vcore 43');
        }
        // LBU
        instruction = 0 | vcore.Opcode.LOAD; // opcode
        instruction |= vcore.Regs.x1 * (2 ** 7); // rd
        instruction |= 0b100 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x31 * (2 ** 15); // rs1 (120)
        instruction |= core.valueToIimm(-113); // I-imm
        mem.setByte(264, instruction);
        mem.setByte(265, instruction >>> 8);
        mem.setByte(266, instruction >>> 16);
        mem.setByte(267, instruction >>> 24);
        mem.setByte(7, -2);
        core.fetchInstruction();
        if ((core.getRegisterValue(vcore.Regs.x1)) !== 0b11111110) {
            throw Error('testing vcore 44');
        }
        // LHU
        instruction = 0 | vcore.Opcode.LOAD; // opcode
        instruction |= vcore.Regs.x1 * (2 ** 7); // rd
        instruction |= 0b101 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x31 * (2 ** 15); // rs1 (120)
        instruction |= core.valueToIimm(-113); // I-imm
        mem.setByte(268, instruction);
        mem.setByte(269, instruction >>> 8);
        mem.setByte(270, instruction >>> 16);
        mem.setByte(271, instruction >>> 24);
        mem.setByte(8, -2);
        core.fetchInstruction();
        if ((core.getRegisterValue(vcore.Regs.x1)) !== 0b1111111011111110) {
            throw Error('testing vcore 45');
        }
        // SB
        core.setRegisterValue(vcore.Regs.x30, -7);
        instruction = 0 | vcore.Opcode.STORE; // opcode
        instruction |= 0b000 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x31 * (2 ** 15); // rs1 (120)
        instruction |= vcore.Regs.x30 * (2 ** 20); // rs2 (-7)
        instruction |= core.valueToSimm(180); // S-imm
        mem.setByte(272, instruction);
        mem.setByte(273, instruction >>> 8);
        mem.setByte(274, instruction >>> 16);
        mem.setByte(275, instruction >>> 24);
        core.fetchInstruction();
        if (mem.getByte(300) !== 0b11111001) {
            throw Error('testing vcore 46');
        }
        // SH
        mem.setByte(300, 0);
        core.setRegisterValue(vcore.Regs.x30, -7);
        instruction = 0 | vcore.Opcode.STORE; // opcode
        instruction |= 0b001 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x31 * (2 ** 15); // rs1 (120)
        instruction |= vcore.Regs.x30 * (2 ** 20); // rs2 (-7)
        instruction |= core.valueToSimm(180); // S-imm
        mem.setByte(276, instruction);
        mem.setByte(277, instruction >>> 8);
        mem.setByte(278, instruction >>> 16);
        mem.setByte(279, instruction >>> 24);
        core.fetchInstruction();
        let memVal = mem.getByte(300 + 0);
        memVal |= (mem.getByte(300 + 1)) * (2 ** 8);
        if (memVal !== 0b1111111111111001) {
            throw Error('testing vcore 47');
        }
        // SW
        mem.setByte(300, 0);
        mem.setByte(301, 0);
        core.setRegisterValue(vcore.Regs.x30, -7);
        instruction = 0 | vcore.Opcode.STORE; // opcode
        instruction |= 0b010 * (2 ** 12); // funct3
        instruction |= vcore.Regs.x31 * (2 ** 15); // rs1 (120)
        instruction |= vcore.Regs.x30 * (2 ** 20); // rs2 (-7)
        instruction |= core.valueToSimm(180); // S-imm
        mem.setByte(280, instruction);
        mem.setByte(281, instruction >>> 8);
        mem.setByte(282, instruction >>> 16);
        mem.setByte(283, instruction >>> 24);
        core.fetchInstruction();
        memVal = mem.getByte(300 + 0);
        memVal |= (mem.getByte(300 + 1)) * (2 ** 8);
        memVal |= (mem.getByte(300 + 2)) * (2 ** 16);
        memVal |= (mem.getByte(300 + 3)) * (2 ** 24);
        if ((memVal >>> 0) !== 0b11111111111111111111111111111001) {
            throw Error('testing vcore 48');
        }
        // FENCE = NOP
    }
    // All //
    testingAll() {
        console.log('BEGIN TESTING ALL');
        this.testingMemory();
        this.testingVcore();
        console.log('END TESTING ALL');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxNQUFNLE1BQU0sYUFBYSxDQUFBO0FBQ3JDLE9BQU8sS0FBSyxNQUFNLE1BQU0sYUFBYSxDQUFBO0FBQ3JDLE9BQU8sS0FBSyxLQUFLLE1BQU0sWUFBWSxDQUFBO0FBRW5DLE1BQU0sT0FBTyxJQUFJO0lBQ2YsWUFBWTtJQUVaLGFBQWE7UUFDWCxNQUFNLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUNoQixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFDakIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQ3RCLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUNsQixDQUFBO1FBQ0QsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDbkIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzFCLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDeEIsTUFBTSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtTQUNoQztRQUNELElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNyQyxNQUFNLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO1NBQ2hDO0lBQ0gsQ0FBQztJQUVELFdBQVc7SUFFWCxZQUFZO1FBQ1YsTUFBTSxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFDaEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQ2pCLE1BQU0sQ0FB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bkMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsV0FBVyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBQ3BDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQTtRQUNwQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtRQUN2QixNQUFNLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDN0IsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUMzQyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1FBQzVDLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7UUFDNUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsS0FBSyxrQ0FBa0MsRUFBRTtZQUN6RCxNQUFNLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO1NBQ2hDO1FBRUQsY0FBYztJQUNoQixDQUFDO0lBRUQsU0FBUztJQUVULFVBQVU7UUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUE7UUFDaEMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO1FBQ3BCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtRQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUE7SUFDaEMsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbWVtb3J5IGZyb20gJy4vbWVtb3J5LmpzJ1xuaW1wb3J0ICogYXMgY29tbW9uIGZyb20gJy4vY29tbW9uLmpzJ1xuaW1wb3J0ICogYXMgdmNvcmUgZnJvbSAnLi92Y29yZS5qcydcblxuZXhwb3J0IGNsYXNzIFRlc3Qge1xuICAvLyBNZW1vcnkgLy9cblxuICB0ZXN0aW5nTWVtb3J5ICgpOiB2b2lkIHtcbiAgICBjb25zdCBtZW0gPSBuZXcgbWVtb3J5Lk1lbW9yeShcbiAgICAgIGNvbW1vbi5YbGVuLndvcmQsXG4gICAgICBjb21tb24uVmNvdW50Lm9uZSxcbiAgICAgIGNvbW1vbi5NcmNvdW50LmRlZmF1bHQsXG4gICAgICBjb21tb24uTWVtcG93Lm1lZFxuICAgIClcbiAgICBtZW0uc2V0Qnl0ZSgxLCAyNTcpXG4gICAgbWVtLnNldEJ5dGUobWVtLmxlbmd0aCwgMilcbiAgICBpZiAobWVtLmdldEJ5dGUoMCkgIT09IDIpIHtcbiAgICAgIHRocm93IEVycm9yKCd0ZXN0aW5nIG1lbW9yeSAxJylcbiAgICB9XG4gICAgaWYgKG1lbS5nZXRCeXRlKG1lbS5sZW5ndGggKyAxKSAhPT0gMSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ3Rlc3RpbmcgbWVtb3J5IDInKVxuICAgIH1cbiAgfVxuXG4gIC8vIFZjb3JlIC8vXG5cbiAgdGVzdGluZ1Zjb3JlICgpOiB2b2lkIHtcbiAgICBjb25zdCBtZW0gPSBuZXcgbWVtb3J5Lk1lbW9yeShcbiAgICAgIGNvbW1vbi5YbGVuLndvcmQsXG4gICAgICBjb21tb24uVmNvdW50Lm9uZSxcbiAgICAgIGNvbW1vbi5NcmNvdW50LmRlZmF1bHQsXG4gICAgICBjb21tb24uTWVtcG93Lm1lZFxuICAgIClcbiAgICBjb25zdCBjb3JlID0gbmV3IHZjb3JlLlZjb3JlKG1lbSwgY29tbW9uLlZudW0uemVybywgY29tbW9uLklhbGlnbi53b3JkLCBjb21tb24uSWxlbi53b3JkKVxuXG4gICAgLy8gUEMtcmVnaXN0ZXJcbiAgICB0cnkge1xuICAgICAgY29yZS5mZXRjaEluc3RydWN0aW9uKClcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc3QgaW5zdHJ1Y3Rpb24gPSAoKChlcnJvciBhcyBFcnJvcikubWVzc2FnZSkuc3BsaXQoJzonKSkucG9wKClcbiAgICAgIGlmIChpbnN0cnVjdGlvbiAhPT0gJzAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwJykge1xuICAgICAgICBjb25zb2xlLmxvZygoZXJyb3IgYXMgRXJyb3IpLm1lc3NhZ2UpXG4gICAgICAgIHRocm93IEVycm9yKCd0ZXN0aW5nIHZjb3JlIDEnKVxuICAgICAgfVxuICAgIH1cbiAgICBtZW0uc2V0Qnl0ZSg0LCAyNTUpXG4gICAgbWVtLnNldEJ5dGUoNSwgMjU1KVxuICAgIG1lbS5zZXRCeXRlKDYsIDI1NSlcbiAgICBtZW0uc2V0Qnl0ZSg3LCAyNTUpXG4gICAgdHJ5IHtcbiAgICAgIGNvcmUuZmV0Y2hJbnN0cnVjdGlvbigpXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IGluc3RydWN0aW9uID0gKCgoZXJyb3IgYXMgRXJyb3IpLm1lc3NhZ2UpLnNwbGl0KCc6JykpLnBvcCgpXG4gICAgICBpZiAoaW5zdHJ1Y3Rpb24gIT09ICcxMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMScpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ3Rlc3RpbmcgdmNvcmUgMicpXG4gICAgICB9XG4gICAgfVxuICAgIG1lbS5zZXRCeXRlKDgsIDEpXG4gICAgbWVtLnNldEJ5dGUoOSwgMylcbiAgICBtZW0uc2V0Qnl0ZSgxMCwgNylcbiAgICBtZW0uc2V0Qnl0ZSgxMSwgMTUpXG4gICAgdHJ5IHtcbiAgICAgIGNvcmUuZmV0Y2hJbnN0cnVjdGlvbigpXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IGluc3RydWN0aW9uID0gKCgoZXJyb3IgYXMgRXJyb3IpLm1lc3NhZ2UpLnNwbGl0KCc6JykpLnBvcCgpXG4gICAgICBpZiAoaW5zdHJ1Y3Rpb24gIT09ICcwMDAwMTExMTAwMDAwMTExMDAwMDAwMTEwMDAwMDAwMScpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ3Rlc3RpbmcgdmNvcmUgMycpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQURESVxuICAgIGxldCBpbnN0cnVjdGlvbiA9IDAgfCB2Y29yZS5PcGNvZGUuT1BfSU1NIC8vIG9wY29kZVxuICAgIGluc3RydWN0aW9uIHw9IHZjb3JlLlJlZ3MueDMxICogKDIgKiogNykgLy8gcmRcbiAgICBpbnN0cnVjdGlvbiB8PSAwYjAwMCAqICgyICoqIDEyKSAvLyBmdW5jdDNcbiAgICBpbnN0cnVjdGlvbiB8PSB2Y29yZS5SZWdzLngzMCAqICgyICoqIDE1KSAvLyByczFcbiAgICBpbnN0cnVjdGlvbiB8PSA2NCAqICgyICoqIDIwKSAvLyBJLWltbVxuICAgIG1lbS5zZXRCeXRlKDEyLCBpbnN0cnVjdGlvbilcbiAgICBtZW0uc2V0Qnl0ZSgxMywgaW5zdHJ1Y3Rpb24gPj4+IDgpXG4gICAgbWVtLnNldEJ5dGUoMTQsIGluc3RydWN0aW9uID4+PiAxNilcbiAgICBtZW0uc2V0Qnl0ZSgxNSwgaW5zdHJ1Y3Rpb24gPj4+IDI0KVxuICAgIGNvcmUuZmV0Y2hJbnN0cnVjdGlvbigpXG4gICAgaWYgKGNvcmUuZ2V0UmVnaXN0ZXJWYWx1ZSh2Y29yZS5SZWdzLngzMSkgIT09IDY0KSB7XG4gICAgICB0aHJvdyBFcnJvcigndGVzdGluZyB2Y29yZSA0JylcbiAgICB9XG4gICAgaWYgKGNvcmUuZ2V0UmVnaXN0ZXJWYWx1ZSh2Y29yZS5SZWdzLngzMCkgIT09IDY0KSB7XG4gICAgICB0aHJvdyBFcnJvcigndGVzdGluZyB2Y29yZSA1JylcbiAgICB9XG4gICAgaW5zdHJ1Y3Rpb24gPSAwIHwgdmNvcmUuT3Bjb2RlLk9QX0lNTSAvLyBvcGNvZGVcbiAgICBpbnN0cnVjdGlvbiB8PSB2Y29yZS5SZWdzLngzMSAqICgyICoqIDcpIC8vIHJkXG4gICAgaW5zdHJ1Y3Rpb24gfD0gMGIwMDAgKiAoMiAqKiAxMikgLy8gZnVuY3QzXG4gICAgaW5zdHJ1Y3Rpb24gfD0gdmNvcmUuUmVncy54MzAgKiAoMiAqKiAxNSkgLy8gcnMxXG4gICAgaW5zdHJ1Y3Rpb24gfD0gLTcwICogKDIgKiogMjApIC8vIEktaW1tXG4gICAgbWVtLnNldEJ5dGUoMTYsIGluc3RydWN0aW9uKVxuICAgIG1lbS5zZXRCeXRlKDE3LCBpbnN0cnVjdGlvbiA+Pj4gOClcbiAgICBtZW0uc2V0Qnl0ZSgxOCwgaW5zdHJ1Y3Rpb24gPj4+IDE2KVxuICAgIG1lbS5zZXRCeXRlKDE5LCBpbnN0cnVjdGlvbiA+Pj4gMjQpXG4gICAgY29yZS5mZXRjaEluc3RydWN0aW9uKClcbiAgICBpZiAoY29yZS5nZXRSZWdpc3RlclZhbHVlKHZjb3JlLlJlZ3MueDMxKSAhPT0gLTYpIHtcbiAgICAgIHRocm93IEVycm9yKCd0ZXN0aW5nIHZjb3JlIDYnKVxuICAgIH1cbiAgICBpZiAoY29yZS5nZXRSZWdpc3RlclZhbHVlKHZjb3JlLlJlZ3MueDMwKSAhPT0gLTYpIHtcbiAgICAgIHRocm93IEVycm9yKCd0ZXN0aW5nIHZjb3JlIDcnKVxuICAgIH1cblxuICAgIC8vIFNMVElcbiAgICBpbnN0cnVjdGlvbiA9IDAgfCB2Y29yZS5PcGNvZGUuT1BfSU1NIC8vIG9wY29kZVxuICAgIGluc3RydWN0aW9uIHw9IHZjb3JlLlJlZ3MueDIwICogKDIgKiogNykgLy8gcmRcbiAgICBpbnN0cnVjdGlvbiB8PSAwYjAxMCAqICgyICoqIDEyKSAvLyBmdW5jdDNcbiAgICBpbnN0cnVjdGlvbiB8PSB2Y29yZS5SZWdzLngxMCAqICgyICoqIDE1KSAvLyByczFcbiAgICBpbnN0cnVjdGlvbiB8PSA2NCAqICgyICoqIDIwKSAvLyBJLWltbVxuICAgIG1lbS5zZXRCeXRlKDIwLCBpbnN0cnVjdGlvbilcbiAgICBtZW0uc2V0Qnl0ZSgyMSwgaW5zdHJ1Y3Rpb24gPj4+IDgpXG4gICAgbWVtLnNldEJ5dGUoMjIsIGluc3RydWN0aW9uID4+PiAxNilcbiAgICBtZW0uc2V0Qnl0ZSgyMywgaW5zdHJ1Y3Rpb24gPj4+IDI0KVxuICAgIGNvcmUuZmV0Y2hJbnN0cnVjdGlvbigpXG4gICAgaWYgKGNvcmUuZ2V0UmVnaXN0ZXJWYWx1ZSh2Y29yZS5SZWdzLngyMCkgIT09IDEpIHtcbiAgICAgIHRocm93IEVycm9yKCd0ZXN0aW5nIHZjb3JlIDgnKVxuICAgIH1cbiAgICBpZiAoY29yZS5nZXRSZWdpc3RlclZhbHVlKHZjb3JlLlJlZ3MueDEwKSAhPT0gMCkge1xuICAgICAgdGhyb3cgRXJyb3IoJ3Rlc3RpbmcgdmNvcmUgOScpXG4gICAgfVxuICAgIGluc3RydWN0aW9uID0gMCB8IHZjb3JlLk9wY29kZS5PUF9JTU0gLy8gb3Bjb2RlXG4gICAgaW5zdHJ1Y3Rpb24gfD0gdmNvcmUuUmVncy54MjAgKiAoMiAqKiA3KSAvLyByZFxuICAgIGluc3RydWN0aW9uIHw9IDBiMDEwICogKDIgKiogMTIpIC8vIGZ1bmN0M1xuICAgIGluc3RydWN0aW9uIHw9IHZjb3JlLlJlZ3MueDIwICogKDIgKiogMTUpIC8vIHJzMVxuICAgIGluc3RydWN0aW9uIHw9IC0xICogKDIgKiogMjApIC8vIEktaW1tXG4gICAgbWVtLnNldEJ5dGUoMjQsIGluc3RydWN0aW9uKVxuICAgIG1lbS5zZXRCeXRlKDI1LCBpbnN0cnVjdGlvbiA+Pj4gOClcbiAgICBtZW0uc2V0Qnl0ZSgyNiwgaW5zdHJ1Y3Rpb24gPj4+IDE2KVxuICAgIG1lbS5zZXRCeXRlKDI3LCBpbnN0cnVjdGlvbiA+Pj4gMjQpXG4gICAgY29yZS5mZXRjaEluc3RydWN0aW9uKClcbiAgICBpZiAoY29yZS5nZXRSZWdpc3RlclZhbHVlKHZjb3JlLlJlZ3MueDIwKSAhPT0gMCkge1xuICAgICAgdGhyb3cgRXJyb3IoJ3Rlc3RpbmcgdmNvcmUgMTAnKVxuICAgIH1cblxuICAgIC8vIFNMVElVXG4gICAgaW5zdHJ1Y3Rpb24gPSAwIHwgdmNvcmUuT3Bjb2RlLk9QX0lNTSAvLyBvcGNvZGVcbiAgICBpbnN0cnVjdGlvbiB8PSB2Y29yZS5SZWdzLngzMCAqICgyICoqIDcpIC8vIHJkXG4gICAgaW5zdHJ1Y3Rpb24gfD0gMGIwMTEgKiAoMiAqKiAxMikgLy8gZnVuY3QzXG4gICAgaW5zdHJ1Y3Rpb24gfD0gdmNvcmUuUmVncy54MzEgKiAoMiAqKiAxNSkgLy8gcnMxXG4gICAgaW5zdHJ1Y3Rpb24gfD0gNjQgKiAoMiAqKiAyMCkgLy8gSS1pbW1cbiAgICBtZW0uc2V0Qnl0ZSgyOCwgaW5zdHJ1Y3Rpb24pXG4gICAgbWVtLnNldEJ5dGUoMjksIGluc3RydWN0aW9uID4+PiA4KVxuICAgIG1lbS5zZXRCeXRlKDMwLCBpbnN0cnVjdGlvbiA+Pj4gMTYpXG4gICAgbWVtLnNldEJ5dGUoMzEsIGluc3RydWN0aW9uID4+PiAyNClcbiAgICBjb3JlLmZldGNoSW5zdHJ1Y3Rpb24oKVxuICAgIGlmIChjb3JlLmdldFJlZ2lzdGVyVmFsdWUodmNvcmUuUmVncy54MzApICE9PSAwKSB7XG4gICAgICB0aHJvdyBFcnJvcigndGVzdGluZyB2Y29yZSAxMScpXG4gICAgfVxuXG4gICAgLy8gQU5ESVxuICAgIGluc3RydWN0aW9uID0gMCB8IHZjb3JlLk9wY29kZS5PUF9JTU0gLy8gb3Bjb2RlXG4gICAgaW5zdHJ1Y3Rpb24gfD0gdmNvcmUuUmVncy54MzAgKiAoMiAqKiA3KSAvLyByZFxuICAgIGluc3RydWN0aW9uIHw9IDBiMTExICogKDIgKiogMTIpIC8vIGZ1bmN0M1xuICAgIGluc3RydWN0aW9uIHw9IHZjb3JlLlJlZ3MueDMxICogKDIgKiogMTUpIC8vIHJzMVxuICAgIGluc3RydWN0aW9uIHw9IDYgKiAoMiAqKiAyMCkgLy8gSS1pbW1cbiAgICBtZW0uc2V0Qnl0ZSgzMiwgaW5zdHJ1Y3Rpb24pXG4gICAgbWVtLnNldEJ5dGUoMzMsIGluc3RydWN0aW9uID4+PiA4KVxuICAgIG1lbS5zZXRCeXRlKDM0LCBpbnN0cnVjdGlvbiA+Pj4gMTYpXG4gICAgbWVtLnNldEJ5dGUoMzUsIGluc3RydWN0aW9uID4+PiAyNClcbiAgICBjb3JlLmZldGNoSW5zdHJ1Y3Rpb24oKVxuICAgIGlmIChjb3JlLmdldFJlZ2lzdGVyVmFsdWUodmNvcmUuUmVncy54MzApICE9PSAyKSB7XG4gICAgICB0aHJvdyBFcnJvcigndGVzdGluZyB2Y29yZSAxMicpXG4gICAgfVxuXG4gICAgLy8gT1JJXG4gICAgaW5zdHJ1Y3Rpb24gPSAwIHwgdmNvcmUuT3Bjb2RlLk9QX0lNTSAvLyBvcGNvZGVcbiAgICBpbnN0cnVjdGlvbiB8PSB2Y29yZS5SZWdzLngzMCAqICgyICoqIDcpIC8vIHJkXG4gICAgaW5zdHJ1Y3Rpb24gfD0gMGIxMTAgKiAoMiAqKiAxMikgLy8gZnVuY3QzXG4gICAgaW5zdHJ1Y3Rpb24gfD0gdmNvcmUuUmVncy54MzEgKiAoMiAqKiAxNSkgLy8gcnMxXG4gICAgaW5zdHJ1Y3Rpb24gfD0gNiAqICgyICoqIDIwKSAvLyBJLWltbVxuICAgIG1lbS5zZXRCeXRlKDM2LCBpbnN0cnVjdGlvbilcbiAgICBtZW0uc2V0Qnl0ZSgzNywgaW5zdHJ1Y3Rpb24gPj4+IDgpXG4gICAgbWVtLnNldEJ5dGUoMzgsIGluc3RydWN0aW9uID4+PiAxNilcbiAgICBtZW0uc2V0Qnl0ZSgzOSwgaW5zdHJ1Y3Rpb24gPj4+IDI0KVxuICAgIGNvcmUuZmV0Y2hJbnN0cnVjdGlvbigpXG4gICAgaWYgKGNvcmUuZ2V0UmVnaXN0ZXJWYWx1ZSh2Y29yZS5SZWdzLngzMCkgIT09IC0yKSB7XG4gICAgICB0aHJvdyBFcnJvcigndGVzdGluZyB2Y29yZSAxMycpXG4gICAgfVxuXG4gICAgLy8gWE9SSVxuICAgIGluc3RydWN0aW9uID0gMCB8IHZjb3JlLk9wY29kZS5PUF9JTU0gLy8gb3Bjb2RlXG4gICAgaW5zdHJ1Y3Rpb24gfD0gdmNvcmUuUmVncy54MzAgKiAoMiAqKiA3KSAvLyByZFxuICAgIGluc3RydWN0aW9uIHw9IDBiMTAwICogKDIgKiogMTIpIC8vIGZ1bmN0M1xuICAgIGluc3RydWN0aW9uIHw9IHZjb3JlLlJlZ3MueDMxICogKDIgKiogMTUpIC8vIHJzMVxuICAgIGluc3RydWN0aW9uIHw9IDYgKiAoMiAqKiAyMCkgLy8gSS1pbW1cbiAgICBtZW0uc2V0Qnl0ZSg0MCwgaW5zdHJ1Y3Rpb24pXG4gICAgbWVtLnNldEJ5dGUoNDEsIGluc3RydWN0aW9uID4+PiA4KVxuICAgIG1lbS5zZXRCeXRlKDQyLCBpbnN0cnVjdGlvbiA+Pj4gMTYpXG4gICAgbWVtLnNldEJ5dGUoNDMsIGluc3RydWN0aW9uID4+PiAyNClcbiAgICBjb3JlLmZldGNoSW5zdHJ1Y3Rpb24oKVxuICAgIGlmIChjb3JlLmdldFJlZ2lzdGVyVmFsdWUodmNvcmUuUmVncy54MzApICE9PSAtNCkge1xuICAgICAgdGhyb3cgRXJyb3IoJ3Rlc3RpbmcgdmNvcmUgMTQnKVxuICAgIH1cblxuICAgIC8vIFNMTElcbiAgICBpbnN0cnVjdGlvbiA9IDAgfCB2Y29yZS5PcGNvZGUuT1BfSU1NIC8vIG9wY29kZVxuICAgIGluc3RydWN0aW9uIHw9IHZjb3JlLlJlZ3MueDMwICogKDIgKiogNykgLy8gcmRcbiAgICBpbnN0cnVjdGlvbiB8PSAwYjAwMSAqICgyICoqIDEyKSAvLyBmdW5jdDNcbiAgICBpbnN0cnVjdGlvbiB8PSB2Y29yZS5SZWdzLngzMSAqICgyICoqIDE1KSAvLyByczFcbiAgICBsZXQgc2hhbXQgPSAxICogKDIgKiogMjApXG4gICAgbGV0IHVwcGVySW1tID0gMCAqICgyICoqIDI1KVxuICAgIGluc3RydWN0aW9uIHw9IHNoYW10IHwgdXBwZXJJbW0gLy8gSS1pbW1cbiAgICBtZW0uc2V0Qnl0ZSg0NCwgaW5zdHJ1Y3Rpb24pXG4gICAgbWVtLnNldEJ5dGUoNDUsIGluc3RydWN0aW9uID4+PiA4KVxuICAgIG1lbS5zZXRCeXRlKDQ2LCBpbnN0cnVjdGlvbiA+Pj4gMTYpXG4gICAgbWVtLnNldEJ5dGUoNDcsIGluc3RydWN0aW9uID4+PiAyNClcbiAgICBjb3JlLmZldGNoSW5zdHJ1Y3Rpb24oKVxuICAgIGlmIChjb3JlLmdldFJlZ2lzdGVyVmFsdWUodmNvcmUuUmVncy54MzApICE9PSAtMTIpIHtcbiAgICAgIHRocm93IEVycm9yKCd0ZXN0aW5nIHZjb3JlIDE1JylcbiAgICB9XG5cbiAgICAvLyBTUkFJXG4gICAgaW5zdHJ1Y3Rpb24gPSAwIHwgdmNvcmUuT3Bjb2RlLk9QX0lNTSAvLyBvcGNvZGVcbiAgICBpbnN0cnVjdGlvbiB8PSB2Y29yZS5SZWdzLngzMCAqICgyICoqIDcpIC8vIHJkXG4gICAgaW5zdHJ1Y3Rpb24gfD0gMGIxMDEgKiAoMiAqKiAxMikgLy8gZnVuY3QzXG4gICAgaW5zdHJ1Y3Rpb24gfD0gdmNvcmUuUmVncy54MzEgKiAoMiAqKiAxNSkgLy8gcnMxXG4gICAgc2hhbXQgPSAxICogKDIgKiogMjApXG4gICAgdXBwZXJJbW0gPSAzMiAqICgyICoqIDI1KVxuICAgIGluc3RydWN0aW9uIHw9IHNoYW10IHwgdXBwZXJJbW0gLy8gSS1pbW1cbiAgICBtZW0uc2V0Qnl0ZSg0OCwgaW5zdHJ1Y3Rpb24pXG4gICAgbWVtLnNldEJ5dGUoNDksIGluc3RydWN0aW9uID4+PiA4KVxuICAgIG1lbS5zZXRCeXRlKDUwLCBpbnN0cnVjdGlvbiA+Pj4gMTYpXG4gICAgbWVtLnNldEJ5dGUoNTEsIGluc3RydWN0aW9uID4+PiAyNClcbiAgICBjb3JlLmZldGNoSW5zdHJ1Y3Rpb24oKVxuICAgIGlmIChjb3JlLmdldFJlZ2lzdGVyVmFsdWUodmNvcmUuUmVncy54MzApICE9PSAtMykge1xuICAgICAgdGhyb3cgRXJyb3IoJ3Rlc3RpbmcgdmNvcmUgMTYnKVxuICAgIH1cblxuICAgIC8vIFNSTElcbiAgICBpbnN0cnVjdGlvbiA9IDAgfCB2Y29yZS5PcGNvZGUuT1BfSU1NIC8vIG9wY29kZVxuICAgIGluc3RydWN0aW9uIHw9IHZjb3JlLlJlZ3MueDMwICogKDIgKiogNykgLy8gcmRcbiAgICBpbnN0cnVjdGlvbiB8PSAwYjEwMSAqICgyICoqIDEyKSAvLyBmdW5jdDNcbiAgICBpbnN0cnVjdGlvbiB8PSB2Y29yZS5SZWdzLngzMSAqICgyICoqIDE1KSAvLyByczFcbiAgICBzaGFtdCA9IDEgKiAoMiAqKiAyMClcbiAgICB1cHBlckltbSA9IDAgKiAoMiAqKiAyNSlcbiAgICBpbnN0cnVjdGlvbiB8PSBzaGFtdCB8IHVwcGVySW1tIC8vIEktaW1tXG4gICAgbWVtLnNldEJ5dGUoNTIsIGluc3RydWN0aW9uKVxuICAgIG1lbS5zZXRCeXRlKDUzLCBpbnN0cnVjdGlvbiA+Pj4gOClcbiAgICBtZW0uc2V0Qnl0ZSg1NCwgaW5zdHJ1Y3Rpb24gPj4+IDE2KVxuICAgIG1lbS5zZXRCeXRlKDU1LCBpbnN0cnVjdGlvbiA+Pj4gMjQpXG4gICAgY29yZS5mZXRjaEluc3RydWN0aW9uKClcbiAgICBpZiAoY29yZS5nZXRSZWdpc3RlclZhbHVlKHZjb3JlLlJlZ3MueDMwKSAhPT0gMGIwMTExMTExMTExMTExMTExMTExMTExMTExMTExMTEwMSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ3Rlc3RpbmcgdmNvcmUgMTcnKVxuICAgIH1cblxuICAgIC8vIExVSVxuICAgIGluc3RydWN0aW9uID0gMCB8IHZjb3JlLk9wY29kZS5MVUkgLy8gb3Bjb2RlXG4gICAgaW5zdHJ1Y3Rpb24gfD0gdmNvcmUuUmVncy54MTAgKiAoMiAqKiA3KSAvLyByZFxuICAgIGluc3RydWN0aW9uIHw9IDEgKiAoMiAqKiAzMSkgLy8gVS1pbW1cbiAgICBtZW0uc2V0Qnl0ZSg1NiwgaW5zdHJ1Y3Rpb24pXG4gICAgbWVtLnNldEJ5dGUoNTcsIGluc3RydWN0aW9uID4+PiA4KVxuICAgIG1lbS5zZXRCeXRlKDU4LCBpbnN0cnVjdGlvbiA+Pj4gMTYpXG4gICAgbWVtLnNldEJ5dGUoNTksIGluc3RydWN0aW9uID4+PiAyNClcbiAgICBjb3JlLmZldGNoSW5zdHJ1Y3Rpb24oKVxuICAgIGlmICgoY29yZS5nZXRSZWdpc3RlclZhbHVlKHZjb3JlLlJlZ3MueDEwKSA+Pj4gMCkgIT09IDBiMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDApIHtcbiAgICAgIHRocm93IEVycm9yKCd0ZXN0aW5nIHZjb3JlIDE4JylcbiAgICB9XG5cbiAgICAvLyBBVUlQQ1xuICAgIGluc3RydWN0aW9uID0gMCB8IHZjb3JlLk9wY29kZS5BVUlQQyAvLyBvcGNvZGVcbiAgICBpbnN0cnVjdGlvbiB8PSB2Y29yZS5SZWdzLngxMCAqICgyICoqIDcpIC8vIHJkXG4gICAgaW5zdHJ1Y3Rpb24gfD0gMSAqICgyICoqIDMxKSAvLyBVLWltbVxuICAgIG1lbS5zZXRCeXRlKDYwLCBpbnN0cnVjdGlvbilcbiAgICBtZW0uc2V0Qnl0ZSg2MSwgaW5zdHJ1Y3Rpb24gPj4+IDgpXG4gICAgbWVtLnNldEJ5dGUoNjIsIGluc3RydWN0aW9uID4+PiAxNilcbiAgICBtZW0uc2V0Qnl0ZSg2MywgaW5zdHJ1Y3Rpb24gPj4+IDI0KVxuICAgIGNvcmUuZmV0Y2hJbnN0cnVjdGlvbigpXG4gICAgaWYgKChjb3JlLmdldFJlZ2lzdGVyVmFsdWUodmNvcmUuUmVncy54MTApID4+PiAwKSAhPT0gMGIxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDExMTEwMCkge1xuICAgICAgdGhyb3cgRXJyb3IoJ3Rlc3RpbmcgdmNvcmUgMTknKVxuICAgIH1cblxuICAgIC8vIEFERFxuICAgIGluc3RydWN0aW9uID0gMCB8IHZjb3JlLk9wY29kZS5PUCAvLyBvcGNvZGVcbiAgICBpbnN0cnVjdGlvbiB8PSB2Y29yZS5SZWdzLng5ICogKDIgKiogNykgLy8gcmRcbiAgICBpbnN0cnVjdGlvbiB8PSAwYjAwMCAqICgyICoqIDEyKSAvLyBmdW5jdDNcbiAgICBpbnN0cnVjdGlvbiB8PSB2Y29yZS5SZWdzLngzMCAqICgyICoqIDE1KSAvLyByczFcbiAgICBpbnN0cnVjdGlvbiB8PSB2Y29yZS5SZWdzLngzMSAqICgyICoqIDIwKSAvLyByczJcbiAgICBpbnN0cnVjdGlvbiB8PSAwICogKDIgKiogMjUpIC8vIGZ1bmN0N1xuICAgIG1lbS5zZXRCeXRlKDY0LCBpbnN0cnVjdGlvbilcbiAgICBtZW0uc2V0Qnl0ZSg2NSwgaW5zdHJ1Y3Rpb24gPj4+IDgpXG4gICAgbWVtLnNldEJ5dGUoNjYsIGluc3RydWN0aW9uID4+PiAxNilcbiAgICBtZW0uc2V0Qnl0ZSg2NywgaW5zdHJ1Y3Rpb24gPj4+IDI0KVxuICAgIGNvcmUuZmV0Y2hJbnN0cnVjdGlvbigpXG4gICAgaWYgKChjb3JlLmdldFJlZ2lzdGVyVmFsdWUodmNvcmUuUmVncy54OSkgPj4+IDApICE9PSAwYjAxMTExMTExMTExMTExMTExMTExMTExMTExMTEwMTExKSB7XG4gICAgICB0aHJvdyBFcnJvcigndGVzdGluZyB2Y29yZSAyMCcpXG4gICAgfVxuXG4gICAgLy8gU0xUXG4gICAgaW5zdHJ1Y3Rpb24gPSAwIHwgdmNvcmUuT3Bjb2RlLk9QIC8vIG9wY29kZVxuICAgIGluc3RydWN0aW9uIHw9IHZjb3JlLlJlZ3MueDkgKiAoMiAqKiA3KSAvLyByZFxuICAgIGluc3RydWN0aW9uIHw9IDBiMDEwICogKDIgKiogMTIpIC8vIGZ1bmN0M1xuICAgIGluc3RydWN0aW9uIHw9IHZjb3JlLlJlZ3MueDMwICogKDIgKiogMTUpIC8vIHJzMVxuICAgIGluc3RydWN0aW9uIHw9IHZjb3JlLlJlZ3MueDMxICogKDIgKiogMjApIC8vIHJzMlxuICAgIGluc3RydWN0aW9uIHw9IDAgKiAoMiAqKiAyNSkgLy8gZnVuY3Q3XG4gICAgbWVtLnNldEJ5dGUoNjgsIGluc3RydWN0aW9uKVxuICAgIG1lbS5zZXRCeXRlKDY5LCBpbnN0cnVjdGlvbiA+Pj4gOClcbiAgICBtZW0uc2V0Qnl0ZSg3MCwgaW5zdHJ1Y3Rpb24gPj4+IDE2KVxuICAgIG1lbS5zZXRCeXRlKDcxLCBpbnN0cnVjdGlvbiA+Pj4gMjQpXG4gICAgY29yZS5mZXRjaEluc3RydWN0aW9uKClcbiAgICBpZiAoKGNvcmUuZ2V0UmVnaXN0ZXJWYWx1ZSh2Y29yZS5SZWdzLng5KSA+Pj4gMCkgIT09IDApIHtcbiAgICAgIHRocm93IEVycm9yKCd0ZXN0aW5nIHZjb3JlIDIxJylcbiAgICB9XG5cbiAgICAvLyBTTFRVXG4gICAgaW5zdHJ1Y3Rpb24gPSAwIHwgdmNvcmUuT3Bjb2RlLk9QIC8vIG9wY29kZVxuICAgIGluc3RydWN0aW9uIHw9IHZjb3JlLlJlZ3MueDkgKiAoMiAqKiA3KSAvLyByZFxuICAgIGluc3RydWN0aW9uIHw9IDBiMDExICogKDIgKiogMTIpIC8vIGZ1bmN0M1xuICAgIGluc3RydWN0aW9uIHw9IHZjb3JlLlJlZ3MueDMwICogKDIgKiogMTUpIC8vIHJzMVxuICAgIGluc3RydWN0aW9uIHw9IHZjb3JlLlJlZ3MueDMxICogKDIgKiogMjApIC8vIHJzMlxuICAgIGluc3RydWN0aW9uIHw9IDAgKiAoMiAqKiAyNSkgLy8gZnVuY3Q3XG4gICAgbWVtLnNldEJ5dGUoNzIsIGluc3RydWN0aW9uKVxuICAgIG1lbS5zZXRCeXRlKDczLCBpbnN0cnVjdGlvbiA+Pj4gOClcbiAgICBtZW0uc2V0Qnl0ZSg3NCwgaW5zdHJ1Y3Rpb24gPj4+IDE2KVxuICAgIG1lbS5zZXRCeXRlKDc1LCBpbnN0cnVjdGlvbiA+Pj4gMjQpXG4gICAgY29yZS5mZXRjaEluc3RydWN0aW9uKClcbiAgICBpZiAoKGNvcmUuZ2V0UmVnaXN0ZXJWYWx1ZSh2Y29yZS5SZWdzLng5KSA+Pj4gMCkgIT09IDEpIHtcbiAgICAgIHRocm93IEVycm9yKCd0ZXN0aW5nIHZjb3JlIDIyJylcbiAgICB9XG5cbiAgICAvLyBBTkRcbiAgICBpbnN0cnVjdGlvbiA9IDAgfCB2Y29yZS5PcGNvZGUuT1AgLy8gb3Bjb2RlXG4gICAgaW5zdHJ1Y3Rpb24gfD0gdmNvcmUuUmVncy54OSAqICgyICoqIDcpIC8vIHJkXG4gICAgaW5zdHJ1Y3Rpb24gfD0gMGIxMTEgKiAoMiAqKiAxMikgLy8gZnVuY3QzXG4gICAgaW5zdHJ1Y3Rpb24gfD0gdmNvcmUuUmVncy54MzAgKiAoMiAqKiAxNSkgLy8gcnMxXG4gICAgaW5zdHJ1Y3Rpb24gfD0gdmNvcmUuUmVncy54MzEgKiAoMiAqKiAyMCkgLy8gcnMyXG4gICAgaW5zdHJ1Y3Rpb24gfD0gMCAqICgyICoqIDI1KSAvLyBmdW5jdDdcbiAgICBtZW0uc2V0Qnl0ZSg3NiwgaW5zdHJ1Y3Rpb24pXG4gICAgbWVtLnNldEJ5dGUoNzcsIGluc3RydWN0aW9uID4+PiA4KVxuICAgIG1lbS5zZXRCeXRlKDc4LCBpbnN0cnVjdGlvbiA+Pj4gMTYpXG4gICAgbWVtLnNldEJ5dGUoNzksIGluc3RydWN0aW9uID4+PiAyNClcbiAgICBjb3JlLmZldGNoSW5zdHJ1Y3Rpb24oKVxuICAgIGlmICgoY29yZS5nZXRSZWdpc3RlclZhbHVlKHZjb3JlLlJlZ3MueDkpID4+PiAwKSAhPT0gMGIwMTExMTExMTExMTExMTExMTExMTExMTExMTExMTAwMCkge1xuICAgICAgdGhyb3cgRXJyb3IoJ3Rlc3RpbmcgdmNvcmUgMjMnKVxuICAgIH1cblxuICAgIC8vIE9SXG4gICAgaW5zdHJ1Y3Rpb24gPSAwIHwgdmNvcmUuT3Bjb2RlLk9QIC8vIG9wY29kZVxuICAgIGluc3RydWN0aW9uIHw9IHZjb3JlLlJlZ3MueDkgKiAoMiAqKiA3KSAvLyByZFxuICAgIGluc3RydWN0aW9uIHw9IDBiMTEwICogKDIgKiogMTIpIC8vIGZ1bmN0M1xuICAgIGluc3RydWN0aW9uIHw9IHZjb3JlLlJlZ3MueDMwICogKDIgKiogMTUpIC8vIHJzMVxuICAgIGluc3RydWN0aW9uIHw9IHZjb3JlLlJlZ3MueDMxICogKDIgKiogMjApIC8vIHJzMlxuICAgIGluc3RydWN0aW9uIHw9IDAgKiAoMiAqKiAyNSkgLy8gZnVuY3Q3XG4gICAgbWVtLnNldEJ5dGUoODAsIGluc3RydWN0aW9uKVxuICAgIG1lbS5zZXRCeXRlKDgxLCBpbnN0cnVjdGlvbiA+Pj4gOClcbiAgICBtZW0uc2V0Qnl0ZSg4MiwgaW5zdHJ1Y3Rpb24gPj4+IDE2KVxuICAgIG1lbS5zZXRCeXRlKDgzLCBpbnN0cnVjdGlvbiA+Pj4gMjQpXG4gICAgY29yZS5mZXRjaEluc3RydWN0aW9uKClcbiAgICBpZiAoKGNvcmUuZ2V0UmVnaXN0ZXJWYWx1ZSh2Y29yZS5SZWdzLng5KSA+Pj4gMCkgIT09IDBiMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTEpIHtcbiAgICAgIHRocm93IEVycm9yKCd0ZXN0aW5nIHZjb3JlIDI0JylcbiAgICB9XG5cbiAgICAvLyBYT1JcbiAgICBpbnN0cnVjdGlvbiA9IDAgfCB2Y29yZS5PcGNvZGUuT1AgLy8gb3Bjb2RlXG4gICAgaW5zdHJ1Y3Rpb24gfD0gdmNvcmUuUmVncy54OSAqICgyICoqIDcpIC8vIHJkXG4gICAgaW5zdHJ1Y3Rpb24gfD0gMGIxMDAgKiAoMiAqKiAxMikgLy8gZnVuY3QzXG4gICAgaW5zdHJ1Y3Rpb24gfD0gdmNvcmUuUmVncy54MzAgKiAoMiAqKiAxNSkgLy8gcnMxXG4gICAgaW5zdHJ1Y3Rpb24gfD0gdmNvcmUuUmVncy54MzEgKiAoMiAqKiAyMCkgLy8gcnMyXG4gICAgaW5zdHJ1Y3Rpb24gfD0gMCAqICgyICoqIDI1KSAvLyBmdW5jdDdcbiAgICBtZW0uc2V0Qnl0ZSg4NCwgaW5zdHJ1Y3Rpb24pXG4gICAgbWVtLnNldEJ5dGUoODUsIGluc3RydWN0aW9uID4+PiA4KVxuICAgIG1lbS5zZXRCeXRlKDg2LCBpbnN0cnVjdGlvbiA+Pj4gMTYpXG4gICAgbWVtLnNldEJ5dGUoODcsIGluc3RydWN0aW9uID4+PiAyNClcbiAgICBjb3JlLmZldGNoSW5zdHJ1Y3Rpb24oKVxuICAgIGlmICgoY29yZS5nZXRSZWdpc3RlclZhbHVlKHZjb3JlLlJlZ3MueDkpID4+PiAwKSAhPT0gMGIxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDExMSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ3Rlc3RpbmcgdmNvcmUgMjUnKVxuICAgIH1cblxuICAgIC8vIFNMTFxuICAgIGluc3RydWN0aW9uID0gMCB8IHZjb3JlLk9wY29kZS5PUCAvLyBvcGNvZGVcbiAgICBpbnN0cnVjdGlvbiB8PSB2Y29yZS5SZWdzLng5ICogKDIgKiogNykgLy8gcmRcbiAgICBpbnN0cnVjdGlvbiB8PSAwYjAwMSAqICgyICoqIDEyKSAvLyBmdW5jdDNcbiAgICBpbnN0cnVjdGlvbiB8PSB2Y29yZS5SZWdzLngzMCAqICgyICoqIDE1KSAvLyByczFcbiAgICBpbnN0cnVjdGlvbiB8PSB2Y29yZS5SZWdzLngzMSAqICgyICoqIDIwKSAvLyByczJcbiAgICBpbnN0cnVjdGlvbiB8PSAwICogKDIgKiogMjUpIC8vIGZ1bmN0N1xuICAgIG1lbS5zZXRCeXRlKDg4LCBpbnN0cnVjdGlvbilcbiAgICBtZW0uc2V0Qnl0ZSg4OSwgaW5zdHJ1Y3Rpb24gPj4+IDgpXG4gICAgbWVtLnNldEJ5dGUoOTAsIGluc3RydWN0aW9uID4+PiAxNilcbiAgICBtZW0uc2V0Qnl0ZSg5MSwgaW5zdHJ1Y3Rpb24gPj4+IDI0KVxuICAgIGNvcmUuZmV0Y2hJbnN0cnVjdGlvbigpXG4gICAgaWYgKChjb3JlLmdldFJlZ2lzdGVyVmFsdWUodmNvcmUuUmVncy54OSkgPj4+IDApICE9PSAwYjExMTEwMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwKSB7XG4gICAgICB0aHJvdyBFcnJvcigndGVzdGluZyB2Y29yZSAyNicpXG4gICAgfVxuXG4gICAgLy8gU1JMXG4gICAgaW5zdHJ1Y3Rpb24gPSAwIHwgdmNvcmUuT3Bjb2RlLk9QIC8vIG9wY29kZVxuICAgIGluc3RydWN0aW9uIHw9IHZjb3JlLlJlZ3MueDkgKiAoMiAqKiA3KSAvLyByZFxuICAgIGluc3RydWN0aW9uIHw9IDBiMTAxICogKDIgKiogMTIpIC8vIGZ1bmN0M1xuICAgIGluc3RydWN0aW9uIHw9IHZjb3JlLlJlZ3MueDMwICogKDIgKiogMTUpIC8vIHJzMVxuICAgIGluc3RydWN0aW9uIHw9IHZjb3JlLlJlZ3MueDMxICogKDIgKiogMjApIC8vIHJzMlxuICAgIGluc3RydWN0aW9uIHw9IDAgKiAoMiAqKiAyNSkgLy8gZnVuY3Q3XG4gICAgbWVtLnNldEJ5dGUoOTIsIGluc3RydWN0aW9uKVxuICAgIG1lbS5zZXRCeXRlKDkzLCBpbnN0cnVjdGlvbiA+Pj4gOClcbiAgICBtZW0uc2V0Qnl0ZSg5NCwgaW5zdHJ1Y3Rpb24gPj4+IDE2KVxuICAgIG1lbS5zZXRCeXRlKDk1LCBpbnN0cnVjdGlvbiA+Pj4gMjQpXG4gICAgY29yZS5mZXRjaEluc3RydWN0aW9uKClcbiAgICBpZiAoKGNvcmUuZ2V0UmVnaXN0ZXJWYWx1ZSh2Y29yZS5SZWdzLng5KSA+Pj4gMCkgIT09IDBiMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMTExMTEpIHtcbiAgICAgIHRocm93IEVycm9yKCd0ZXN0aW5nIHZjb3JlIDI3JylcbiAgICB9XG5cbiAgICAvLyBTVUJcbiAgICBpbnN0cnVjdGlvbiA9IDAgfCB2Y29yZS5PcGNvZGUuT1AgLy8gb3Bjb2RlXG4gICAgaW5zdHJ1Y3Rpb24gfD0gdmNvcmUuUmVncy54OSAqICgyICoqIDcpIC8vIHJkXG4gICAgaW5zdHJ1Y3Rpb24gfD0gMGIwMDAgKiAoMiAqKiAxMikgLy8gZnVuY3QzXG4gICAgaW5zdHJ1Y3Rpb24gfD0gdmNvcmUuUmVncy54MzAgKiAoMiAqKiAxNSkgLy8gcnMxXG4gICAgaW5zdHJ1Y3Rpb24gfD0gdmNvcmUuUmVncy54MzEgKiAoMiAqKiAyMCkgLy8gcnMyXG4gICAgaW5zdHJ1Y3Rpb24gfD0gMzIgKiAoMiAqKiAyNSkgLy8gZnVuY3Q3XG4gICAgbWVtLnNldEJ5dGUoOTYsIGluc3RydWN0aW9uKVxuICAgIG1lbS5zZXRCeXRlKDk3LCBpbnN0cnVjdGlvbiA+Pj4gOClcbiAgICBtZW0uc2V0Qnl0ZSg5OCwgaW5zdHJ1Y3Rpb24gPj4+IDE2KVxuICAgIG1lbS5zZXRCeXRlKDk5LCBpbnN0cnVjdGlvbiA+Pj4gMjQpXG4gICAgY29yZS5mZXRjaEluc3RydWN0aW9uKClcbiAgICBpZiAoKGNvcmUuZ2V0UmVnaXN0ZXJWYWx1ZSh2Y29yZS5SZWdzLng5KSA+Pj4gMCkgIT09IDBiMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMTEpIHtcbiAgICAgIHRocm93IEVycm9yKCd0ZXN0aW5nIHZjb3JlIDI4JylcbiAgICB9XG5cbiAgICAvLyBTUkFcbiAgICBpbnN0cnVjdGlvbiA9IDAgfCB2Y29yZS5PcGNvZGUuT1AgLy8gb3Bjb2RlXG4gICAgaW5zdHJ1Y3Rpb24gfD0gdmNvcmUuUmVncy54OSAqICgyICoqIDcpIC8vIHJkXG4gICAgaW5zdHJ1Y3Rpb24gfD0gMGIxMDEgKiAoMiAqKiAxMikgLy8gZnVuY3QzXG4gICAgaW5zdHJ1Y3Rpb24gfD0gdmNvcmUuUmVncy54MzAgKiAoMiAqKiAxNSkgLy8gcnMxXG4gICAgaW5zdHJ1Y3Rpb24gfD0gdmNvcmUuUmVncy54MzEgKiAoMiAqKiAyMCkgLy8gcnMyXG4gICAgaW5zdHJ1Y3Rpb24gfD0gMzIgKiAoMiAqKiAyNSkgLy8gZnVuY3Q3XG4gICAgbWVtLnNldEJ5dGUoMTAwLCBpbnN0cnVjdGlvbilcbiAgICBtZW0uc2V0Qnl0ZSgxMDEsIGluc3RydWN0aW9uID4+PiA4KVxuICAgIG1lbS5zZXRCeXRlKDEwMiwgaW5zdHJ1Y3Rpb24gPj4+IDE2KVxuICAgIG1lbS5zZXRCeXRlKDEwMywgaW5zdHJ1Y3Rpb24gPj4+IDI0KVxuICAgIGNvcmUuZmV0Y2hJbnN0cnVjdGlvbigpXG4gICAgaWYgKChjb3JlLmdldFJlZ2lzdGVyVmFsdWUodmNvcmUuUmVncy54OSkgPj4+IDApICE9PSAwYjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDExMTExKSB7XG4gICAgICB0aHJvdyBFcnJvcigndGVzdGluZyB2Y29yZSAyOScpXG4gICAgfVxuXG4gICAgLy8gSkFMXG4gICAgaW5zdHJ1Y3Rpb24gPSAwIHwgdmNvcmUuT3Bjb2RlLkpBTCAvLyBvcGNvZGVcbiAgICBpbnN0cnVjdGlvbiB8PSB2Y29yZS5SZWdzLngxNSAqICgyICoqIDcpIC8vIHJkXG4gICAgaW5zdHJ1Y3Rpb24gfD0gY29yZS52YWx1ZVRvSmltbSg4KSAvLyBpbW1cbiAgICBtZW0uc2V0Qnl0ZSgxMDQsIGluc3RydWN0aW9uKVxuICAgIG1lbS5zZXRCeXRlKDEwNSwgaW5zdHJ1Y3Rpb24gPj4+IDgpXG4gICAgbWVtLnNldEJ5dGUoMTA2LCBpbnN0cnVjdGlvbiA+Pj4gMTYpXG4gICAgbWVtLnNldEJ5dGUoMTA3LCBpbnN0cnVjdGlvbiA+Pj4gMjQpXG4gICAgbWVtLnNldEJ5dGUoMTEyLCAwYjExMTExMTExKVxuICAgIG1lbS5zZXRCeXRlKDExMywgMGIxMTExMTExMSlcbiAgICBtZW0uc2V0Qnl0ZSgxMTQsIDBiMTExMTExMTEpXG4gICAgbWVtLnNldEJ5dGUoMTE1LCAwYjExMTExMTExKVxuICAgIGNvcmUuZmV0Y2hJbnN0cnVjdGlvbigpXG4gICAgaWYgKChjb3JlLmdldFJlZ2lzdGVyVmFsdWUodmNvcmUuUmVncy54MTUpID4+PiAwKSAhPT0gMTA4KSB7XG4gICAgICB0aHJvdyBFcnJvcigndGVzdGluZyB2Y29yZSAzMCcpXG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBjb3JlLmZldGNoSW5zdHJ1Y3Rpb24oKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBpbnN0cnVjdGlvbiA9ICgoKGVycm9yIGFzIEVycm9yKS5tZXNzYWdlKS5zcGxpdCgnOicpKS5wb3AoKVxuICAgICAgaWYgKGluc3RydWN0aW9uICE9PSAnMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTEnKSB7XG4gICAgICAgIHRocm93IEVycm9yKCd0ZXN0aW5nIHZjb3JlIDMxJylcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBKQUxSXG4gICAgaW5zdHJ1Y3Rpb24gPSAwIHwgdmNvcmUuT3Bjb2RlLkpBTFIgLy8gb3Bjb2RlXG4gICAgaW5zdHJ1Y3Rpb24gfD0gdmNvcmUuUmVncy54MzEgKiAoMiAqKiA3KSAvLyByZFxuICAgIGluc3RydWN0aW9uIHw9IDBiMDAwICogKDIgKiogMTIpIC8vIGZ1bmN0M1xuICAgIGluc3RydWN0aW9uIHw9IHZjb3JlLlJlZ3MueDAgKiAoMiAqKiAxNSkgLy8gcnMxXG4gICAgaW5zdHJ1Y3Rpb24gfD0gMiAqICgyICoqIDIwKSAvLyBJLWltbVxuICAgIG1lbS5zZXRCeXRlKDExNiwgaW5zdHJ1Y3Rpb24pXG4gICAgbWVtLnNldEJ5dGUoMTE3LCBpbnN0cnVjdGlvbiA+Pj4gOClcbiAgICBtZW0uc2V0Qnl0ZSgxMTgsIGluc3RydWN0aW9uID4+PiAxNilcbiAgICBtZW0uc2V0Qnl0ZSgxMTksIGluc3RydWN0aW9uID4+PiAyNClcbiAgICBjb3JlLmZldGNoSW5zdHJ1Y3Rpb24oKVxuICAgIGlmIChjb3JlLmdldFJlZ2lzdGVyVmFsdWUodmNvcmUuUmVncy54MzEpICE9PSAxMjApIHtcbiAgICAgIHRocm93IEVycm9yKCd0ZXN0aW5nIHZjb3JlIDMyJylcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGNvcmUuZmV0Y2hJbnN0cnVjdGlvbigpXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IG1zZyA9ICgoZXJyb3IgYXMgRXJyb3IpLm1lc3NhZ2UpLnNwbGl0KCc6JylcbiAgICAgIGNvbnN0IHBwY1ZhbHVlID0gbXNnLnBvcCgpXG4gICAgICBtc2cucG9wKClcbiAgICAgIGNvbnN0IHBjVmFsdWUgPSBtc2cucG9wKClcbiAgICAgIGlmICgocHBjVmFsdWUgIT09ICcxMTYnKSB8fCAocGNWYWx1ZSAhPT0gJzExOCcpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCd0ZXN0aW5nIHZjb3JlIDMzJylcbiAgICAgIH1cbiAgICB9XG4gICAgY29yZS5zZXRSZWdpc3RlclZhbHVlKHZjb3JlLlJlZ3MucGMsIDEyMCwgdHJ1ZSlcblxuICAgIC8vIEJFUVxuICAgIGluc3RydWN0aW9uID0gMCB8IHZjb3JlLk9wY29kZS5CUkFOQ0ggLy8gb3Bjb2RlXG4gICAgaW5zdHJ1Y3Rpb24gfD0gMGIwMDAgKiAoMiAqKiAxMikgLy8gZnVuY3QzXG4gICAgaW5zdHJ1Y3Rpb24gfD0gdmNvcmUuUmVncy54MCAqICgyICoqIDE1KSAvLyByczFcbiAgICBpbnN0cnVjdGlvbiB8PSB2Y29yZS5SZWdzLngwICogKDIgKiogMjApIC8vIHJzMlxuICAgIGluc3RydWN0aW9uIHw9IGNvcmUudmFsdWVUb0JpbW0oOCkgLy8gaW1tXG4gICAgbWVtLnNldEJ5dGUoMTIwLCBpbnN0cnVjdGlvbilcbiAgICBtZW0uc2V0Qnl0ZSgxMjEsIGluc3RydWN0aW9uID4+PiA4KVxuICAgIG1lbS5zZXRCeXRlKDEyMiwgaW5zdHJ1Y3Rpb24gPj4+IDE2KVxuICAgIG1lbS5zZXRCeXRlKDEyMywgaW5zdHJ1Y3Rpb24gPj4+IDI0KVxuICAgIGNvcmUuZmV0Y2hJbnN0cnVjdGlvbigpXG4gICAgbGV0IHBjVmFsdWUgPSBjb3JlLmdldFJlZ2lzdGVyVmFsdWUodmNvcmUuUmVncy5wYywgdHJ1ZSkgPj4+IDBcbiAgICBsZXQgcHBjVmFsdWUgPSBjb3JlLmdldFJlZ2lzdGVyVmFsdWUodmNvcmUuUmVncy5wcGMsIHRydWUpID4+PiAwXG4gICAgaWYgKChwY1ZhbHVlICE9PSAxMjgpIHx8IChwcGNWYWx1ZSAhPT0gMTIwKSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ3Rlc3RpbmcgdmNvcmUgMzQnKVxuICAgIH1cblxuICAgIC8vIEJORVxuICAgIGluc3RydWN0aW9uID0gMCB8IHZjb3JlLk9wY29kZS5CUkFOQ0ggLy8gb3Bjb2RlXG4gICAgaW5zdHJ1Y3Rpb24gfD0gMGIwMDEgKiAoMiAqKiAxMikgLy8gZnVuY3QzXG4gICAgaW5zdHJ1Y3Rpb24gfD0gdmNvcmUuUmVncy54MCAqICgyICoqIDE1KSAvLyByczFcbiAgICBpbnN0cnVjdGlvbiB8PSB2Y29yZS5SZWdzLngwICogKDIgKiogMjApIC8vIHJzMlxuICAgIGluc3RydWN0aW9uIHw9IGNvcmUudmFsdWVUb0JpbW0oOCkgLy8gaW1tXG4gICAgbWVtLnNldEJ5dGUoMTI4LCBpbnN0cnVjdGlvbilcbiAgICBtZW0uc2V0Qnl0ZSgxMjksIGluc3RydWN0aW9uID4+PiA4KVxuICAgIG1lbS5zZXRCeXRlKDEzMCwgaW5zdHJ1Y3Rpb24gPj4+IDE2KVxuICAgIG1lbS5zZXRCeXRlKDEzMSwgaW5zdHJ1Y3Rpb24gPj4+IDI0KVxuICAgIGNvcmUuZmV0Y2hJbnN0cnVjdGlvbigpXG4gICAgcGNWYWx1ZSA9IGNvcmUuZ2V0UmVnaXN0ZXJWYWx1ZSh2Y29yZS5SZWdzLnBjLCB0cnVlKSA+Pj4gMFxuICAgIHBwY1ZhbHVlID0gY29yZS5nZXRSZWdpc3RlclZhbHVlKHZjb3JlLlJlZ3MucHBjLCB0cnVlKSA+Pj4gMFxuICAgIGlmICgocGNWYWx1ZSAhPT0gMTMyKSB8fCAocHBjVmFsdWUgIT09IDEyOCkpIHtcbiAgICAgIHRocm93IEVycm9yKCd0ZXN0aW5nIHZjb3JlIDM1JylcbiAgICB9XG5cbiAgICAvLyBCTFRcbiAgICBpbnN0cnVjdGlvbiA9IDAgfCB2Y29yZS5PcGNvZGUuQlJBTkNIIC8vIG9wY29kZVxuICAgIGluc3RydWN0aW9uIHw9IDBiMTAwICogKDIgKiogMTIpIC8vIGZ1bmN0M1xuICAgIGluc3RydWN0aW9uIHw9IHZjb3JlLlJlZ3MueDMxICogKDIgKiogMTUpIC8vIHJzMVxuICAgIGluc3RydWN0aW9uIHw9IHZjb3JlLlJlZ3MueDAgKiAoMiAqKiAyMCkgLy8gcnMyXG4gICAgaW5zdHJ1Y3Rpb24gfD0gY29yZS52YWx1ZVRvQmltbSgxMDApIC8vIGltbVxuICAgIG1lbS5zZXRCeXRlKDEzMiwgaW5zdHJ1Y3Rpb24pXG4gICAgbWVtLnNldEJ5dGUoMTMzLCBpbnN0cnVjdGlvbiA+Pj4gOClcbiAgICBtZW0uc2V0Qnl0ZSgxMzQsIGluc3RydWN0aW9uID4+PiAxNilcbiAgICBtZW0uc2V0Qnl0ZSgxMzUsIGluc3RydWN0aW9uID4+PiAyNClcbiAgICBjb3JlLmZldGNoSW5zdHJ1Y3Rpb24oKVxuICAgIHBjVmFsdWUgPSBjb3JlLmdldFJlZ2lzdGVyVmFsdWUodmNvcmUuUmVncy5wYywgdHJ1ZSkgPj4+IDBcbiAgICBwcGNWYWx1ZSA9IGNvcmUuZ2V0UmVnaXN0ZXJWYWx1ZSh2Y29yZS5SZWdzLnBwYywgdHJ1ZSkgPj4+IDBcbiAgICBpZiAoKHBjVmFsdWUgIT09IDEzNikgfHwgKHBwY1ZhbHVlICE9PSAxMzIpKSB7XG4gICAgICB0aHJvdyBFcnJvcigndGVzdGluZyB2Y29yZSAzNicpXG4gICAgfVxuICAgIGNvcmUuc2V0UmVnaXN0ZXJWYWx1ZSh2Y29yZS5SZWdzLngxLCAtMSlcblxuICAgIC8vIEJMVFVcbiAgICBpbnN0cnVjdGlvbiA9IDAgfCB2Y29yZS5PcGNvZGUuQlJBTkNIIC8vIG9wY29kZVxuICAgIGluc3RydWN0aW9uIHw9IDBiMTEwICogKDIgKiogMTIpIC8vIGZ1bmN0M1xuICAgIGluc3RydWN0aW9uIHw9IHZjb3JlLlJlZ3MueDMxICogKDIgKiogMTUpIC8vIHJzMVxuICAgIGluc3RydWN0aW9uIHw9IHZjb3JlLlJlZ3MueDEgKiAoMiAqKiAyMCkgLy8gcnMyXG4gICAgaW5zdHJ1Y3Rpb24gfD0gY29yZS52YWx1ZVRvQmltbSgxMDApIC8vIGltbVxuICAgIG1lbS5zZXRCeXRlKDEzNiwgaW5zdHJ1Y3Rpb24pXG4gICAgbWVtLnNldEJ5dGUoMTM3LCBpbnN0cnVjdGlvbiA+Pj4gOClcbiAgICBtZW0uc2V0Qnl0ZSgxMzgsIGluc3RydWN0aW9uID4+PiAxNilcbiAgICBtZW0uc2V0Qnl0ZSgxMzksIGluc3RydWN0aW9uID4+PiAyNClcbiAgICBjb3JlLmZldGNoSW5zdHJ1Y3Rpb24oKVxuICAgIHBjVmFsdWUgPSBjb3JlLmdldFJlZ2lzdGVyVmFsdWUodmNvcmUuUmVncy5wYywgdHJ1ZSkgPj4+IDBcbiAgICBwcGNWYWx1ZSA9IGNvcmUuZ2V0UmVnaXN0ZXJWYWx1ZSh2Y29yZS5SZWdzLnBwYywgdHJ1ZSkgPj4+IDBcbiAgICBpZiAoKHBjVmFsdWUgIT09IDIzNikgfHwgKHBwY1ZhbHVlICE9PSAxMzYpKSB7XG4gICAgICB0aHJvdyBFcnJvcigndGVzdGluZyB2Y29yZSAzNycpXG4gICAgfVxuXG4gICAgLy8gQkdFXG4gICAgaW5zdHJ1Y3Rpb24gPSAwIHwgdmNvcmUuT3Bjb2RlLkJSQU5DSCAvLyBvcGNvZGVcbiAgICBpbnN0cnVjdGlvbiB8PSAwYjEwMSAqICgyICoqIDEyKSAvLyBmdW5jdDNcbiAgICBpbnN0cnVjdGlvbiB8PSB2Y29yZS5SZWdzLngzMSAqICgyICoqIDE1KSAvLyByczFcbiAgICBpbnN0cnVjdGlvbiB8PSB2Y29yZS5SZWdzLngxICogKDIgKiogMjApIC8vIHJzMlxuICAgIGluc3RydWN0aW9uIHw9IGNvcmUudmFsdWVUb0JpbW0oOCkgLy8gaW1tXG4gICAgbWVtLnNldEJ5dGUoMjM2LCBpbnN0cnVjdGlvbilcbiAgICBtZW0uc2V0Qnl0ZSgyMzcsIGluc3RydWN0aW9uID4+PiA4KVxuICAgIG1lbS5zZXRCeXRlKDIzOCwgaW5zdHJ1Y3Rpb24gPj4+IDE2KVxuICAgIG1lbS5zZXRCeXRlKDIzOSwgaW5zdHJ1Y3Rpb24gPj4+IDI0KVxuICAgIGNvcmUuZmV0Y2hJbnN0cnVjdGlvbigpXG4gICAgcGNWYWx1ZSA9IGNvcmUuZ2V0UmVnaXN0ZXJWYWx1ZSh2Y29yZS5SZWdzLnBjLCB0cnVlKSA+Pj4gMFxuICAgIHBwY1ZhbHVlID0gY29yZS5nZXRSZWdpc3RlclZhbHVlKHZjb3JlLlJlZ3MucHBjLCB0cnVlKSA+Pj4gMFxuICAgIGlmICgocGNWYWx1ZSAhPT0gMjQ0KSB8fCAocHBjVmFsdWUgIT09IDIzNikpIHtcbiAgICAgIHRocm93IEVycm9yKCd0ZXN0aW5nIHZjb3JlIDM4JylcbiAgICB9XG5cbiAgICAvLyBCR0VVXG4gICAgaW5zdHJ1Y3Rpb24gPSAwIHwgdmNvcmUuT3Bjb2RlLkJSQU5DSCAvLyBvcGNvZGVcbiAgICBpbnN0cnVjdGlvbiB8PSAwYjExMSAqICgyICoqIDEyKSAvLyBmdW5jdDNcbiAgICBpbnN0cnVjdGlvbiB8PSB2Y29yZS5SZWdzLngzMSAqICgyICoqIDE1KSAvLyByczFcbiAgICBpbnN0cnVjdGlvbiB8PSB2Y29yZS5SZWdzLngxICogKDIgKiogMjApIC8vIHJzMlxuICAgIGluc3RydWN0aW9uIHw9IGNvcmUudmFsdWVUb0JpbW0oOCkgLy8gaW1tXG4gICAgbWVtLnNldEJ5dGUoMjQ0LCBpbnN0cnVjdGlvbilcbiAgICBtZW0uc2V0Qnl0ZSgyNDUsIGluc3RydWN0aW9uID4+PiA4KVxuICAgIG1lbS5zZXRCeXRlKDI0NiwgaW5zdHJ1Y3Rpb24gPj4+IDE2KVxuICAgIG1lbS5zZXRCeXRlKDI0NywgaW5zdHJ1Y3Rpb24gPj4+IDI0KVxuICAgIGNvcmUuZmV0Y2hJbnN0cnVjdGlvbigpXG4gICAgcGNWYWx1ZSA9IGNvcmUuZ2V0UmVnaXN0ZXJWYWx1ZSh2Y29yZS5SZWdzLnBjLCB0cnVlKSA+Pj4gMFxuICAgIHBwY1ZhbHVlID0gY29yZS5nZXRSZWdpc3RlclZhbHVlKHZjb3JlLlJlZ3MucHBjLCB0cnVlKSA+Pj4gMFxuICAgIGlmICgocGNWYWx1ZSAhPT0gMjQ4KSB8fCAocHBjVmFsdWUgIT09IDI0NCkpIHtcbiAgICAgIHRocm93IEVycm9yKCd0ZXN0aW5nIHZjb3JlIDM5JylcbiAgICB9XG5cbiAgICAvLyBMQlxuICAgIGluc3RydWN0aW9uID0gMCB8IHZjb3JlLk9wY29kZS5MT0FEIC8vIG9wY29kZVxuICAgIGluc3RydWN0aW9uIHw9IHZjb3JlLlJlZ3MueDAgKiAoMiAqKiA3KSAvLyByZFxuICAgIGluc3RydWN0aW9uIHw9IDBiMDAwICogKDIgKiogMTIpIC8vIGZ1bmN0M1xuICAgIGluc3RydWN0aW9uIHw9IHZjb3JlLlJlZ3MueDMxICogKDIgKiogMTUpIC8vIHJzMVxuICAgIGluc3RydWN0aW9uIHw9IGNvcmUudmFsdWVUb0lpbW0oMSkgLy8gSS1pbW1cbiAgICBtZW0uc2V0Qnl0ZSgyNDgsIGluc3RydWN0aW9uKVxuICAgIG1lbS5zZXRCeXRlKDI0OSwgaW5zdHJ1Y3Rpb24gPj4+IDgpXG4gICAgbWVtLnNldEJ5dGUoMjUwLCBpbnN0cnVjdGlvbiA+Pj4gMTYpXG4gICAgbWVtLnNldEJ5dGUoMjUxLCBpbnN0cnVjdGlvbiA+Pj4gMjQpXG4gICAgdHJ5IHtcbiAgICAgIGNvcmUuZmV0Y2hJbnN0cnVjdGlvbigpXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IG1zZyA9ICgoZXJyb3IgYXMgRXJyb3IpLm1lc3NhZ2UpLnNwbGl0KCc6JylcbiAgICAgIGlmIChtc2cucG9wKCkgIT09ICcwMDAwMDAwMDAwMDExMTExMTAwMDAwMDAwMDAwMDAxMScpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ3Rlc3RpbmcgdmNvcmUgNDAnKVxuICAgICAgfVxuICAgIH1cbiAgICBpbnN0cnVjdGlvbiA9IDAgfCB2Y29yZS5PcGNvZGUuTE9BRCAvLyBvcGNvZGVcbiAgICBpbnN0cnVjdGlvbiB8PSB2Y29yZS5SZWdzLngxICogKDIgKiogNykgLy8gcmRcbiAgICBpbnN0cnVjdGlvbiB8PSAwYjAwMCAqICgyICoqIDEyKSAvLyBmdW5jdDNcbiAgICBpbnN0cnVjdGlvbiB8PSB2Y29yZS5SZWdzLngzMSAqICgyICoqIDE1KSAvLyByczEgKDEyMClcbiAgICBpbnN0cnVjdGlvbiB8PSBjb3JlLnZhbHVlVG9JaW1tKC0zKSAvLyBJLWltbVxuICAgIG1lbS5zZXRCeXRlKDI1MiwgaW5zdHJ1Y3Rpb24pXG4gICAgbWVtLnNldEJ5dGUoMjUzLCBpbnN0cnVjdGlvbiA+Pj4gOClcbiAgICBtZW0uc2V0Qnl0ZSgyNTQsIGluc3RydWN0aW9uID4+PiAxNilcbiAgICBtZW0uc2V0Qnl0ZSgyNTUsIGluc3RydWN0aW9uID4+PiAyNClcbiAgICBjb3JlLmZldGNoSW5zdHJ1Y3Rpb24oKVxuICAgIGlmICgoY29yZS5nZXRSZWdpc3RlclZhbHVlKHZjb3JlLlJlZ3MueDEpKSAhPT0gMGIxMTExKSB7XG4gICAgICB0aHJvdyBFcnJvcigndGVzdGluZyB2Y29yZSA0MScpXG4gICAgfVxuXG4gICAgLy8gTEhcbiAgICBpbnN0cnVjdGlvbiA9IDAgfCB2Y29yZS5PcGNvZGUuTE9BRCAvLyBvcGNvZGVcbiAgICBpbnN0cnVjdGlvbiB8PSB2Y29yZS5SZWdzLngxICogKDIgKiogNykgLy8gcmRcbiAgICBpbnN0cnVjdGlvbiB8PSAwYjAwMSAqICgyICoqIDEyKSAvLyBmdW5jdDNcbiAgICBpbnN0cnVjdGlvbiB8PSB2Y29yZS5SZWdzLngzMSAqICgyICoqIDE1KSAvLyByczEgKDEyMClcbiAgICBpbnN0cnVjdGlvbiB8PSBjb3JlLnZhbHVlVG9JaW1tKC0xMTMpIC8vIEktaW1tXG4gICAgbWVtLnNldEJ5dGUoMjU2LCBpbnN0cnVjdGlvbilcbiAgICBtZW0uc2V0Qnl0ZSgyNTcsIGluc3RydWN0aW9uID4+PiA4KVxuICAgIG1lbS5zZXRCeXRlKDI1OCwgaW5zdHJ1Y3Rpb24gPj4+IDE2KVxuICAgIG1lbS5zZXRCeXRlKDI1OSwgaW5zdHJ1Y3Rpb24gPj4+IDI0KVxuICAgIGNvcmUuZmV0Y2hJbnN0cnVjdGlvbigpXG4gICAgaWYgKChjb3JlLmdldFJlZ2lzdGVyVmFsdWUodmNvcmUuUmVncy54MSkpICE9PSAwYjExMTExMTExMSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ3Rlc3RpbmcgdmNvcmUgNDInKVxuICAgIH1cblxuICAgIC8vIExXXG4gICAgaW5zdHJ1Y3Rpb24gPSAwIHwgdmNvcmUuT3Bjb2RlLkxPQUQgLy8gb3Bjb2RlXG4gICAgaW5zdHJ1Y3Rpb24gfD0gdmNvcmUuUmVncy54MSAqICgyICoqIDcpIC8vIHJkXG4gICAgaW5zdHJ1Y3Rpb24gfD0gMGIwMTAgKiAoMiAqKiAxMikgLy8gZnVuY3QzXG4gICAgaW5zdHJ1Y3Rpb24gfD0gdmNvcmUuUmVncy54MzEgKiAoMiAqKiAxNSkgLy8gcnMxICgxMjApXG4gICAgaW5zdHJ1Y3Rpb24gfD0gY29yZS52YWx1ZVRvSWltbSgtMTEzKSAvLyBJLWltbVxuICAgIG1lbS5zZXRCeXRlKDI2MCwgaW5zdHJ1Y3Rpb24pXG4gICAgbWVtLnNldEJ5dGUoMjYxLCBpbnN0cnVjdGlvbiA+Pj4gOClcbiAgICBtZW0uc2V0Qnl0ZSgyNjIsIGluc3RydWN0aW9uID4+PiAxNilcbiAgICBtZW0uc2V0Qnl0ZSgyNjMsIGluc3RydWN0aW9uID4+PiAyNClcbiAgICBjb3JlLmZldGNoSW5zdHJ1Y3Rpb24oKVxuICAgIGlmICgoY29yZS5nZXRSZWdpc3RlclZhbHVlKHZjb3JlLlJlZ3MueDEpKSAhPT0gMGIxMTEwMDAwMDAxMTAwMDAwMDAxMTExMTExMTEpIHtcbiAgICAgIHRocm93IEVycm9yKCd0ZXN0aW5nIHZjb3JlIDQzJylcbiAgICB9XG5cbiAgICAvLyBMQlVcbiAgICBpbnN0cnVjdGlvbiA9IDAgfCB2Y29yZS5PcGNvZGUuTE9BRCAvLyBvcGNvZGVcbiAgICBpbnN0cnVjdGlvbiB8PSB2Y29yZS5SZWdzLngxICogKDIgKiogNykgLy8gcmRcbiAgICBpbnN0cnVjdGlvbiB8PSAwYjEwMCAqICgyICoqIDEyKSAvLyBmdW5jdDNcbiAgICBpbnN0cnVjdGlvbiB8PSB2Y29yZS5SZWdzLngzMSAqICgyICoqIDE1KSAvLyByczEgKDEyMClcbiAgICBpbnN0cnVjdGlvbiB8PSBjb3JlLnZhbHVlVG9JaW1tKC0xMTMpIC8vIEktaW1tXG4gICAgbWVtLnNldEJ5dGUoMjY0LCBpbnN0cnVjdGlvbilcbiAgICBtZW0uc2V0Qnl0ZSgyNjUsIGluc3RydWN0aW9uID4+PiA4KVxuICAgIG1lbS5zZXRCeXRlKDI2NiwgaW5zdHJ1Y3Rpb24gPj4+IDE2KVxuICAgIG1lbS5zZXRCeXRlKDI2NywgaW5zdHJ1Y3Rpb24gPj4+IDI0KVxuICAgIG1lbS5zZXRCeXRlKDcsIC0yKVxuICAgIGNvcmUuZmV0Y2hJbnN0cnVjdGlvbigpXG4gICAgaWYgKChjb3JlLmdldFJlZ2lzdGVyVmFsdWUodmNvcmUuUmVncy54MSkpICE9PSAwYjExMTExMTEwKSB7XG4gICAgICB0aHJvdyBFcnJvcigndGVzdGluZyB2Y29yZSA0NCcpXG4gICAgfVxuXG4gICAgLy8gTEhVXG4gICAgaW5zdHJ1Y3Rpb24gPSAwIHwgdmNvcmUuT3Bjb2RlLkxPQUQgLy8gb3Bjb2RlXG4gICAgaW5zdHJ1Y3Rpb24gfD0gdmNvcmUuUmVncy54MSAqICgyICoqIDcpIC8vIHJkXG4gICAgaW5zdHJ1Y3Rpb24gfD0gMGIxMDEgKiAoMiAqKiAxMikgLy8gZnVuY3QzXG4gICAgaW5zdHJ1Y3Rpb24gfD0gdmNvcmUuUmVncy54MzEgKiAoMiAqKiAxNSkgLy8gcnMxICgxMjApXG4gICAgaW5zdHJ1Y3Rpb24gfD0gY29yZS52YWx1ZVRvSWltbSgtMTEzKSAvLyBJLWltbVxuICAgIG1lbS5zZXRCeXRlKDI2OCwgaW5zdHJ1Y3Rpb24pXG4gICAgbWVtLnNldEJ5dGUoMjY5LCBpbnN0cnVjdGlvbiA+Pj4gOClcbiAgICBtZW0uc2V0Qnl0ZSgyNzAsIGluc3RydWN0aW9uID4+PiAxNilcbiAgICBtZW0uc2V0Qnl0ZSgyNzEsIGluc3RydWN0aW9uID4+PiAyNClcbiAgICBtZW0uc2V0Qnl0ZSg4LCAtMilcbiAgICBjb3JlLmZldGNoSW5zdHJ1Y3Rpb24oKVxuICAgIGlmICgoY29yZS5nZXRSZWdpc3RlclZhbHVlKHZjb3JlLlJlZ3MueDEpKSAhPT0gMGIxMTExMTExMDExMTExMTEwKSB7XG4gICAgICB0aHJvdyBFcnJvcigndGVzdGluZyB2Y29yZSA0NScpXG4gICAgfVxuXG4gICAgLy8gU0JcbiAgICBjb3JlLnNldFJlZ2lzdGVyVmFsdWUodmNvcmUuUmVncy54MzAsIC03KVxuICAgIGluc3RydWN0aW9uID0gMCB8IHZjb3JlLk9wY29kZS5TVE9SRSAvLyBvcGNvZGVcbiAgICBpbnN0cnVjdGlvbiB8PSAwYjAwMCAqICgyICoqIDEyKSAvLyBmdW5jdDNcbiAgICBpbnN0cnVjdGlvbiB8PSB2Y29yZS5SZWdzLngzMSAqICgyICoqIDE1KSAvLyByczEgKDEyMClcbiAgICBpbnN0cnVjdGlvbiB8PSB2Y29yZS5SZWdzLngzMCAqICgyICoqIDIwKSAvLyByczIgKC03KVxuICAgIGluc3RydWN0aW9uIHw9IGNvcmUudmFsdWVUb1NpbW0oMTgwKSAvLyBTLWltbVxuICAgIG1lbS5zZXRCeXRlKDI3MiwgaW5zdHJ1Y3Rpb24pXG4gICAgbWVtLnNldEJ5dGUoMjczLCBpbnN0cnVjdGlvbiA+Pj4gOClcbiAgICBtZW0uc2V0Qnl0ZSgyNzQsIGluc3RydWN0aW9uID4+PiAxNilcbiAgICBtZW0uc2V0Qnl0ZSgyNzUsIGluc3RydWN0aW9uID4+PiAyNClcbiAgICBjb3JlLmZldGNoSW5zdHJ1Y3Rpb24oKVxuICAgIGlmIChtZW0uZ2V0Qnl0ZSgzMDApICE9PSAwYjExMTExMDAxKSB7XG4gICAgICB0aHJvdyBFcnJvcigndGVzdGluZyB2Y29yZSA0NicpXG4gICAgfVxuXG4gICAgLy8gU0hcbiAgICBtZW0uc2V0Qnl0ZSgzMDAsIDApXG4gICAgY29yZS5zZXRSZWdpc3RlclZhbHVlKHZjb3JlLlJlZ3MueDMwLCAtNylcbiAgICBpbnN0cnVjdGlvbiA9IDAgfCB2Y29yZS5PcGNvZGUuU1RPUkUgLy8gb3Bjb2RlXG4gICAgaW5zdHJ1Y3Rpb24gfD0gMGIwMDEgKiAoMiAqKiAxMikgLy8gZnVuY3QzXG4gICAgaW5zdHJ1Y3Rpb24gfD0gdmNvcmUuUmVncy54MzEgKiAoMiAqKiAxNSkgLy8gcnMxICgxMjApXG4gICAgaW5zdHJ1Y3Rpb24gfD0gdmNvcmUuUmVncy54MzAgKiAoMiAqKiAyMCkgLy8gcnMyICgtNylcbiAgICBpbnN0cnVjdGlvbiB8PSBjb3JlLnZhbHVlVG9TaW1tKDE4MCkgLy8gUy1pbW1cbiAgICBtZW0uc2V0Qnl0ZSgyNzYsIGluc3RydWN0aW9uKVxuICAgIG1lbS5zZXRCeXRlKDI3NywgaW5zdHJ1Y3Rpb24gPj4+IDgpXG4gICAgbWVtLnNldEJ5dGUoMjc4LCBpbnN0cnVjdGlvbiA+Pj4gMTYpXG4gICAgbWVtLnNldEJ5dGUoMjc5LCBpbnN0cnVjdGlvbiA+Pj4gMjQpXG4gICAgY29yZS5mZXRjaEluc3RydWN0aW9uKClcbiAgICBsZXQgbWVtVmFsID0gbWVtLmdldEJ5dGUoMzAwICsgMClcbiAgICBtZW1WYWwgfD0gKG1lbS5nZXRCeXRlKDMwMCArIDEpKSAqICgyICoqIDgpXG4gICAgaWYgKG1lbVZhbCAhPT0gMGIxMTExMTExMTExMTExMDAxKSB7XG4gICAgICB0aHJvdyBFcnJvcigndGVzdGluZyB2Y29yZSA0NycpXG4gICAgfVxuXG4gICAgLy8gU1dcbiAgICBtZW0uc2V0Qnl0ZSgzMDAsIDApXG4gICAgbWVtLnNldEJ5dGUoMzAxLCAwKVxuICAgIGNvcmUuc2V0UmVnaXN0ZXJWYWx1ZSh2Y29yZS5SZWdzLngzMCwgLTcpXG4gICAgaW5zdHJ1Y3Rpb24gPSAwIHwgdmNvcmUuT3Bjb2RlLlNUT1JFIC8vIG9wY29kZVxuICAgIGluc3RydWN0aW9uIHw9IDBiMDEwICogKDIgKiogMTIpIC8vIGZ1bmN0M1xuICAgIGluc3RydWN0aW9uIHw9IHZjb3JlLlJlZ3MueDMxICogKDIgKiogMTUpIC8vIHJzMSAoMTIwKVxuICAgIGluc3RydWN0aW9uIHw9IHZjb3JlLlJlZ3MueDMwICogKDIgKiogMjApIC8vIHJzMiAoLTcpXG4gICAgaW5zdHJ1Y3Rpb24gfD0gY29yZS52YWx1ZVRvU2ltbSgxODApIC8vIFMtaW1tXG4gICAgbWVtLnNldEJ5dGUoMjgwLCBpbnN0cnVjdGlvbilcbiAgICBtZW0uc2V0Qnl0ZSgyODEsIGluc3RydWN0aW9uID4+PiA4KVxuICAgIG1lbS5zZXRCeXRlKDI4MiwgaW5zdHJ1Y3Rpb24gPj4+IDE2KVxuICAgIG1lbS5zZXRCeXRlKDI4MywgaW5zdHJ1Y3Rpb24gPj4+IDI0KVxuICAgIGNvcmUuZmV0Y2hJbnN0cnVjdGlvbigpXG4gICAgbWVtVmFsID0gbWVtLmdldEJ5dGUoMzAwICsgMClcbiAgICBtZW1WYWwgfD0gKG1lbS5nZXRCeXRlKDMwMCArIDEpKSAqICgyICoqIDgpXG4gICAgbWVtVmFsIHw9IChtZW0uZ2V0Qnl0ZSgzMDAgKyAyKSkgKiAoMiAqKiAxNilcbiAgICBtZW1WYWwgfD0gKG1lbS5nZXRCeXRlKDMwMCArIDMpKSAqICgyICoqIDI0KVxuICAgIGlmICgobWVtVmFsID4+PiAwKSAhPT0gMGIxMTExMTExMTExMTExMTExMTExMTExMTExMTExMTAwMSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ3Rlc3RpbmcgdmNvcmUgNDgnKVxuICAgIH1cblxuICAgIC8vIEZFTkNFID0gTk9QXG4gIH1cblxuICAvLyBBbGwgLy9cblxuICB0ZXN0aW5nQWxsICgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnQkVHSU4gVEVTVElORyBBTEwnKVxuICAgIHRoaXMudGVzdGluZ01lbW9yeSgpXG4gICAgdGhpcy50ZXN0aW5nVmNvcmUoKVxuICAgIGNvbnNvbGUubG9nKCdFTkQgVEVTVElORyBBTEwnKVxuICB9XG59XG4iXX0=