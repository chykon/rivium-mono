import * as vcore from './vcore.js';
function encodeRegister(regName) {
    if (regName.charAt(0) !== 'x') {
        throw Error('regName problem');
    }
    const regNameNumber = regName.substring(1);
    return parseInt(regNameNumber, 10);
}
export function assembly(sourceCode, core) {
    const lines = sourceCode.split('\n');
    const machineCode = [];
    for (const [index, line] of lines.entries()) {
        if (line === '') {
            continue;
        }
        else if (line.charAt(0) === ';') {
            continue;
        }
        const splittedLine = line.split(' ');
        const command = splittedLine[0];
        const operands = splittedLine[1]?.split(',');
        if (command === 'addi') {
            // addi rd,rs1,iimm
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.OP_IMM;
            const encodedRd = encodeRegister(operands[0]);
            const encodedFunct3 = 0b000;
            const encodedRs1 = encodeRegister(operands[1]);
            const encodedIimm = core.valueToIimm(parseInt(operands[2], 10));
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedRd * (2 ** 7);
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedIimm;
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'slti') {
            // slti rd,rs1,iimm
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.OP_IMM;
            const encodedRd = encodeRegister(operands[0]);
            const encodedFunct3 = 0b010;
            const encodedRs1 = encodeRegister(operands[1]);
            const encodedIimm = core.valueToIimm(parseInt(operands[2], 10));
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedRd * (2 ** 7);
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedIimm;
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'sltiu') {
            // sltiu rd,rs1,iimm
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.OP_IMM;
            const encodedRd = encodeRegister(operands[0]);
            const encodedFunct3 = 0b011;
            const encodedRs1 = encodeRegister(operands[1]);
            const encodedIimm = core.valueToIimm(parseInt(operands[2], 10));
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedRd * (2 ** 7);
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedIimm;
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'andi') {
            // andi rd,rs1,iimm
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.OP_IMM;
            const encodedRd = encodeRegister(operands[0]);
            const encodedFunct3 = 0b111;
            const encodedRs1 = encodeRegister(operands[1]);
            const encodedIimm = core.valueToIimm(parseInt(operands[2], 10));
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedRd * (2 ** 7);
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedIimm;
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'ori') {
            // ori rd,rs1,iimm
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.OP_IMM;
            const encodedRd = encodeRegister(operands[0]);
            const encodedFunct3 = 0b100;
            const encodedRs1 = encodeRegister(operands[1]);
            const encodedIimm = core.valueToIimm(parseInt(operands[2], 10));
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedRd * (2 ** 7);
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedIimm;
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'xori') {
            // xori rd,rs1,iimm
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.OP_IMM;
            const encodedRd = encodeRegister(operands[0]);
            const encodedFunct3 = 0b100;
            const encodedRs1 = encodeRegister(operands[1]);
            const encodedIimm = core.valueToIimm(parseInt(operands[2], 10));
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedRd * (2 ** 7);
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedIimm;
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'slli') {
            // slli rd,rs1,iimm
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.OP_IMM;
            const encodedRd = encodeRegister(operands[0]);
            const encodedFunct3 = 0b001;
            const encodedRs1 = encodeRegister(operands[1]);
            let encodedIimm = core.valueToIimm(parseInt(operands[2], 10));
            encodedIimm &= 0b00000001111111111111111111111111;
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedRd * (2 ** 7);
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedIimm;
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'srli') {
            // srli rd,rs1,iimm
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.OP_IMM;
            const encodedRd = encodeRegister(operands[0]);
            const encodedFunct3 = 0b101;
            const encodedRs1 = encodeRegister(operands[1]);
            let encodedIimm = core.valueToIimm(parseInt(operands[2], 10));
            encodedIimm &= 0b00000001111111111111111111111111;
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedRd * (2 ** 7);
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedIimm;
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'srai') {
            // srai rd,rs1,iimm
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.OP_IMM;
            const encodedRd = encodeRegister(operands[0]);
            const encodedFunct3 = 0b101;
            const encodedRs1 = encodeRegister(operands[1]);
            let encodedIimm = core.valueToIimm(parseInt(operands[2], 10));
            encodedIimm &= 0b00000001111111111111111111111111;
            encodedIimm |= 0b01000000000000000000000000000000;
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedRd * (2 ** 7);
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedIimm;
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'lui') {
            // lui rd,uimm
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.LUI;
            const encodedRd = encodeRegister(operands[0]);
            const encodedUimm = core.valueToUimm(parseInt(operands[1], 10));
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedRd * (2 ** 7);
            instruction |= encodedUimm;
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'auipc') {
            // auipc rd,uimm
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.AUIPC;
            const encodedRd = encodeRegister(operands[0]);
            const encodedUimm = core.valueToUimm(parseInt(operands[1], 10));
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedRd * (2 ** 7);
            instruction |= encodedUimm;
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'add') {
            // add rd,rs1,rs2
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.OP;
            const encodedRd = encodeRegister(operands[0]);
            const encodedFunct3 = 0b000;
            const encodedRs1 = encodeRegister(operands[1]);
            const encodedRs2 = encodeRegister(operands[2]);
            const encodedFunct7 = 0b0000000;
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedRd * (2 ** 7);
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedRs2 * (2 ** 20);
            instruction |= encodedFunct7 * (2 ** 25);
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'slt') {
            // slt rd,rs1,rs2
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.OP;
            const encodedRd = encodeRegister(operands[0]);
            const encodedFunct3 = 0b010;
            const encodedRs1 = encodeRegister(operands[1]);
            const encodedRs2 = encodeRegister(operands[2]);
            const encodedFunct7 = 0b0000000;
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedRd * (2 ** 7);
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedRs2 * (2 ** 20);
            instruction |= encodedFunct7 * (2 ** 25);
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'sltu') {
            // sltu rd,rs1,rs2
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.OP;
            const encodedRd = encodeRegister(operands[0]);
            const encodedFunct3 = 0b011;
            const encodedRs1 = encodeRegister(operands[1]);
            const encodedRs2 = encodeRegister(operands[2]);
            const encodedFunct7 = 0b0000000;
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedRd * (2 ** 7);
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedRs2 * (2 ** 20);
            instruction |= encodedFunct7 * (2 ** 25);
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'and') {
            // and rd,rs1,rs2
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.OP;
            const encodedRd = encodeRegister(operands[0]);
            const encodedFunct3 = 0b111;
            const encodedRs1 = encodeRegister(operands[1]);
            const encodedRs2 = encodeRegister(operands[2]);
            const encodedFunct7 = 0b0000000;
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedRd * (2 ** 7);
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedRs2 * (2 ** 20);
            instruction |= encodedFunct7 * (2 ** 25);
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'or') {
            // or rd,rs1,rs2
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.OP;
            const encodedRd = encodeRegister(operands[0]);
            const encodedFunct3 = 0b110;
            const encodedRs1 = encodeRegister(operands[1]);
            const encodedRs2 = encodeRegister(operands[2]);
            const encodedFunct7 = 0b0000000;
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedRd * (2 ** 7);
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedRs2 * (2 ** 20);
            instruction |= encodedFunct7 * (2 ** 25);
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'xor') {
            // xor rd,rs1,rs2
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.OP;
            const encodedRd = encodeRegister(operands[0]);
            const encodedFunct3 = 0b100;
            const encodedRs1 = encodeRegister(operands[1]);
            const encodedRs2 = encodeRegister(operands[2]);
            const encodedFunct7 = 0b0000000;
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedRd * (2 ** 7);
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedRs2 * (2 ** 20);
            instruction |= encodedFunct7 * (2 ** 25);
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'sll') {
            // sll rd,rs1,rs2
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.OP;
            const encodedRd = encodeRegister(operands[0]);
            const encodedFunct3 = 0b001;
            const encodedRs1 = encodeRegister(operands[1]);
            const encodedRs2 = encodeRegister(operands[2]);
            const encodedFunct7 = 0b0000000;
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedRd * (2 ** 7);
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedRs2 * (2 ** 20);
            instruction |= encodedFunct7 * (2 ** 25);
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'srl') {
            // srl rd,rs1,rs2
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.OP;
            const encodedRd = encodeRegister(operands[0]);
            const encodedFunct3 = 0b101;
            const encodedRs1 = encodeRegister(operands[1]);
            const encodedRs2 = encodeRegister(operands[2]);
            const encodedFunct7 = 0b0000000;
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedRd * (2 ** 7);
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedRs2 * (2 ** 20);
            instruction |= encodedFunct7 * (2 ** 25);
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'sub') {
            // sub rd,rs1,rs2
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.OP;
            const encodedRd = encodeRegister(operands[0]);
            const encodedFunct3 = 0b000;
            const encodedRs1 = encodeRegister(operands[1]);
            const encodedRs2 = encodeRegister(operands[2]);
            const encodedFunct7 = 0b0100000;
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedRd * (2 ** 7);
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedRs2 * (2 ** 20);
            instruction |= encodedFunct7 * (2 ** 25);
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'sra') {
            // sra rd,rs1,rs2
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.OP;
            const encodedRd = encodeRegister(operands[0]);
            const encodedFunct3 = 0b101;
            const encodedRs1 = encodeRegister(operands[1]);
            const encodedRs2 = encodeRegister(operands[2]);
            const encodedFunct7 = 0b0100000;
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedRd * (2 ** 7);
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedRs2 * (2 ** 20);
            instruction |= encodedFunct7 * (2 ** 25);
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'jal') {
            // jal rd,jimm
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.JAL;
            const encodedRd = encodeRegister(operands[0]);
            const encodedJimm = core.valueToJimm(parseInt(operands[1], 10));
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedRd * (2 ** 7);
            instruction |= encodedJimm;
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'jalr') {
            // jalr rd,rs1,iimm
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.JALR;
            const encodedRd = encodeRegister(operands[0]);
            const encodedFunct3 = 0b000;
            const encodedRs1 = encodeRegister(operands[1]);
            const encodedIimm = core.valueToIimm(parseInt(operands[2], 10));
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedRd * (2 ** 7);
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedIimm;
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'beq') {
            // beq rs1,rs2,bimm
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.BRANCH;
            const encodedFunct3 = 0b000;
            const encodedRs1 = encodeRegister(operands[0]);
            const encodedRs2 = encodeRegister(operands[1]);
            const encodedBimm = core.valueToBimm(parseInt(operands[2], 10));
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedRs2 * (2 ** 20);
            instruction |= encodedBimm;
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'bne') {
            // bne rs1,rs2,bimm
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.BRANCH;
            const encodedFunct3 = 0b001;
            const encodedRs1 = encodeRegister(operands[0]);
            const encodedRs2 = encodeRegister(operands[1]);
            const encodedBimm = core.valueToBimm(parseInt(operands[2], 10));
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedRs2 * (2 ** 20);
            instruction |= encodedBimm;
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'blt') {
            // blt rs1,rs2,bimm
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.BRANCH;
            const encodedFunct3 = 0b100;
            const encodedRs1 = encodeRegister(operands[0]);
            const encodedRs2 = encodeRegister(operands[1]);
            const encodedBimm = core.valueToBimm(parseInt(operands[2], 10));
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedRs2 * (2 ** 20);
            instruction |= encodedBimm;
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'bltu') {
            // bltu rs1,rs2,bimm
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.BRANCH;
            const encodedFunct3 = 0b110;
            const encodedRs1 = encodeRegister(operands[0]);
            const encodedRs2 = encodeRegister(operands[1]);
            const encodedBimm = core.valueToBimm(parseInt(operands[2], 10));
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedRs2 * (2 ** 20);
            instruction |= encodedBimm;
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'bge') {
            // bge rs1,rs2,bimm
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.BRANCH;
            const encodedFunct3 = 0b101;
            const encodedRs1 = encodeRegister(operands[0]);
            const encodedRs2 = encodeRegister(operands[1]);
            const encodedBimm = core.valueToBimm(parseInt(operands[2], 10));
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedRs2 * (2 ** 20);
            instruction |= encodedBimm;
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'bgeu') {
            // bgeu rs1,rs2,bimm
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.BRANCH;
            const encodedFunct3 = 0b111;
            const encodedRs1 = encodeRegister(operands[0]);
            const encodedRs2 = encodeRegister(operands[1]);
            const encodedBimm = core.valueToBimm(parseInt(operands[2], 10));
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedRs2 * (2 ** 20);
            instruction |= encodedBimm;
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'lb') {
            // lb rd,rs1,iimm
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.LOAD;
            const encodedRd = encodeRegister(operands[0]);
            const encodedFunct3 = 0b000;
            const encodedRs1 = encodeRegister(operands[1]);
            const encodedIimm = core.valueToIimm(parseInt(operands[2], 10));
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedRd * (2 ** 7);
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedIimm;
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'lh') {
            // lh rd,rs1,iimm
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.LOAD;
            const encodedRd = encodeRegister(operands[0]);
            const encodedFunct3 = 0b001;
            const encodedRs1 = encodeRegister(operands[1]);
            const encodedIimm = core.valueToIimm(parseInt(operands[2], 10));
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedRd * (2 ** 7);
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedIimm;
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'lw') {
            // lw rd,rs1,iimm
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.LOAD;
            const encodedRd = encodeRegister(operands[0]);
            const encodedFunct3 = 0b010;
            const encodedRs1 = encodeRegister(operands[1]);
            const encodedIimm = core.valueToIimm(parseInt(operands[2], 10));
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedRd * (2 ** 7);
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedIimm;
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'lbu') {
            // lbu rd,rs1,iimm
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.LOAD;
            const encodedRd = encodeRegister(operands[0]);
            const encodedFunct3 = 0b100;
            const encodedRs1 = encodeRegister(operands[1]);
            const encodedIimm = core.valueToIimm(parseInt(operands[2], 10));
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedRd * (2 ** 7);
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedIimm;
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'lhu') {
            // lhu rd,rs1,iimm
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.LOAD;
            const encodedRd = encodeRegister(operands[0]);
            const encodedFunct3 = 0b101;
            const encodedRs1 = encodeRegister(operands[1]);
            const encodedIimm = core.valueToIimm(parseInt(operands[2], 10));
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedRd * (2 ** 7);
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedIimm;
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'sb') {
            // sb rs1,rs2,simm
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.STORE;
            const encodedFunct3 = 0b000;
            const encodedRs1 = encodeRegister(operands[0]);
            const encodedRs2 = encodeRegister(operands[1]);
            const encodedSimm = core.valueToSimm(parseInt(operands[2], 10));
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedRs2 * (2 ** 20);
            instruction |= encodedSimm;
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'sh') {
            // sh rs1,rs2,simm
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.STORE;
            const encodedFunct3 = 0b001;
            const encodedRs1 = encodeRegister(operands[0]);
            const encodedRs2 = encodeRegister(operands[1]);
            const encodedSimm = core.valueToSimm(parseInt(operands[2], 10));
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedRs2 * (2 ** 20);
            instruction |= encodedSimm;
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else if (command === 'sw') {
            // sw rs1,rs2,simm
            if (operands === undefined)
                throw Error('operands === undefined');
            const encodedOpcode = vcore.Opcode.STORE;
            const encodedFunct3 = 0b010;
            const encodedRs1 = encodeRegister(operands[0]);
            const encodedRs2 = encodeRegister(operands[1]);
            const encodedSimm = core.valueToSimm(parseInt(operands[2], 10));
            let instruction = 0;
            instruction |= encodedOpcode;
            instruction |= encodedFunct3 * (2 ** 12);
            instruction |= encodedRs1 * (2 ** 15);
            instruction |= encodedRs2 * (2 ** 20);
            instruction |= encodedSimm;
            machineCode.push(instruction >>> 0);
            machineCode.push(instruction >>> 8);
            machineCode.push(instruction >>> 16);
            machineCode.push(instruction >>> 24);
        }
        else {
            throw Error(index.toString());
        }
    }
    return new Uint8Array(machineCode);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZW1ibGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Fzc2VtYmxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssS0FBSyxNQUFNLFlBQVksQ0FBQTtBQUVuQyxTQUFTLGNBQWMsQ0FBRSxPQUFlO0lBQ3RDLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7UUFDN0IsTUFBTSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtLQUMvQjtJQUNELE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDMUMsT0FBTyxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBQ3BDLENBQUM7QUFFRCxNQUFNLFVBQVUsUUFBUSxDQUFFLFVBQWtCLEVBQUUsSUFBaUI7SUFDN0QsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNwQyxNQUFNLFdBQVcsR0FBYSxFQUFFLENBQUE7SUFFaEMsS0FBSyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUMzQyxJQUFJLElBQUksS0FBSyxFQUFFLEVBQUU7WUFDZixTQUFRO1NBQ1Q7YUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO1lBQ2pDLFNBQVE7U0FDVDtRQUVELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDcEMsTUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQy9CLE1BQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7UUFFNUMsSUFBSSxPQUFPLEtBQUssTUFBTSxFQUFFO1lBQ3RCLG1CQUFtQjtZQUNuQixJQUFJLFFBQVEsS0FBSyxTQUFTO2dCQUFFLE1BQU0sS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUE7WUFDakUsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUE7WUFDekMsTUFBTSxTQUFTLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFBO1lBQ3ZELE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQTtZQUMzQixNQUFNLFVBQVUsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUE7WUFDeEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDekUsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFBO1lBQ25CLFdBQVcsSUFBSSxhQUFhLENBQUE7WUFDNUIsV0FBVyxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3hDLFdBQVcsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDckMsV0FBVyxJQUFJLFdBQVcsQ0FBQTtZQUMxQixXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQTtZQUNwQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQTtTQUNyQzthQUFNLElBQUksT0FBTyxLQUFLLE1BQU0sRUFBRTtZQUM3QixtQkFBbUI7WUFDbkIsSUFBSSxRQUFRLEtBQUssU0FBUztnQkFBRSxNQUFNLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO1lBQ2pFLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFBO1lBQ3pDLE1BQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLENBQUMsQ0FBQTtZQUN2RCxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUE7WUFDM0IsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFBO1lBQ3hELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQ3pFLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQTtZQUNuQixXQUFXLElBQUksYUFBYSxDQUFBO1lBQzVCLFdBQVcsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUN4QyxXQUFXLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3JDLFdBQVcsSUFBSSxXQUFXLENBQUE7WUFDMUIsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUE7WUFDcEMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUE7U0FDckM7YUFBTSxJQUFJLE9BQU8sS0FBSyxPQUFPLEVBQUU7WUFDOUIsb0JBQW9CO1lBQ3BCLElBQUksUUFBUSxLQUFLLFNBQVM7Z0JBQUUsTUFBTSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtZQUNqRSxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQTtZQUN6QyxNQUFNLFNBQVMsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUE7WUFDdkQsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFBO1lBQzNCLE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLENBQUMsQ0FBQTtZQUN4RCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUN6RSxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUE7WUFDbkIsV0FBVyxJQUFJLGFBQWEsQ0FBQTtZQUM1QixXQUFXLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDeEMsV0FBVyxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUNyQyxXQUFXLElBQUksV0FBVyxDQUFBO1lBQzFCLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQ3BDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1NBQ3JDO2FBQU0sSUFBSSxPQUFPLEtBQUssTUFBTSxFQUFFO1lBQzdCLG1CQUFtQjtZQUNuQixJQUFJLFFBQVEsS0FBSyxTQUFTO2dCQUFFLE1BQU0sS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUE7WUFDakUsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUE7WUFDekMsTUFBTSxTQUFTLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFBO1lBQ3ZELE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQTtZQUMzQixNQUFNLFVBQVUsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUE7WUFDeEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDekUsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFBO1lBQ25CLFdBQVcsSUFBSSxhQUFhLENBQUE7WUFDNUIsV0FBVyxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3hDLFdBQVcsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDckMsV0FBVyxJQUFJLFdBQVcsQ0FBQTtZQUMxQixXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQTtZQUNwQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQTtTQUNyQzthQUFNLElBQUksT0FBTyxLQUFLLEtBQUssRUFBRTtZQUM1QixrQkFBa0I7WUFDbEIsSUFBSSxRQUFRLEtBQUssU0FBUztnQkFBRSxNQUFNLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO1lBQ2pFLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFBO1lBQ3pDLE1BQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLENBQUMsQ0FBQTtZQUN2RCxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUE7WUFDM0IsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFBO1lBQ3hELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQ3pFLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQTtZQUNuQixXQUFXLElBQUksYUFBYSxDQUFBO1lBQzVCLFdBQVcsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUN4QyxXQUFXLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3JDLFdBQVcsSUFBSSxXQUFXLENBQUE7WUFDMUIsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUE7WUFDcEMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUE7U0FDckM7YUFBTSxJQUFJLE9BQU8sS0FBSyxNQUFNLEVBQUU7WUFDN0IsbUJBQW1CO1lBQ25CLElBQUksUUFBUSxLQUFLLFNBQVM7Z0JBQUUsTUFBTSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtZQUNqRSxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQTtZQUN6QyxNQUFNLFNBQVMsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUE7WUFDdkQsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFBO1lBQzNCLE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLENBQUMsQ0FBQTtZQUN4RCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUN6RSxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUE7WUFDbkIsV0FBVyxJQUFJLGFBQWEsQ0FBQTtZQUM1QixXQUFXLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDeEMsV0FBVyxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUNyQyxXQUFXLElBQUksV0FBVyxDQUFBO1lBQzFCLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQ3BDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1NBQ3JDO2FBQU0sSUFBSSxPQUFPLEtBQUssTUFBTSxFQUFFO1lBQzdCLG1CQUFtQjtZQUNuQixJQUFJLFFBQVEsS0FBSyxTQUFTO2dCQUFFLE1BQU0sS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUE7WUFDakUsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUE7WUFDekMsTUFBTSxTQUFTLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFBO1lBQ3ZELE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQTtZQUMzQixNQUFNLFVBQVUsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUE7WUFDeEQsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDdkUsV0FBVyxJQUFJLGtDQUFrQyxDQUFBO1lBQ2pELElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQTtZQUNuQixXQUFXLElBQUksYUFBYSxDQUFBO1lBQzVCLFdBQVcsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUN4QyxXQUFXLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3JDLFdBQVcsSUFBSSxXQUFXLENBQUE7WUFDMUIsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUE7WUFDcEMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUE7U0FDckM7YUFBTSxJQUFJLE9BQU8sS0FBSyxNQUFNLEVBQUU7WUFDN0IsbUJBQW1CO1lBQ25CLElBQUksUUFBUSxLQUFLLFNBQVM7Z0JBQUUsTUFBTSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtZQUNqRSxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQTtZQUN6QyxNQUFNLFNBQVMsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUE7WUFDdkQsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFBO1lBQzNCLE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLENBQUMsQ0FBQTtZQUN4RCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUN2RSxXQUFXLElBQUksa0NBQWtDLENBQUE7WUFDakQsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFBO1lBQ25CLFdBQVcsSUFBSSxhQUFhLENBQUE7WUFDNUIsV0FBVyxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3hDLFdBQVcsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDckMsV0FBVyxJQUFJLFdBQVcsQ0FBQTtZQUMxQixXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQTtZQUNwQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQTtTQUNyQzthQUFNLElBQUksT0FBTyxLQUFLLE1BQU0sRUFBRTtZQUM3QixtQkFBbUI7WUFDbkIsSUFBSSxRQUFRLEtBQUssU0FBUztnQkFBRSxNQUFNLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO1lBQ2pFLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFBO1lBQ3pDLE1BQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLENBQUMsQ0FBQTtZQUN2RCxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUE7WUFDM0IsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFBO1lBQ3hELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQ3ZFLFdBQVcsSUFBSSxrQ0FBa0MsQ0FBQTtZQUNqRCxXQUFXLElBQUksa0NBQWtDLENBQUE7WUFDakQsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFBO1lBQ25CLFdBQVcsSUFBSSxhQUFhLENBQUE7WUFDNUIsV0FBVyxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3hDLFdBQVcsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDckMsV0FBVyxJQUFJLFdBQVcsQ0FBQTtZQUMxQixXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQTtZQUNwQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQTtTQUNyQzthQUFNLElBQUksT0FBTyxLQUFLLEtBQUssRUFBRTtZQUM1QixjQUFjO1lBQ2QsSUFBSSxRQUFRLEtBQUssU0FBUztnQkFBRSxNQUFNLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO1lBQ2pFLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFBO1lBQ3RDLE1BQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLENBQUMsQ0FBQTtZQUN2RCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUN6RSxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUE7WUFDbkIsV0FBVyxJQUFJLGFBQWEsQ0FBQTtZQUM1QixXQUFXLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsSUFBSSxXQUFXLENBQUE7WUFDMUIsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUE7WUFDcEMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUE7U0FDckM7YUFBTSxJQUFJLE9BQU8sS0FBSyxPQUFPLEVBQUU7WUFDOUIsZ0JBQWdCO1lBQ2hCLElBQUksUUFBUSxLQUFLLFNBQVM7Z0JBQUUsTUFBTSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtZQUNqRSxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQTtZQUN4QyxNQUFNLFNBQVMsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUE7WUFDdkQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDekUsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFBO1lBQ25CLFdBQVcsSUFBSSxhQUFhLENBQUE7WUFDNUIsV0FBVyxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLElBQUksV0FBVyxDQUFBO1lBQzFCLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQ3BDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1NBQ3JDO2FBQU0sSUFBSSxPQUFPLEtBQUssS0FBSyxFQUFFO1lBQzVCLGlCQUFpQjtZQUNqQixJQUFJLFFBQVEsS0FBSyxTQUFTO2dCQUFFLE1BQU0sS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUE7WUFDakUsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUE7WUFDckMsTUFBTSxTQUFTLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFBO1lBQ3ZELE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQTtZQUMzQixNQUFNLFVBQVUsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUE7WUFDeEQsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFBO1lBQ3hELE1BQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQTtZQUMvQixJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUE7WUFDbkIsV0FBVyxJQUFJLGFBQWEsQ0FBQTtZQUM1QixXQUFXLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDeEMsV0FBVyxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUNyQyxXQUFXLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3JDLFdBQVcsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDeEMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUE7WUFDcEMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUE7U0FDckM7YUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLEVBQUU7WUFDNUIsaUJBQWlCO1lBQ2pCLElBQUksUUFBUSxLQUFLLFNBQVM7Z0JBQUUsTUFBTSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtZQUNqRSxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQTtZQUNyQyxNQUFNLFNBQVMsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUE7WUFDdkQsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFBO1lBQzNCLE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLENBQUMsQ0FBQTtZQUN4RCxNQUFNLFVBQVUsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUE7WUFDeEQsTUFBTSxhQUFhLEdBQUcsU0FBUyxDQUFBO1lBQy9CLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQTtZQUNuQixXQUFXLElBQUksYUFBYSxDQUFBO1lBQzVCLFdBQVcsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUN4QyxXQUFXLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3JDLFdBQVcsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDckMsV0FBVyxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUN4QyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQTtZQUNwQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQTtTQUNyQzthQUFNLElBQUksT0FBTyxLQUFLLE1BQU0sRUFBRTtZQUM3QixrQkFBa0I7WUFDbEIsSUFBSSxRQUFRLEtBQUssU0FBUztnQkFBRSxNQUFNLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO1lBQ2pFLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFBO1lBQ3JDLE1BQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLENBQUMsQ0FBQTtZQUN2RCxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUE7WUFDM0IsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFBO1lBQ3hELE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLENBQUMsQ0FBQTtZQUN4RCxNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUE7WUFDL0IsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFBO1lBQ25CLFdBQVcsSUFBSSxhQUFhLENBQUE7WUFDNUIsV0FBVyxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3hDLFdBQVcsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDckMsV0FBVyxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUNyQyxXQUFXLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3hDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQ3BDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1NBQ3JDO2FBQU0sSUFBSSxPQUFPLEtBQUssS0FBSyxFQUFFO1lBQzVCLGlCQUFpQjtZQUNqQixJQUFJLFFBQVEsS0FBSyxTQUFTO2dCQUFFLE1BQU0sS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUE7WUFDakUsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUE7WUFDckMsTUFBTSxTQUFTLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFBO1lBQ3ZELE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQTtZQUMzQixNQUFNLFVBQVUsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUE7WUFDeEQsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFBO1lBQ3hELE1BQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQTtZQUMvQixJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUE7WUFDbkIsV0FBVyxJQUFJLGFBQWEsQ0FBQTtZQUM1QixXQUFXLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDeEMsV0FBVyxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUNyQyxXQUFXLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3JDLFdBQVcsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDeEMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUE7WUFDcEMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUE7U0FDckM7YUFBTSxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDM0IsZ0JBQWdCO1lBQ2hCLElBQUksUUFBUSxLQUFLLFNBQVM7Z0JBQUUsTUFBTSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtZQUNqRSxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQTtZQUNyQyxNQUFNLFNBQVMsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUE7WUFDdkQsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFBO1lBQzNCLE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLENBQUMsQ0FBQTtZQUN4RCxNQUFNLFVBQVUsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUE7WUFDeEQsTUFBTSxhQUFhLEdBQUcsU0FBUyxDQUFBO1lBQy9CLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQTtZQUNuQixXQUFXLElBQUksYUFBYSxDQUFBO1lBQzVCLFdBQVcsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUN4QyxXQUFXLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3JDLFdBQVcsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDckMsV0FBVyxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUN4QyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQTtZQUNwQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQTtTQUNyQzthQUFNLElBQUksT0FBTyxLQUFLLEtBQUssRUFBRTtZQUM1QixpQkFBaUI7WUFDakIsSUFBSSxRQUFRLEtBQUssU0FBUztnQkFBRSxNQUFNLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO1lBQ2pFLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFBO1lBQ3JDLE1BQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLENBQUMsQ0FBQTtZQUN2RCxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUE7WUFDM0IsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFBO1lBQ3hELE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLENBQUMsQ0FBQTtZQUN4RCxNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUE7WUFDL0IsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFBO1lBQ25CLFdBQVcsSUFBSSxhQUFhLENBQUE7WUFDNUIsV0FBVyxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3hDLFdBQVcsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDckMsV0FBVyxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUNyQyxXQUFXLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3hDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQ3BDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1NBQ3JDO2FBQU0sSUFBSSxPQUFPLEtBQUssS0FBSyxFQUFFO1lBQzVCLGlCQUFpQjtZQUNqQixJQUFJLFFBQVEsS0FBSyxTQUFTO2dCQUFFLE1BQU0sS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUE7WUFDakUsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUE7WUFDckMsTUFBTSxTQUFTLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFBO1lBQ3ZELE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQTtZQUMzQixNQUFNLFVBQVUsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUE7WUFDeEQsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFBO1lBQ3hELE1BQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQTtZQUMvQixJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUE7WUFDbkIsV0FBVyxJQUFJLGFBQWEsQ0FBQTtZQUM1QixXQUFXLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDeEMsV0FBVyxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUNyQyxXQUFXLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3JDLFdBQVcsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDeEMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUE7WUFDcEMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUE7U0FDckM7YUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLEVBQUU7WUFDNUIsaUJBQWlCO1lBQ2pCLElBQUksUUFBUSxLQUFLLFNBQVM7Z0JBQUUsTUFBTSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtZQUNqRSxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQTtZQUNyQyxNQUFNLFNBQVMsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUE7WUFDdkQsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFBO1lBQzNCLE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLENBQUMsQ0FBQTtZQUN4RCxNQUFNLFVBQVUsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUE7WUFDeEQsTUFBTSxhQUFhLEdBQUcsU0FBUyxDQUFBO1lBQy9CLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQTtZQUNuQixXQUFXLElBQUksYUFBYSxDQUFBO1lBQzVCLFdBQVcsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUN4QyxXQUFXLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3JDLFdBQVcsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDckMsV0FBVyxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUN4QyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQTtZQUNwQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQTtTQUNyQzthQUFNLElBQUksT0FBTyxLQUFLLEtBQUssRUFBRTtZQUM1QixpQkFBaUI7WUFDakIsSUFBSSxRQUFRLEtBQUssU0FBUztnQkFBRSxNQUFNLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO1lBQ2pFLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFBO1lBQ3JDLE1BQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLENBQUMsQ0FBQTtZQUN2RCxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUE7WUFDM0IsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFBO1lBQ3hELE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLENBQUMsQ0FBQTtZQUN4RCxNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUE7WUFDL0IsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFBO1lBQ25CLFdBQVcsSUFBSSxhQUFhLENBQUE7WUFDNUIsV0FBVyxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3hDLFdBQVcsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDckMsV0FBVyxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUNyQyxXQUFXLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3hDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQ3BDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1NBQ3JDO2FBQU0sSUFBSSxPQUFPLEtBQUssS0FBSyxFQUFFO1lBQzVCLGlCQUFpQjtZQUNqQixJQUFJLFFBQVEsS0FBSyxTQUFTO2dCQUFFLE1BQU0sS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUE7WUFDakUsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUE7WUFDckMsTUFBTSxTQUFTLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFBO1lBQ3ZELE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQTtZQUMzQixNQUFNLFVBQVUsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUE7WUFDeEQsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFBO1lBQ3hELE1BQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQTtZQUMvQixJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUE7WUFDbkIsV0FBVyxJQUFJLGFBQWEsQ0FBQTtZQUM1QixXQUFXLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDeEMsV0FBVyxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUNyQyxXQUFXLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3JDLFdBQVcsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDeEMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUE7WUFDcEMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUE7U0FDckM7YUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLEVBQUU7WUFDNUIsY0FBYztZQUNkLElBQUksUUFBUSxLQUFLLFNBQVM7Z0JBQUUsTUFBTSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtZQUNqRSxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQTtZQUN0QyxNQUFNLFNBQVMsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUE7WUFDdkQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDekUsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFBO1lBQ25CLFdBQVcsSUFBSSxhQUFhLENBQUE7WUFDNUIsV0FBVyxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLElBQUksV0FBVyxDQUFBO1lBQzFCLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQ3BDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1NBQ3JDO2FBQU0sSUFBSSxPQUFPLEtBQUssTUFBTSxFQUFFO1lBQzdCLG1CQUFtQjtZQUNuQixJQUFJLFFBQVEsS0FBSyxTQUFTO2dCQUFFLE1BQU0sS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUE7WUFDakUsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUE7WUFDdkMsTUFBTSxTQUFTLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFBO1lBQ3ZELE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQTtZQUMzQixNQUFNLFVBQVUsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUE7WUFDeEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDekUsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFBO1lBQ25CLFdBQVcsSUFBSSxhQUFhLENBQUE7WUFDNUIsV0FBVyxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3hDLFdBQVcsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDckMsV0FBVyxJQUFJLFdBQVcsQ0FBQTtZQUMxQixXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQTtZQUNwQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQTtTQUNyQzthQUFNLElBQUksT0FBTyxLQUFLLEtBQUssRUFBRTtZQUM1QixtQkFBbUI7WUFDbkIsSUFBSSxRQUFRLEtBQUssU0FBUztnQkFBRSxNQUFNLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO1lBQ2pFLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFBO1lBQ3pDLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQTtZQUMzQixNQUFNLFVBQVUsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUE7WUFDeEQsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFBO1lBQ3hELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQ3pFLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQTtZQUNuQixXQUFXLElBQUksYUFBYSxDQUFBO1lBQzVCLFdBQVcsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDeEMsV0FBVyxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUNyQyxXQUFXLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3JDLFdBQVcsSUFBSSxXQUFXLENBQUE7WUFDMUIsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUE7WUFDcEMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUE7U0FDckM7YUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLEVBQUU7WUFDNUIsbUJBQW1CO1lBQ25CLElBQUksUUFBUSxLQUFLLFNBQVM7Z0JBQUUsTUFBTSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtZQUNqRSxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQTtZQUN6QyxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUE7WUFDM0IsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFBO1lBQ3hELE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLENBQUMsQ0FBQTtZQUN4RCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUN6RSxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUE7WUFDbkIsV0FBVyxJQUFJLGFBQWEsQ0FBQTtZQUM1QixXQUFXLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3hDLFdBQVcsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDckMsV0FBVyxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUNyQyxXQUFXLElBQUksV0FBVyxDQUFBO1lBQzFCLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQ3BDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1NBQ3JDO2FBQU0sSUFBSSxPQUFPLEtBQUssS0FBSyxFQUFFO1lBQzVCLG1CQUFtQjtZQUNuQixJQUFJLFFBQVEsS0FBSyxTQUFTO2dCQUFFLE1BQU0sS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUE7WUFDakUsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUE7WUFDekMsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFBO1lBQzNCLE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLENBQUMsQ0FBQTtZQUN4RCxNQUFNLFVBQVUsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUE7WUFDeEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDekUsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFBO1lBQ25CLFdBQVcsSUFBSSxhQUFhLENBQUE7WUFDNUIsV0FBVyxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUN4QyxXQUFXLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3JDLFdBQVcsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDckMsV0FBVyxJQUFJLFdBQVcsQ0FBQTtZQUMxQixXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQTtZQUNwQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQTtTQUNyQzthQUFNLElBQUksT0FBTyxLQUFLLE1BQU0sRUFBRTtZQUM3QixvQkFBb0I7WUFDcEIsSUFBSSxRQUFRLEtBQUssU0FBUztnQkFBRSxNQUFNLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO1lBQ2pFLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFBO1lBQ3pDLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQTtZQUMzQixNQUFNLFVBQVUsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUE7WUFDeEQsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFBO1lBQ3hELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQ3pFLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQTtZQUNuQixXQUFXLElBQUksYUFBYSxDQUFBO1lBQzVCLFdBQVcsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDeEMsV0FBVyxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUNyQyxXQUFXLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3JDLFdBQVcsSUFBSSxXQUFXLENBQUE7WUFDMUIsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUE7WUFDcEMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUE7U0FDckM7YUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLEVBQUU7WUFDNUIsbUJBQW1CO1lBQ25CLElBQUksUUFBUSxLQUFLLFNBQVM7Z0JBQUUsTUFBTSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtZQUNqRSxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQTtZQUN6QyxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUE7WUFDM0IsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFBO1lBQ3hELE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLENBQUMsQ0FBQTtZQUN4RCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUN6RSxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUE7WUFDbkIsV0FBVyxJQUFJLGFBQWEsQ0FBQTtZQUM1QixXQUFXLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3hDLFdBQVcsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDckMsV0FBVyxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUNyQyxXQUFXLElBQUksV0FBVyxDQUFBO1lBQzFCLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQ3BDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1NBQ3JDO2FBQU0sSUFBSSxPQUFPLEtBQUssTUFBTSxFQUFFO1lBQzdCLG9CQUFvQjtZQUNwQixJQUFJLFFBQVEsS0FBSyxTQUFTO2dCQUFFLE1BQU0sS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUE7WUFDakUsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUE7WUFDekMsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFBO1lBQzNCLE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLENBQUMsQ0FBQTtZQUN4RCxNQUFNLFVBQVUsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUE7WUFDeEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDekUsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFBO1lBQ25CLFdBQVcsSUFBSSxhQUFhLENBQUE7WUFDNUIsV0FBVyxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUN4QyxXQUFXLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3JDLFdBQVcsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDckMsV0FBVyxJQUFJLFdBQVcsQ0FBQTtZQUMxQixXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQTtZQUNwQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQTtTQUNyQzthQUFNLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtZQUMzQixpQkFBaUI7WUFDakIsSUFBSSxRQUFRLEtBQUssU0FBUztnQkFBRSxNQUFNLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO1lBQ2pFLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFBO1lBQ3ZDLE1BQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLENBQUMsQ0FBQTtZQUN2RCxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUE7WUFDM0IsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFBO1lBQ3hELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQ3pFLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQTtZQUNuQixXQUFXLElBQUksYUFBYSxDQUFBO1lBQzVCLFdBQVcsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUN4QyxXQUFXLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3JDLFdBQVcsSUFBSSxXQUFXLENBQUE7WUFDMUIsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUE7WUFDcEMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUE7U0FDckM7YUFBTSxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDM0IsaUJBQWlCO1lBQ2pCLElBQUksUUFBUSxLQUFLLFNBQVM7Z0JBQUUsTUFBTSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtZQUNqRSxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQTtZQUN2QyxNQUFNLFNBQVMsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUE7WUFDdkQsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFBO1lBQzNCLE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLENBQUMsQ0FBQTtZQUN4RCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUN6RSxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUE7WUFDbkIsV0FBVyxJQUFJLGFBQWEsQ0FBQTtZQUM1QixXQUFXLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDeEMsV0FBVyxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUNyQyxXQUFXLElBQUksV0FBVyxDQUFBO1lBQzFCLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQ3BDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1NBQ3JDO2FBQU0sSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFO1lBQzNCLGlCQUFpQjtZQUNqQixJQUFJLFFBQVEsS0FBSyxTQUFTO2dCQUFFLE1BQU0sS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUE7WUFDakUsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUE7WUFDdkMsTUFBTSxTQUFTLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFBO1lBQ3ZELE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQTtZQUMzQixNQUFNLFVBQVUsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUE7WUFDeEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDekUsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFBO1lBQ25CLFdBQVcsSUFBSSxhQUFhLENBQUE7WUFDNUIsV0FBVyxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3hDLFdBQVcsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDckMsV0FBVyxJQUFJLFdBQVcsQ0FBQTtZQUMxQixXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQTtZQUNwQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQTtTQUNyQzthQUFNLElBQUksT0FBTyxLQUFLLEtBQUssRUFBRTtZQUM1QixrQkFBa0I7WUFDbEIsSUFBSSxRQUFRLEtBQUssU0FBUztnQkFBRSxNQUFNLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO1lBQ2pFLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFBO1lBQ3ZDLE1BQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLENBQUMsQ0FBQTtZQUN2RCxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUE7WUFDM0IsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFBO1lBQ3hELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQ3pFLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQTtZQUNuQixXQUFXLElBQUksYUFBYSxDQUFBO1lBQzVCLFdBQVcsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUN4QyxXQUFXLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3JDLFdBQVcsSUFBSSxXQUFXLENBQUE7WUFDMUIsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUE7WUFDcEMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUE7U0FDckM7YUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLEVBQUU7WUFDNUIsa0JBQWtCO1lBQ2xCLElBQUksUUFBUSxLQUFLLFNBQVM7Z0JBQUUsTUFBTSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtZQUNqRSxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQTtZQUN2QyxNQUFNLFNBQVMsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUE7WUFDdkQsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFBO1lBQzNCLE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLENBQUMsQ0FBQTtZQUN4RCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUN6RSxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUE7WUFDbkIsV0FBVyxJQUFJLGFBQWEsQ0FBQTtZQUM1QixXQUFXLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDeEMsV0FBVyxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUNyQyxXQUFXLElBQUksV0FBVyxDQUFBO1lBQzFCLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQ3BDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1NBQ3JDO2FBQU0sSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFO1lBQzNCLGtCQUFrQjtZQUNsQixJQUFJLFFBQVEsS0FBSyxTQUFTO2dCQUFFLE1BQU0sS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUE7WUFDakUsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUE7WUFDeEMsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFBO1lBQzNCLE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLENBQUMsQ0FBQTtZQUN4RCxNQUFNLFVBQVUsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUE7WUFDeEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDekUsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFBO1lBQ25CLFdBQVcsSUFBSSxhQUFhLENBQUE7WUFDNUIsV0FBVyxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUN4QyxXQUFXLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3JDLFdBQVcsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDckMsV0FBVyxJQUFJLFdBQVcsQ0FBQTtZQUMxQixXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQTtZQUNuQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQTtZQUNwQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQTtTQUNyQzthQUFNLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtZQUMzQixrQkFBa0I7WUFDbEIsSUFBSSxRQUFRLEtBQUssU0FBUztnQkFBRSxNQUFNLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO1lBQ2pFLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFBO1lBQ3hDLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQTtZQUMzQixNQUFNLFVBQVUsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUE7WUFDeEQsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFBO1lBQ3hELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQ3pFLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQTtZQUNuQixXQUFXLElBQUksYUFBYSxDQUFBO1lBQzVCLFdBQVcsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDeEMsV0FBVyxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUNyQyxXQUFXLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3JDLFdBQVcsSUFBSSxXQUFXLENBQUE7WUFDMUIsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUE7WUFDbkMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUE7WUFDcEMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUE7U0FDckM7YUFBTSxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDM0Isa0JBQWtCO1lBQ2xCLElBQUksUUFBUSxLQUFLLFNBQVM7Z0JBQUUsTUFBTSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQTtZQUNqRSxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQTtZQUN4QyxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUE7WUFDM0IsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFBO1lBQ3hELE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLENBQUMsQ0FBQTtZQUN4RCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUN6RSxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUE7WUFDbkIsV0FBVyxJQUFJLGFBQWEsQ0FBQTtZQUM1QixXQUFXLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3hDLFdBQVcsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7WUFDckMsV0FBVyxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUNyQyxXQUFXLElBQUksV0FBVyxDQUFBO1lBQzFCLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFBO1lBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQ3BDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1NBQ3JDO2FBQU07WUFDTCxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtTQUM5QjtLQUNGO0lBRUQsT0FBTyxJQUFJLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQTtBQUNwQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdmNvcmUgZnJvbSAnLi92Y29yZS5qcydcblxuZnVuY3Rpb24gZW5jb2RlUmVnaXN0ZXIgKHJlZ05hbWU6IHN0cmluZyk6IG51bWJlciB7XG4gIGlmIChyZWdOYW1lLmNoYXJBdCgwKSAhPT0gJ3gnKSB7XG4gICAgdGhyb3cgRXJyb3IoJ3JlZ05hbWUgcHJvYmxlbScpXG4gIH1cbiAgY29uc3QgcmVnTmFtZU51bWJlciA9IHJlZ05hbWUuc3Vic3RyaW5nKDEpXG4gIHJldHVybiBwYXJzZUludChyZWdOYW1lTnVtYmVyLCAxMClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VtYmx5IChzb3VyY2VDb2RlOiBzdHJpbmcsIGNvcmU6IHZjb3JlLlZjb3JlKTogVWludDhBcnJheSB7XG4gIGNvbnN0IGxpbmVzID0gc291cmNlQ29kZS5zcGxpdCgnXFxuJylcbiAgY29uc3QgbWFjaGluZUNvZGU6IG51bWJlcltdID0gW11cblxuICBmb3IgKGNvbnN0IFtpbmRleCwgbGluZV0gb2YgbGluZXMuZW50cmllcygpKSB7XG4gICAgaWYgKGxpbmUgPT09ICcnKSB7XG4gICAgICBjb250aW51ZVxuICAgIH0gZWxzZSBpZiAobGluZS5jaGFyQXQoMCkgPT09ICc7Jykge1xuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBjb25zdCBzcGxpdHRlZExpbmUgPSBsaW5lLnNwbGl0KCcgJylcbiAgICBjb25zdCBjb21tYW5kID0gc3BsaXR0ZWRMaW5lWzBdXG4gICAgY29uc3Qgb3BlcmFuZHMgPSBzcGxpdHRlZExpbmVbMV0/LnNwbGl0KCcsJylcblxuICAgIGlmIChjb21tYW5kID09PSAnYWRkaScpIHtcbiAgICAgIC8vIGFkZGkgcmQscnMxLGlpbW1cbiAgICAgIGlmIChvcGVyYW5kcyA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcignb3BlcmFuZHMgPT09IHVuZGVmaW5lZCcpXG4gICAgICBjb25zdCBlbmNvZGVkT3Bjb2RlID0gdmNvcmUuT3Bjb2RlLk9QX0lNTVxuICAgICAgY29uc3QgZW5jb2RlZFJkID0gZW5jb2RlUmVnaXN0ZXIob3BlcmFuZHNbMF0gYXMgc3RyaW5nKVxuICAgICAgY29uc3QgZW5jb2RlZEZ1bmN0MyA9IDBiMDAwXG4gICAgICBjb25zdCBlbmNvZGVkUnMxID0gZW5jb2RlUmVnaXN0ZXIob3BlcmFuZHNbMV0gYXMgc3RyaW5nKVxuICAgICAgY29uc3QgZW5jb2RlZElpbW0gPSBjb3JlLnZhbHVlVG9JaW1tKHBhcnNlSW50KG9wZXJhbmRzWzJdIGFzIHN0cmluZywgMTApKVxuICAgICAgbGV0IGluc3RydWN0aW9uID0gMFxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZE9wY29kZVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZFJkICogKDIgKiogNylcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRGdW5jdDMgKiAoMiAqKiAxMilcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRSczEgKiAoMiAqKiAxNSlcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRJaW1tXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAwKVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gOClcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDE2KVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMjQpXG4gICAgfSBlbHNlIGlmIChjb21tYW5kID09PSAnc2x0aScpIHtcbiAgICAgIC8vIHNsdGkgcmQscnMxLGlpbW1cbiAgICAgIGlmIChvcGVyYW5kcyA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcignb3BlcmFuZHMgPT09IHVuZGVmaW5lZCcpXG4gICAgICBjb25zdCBlbmNvZGVkT3Bjb2RlID0gdmNvcmUuT3Bjb2RlLk9QX0lNTVxuICAgICAgY29uc3QgZW5jb2RlZFJkID0gZW5jb2RlUmVnaXN0ZXIob3BlcmFuZHNbMF0gYXMgc3RyaW5nKVxuICAgICAgY29uc3QgZW5jb2RlZEZ1bmN0MyA9IDBiMDEwXG4gICAgICBjb25zdCBlbmNvZGVkUnMxID0gZW5jb2RlUmVnaXN0ZXIob3BlcmFuZHNbMV0gYXMgc3RyaW5nKVxuICAgICAgY29uc3QgZW5jb2RlZElpbW0gPSBjb3JlLnZhbHVlVG9JaW1tKHBhcnNlSW50KG9wZXJhbmRzWzJdIGFzIHN0cmluZywgMTApKVxuICAgICAgbGV0IGluc3RydWN0aW9uID0gMFxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZE9wY29kZVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZFJkICogKDIgKiogNylcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRGdW5jdDMgKiAoMiAqKiAxMilcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRSczEgKiAoMiAqKiAxNSlcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRJaW1tXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAwKVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gOClcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDE2KVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMjQpXG4gICAgfSBlbHNlIGlmIChjb21tYW5kID09PSAnc2x0aXUnKSB7XG4gICAgICAvLyBzbHRpdSByZCxyczEsaWltbVxuICAgICAgaWYgKG9wZXJhbmRzID09PSB1bmRlZmluZWQpIHRocm93IEVycm9yKCdvcGVyYW5kcyA9PT0gdW5kZWZpbmVkJylcbiAgICAgIGNvbnN0IGVuY29kZWRPcGNvZGUgPSB2Y29yZS5PcGNvZGUuT1BfSU1NXG4gICAgICBjb25zdCBlbmNvZGVkUmQgPSBlbmNvZGVSZWdpc3RlcihvcGVyYW5kc1swXSBhcyBzdHJpbmcpXG4gICAgICBjb25zdCBlbmNvZGVkRnVuY3QzID0gMGIwMTFcbiAgICAgIGNvbnN0IGVuY29kZWRSczEgPSBlbmNvZGVSZWdpc3RlcihvcGVyYW5kc1sxXSBhcyBzdHJpbmcpXG4gICAgICBjb25zdCBlbmNvZGVkSWltbSA9IGNvcmUudmFsdWVUb0lpbW0ocGFyc2VJbnQob3BlcmFuZHNbMl0gYXMgc3RyaW5nLCAxMCkpXG4gICAgICBsZXQgaW5zdHJ1Y3Rpb24gPSAwXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkT3Bjb2RlXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkUmQgKiAoMiAqKiA3KVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZEZ1bmN0MyAqICgyICoqIDEyKVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZFJzMSAqICgyICoqIDE1KVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZElpbW1cbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDApXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiA4KVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMTYpXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAyNClcbiAgICB9IGVsc2UgaWYgKGNvbW1hbmQgPT09ICdhbmRpJykge1xuICAgICAgLy8gYW5kaSByZCxyczEsaWltbVxuICAgICAgaWYgKG9wZXJhbmRzID09PSB1bmRlZmluZWQpIHRocm93IEVycm9yKCdvcGVyYW5kcyA9PT0gdW5kZWZpbmVkJylcbiAgICAgIGNvbnN0IGVuY29kZWRPcGNvZGUgPSB2Y29yZS5PcGNvZGUuT1BfSU1NXG4gICAgICBjb25zdCBlbmNvZGVkUmQgPSBlbmNvZGVSZWdpc3RlcihvcGVyYW5kc1swXSBhcyBzdHJpbmcpXG4gICAgICBjb25zdCBlbmNvZGVkRnVuY3QzID0gMGIxMTFcbiAgICAgIGNvbnN0IGVuY29kZWRSczEgPSBlbmNvZGVSZWdpc3RlcihvcGVyYW5kc1sxXSBhcyBzdHJpbmcpXG4gICAgICBjb25zdCBlbmNvZGVkSWltbSA9IGNvcmUudmFsdWVUb0lpbW0ocGFyc2VJbnQob3BlcmFuZHNbMl0gYXMgc3RyaW5nLCAxMCkpXG4gICAgICBsZXQgaW5zdHJ1Y3Rpb24gPSAwXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkT3Bjb2RlXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkUmQgKiAoMiAqKiA3KVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZEZ1bmN0MyAqICgyICoqIDEyKVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZFJzMSAqICgyICoqIDE1KVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZElpbW1cbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDApXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiA4KVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMTYpXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAyNClcbiAgICB9IGVsc2UgaWYgKGNvbW1hbmQgPT09ICdvcmknKSB7XG4gICAgICAvLyBvcmkgcmQscnMxLGlpbW1cbiAgICAgIGlmIChvcGVyYW5kcyA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcignb3BlcmFuZHMgPT09IHVuZGVmaW5lZCcpXG4gICAgICBjb25zdCBlbmNvZGVkT3Bjb2RlID0gdmNvcmUuT3Bjb2RlLk9QX0lNTVxuICAgICAgY29uc3QgZW5jb2RlZFJkID0gZW5jb2RlUmVnaXN0ZXIob3BlcmFuZHNbMF0gYXMgc3RyaW5nKVxuICAgICAgY29uc3QgZW5jb2RlZEZ1bmN0MyA9IDBiMTAwXG4gICAgICBjb25zdCBlbmNvZGVkUnMxID0gZW5jb2RlUmVnaXN0ZXIob3BlcmFuZHNbMV0gYXMgc3RyaW5nKVxuICAgICAgY29uc3QgZW5jb2RlZElpbW0gPSBjb3JlLnZhbHVlVG9JaW1tKHBhcnNlSW50KG9wZXJhbmRzWzJdIGFzIHN0cmluZywgMTApKVxuICAgICAgbGV0IGluc3RydWN0aW9uID0gMFxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZE9wY29kZVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZFJkICogKDIgKiogNylcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRGdW5jdDMgKiAoMiAqKiAxMilcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRSczEgKiAoMiAqKiAxNSlcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRJaW1tXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAwKVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gOClcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDE2KVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMjQpXG4gICAgfSBlbHNlIGlmIChjb21tYW5kID09PSAneG9yaScpIHtcbiAgICAgIC8vIHhvcmkgcmQscnMxLGlpbW1cbiAgICAgIGlmIChvcGVyYW5kcyA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcignb3BlcmFuZHMgPT09IHVuZGVmaW5lZCcpXG4gICAgICBjb25zdCBlbmNvZGVkT3Bjb2RlID0gdmNvcmUuT3Bjb2RlLk9QX0lNTVxuICAgICAgY29uc3QgZW5jb2RlZFJkID0gZW5jb2RlUmVnaXN0ZXIob3BlcmFuZHNbMF0gYXMgc3RyaW5nKVxuICAgICAgY29uc3QgZW5jb2RlZEZ1bmN0MyA9IDBiMTAwXG4gICAgICBjb25zdCBlbmNvZGVkUnMxID0gZW5jb2RlUmVnaXN0ZXIob3BlcmFuZHNbMV0gYXMgc3RyaW5nKVxuICAgICAgY29uc3QgZW5jb2RlZElpbW0gPSBjb3JlLnZhbHVlVG9JaW1tKHBhcnNlSW50KG9wZXJhbmRzWzJdIGFzIHN0cmluZywgMTApKVxuICAgICAgbGV0IGluc3RydWN0aW9uID0gMFxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZE9wY29kZVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZFJkICogKDIgKiogNylcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRGdW5jdDMgKiAoMiAqKiAxMilcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRSczEgKiAoMiAqKiAxNSlcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRJaW1tXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAwKVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gOClcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDE2KVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMjQpXG4gICAgfSBlbHNlIGlmIChjb21tYW5kID09PSAnc2xsaScpIHtcbiAgICAgIC8vIHNsbGkgcmQscnMxLGlpbW1cbiAgICAgIGlmIChvcGVyYW5kcyA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcignb3BlcmFuZHMgPT09IHVuZGVmaW5lZCcpXG4gICAgICBjb25zdCBlbmNvZGVkT3Bjb2RlID0gdmNvcmUuT3Bjb2RlLk9QX0lNTVxuICAgICAgY29uc3QgZW5jb2RlZFJkID0gZW5jb2RlUmVnaXN0ZXIob3BlcmFuZHNbMF0gYXMgc3RyaW5nKVxuICAgICAgY29uc3QgZW5jb2RlZEZ1bmN0MyA9IDBiMDAxXG4gICAgICBjb25zdCBlbmNvZGVkUnMxID0gZW5jb2RlUmVnaXN0ZXIob3BlcmFuZHNbMV0gYXMgc3RyaW5nKVxuICAgICAgbGV0IGVuY29kZWRJaW1tID0gY29yZS52YWx1ZVRvSWltbShwYXJzZUludChvcGVyYW5kc1syXSBhcyBzdHJpbmcsIDEwKSlcbiAgICAgIGVuY29kZWRJaW1tICY9IDBiMDAwMDAwMDExMTExMTExMTExMTExMTExMTExMTExMTFcbiAgICAgIGxldCBpbnN0cnVjdGlvbiA9IDBcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRPcGNvZGVcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRSZCAqICgyICoqIDcpXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkRnVuY3QzICogKDIgKiogMTIpXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkUnMxICogKDIgKiogMTUpXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkSWltbVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMClcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDgpXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAxNilcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDI0KVxuICAgIH0gZWxzZSBpZiAoY29tbWFuZCA9PT0gJ3NybGknKSB7XG4gICAgICAvLyBzcmxpIHJkLHJzMSxpaW1tXG4gICAgICBpZiAob3BlcmFuZHMgPT09IHVuZGVmaW5lZCkgdGhyb3cgRXJyb3IoJ29wZXJhbmRzID09PSB1bmRlZmluZWQnKVxuICAgICAgY29uc3QgZW5jb2RlZE9wY29kZSA9IHZjb3JlLk9wY29kZS5PUF9JTU1cbiAgICAgIGNvbnN0IGVuY29kZWRSZCA9IGVuY29kZVJlZ2lzdGVyKG9wZXJhbmRzWzBdIGFzIHN0cmluZylcbiAgICAgIGNvbnN0IGVuY29kZWRGdW5jdDMgPSAwYjEwMVxuICAgICAgY29uc3QgZW5jb2RlZFJzMSA9IGVuY29kZVJlZ2lzdGVyKG9wZXJhbmRzWzFdIGFzIHN0cmluZylcbiAgICAgIGxldCBlbmNvZGVkSWltbSA9IGNvcmUudmFsdWVUb0lpbW0ocGFyc2VJbnQob3BlcmFuZHNbMl0gYXMgc3RyaW5nLCAxMCkpXG4gICAgICBlbmNvZGVkSWltbSAmPSAwYjAwMDAwMDAxMTExMTExMTExMTExMTExMTExMTExMTExXG4gICAgICBsZXQgaW5zdHJ1Y3Rpb24gPSAwXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkT3Bjb2RlXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkUmQgKiAoMiAqKiA3KVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZEZ1bmN0MyAqICgyICoqIDEyKVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZFJzMSAqICgyICoqIDE1KVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZElpbW1cbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDApXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiA4KVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMTYpXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAyNClcbiAgICB9IGVsc2UgaWYgKGNvbW1hbmQgPT09ICdzcmFpJykge1xuICAgICAgLy8gc3JhaSByZCxyczEsaWltbVxuICAgICAgaWYgKG9wZXJhbmRzID09PSB1bmRlZmluZWQpIHRocm93IEVycm9yKCdvcGVyYW5kcyA9PT0gdW5kZWZpbmVkJylcbiAgICAgIGNvbnN0IGVuY29kZWRPcGNvZGUgPSB2Y29yZS5PcGNvZGUuT1BfSU1NXG4gICAgICBjb25zdCBlbmNvZGVkUmQgPSBlbmNvZGVSZWdpc3RlcihvcGVyYW5kc1swXSBhcyBzdHJpbmcpXG4gICAgICBjb25zdCBlbmNvZGVkRnVuY3QzID0gMGIxMDFcbiAgICAgIGNvbnN0IGVuY29kZWRSczEgPSBlbmNvZGVSZWdpc3RlcihvcGVyYW5kc1sxXSBhcyBzdHJpbmcpXG4gICAgICBsZXQgZW5jb2RlZElpbW0gPSBjb3JlLnZhbHVlVG9JaW1tKHBhcnNlSW50KG9wZXJhbmRzWzJdIGFzIHN0cmluZywgMTApKVxuICAgICAgZW5jb2RlZElpbW0gJj0gMGIwMDAwMDAwMTExMTExMTExMTExMTExMTExMTExMTExMVxuICAgICAgZW5jb2RlZElpbW0gfD0gMGIwMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMFxuICAgICAgbGV0IGluc3RydWN0aW9uID0gMFxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZE9wY29kZVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZFJkICogKDIgKiogNylcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRGdW5jdDMgKiAoMiAqKiAxMilcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRSczEgKiAoMiAqKiAxNSlcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRJaW1tXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAwKVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gOClcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDE2KVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMjQpXG4gICAgfSBlbHNlIGlmIChjb21tYW5kID09PSAnbHVpJykge1xuICAgICAgLy8gbHVpIHJkLHVpbW1cbiAgICAgIGlmIChvcGVyYW5kcyA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcignb3BlcmFuZHMgPT09IHVuZGVmaW5lZCcpXG4gICAgICBjb25zdCBlbmNvZGVkT3Bjb2RlID0gdmNvcmUuT3Bjb2RlLkxVSVxuICAgICAgY29uc3QgZW5jb2RlZFJkID0gZW5jb2RlUmVnaXN0ZXIob3BlcmFuZHNbMF0gYXMgc3RyaW5nKVxuICAgICAgY29uc3QgZW5jb2RlZFVpbW0gPSBjb3JlLnZhbHVlVG9VaW1tKHBhcnNlSW50KG9wZXJhbmRzWzFdIGFzIHN0cmluZywgMTApKVxuICAgICAgbGV0IGluc3RydWN0aW9uID0gMFxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZE9wY29kZVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZFJkICogKDIgKiogNylcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRVaW1tXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAwKVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gOClcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDE2KVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMjQpXG4gICAgfSBlbHNlIGlmIChjb21tYW5kID09PSAnYXVpcGMnKSB7XG4gICAgICAvLyBhdWlwYyByZCx1aW1tXG4gICAgICBpZiAob3BlcmFuZHMgPT09IHVuZGVmaW5lZCkgdGhyb3cgRXJyb3IoJ29wZXJhbmRzID09PSB1bmRlZmluZWQnKVxuICAgICAgY29uc3QgZW5jb2RlZE9wY29kZSA9IHZjb3JlLk9wY29kZS5BVUlQQ1xuICAgICAgY29uc3QgZW5jb2RlZFJkID0gZW5jb2RlUmVnaXN0ZXIob3BlcmFuZHNbMF0gYXMgc3RyaW5nKVxuICAgICAgY29uc3QgZW5jb2RlZFVpbW0gPSBjb3JlLnZhbHVlVG9VaW1tKHBhcnNlSW50KG9wZXJhbmRzWzFdIGFzIHN0cmluZywgMTApKVxuICAgICAgbGV0IGluc3RydWN0aW9uID0gMFxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZE9wY29kZVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZFJkICogKDIgKiogNylcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRVaW1tXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAwKVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gOClcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDE2KVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMjQpXG4gICAgfSBlbHNlIGlmIChjb21tYW5kID09PSAnYWRkJykge1xuICAgICAgLy8gYWRkIHJkLHJzMSxyczJcbiAgICAgIGlmIChvcGVyYW5kcyA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcignb3BlcmFuZHMgPT09IHVuZGVmaW5lZCcpXG4gICAgICBjb25zdCBlbmNvZGVkT3Bjb2RlID0gdmNvcmUuT3Bjb2RlLk9QXG4gICAgICBjb25zdCBlbmNvZGVkUmQgPSBlbmNvZGVSZWdpc3RlcihvcGVyYW5kc1swXSBhcyBzdHJpbmcpXG4gICAgICBjb25zdCBlbmNvZGVkRnVuY3QzID0gMGIwMDBcbiAgICAgIGNvbnN0IGVuY29kZWRSczEgPSBlbmNvZGVSZWdpc3RlcihvcGVyYW5kc1sxXSBhcyBzdHJpbmcpXG4gICAgICBjb25zdCBlbmNvZGVkUnMyID0gZW5jb2RlUmVnaXN0ZXIob3BlcmFuZHNbMl0gYXMgc3RyaW5nKVxuICAgICAgY29uc3QgZW5jb2RlZEZ1bmN0NyA9IDBiMDAwMDAwMFxuICAgICAgbGV0IGluc3RydWN0aW9uID0gMFxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZE9wY29kZVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZFJkICogKDIgKiogNylcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRGdW5jdDMgKiAoMiAqKiAxMilcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRSczEgKiAoMiAqKiAxNSlcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRSczIgKiAoMiAqKiAyMClcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRGdW5jdDcgKiAoMiAqKiAyNSlcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDApXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiA4KVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMTYpXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAyNClcbiAgICB9IGVsc2UgaWYgKGNvbW1hbmQgPT09ICdzbHQnKSB7XG4gICAgICAvLyBzbHQgcmQscnMxLHJzMlxuICAgICAgaWYgKG9wZXJhbmRzID09PSB1bmRlZmluZWQpIHRocm93IEVycm9yKCdvcGVyYW5kcyA9PT0gdW5kZWZpbmVkJylcbiAgICAgIGNvbnN0IGVuY29kZWRPcGNvZGUgPSB2Y29yZS5PcGNvZGUuT1BcbiAgICAgIGNvbnN0IGVuY29kZWRSZCA9IGVuY29kZVJlZ2lzdGVyKG9wZXJhbmRzWzBdIGFzIHN0cmluZylcbiAgICAgIGNvbnN0IGVuY29kZWRGdW5jdDMgPSAwYjAxMFxuICAgICAgY29uc3QgZW5jb2RlZFJzMSA9IGVuY29kZVJlZ2lzdGVyKG9wZXJhbmRzWzFdIGFzIHN0cmluZylcbiAgICAgIGNvbnN0IGVuY29kZWRSczIgPSBlbmNvZGVSZWdpc3RlcihvcGVyYW5kc1syXSBhcyBzdHJpbmcpXG4gICAgICBjb25zdCBlbmNvZGVkRnVuY3Q3ID0gMGIwMDAwMDAwXG4gICAgICBsZXQgaW5zdHJ1Y3Rpb24gPSAwXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkT3Bjb2RlXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkUmQgKiAoMiAqKiA3KVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZEZ1bmN0MyAqICgyICoqIDEyKVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZFJzMSAqICgyICoqIDE1KVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZFJzMiAqICgyICoqIDIwKVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZEZ1bmN0NyAqICgyICoqIDI1KVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMClcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDgpXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAxNilcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDI0KVxuICAgIH0gZWxzZSBpZiAoY29tbWFuZCA9PT0gJ3NsdHUnKSB7XG4gICAgICAvLyBzbHR1IHJkLHJzMSxyczJcbiAgICAgIGlmIChvcGVyYW5kcyA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcignb3BlcmFuZHMgPT09IHVuZGVmaW5lZCcpXG4gICAgICBjb25zdCBlbmNvZGVkT3Bjb2RlID0gdmNvcmUuT3Bjb2RlLk9QXG4gICAgICBjb25zdCBlbmNvZGVkUmQgPSBlbmNvZGVSZWdpc3RlcihvcGVyYW5kc1swXSBhcyBzdHJpbmcpXG4gICAgICBjb25zdCBlbmNvZGVkRnVuY3QzID0gMGIwMTFcbiAgICAgIGNvbnN0IGVuY29kZWRSczEgPSBlbmNvZGVSZWdpc3RlcihvcGVyYW5kc1sxXSBhcyBzdHJpbmcpXG4gICAgICBjb25zdCBlbmNvZGVkUnMyID0gZW5jb2RlUmVnaXN0ZXIob3BlcmFuZHNbMl0gYXMgc3RyaW5nKVxuICAgICAgY29uc3QgZW5jb2RlZEZ1bmN0NyA9IDBiMDAwMDAwMFxuICAgICAgbGV0IGluc3RydWN0aW9uID0gMFxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZE9wY29kZVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZFJkICogKDIgKiogNylcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRGdW5jdDMgKiAoMiAqKiAxMilcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRSczEgKiAoMiAqKiAxNSlcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRSczIgKiAoMiAqKiAyMClcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRGdW5jdDcgKiAoMiAqKiAyNSlcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDApXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiA4KVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMTYpXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAyNClcbiAgICB9IGVsc2UgaWYgKGNvbW1hbmQgPT09ICdhbmQnKSB7XG4gICAgICAvLyBhbmQgcmQscnMxLHJzMlxuICAgICAgaWYgKG9wZXJhbmRzID09PSB1bmRlZmluZWQpIHRocm93IEVycm9yKCdvcGVyYW5kcyA9PT0gdW5kZWZpbmVkJylcbiAgICAgIGNvbnN0IGVuY29kZWRPcGNvZGUgPSB2Y29yZS5PcGNvZGUuT1BcbiAgICAgIGNvbnN0IGVuY29kZWRSZCA9IGVuY29kZVJlZ2lzdGVyKG9wZXJhbmRzWzBdIGFzIHN0cmluZylcbiAgICAgIGNvbnN0IGVuY29kZWRGdW5jdDMgPSAwYjExMVxuICAgICAgY29uc3QgZW5jb2RlZFJzMSA9IGVuY29kZVJlZ2lzdGVyKG9wZXJhbmRzWzFdIGFzIHN0cmluZylcbiAgICAgIGNvbnN0IGVuY29kZWRSczIgPSBlbmNvZGVSZWdpc3RlcihvcGVyYW5kc1syXSBhcyBzdHJpbmcpXG4gICAgICBjb25zdCBlbmNvZGVkRnVuY3Q3ID0gMGIwMDAwMDAwXG4gICAgICBsZXQgaW5zdHJ1Y3Rpb24gPSAwXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkT3Bjb2RlXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkUmQgKiAoMiAqKiA3KVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZEZ1bmN0MyAqICgyICoqIDEyKVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZFJzMSAqICgyICoqIDE1KVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZFJzMiAqICgyICoqIDIwKVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZEZ1bmN0NyAqICgyICoqIDI1KVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMClcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDgpXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAxNilcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDI0KVxuICAgIH0gZWxzZSBpZiAoY29tbWFuZCA9PT0gJ29yJykge1xuICAgICAgLy8gb3IgcmQscnMxLHJzMlxuICAgICAgaWYgKG9wZXJhbmRzID09PSB1bmRlZmluZWQpIHRocm93IEVycm9yKCdvcGVyYW5kcyA9PT0gdW5kZWZpbmVkJylcbiAgICAgIGNvbnN0IGVuY29kZWRPcGNvZGUgPSB2Y29yZS5PcGNvZGUuT1BcbiAgICAgIGNvbnN0IGVuY29kZWRSZCA9IGVuY29kZVJlZ2lzdGVyKG9wZXJhbmRzWzBdIGFzIHN0cmluZylcbiAgICAgIGNvbnN0IGVuY29kZWRGdW5jdDMgPSAwYjExMFxuICAgICAgY29uc3QgZW5jb2RlZFJzMSA9IGVuY29kZVJlZ2lzdGVyKG9wZXJhbmRzWzFdIGFzIHN0cmluZylcbiAgICAgIGNvbnN0IGVuY29kZWRSczIgPSBlbmNvZGVSZWdpc3RlcihvcGVyYW5kc1syXSBhcyBzdHJpbmcpXG4gICAgICBjb25zdCBlbmNvZGVkRnVuY3Q3ID0gMGIwMDAwMDAwXG4gICAgICBsZXQgaW5zdHJ1Y3Rpb24gPSAwXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkT3Bjb2RlXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkUmQgKiAoMiAqKiA3KVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZEZ1bmN0MyAqICgyICoqIDEyKVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZFJzMSAqICgyICoqIDE1KVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZFJzMiAqICgyICoqIDIwKVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZEZ1bmN0NyAqICgyICoqIDI1KVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMClcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDgpXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAxNilcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDI0KVxuICAgIH0gZWxzZSBpZiAoY29tbWFuZCA9PT0gJ3hvcicpIHtcbiAgICAgIC8vIHhvciByZCxyczEscnMyXG4gICAgICBpZiAob3BlcmFuZHMgPT09IHVuZGVmaW5lZCkgdGhyb3cgRXJyb3IoJ29wZXJhbmRzID09PSB1bmRlZmluZWQnKVxuICAgICAgY29uc3QgZW5jb2RlZE9wY29kZSA9IHZjb3JlLk9wY29kZS5PUFxuICAgICAgY29uc3QgZW5jb2RlZFJkID0gZW5jb2RlUmVnaXN0ZXIob3BlcmFuZHNbMF0gYXMgc3RyaW5nKVxuICAgICAgY29uc3QgZW5jb2RlZEZ1bmN0MyA9IDBiMTAwXG4gICAgICBjb25zdCBlbmNvZGVkUnMxID0gZW5jb2RlUmVnaXN0ZXIob3BlcmFuZHNbMV0gYXMgc3RyaW5nKVxuICAgICAgY29uc3QgZW5jb2RlZFJzMiA9IGVuY29kZVJlZ2lzdGVyKG9wZXJhbmRzWzJdIGFzIHN0cmluZylcbiAgICAgIGNvbnN0IGVuY29kZWRGdW5jdDcgPSAwYjAwMDAwMDBcbiAgICAgIGxldCBpbnN0cnVjdGlvbiA9IDBcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRPcGNvZGVcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRSZCAqICgyICoqIDcpXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkRnVuY3QzICogKDIgKiogMTIpXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkUnMxICogKDIgKiogMTUpXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkUnMyICogKDIgKiogMjApXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkRnVuY3Q3ICogKDIgKiogMjUpXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAwKVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gOClcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDE2KVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMjQpXG4gICAgfSBlbHNlIGlmIChjb21tYW5kID09PSAnc2xsJykge1xuICAgICAgLy8gc2xsIHJkLHJzMSxyczJcbiAgICAgIGlmIChvcGVyYW5kcyA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcignb3BlcmFuZHMgPT09IHVuZGVmaW5lZCcpXG4gICAgICBjb25zdCBlbmNvZGVkT3Bjb2RlID0gdmNvcmUuT3Bjb2RlLk9QXG4gICAgICBjb25zdCBlbmNvZGVkUmQgPSBlbmNvZGVSZWdpc3RlcihvcGVyYW5kc1swXSBhcyBzdHJpbmcpXG4gICAgICBjb25zdCBlbmNvZGVkRnVuY3QzID0gMGIwMDFcbiAgICAgIGNvbnN0IGVuY29kZWRSczEgPSBlbmNvZGVSZWdpc3RlcihvcGVyYW5kc1sxXSBhcyBzdHJpbmcpXG4gICAgICBjb25zdCBlbmNvZGVkUnMyID0gZW5jb2RlUmVnaXN0ZXIob3BlcmFuZHNbMl0gYXMgc3RyaW5nKVxuICAgICAgY29uc3QgZW5jb2RlZEZ1bmN0NyA9IDBiMDAwMDAwMFxuICAgICAgbGV0IGluc3RydWN0aW9uID0gMFxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZE9wY29kZVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZFJkICogKDIgKiogNylcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRGdW5jdDMgKiAoMiAqKiAxMilcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRSczEgKiAoMiAqKiAxNSlcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRSczIgKiAoMiAqKiAyMClcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRGdW5jdDcgKiAoMiAqKiAyNSlcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDApXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiA4KVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMTYpXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAyNClcbiAgICB9IGVsc2UgaWYgKGNvbW1hbmQgPT09ICdzcmwnKSB7XG4gICAgICAvLyBzcmwgcmQscnMxLHJzMlxuICAgICAgaWYgKG9wZXJhbmRzID09PSB1bmRlZmluZWQpIHRocm93IEVycm9yKCdvcGVyYW5kcyA9PT0gdW5kZWZpbmVkJylcbiAgICAgIGNvbnN0IGVuY29kZWRPcGNvZGUgPSB2Y29yZS5PcGNvZGUuT1BcbiAgICAgIGNvbnN0IGVuY29kZWRSZCA9IGVuY29kZVJlZ2lzdGVyKG9wZXJhbmRzWzBdIGFzIHN0cmluZylcbiAgICAgIGNvbnN0IGVuY29kZWRGdW5jdDMgPSAwYjEwMVxuICAgICAgY29uc3QgZW5jb2RlZFJzMSA9IGVuY29kZVJlZ2lzdGVyKG9wZXJhbmRzWzFdIGFzIHN0cmluZylcbiAgICAgIGNvbnN0IGVuY29kZWRSczIgPSBlbmNvZGVSZWdpc3RlcihvcGVyYW5kc1syXSBhcyBzdHJpbmcpXG4gICAgICBjb25zdCBlbmNvZGVkRnVuY3Q3ID0gMGIwMDAwMDAwXG4gICAgICBsZXQgaW5zdHJ1Y3Rpb24gPSAwXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkT3Bjb2RlXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkUmQgKiAoMiAqKiA3KVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZEZ1bmN0MyAqICgyICoqIDEyKVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZFJzMSAqICgyICoqIDE1KVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZFJzMiAqICgyICoqIDIwKVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZEZ1bmN0NyAqICgyICoqIDI1KVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMClcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDgpXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAxNilcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDI0KVxuICAgIH0gZWxzZSBpZiAoY29tbWFuZCA9PT0gJ3N1YicpIHtcbiAgICAgIC8vIHN1YiByZCxyczEscnMyXG4gICAgICBpZiAob3BlcmFuZHMgPT09IHVuZGVmaW5lZCkgdGhyb3cgRXJyb3IoJ29wZXJhbmRzID09PSB1bmRlZmluZWQnKVxuICAgICAgY29uc3QgZW5jb2RlZE9wY29kZSA9IHZjb3JlLk9wY29kZS5PUFxuICAgICAgY29uc3QgZW5jb2RlZFJkID0gZW5jb2RlUmVnaXN0ZXIob3BlcmFuZHNbMF0gYXMgc3RyaW5nKVxuICAgICAgY29uc3QgZW5jb2RlZEZ1bmN0MyA9IDBiMDAwXG4gICAgICBjb25zdCBlbmNvZGVkUnMxID0gZW5jb2RlUmVnaXN0ZXIob3BlcmFuZHNbMV0gYXMgc3RyaW5nKVxuICAgICAgY29uc3QgZW5jb2RlZFJzMiA9IGVuY29kZVJlZ2lzdGVyKG9wZXJhbmRzWzJdIGFzIHN0cmluZylcbiAgICAgIGNvbnN0IGVuY29kZWRGdW5jdDcgPSAwYjAxMDAwMDBcbiAgICAgIGxldCBpbnN0cnVjdGlvbiA9IDBcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRPcGNvZGVcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRSZCAqICgyICoqIDcpXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkRnVuY3QzICogKDIgKiogMTIpXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkUnMxICogKDIgKiogMTUpXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkUnMyICogKDIgKiogMjApXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkRnVuY3Q3ICogKDIgKiogMjUpXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAwKVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gOClcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDE2KVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMjQpXG4gICAgfSBlbHNlIGlmIChjb21tYW5kID09PSAnc3JhJykge1xuICAgICAgLy8gc3JhIHJkLHJzMSxyczJcbiAgICAgIGlmIChvcGVyYW5kcyA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcignb3BlcmFuZHMgPT09IHVuZGVmaW5lZCcpXG4gICAgICBjb25zdCBlbmNvZGVkT3Bjb2RlID0gdmNvcmUuT3Bjb2RlLk9QXG4gICAgICBjb25zdCBlbmNvZGVkUmQgPSBlbmNvZGVSZWdpc3RlcihvcGVyYW5kc1swXSBhcyBzdHJpbmcpXG4gICAgICBjb25zdCBlbmNvZGVkRnVuY3QzID0gMGIxMDFcbiAgICAgIGNvbnN0IGVuY29kZWRSczEgPSBlbmNvZGVSZWdpc3RlcihvcGVyYW5kc1sxXSBhcyBzdHJpbmcpXG4gICAgICBjb25zdCBlbmNvZGVkUnMyID0gZW5jb2RlUmVnaXN0ZXIob3BlcmFuZHNbMl0gYXMgc3RyaW5nKVxuICAgICAgY29uc3QgZW5jb2RlZEZ1bmN0NyA9IDBiMDEwMDAwMFxuICAgICAgbGV0IGluc3RydWN0aW9uID0gMFxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZE9wY29kZVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZFJkICogKDIgKiogNylcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRGdW5jdDMgKiAoMiAqKiAxMilcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRSczEgKiAoMiAqKiAxNSlcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRSczIgKiAoMiAqKiAyMClcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRGdW5jdDcgKiAoMiAqKiAyNSlcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDApXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiA4KVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMTYpXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAyNClcbiAgICB9IGVsc2UgaWYgKGNvbW1hbmQgPT09ICdqYWwnKSB7XG4gICAgICAvLyBqYWwgcmQsamltbVxuICAgICAgaWYgKG9wZXJhbmRzID09PSB1bmRlZmluZWQpIHRocm93IEVycm9yKCdvcGVyYW5kcyA9PT0gdW5kZWZpbmVkJylcbiAgICAgIGNvbnN0IGVuY29kZWRPcGNvZGUgPSB2Y29yZS5PcGNvZGUuSkFMXG4gICAgICBjb25zdCBlbmNvZGVkUmQgPSBlbmNvZGVSZWdpc3RlcihvcGVyYW5kc1swXSBhcyBzdHJpbmcpXG4gICAgICBjb25zdCBlbmNvZGVkSmltbSA9IGNvcmUudmFsdWVUb0ppbW0ocGFyc2VJbnQob3BlcmFuZHNbMV0gYXMgc3RyaW5nLCAxMCkpXG4gICAgICBsZXQgaW5zdHJ1Y3Rpb24gPSAwXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkT3Bjb2RlXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkUmQgKiAoMiAqKiA3KVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZEppbW1cbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDApXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiA4KVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMTYpXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAyNClcbiAgICB9IGVsc2UgaWYgKGNvbW1hbmQgPT09ICdqYWxyJykge1xuICAgICAgLy8gamFsciByZCxyczEsaWltbVxuICAgICAgaWYgKG9wZXJhbmRzID09PSB1bmRlZmluZWQpIHRocm93IEVycm9yKCdvcGVyYW5kcyA9PT0gdW5kZWZpbmVkJylcbiAgICAgIGNvbnN0IGVuY29kZWRPcGNvZGUgPSB2Y29yZS5PcGNvZGUuSkFMUlxuICAgICAgY29uc3QgZW5jb2RlZFJkID0gZW5jb2RlUmVnaXN0ZXIob3BlcmFuZHNbMF0gYXMgc3RyaW5nKVxuICAgICAgY29uc3QgZW5jb2RlZEZ1bmN0MyA9IDBiMDAwXG4gICAgICBjb25zdCBlbmNvZGVkUnMxID0gZW5jb2RlUmVnaXN0ZXIob3BlcmFuZHNbMV0gYXMgc3RyaW5nKVxuICAgICAgY29uc3QgZW5jb2RlZElpbW0gPSBjb3JlLnZhbHVlVG9JaW1tKHBhcnNlSW50KG9wZXJhbmRzWzJdIGFzIHN0cmluZywgMTApKVxuICAgICAgbGV0IGluc3RydWN0aW9uID0gMFxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZE9wY29kZVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZFJkICogKDIgKiogNylcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRGdW5jdDMgKiAoMiAqKiAxMilcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRSczEgKiAoMiAqKiAxNSlcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRJaW1tXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAwKVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gOClcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDE2KVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMjQpXG4gICAgfSBlbHNlIGlmIChjb21tYW5kID09PSAnYmVxJykge1xuICAgICAgLy8gYmVxIHJzMSxyczIsYmltbVxuICAgICAgaWYgKG9wZXJhbmRzID09PSB1bmRlZmluZWQpIHRocm93IEVycm9yKCdvcGVyYW5kcyA9PT0gdW5kZWZpbmVkJylcbiAgICAgIGNvbnN0IGVuY29kZWRPcGNvZGUgPSB2Y29yZS5PcGNvZGUuQlJBTkNIXG4gICAgICBjb25zdCBlbmNvZGVkRnVuY3QzID0gMGIwMDBcbiAgICAgIGNvbnN0IGVuY29kZWRSczEgPSBlbmNvZGVSZWdpc3RlcihvcGVyYW5kc1swXSBhcyBzdHJpbmcpXG4gICAgICBjb25zdCBlbmNvZGVkUnMyID0gZW5jb2RlUmVnaXN0ZXIob3BlcmFuZHNbMV0gYXMgc3RyaW5nKVxuICAgICAgY29uc3QgZW5jb2RlZEJpbW0gPSBjb3JlLnZhbHVlVG9CaW1tKHBhcnNlSW50KG9wZXJhbmRzWzJdIGFzIHN0cmluZywgMTApKVxuICAgICAgbGV0IGluc3RydWN0aW9uID0gMFxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZE9wY29kZVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZEZ1bmN0MyAqICgyICoqIDEyKVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZFJzMSAqICgyICoqIDE1KVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZFJzMiAqICgyICoqIDIwKVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZEJpbW1cbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDApXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiA4KVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMTYpXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAyNClcbiAgICB9IGVsc2UgaWYgKGNvbW1hbmQgPT09ICdibmUnKSB7XG4gICAgICAvLyBibmUgcnMxLHJzMixiaW1tXG4gICAgICBpZiAob3BlcmFuZHMgPT09IHVuZGVmaW5lZCkgdGhyb3cgRXJyb3IoJ29wZXJhbmRzID09PSB1bmRlZmluZWQnKVxuICAgICAgY29uc3QgZW5jb2RlZE9wY29kZSA9IHZjb3JlLk9wY29kZS5CUkFOQ0hcbiAgICAgIGNvbnN0IGVuY29kZWRGdW5jdDMgPSAwYjAwMVxuICAgICAgY29uc3QgZW5jb2RlZFJzMSA9IGVuY29kZVJlZ2lzdGVyKG9wZXJhbmRzWzBdIGFzIHN0cmluZylcbiAgICAgIGNvbnN0IGVuY29kZWRSczIgPSBlbmNvZGVSZWdpc3RlcihvcGVyYW5kc1sxXSBhcyBzdHJpbmcpXG4gICAgICBjb25zdCBlbmNvZGVkQmltbSA9IGNvcmUudmFsdWVUb0JpbW0ocGFyc2VJbnQob3BlcmFuZHNbMl0gYXMgc3RyaW5nLCAxMCkpXG4gICAgICBsZXQgaW5zdHJ1Y3Rpb24gPSAwXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkT3Bjb2RlXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkRnVuY3QzICogKDIgKiogMTIpXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkUnMxICogKDIgKiogMTUpXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkUnMyICogKDIgKiogMjApXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkQmltbVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMClcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDgpXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAxNilcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDI0KVxuICAgIH0gZWxzZSBpZiAoY29tbWFuZCA9PT0gJ2JsdCcpIHtcbiAgICAgIC8vIGJsdCByczEscnMyLGJpbW1cbiAgICAgIGlmIChvcGVyYW5kcyA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcignb3BlcmFuZHMgPT09IHVuZGVmaW5lZCcpXG4gICAgICBjb25zdCBlbmNvZGVkT3Bjb2RlID0gdmNvcmUuT3Bjb2RlLkJSQU5DSFxuICAgICAgY29uc3QgZW5jb2RlZEZ1bmN0MyA9IDBiMTAwXG4gICAgICBjb25zdCBlbmNvZGVkUnMxID0gZW5jb2RlUmVnaXN0ZXIob3BlcmFuZHNbMF0gYXMgc3RyaW5nKVxuICAgICAgY29uc3QgZW5jb2RlZFJzMiA9IGVuY29kZVJlZ2lzdGVyKG9wZXJhbmRzWzFdIGFzIHN0cmluZylcbiAgICAgIGNvbnN0IGVuY29kZWRCaW1tID0gY29yZS52YWx1ZVRvQmltbShwYXJzZUludChvcGVyYW5kc1syXSBhcyBzdHJpbmcsIDEwKSlcbiAgICAgIGxldCBpbnN0cnVjdGlvbiA9IDBcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRPcGNvZGVcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRGdW5jdDMgKiAoMiAqKiAxMilcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRSczEgKiAoMiAqKiAxNSlcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRSczIgKiAoMiAqKiAyMClcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRCaW1tXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAwKVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gOClcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDE2KVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMjQpXG4gICAgfSBlbHNlIGlmIChjb21tYW5kID09PSAnYmx0dScpIHtcbiAgICAgIC8vIGJsdHUgcnMxLHJzMixiaW1tXG4gICAgICBpZiAob3BlcmFuZHMgPT09IHVuZGVmaW5lZCkgdGhyb3cgRXJyb3IoJ29wZXJhbmRzID09PSB1bmRlZmluZWQnKVxuICAgICAgY29uc3QgZW5jb2RlZE9wY29kZSA9IHZjb3JlLk9wY29kZS5CUkFOQ0hcbiAgICAgIGNvbnN0IGVuY29kZWRGdW5jdDMgPSAwYjExMFxuICAgICAgY29uc3QgZW5jb2RlZFJzMSA9IGVuY29kZVJlZ2lzdGVyKG9wZXJhbmRzWzBdIGFzIHN0cmluZylcbiAgICAgIGNvbnN0IGVuY29kZWRSczIgPSBlbmNvZGVSZWdpc3RlcihvcGVyYW5kc1sxXSBhcyBzdHJpbmcpXG4gICAgICBjb25zdCBlbmNvZGVkQmltbSA9IGNvcmUudmFsdWVUb0JpbW0ocGFyc2VJbnQob3BlcmFuZHNbMl0gYXMgc3RyaW5nLCAxMCkpXG4gICAgICBsZXQgaW5zdHJ1Y3Rpb24gPSAwXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkT3Bjb2RlXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkRnVuY3QzICogKDIgKiogMTIpXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkUnMxICogKDIgKiogMTUpXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkUnMyICogKDIgKiogMjApXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkQmltbVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMClcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDgpXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAxNilcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDI0KVxuICAgIH0gZWxzZSBpZiAoY29tbWFuZCA9PT0gJ2JnZScpIHtcbiAgICAgIC8vIGJnZSByczEscnMyLGJpbW1cbiAgICAgIGlmIChvcGVyYW5kcyA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcignb3BlcmFuZHMgPT09IHVuZGVmaW5lZCcpXG4gICAgICBjb25zdCBlbmNvZGVkT3Bjb2RlID0gdmNvcmUuT3Bjb2RlLkJSQU5DSFxuICAgICAgY29uc3QgZW5jb2RlZEZ1bmN0MyA9IDBiMTAxXG4gICAgICBjb25zdCBlbmNvZGVkUnMxID0gZW5jb2RlUmVnaXN0ZXIob3BlcmFuZHNbMF0gYXMgc3RyaW5nKVxuICAgICAgY29uc3QgZW5jb2RlZFJzMiA9IGVuY29kZVJlZ2lzdGVyKG9wZXJhbmRzWzFdIGFzIHN0cmluZylcbiAgICAgIGNvbnN0IGVuY29kZWRCaW1tID0gY29yZS52YWx1ZVRvQmltbShwYXJzZUludChvcGVyYW5kc1syXSBhcyBzdHJpbmcsIDEwKSlcbiAgICAgIGxldCBpbnN0cnVjdGlvbiA9IDBcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRPcGNvZGVcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRGdW5jdDMgKiAoMiAqKiAxMilcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRSczEgKiAoMiAqKiAxNSlcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRSczIgKiAoMiAqKiAyMClcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRCaW1tXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAwKVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gOClcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDE2KVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMjQpXG4gICAgfSBlbHNlIGlmIChjb21tYW5kID09PSAnYmdldScpIHtcbiAgICAgIC8vIGJnZXUgcnMxLHJzMixiaW1tXG4gICAgICBpZiAob3BlcmFuZHMgPT09IHVuZGVmaW5lZCkgdGhyb3cgRXJyb3IoJ29wZXJhbmRzID09PSB1bmRlZmluZWQnKVxuICAgICAgY29uc3QgZW5jb2RlZE9wY29kZSA9IHZjb3JlLk9wY29kZS5CUkFOQ0hcbiAgICAgIGNvbnN0IGVuY29kZWRGdW5jdDMgPSAwYjExMVxuICAgICAgY29uc3QgZW5jb2RlZFJzMSA9IGVuY29kZVJlZ2lzdGVyKG9wZXJhbmRzWzBdIGFzIHN0cmluZylcbiAgICAgIGNvbnN0IGVuY29kZWRSczIgPSBlbmNvZGVSZWdpc3RlcihvcGVyYW5kc1sxXSBhcyBzdHJpbmcpXG4gICAgICBjb25zdCBlbmNvZGVkQmltbSA9IGNvcmUudmFsdWVUb0JpbW0ocGFyc2VJbnQob3BlcmFuZHNbMl0gYXMgc3RyaW5nLCAxMCkpXG4gICAgICBsZXQgaW5zdHJ1Y3Rpb24gPSAwXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkT3Bjb2RlXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkRnVuY3QzICogKDIgKiogMTIpXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkUnMxICogKDIgKiogMTUpXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkUnMyICogKDIgKiogMjApXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkQmltbVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMClcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDgpXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAxNilcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDI0KVxuICAgIH0gZWxzZSBpZiAoY29tbWFuZCA9PT0gJ2xiJykge1xuICAgICAgLy8gbGIgcmQscnMxLGlpbW1cbiAgICAgIGlmIChvcGVyYW5kcyA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcignb3BlcmFuZHMgPT09IHVuZGVmaW5lZCcpXG4gICAgICBjb25zdCBlbmNvZGVkT3Bjb2RlID0gdmNvcmUuT3Bjb2RlLkxPQURcbiAgICAgIGNvbnN0IGVuY29kZWRSZCA9IGVuY29kZVJlZ2lzdGVyKG9wZXJhbmRzWzBdIGFzIHN0cmluZylcbiAgICAgIGNvbnN0IGVuY29kZWRGdW5jdDMgPSAwYjAwMFxuICAgICAgY29uc3QgZW5jb2RlZFJzMSA9IGVuY29kZVJlZ2lzdGVyKG9wZXJhbmRzWzFdIGFzIHN0cmluZylcbiAgICAgIGNvbnN0IGVuY29kZWRJaW1tID0gY29yZS52YWx1ZVRvSWltbShwYXJzZUludChvcGVyYW5kc1syXSBhcyBzdHJpbmcsIDEwKSlcbiAgICAgIGxldCBpbnN0cnVjdGlvbiA9IDBcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRPcGNvZGVcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRSZCAqICgyICoqIDcpXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkRnVuY3QzICogKDIgKiogMTIpXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkUnMxICogKDIgKiogMTUpXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkSWltbVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMClcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDgpXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAxNilcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDI0KVxuICAgIH0gZWxzZSBpZiAoY29tbWFuZCA9PT0gJ2xoJykge1xuICAgICAgLy8gbGggcmQscnMxLGlpbW1cbiAgICAgIGlmIChvcGVyYW5kcyA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcignb3BlcmFuZHMgPT09IHVuZGVmaW5lZCcpXG4gICAgICBjb25zdCBlbmNvZGVkT3Bjb2RlID0gdmNvcmUuT3Bjb2RlLkxPQURcbiAgICAgIGNvbnN0IGVuY29kZWRSZCA9IGVuY29kZVJlZ2lzdGVyKG9wZXJhbmRzWzBdIGFzIHN0cmluZylcbiAgICAgIGNvbnN0IGVuY29kZWRGdW5jdDMgPSAwYjAwMVxuICAgICAgY29uc3QgZW5jb2RlZFJzMSA9IGVuY29kZVJlZ2lzdGVyKG9wZXJhbmRzWzFdIGFzIHN0cmluZylcbiAgICAgIGNvbnN0IGVuY29kZWRJaW1tID0gY29yZS52YWx1ZVRvSWltbShwYXJzZUludChvcGVyYW5kc1syXSBhcyBzdHJpbmcsIDEwKSlcbiAgICAgIGxldCBpbnN0cnVjdGlvbiA9IDBcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRPcGNvZGVcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRSZCAqICgyICoqIDcpXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkRnVuY3QzICogKDIgKiogMTIpXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkUnMxICogKDIgKiogMTUpXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkSWltbVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMClcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDgpXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAxNilcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDI0KVxuICAgIH0gZWxzZSBpZiAoY29tbWFuZCA9PT0gJ2x3Jykge1xuICAgICAgLy8gbHcgcmQscnMxLGlpbW1cbiAgICAgIGlmIChvcGVyYW5kcyA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcignb3BlcmFuZHMgPT09IHVuZGVmaW5lZCcpXG4gICAgICBjb25zdCBlbmNvZGVkT3Bjb2RlID0gdmNvcmUuT3Bjb2RlLkxPQURcbiAgICAgIGNvbnN0IGVuY29kZWRSZCA9IGVuY29kZVJlZ2lzdGVyKG9wZXJhbmRzWzBdIGFzIHN0cmluZylcbiAgICAgIGNvbnN0IGVuY29kZWRGdW5jdDMgPSAwYjAxMFxuICAgICAgY29uc3QgZW5jb2RlZFJzMSA9IGVuY29kZVJlZ2lzdGVyKG9wZXJhbmRzWzFdIGFzIHN0cmluZylcbiAgICAgIGNvbnN0IGVuY29kZWRJaW1tID0gY29yZS52YWx1ZVRvSWltbShwYXJzZUludChvcGVyYW5kc1syXSBhcyBzdHJpbmcsIDEwKSlcbiAgICAgIGxldCBpbnN0cnVjdGlvbiA9IDBcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRPcGNvZGVcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRSZCAqICgyICoqIDcpXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkRnVuY3QzICogKDIgKiogMTIpXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkUnMxICogKDIgKiogMTUpXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkSWltbVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMClcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDgpXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAxNilcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDI0KVxuICAgIH0gZWxzZSBpZiAoY29tbWFuZCA9PT0gJ2xidScpIHtcbiAgICAgIC8vIGxidSByZCxyczEsaWltbVxuICAgICAgaWYgKG9wZXJhbmRzID09PSB1bmRlZmluZWQpIHRocm93IEVycm9yKCdvcGVyYW5kcyA9PT0gdW5kZWZpbmVkJylcbiAgICAgIGNvbnN0IGVuY29kZWRPcGNvZGUgPSB2Y29yZS5PcGNvZGUuTE9BRFxuICAgICAgY29uc3QgZW5jb2RlZFJkID0gZW5jb2RlUmVnaXN0ZXIob3BlcmFuZHNbMF0gYXMgc3RyaW5nKVxuICAgICAgY29uc3QgZW5jb2RlZEZ1bmN0MyA9IDBiMTAwXG4gICAgICBjb25zdCBlbmNvZGVkUnMxID0gZW5jb2RlUmVnaXN0ZXIob3BlcmFuZHNbMV0gYXMgc3RyaW5nKVxuICAgICAgY29uc3QgZW5jb2RlZElpbW0gPSBjb3JlLnZhbHVlVG9JaW1tKHBhcnNlSW50KG9wZXJhbmRzWzJdIGFzIHN0cmluZywgMTApKVxuICAgICAgbGV0IGluc3RydWN0aW9uID0gMFxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZE9wY29kZVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZFJkICogKDIgKiogNylcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRGdW5jdDMgKiAoMiAqKiAxMilcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRSczEgKiAoMiAqKiAxNSlcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRJaW1tXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAwKVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gOClcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDE2KVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMjQpXG4gICAgfSBlbHNlIGlmIChjb21tYW5kID09PSAnbGh1Jykge1xuICAgICAgLy8gbGh1IHJkLHJzMSxpaW1tXG4gICAgICBpZiAob3BlcmFuZHMgPT09IHVuZGVmaW5lZCkgdGhyb3cgRXJyb3IoJ29wZXJhbmRzID09PSB1bmRlZmluZWQnKVxuICAgICAgY29uc3QgZW5jb2RlZE9wY29kZSA9IHZjb3JlLk9wY29kZS5MT0FEXG4gICAgICBjb25zdCBlbmNvZGVkUmQgPSBlbmNvZGVSZWdpc3RlcihvcGVyYW5kc1swXSBhcyBzdHJpbmcpXG4gICAgICBjb25zdCBlbmNvZGVkRnVuY3QzID0gMGIxMDFcbiAgICAgIGNvbnN0IGVuY29kZWRSczEgPSBlbmNvZGVSZWdpc3RlcihvcGVyYW5kc1sxXSBhcyBzdHJpbmcpXG4gICAgICBjb25zdCBlbmNvZGVkSWltbSA9IGNvcmUudmFsdWVUb0lpbW0ocGFyc2VJbnQob3BlcmFuZHNbMl0gYXMgc3RyaW5nLCAxMCkpXG4gICAgICBsZXQgaW5zdHJ1Y3Rpb24gPSAwXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkT3Bjb2RlXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkUmQgKiAoMiAqKiA3KVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZEZ1bmN0MyAqICgyICoqIDEyKVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZFJzMSAqICgyICoqIDE1KVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZElpbW1cbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDApXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiA4KVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMTYpXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAyNClcbiAgICB9IGVsc2UgaWYgKGNvbW1hbmQgPT09ICdzYicpIHtcbiAgICAgIC8vIHNiIHJzMSxyczIsc2ltbVxuICAgICAgaWYgKG9wZXJhbmRzID09PSB1bmRlZmluZWQpIHRocm93IEVycm9yKCdvcGVyYW5kcyA9PT0gdW5kZWZpbmVkJylcbiAgICAgIGNvbnN0IGVuY29kZWRPcGNvZGUgPSB2Y29yZS5PcGNvZGUuU1RPUkVcbiAgICAgIGNvbnN0IGVuY29kZWRGdW5jdDMgPSAwYjAwMFxuICAgICAgY29uc3QgZW5jb2RlZFJzMSA9IGVuY29kZVJlZ2lzdGVyKG9wZXJhbmRzWzBdIGFzIHN0cmluZylcbiAgICAgIGNvbnN0IGVuY29kZWRSczIgPSBlbmNvZGVSZWdpc3RlcihvcGVyYW5kc1sxXSBhcyBzdHJpbmcpXG4gICAgICBjb25zdCBlbmNvZGVkU2ltbSA9IGNvcmUudmFsdWVUb1NpbW0ocGFyc2VJbnQob3BlcmFuZHNbMl0gYXMgc3RyaW5nLCAxMCkpXG4gICAgICBsZXQgaW5zdHJ1Y3Rpb24gPSAwXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkT3Bjb2RlXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkRnVuY3QzICogKDIgKiogMTIpXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkUnMxICogKDIgKiogMTUpXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkUnMyICogKDIgKiogMjApXG4gICAgICBpbnN0cnVjdGlvbiB8PSBlbmNvZGVkU2ltbVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMClcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDgpXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAxNilcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDI0KVxuICAgIH0gZWxzZSBpZiAoY29tbWFuZCA9PT0gJ3NoJykge1xuICAgICAgLy8gc2ggcnMxLHJzMixzaW1tXG4gICAgICBpZiAob3BlcmFuZHMgPT09IHVuZGVmaW5lZCkgdGhyb3cgRXJyb3IoJ29wZXJhbmRzID09PSB1bmRlZmluZWQnKVxuICAgICAgY29uc3QgZW5jb2RlZE9wY29kZSA9IHZjb3JlLk9wY29kZS5TVE9SRVxuICAgICAgY29uc3QgZW5jb2RlZEZ1bmN0MyA9IDBiMDAxXG4gICAgICBjb25zdCBlbmNvZGVkUnMxID0gZW5jb2RlUmVnaXN0ZXIob3BlcmFuZHNbMF0gYXMgc3RyaW5nKVxuICAgICAgY29uc3QgZW5jb2RlZFJzMiA9IGVuY29kZVJlZ2lzdGVyKG9wZXJhbmRzWzFdIGFzIHN0cmluZylcbiAgICAgIGNvbnN0IGVuY29kZWRTaW1tID0gY29yZS52YWx1ZVRvU2ltbShwYXJzZUludChvcGVyYW5kc1syXSBhcyBzdHJpbmcsIDEwKSlcbiAgICAgIGxldCBpbnN0cnVjdGlvbiA9IDBcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRPcGNvZGVcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRGdW5jdDMgKiAoMiAqKiAxMilcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRSczEgKiAoMiAqKiAxNSlcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRSczIgKiAoMiAqKiAyMClcbiAgICAgIGluc3RydWN0aW9uIHw9IGVuY29kZWRTaW1tXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAwKVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gOClcbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDE2KVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMjQpXG4gICAgfSBlbHNlIGlmIChjb21tYW5kID09PSAnc3cnKSB7XG4gICAgICAvLyBzdyByczEscnMyLHNpbW1cbiAgICAgIGlmIChvcGVyYW5kcyA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcignb3BlcmFuZHMgPT09IHVuZGVmaW5lZCcpXG4gICAgICBjb25zdCBlbmNvZGVkT3Bjb2RlID0gdmNvcmUuT3Bjb2RlLlNUT1JFXG4gICAgICBjb25zdCBlbmNvZGVkRnVuY3QzID0gMGIwMTBcbiAgICAgIGNvbnN0IGVuY29kZWRSczEgPSBlbmNvZGVSZWdpc3RlcihvcGVyYW5kc1swXSBhcyBzdHJpbmcpXG4gICAgICBjb25zdCBlbmNvZGVkUnMyID0gZW5jb2RlUmVnaXN0ZXIob3BlcmFuZHNbMV0gYXMgc3RyaW5nKVxuICAgICAgY29uc3QgZW5jb2RlZFNpbW0gPSBjb3JlLnZhbHVlVG9TaW1tKHBhcnNlSW50KG9wZXJhbmRzWzJdIGFzIHN0cmluZywgMTApKVxuICAgICAgbGV0IGluc3RydWN0aW9uID0gMFxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZE9wY29kZVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZEZ1bmN0MyAqICgyICoqIDEyKVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZFJzMSAqICgyICoqIDE1KVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZFJzMiAqICgyICoqIDIwKVxuICAgICAgaW5zdHJ1Y3Rpb24gfD0gZW5jb2RlZFNpbW1cbiAgICAgIG1hY2hpbmVDb2RlLnB1c2goaW5zdHJ1Y3Rpb24gPj4+IDApXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiA4KVxuICAgICAgbWFjaGluZUNvZGUucHVzaChpbnN0cnVjdGlvbiA+Pj4gMTYpXG4gICAgICBtYWNoaW5lQ29kZS5wdXNoKGluc3RydWN0aW9uID4+PiAyNClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoaW5kZXgudG9TdHJpbmcoKSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkobWFjaGluZUNvZGUpXG59XG4iXX0=