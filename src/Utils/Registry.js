import * as _ from "lodash";

export const NB_SIMD_REGISTERS = 32;
export const NB_GP_REGISTERS = 16;
export const ARCHITECTURE_SIZE = 64;
export const VAR_SIZE = 8; //Octets
export const TYPE_LENGTH = {
    x: 512 / (4 * VAR_SIZE),
    y: 512 / (2 * VAR_SIZE),
    z: 512 / VAR_SIZE
};
const isSIMDRegister = /[x-z]mm[0-9]+/;

//Containing all the names of the general purpose registers classified by their bit width.
const GPRegistersNamesByBitWidth = {
    64: ['rax', 'rbx', 'rcx', 'rdx', 'rsi', 'rdi', 'rbp', 'rsp', 'r8', 'r9', 'r10', 'r11', 'r12', 'r13', 'r14', 'r15'],
    32: ['eax', 'ebx', 'ecx', 'edx', 'esi', 'edi', 'ebp', 'esp', 'r8d', 'r9d', 'r10d', 'r11d', 'r12d', 'r13d', 'r14d', 'r15d'],
    16: ['ax', 'bx', 'cx', 'dx', 'si', 'di', 'bp', 'sp', 'r8w', 'r9w', 'r10w', 'r11w', 'r12w', 'r13w', 'r14w', 'r15w'],
    8: ['al', 'bl', 'cl', 'dl', 'sil', 'dil', 'bpl', 'spl', 'r8b', 'r9b', 'r10b', 'r11b', 'r12b', 'r13b', 'r14b', 'r15b']
};
//Fastcall registers are used to pass parameters to functions.
export const FAST_CALL_REGISTERS = ['rdi', 'rsi', 'rdx', 'rcx', 'r8', 'r9'];

//A dictionary of general purpose registers.  example usage: GPRegistersNameMap["rax"] -> returns: {bitWidth: 64, index: 1}
//index tells us which of the _GPRegisters the given name represents.
const GPRegistersNameMap = {};
_.forIn(GPRegistersNamesByBitWidth, (names, bitWidth) => {
    names.forEach((name, index) => {
        GPRegistersNameMap[name] = {
            bitWidth,
            index
        }
    });
});

class Registry {
    constructor() {
        // the array _SIMDRegisters contains NB_REGISTERS arrays
        // of size 512 / VAR_SIZE filled with byte-sized values
        this._SIMDRegisters = new Array(NB_SIMD_REGISTERS).fill(0).map(() =>
            new Array(TYPE_LENGTH["z"]).fill(0).map((val, i) => i)
        );

        // the array _GPRegisters (general purpose registers) contains NB_GP_REGISTERS arrays
        // of size ARCHITECTURE_SIZE (64) / (8) VAR_SIZE filled with byte-sized values
        this._GPRegisters = new Array(NB_GP_REGISTERS).fill(0).map(() =>
            new Array(ARCHITECTURE_SIZE / VAR_SIZE).fill(0).map((val, i) => i)
        );

    }

    // stores the value in array into the "register" where register is something like xmm0
    set = (register, array) => {
        if (isSIMDRegister.test(register)) {
            const idx = +register.substring(3); // should  be the number of the register, between 0 and 32
            const type = register[0];// should be x, y, z

            this._SIMDRegisters[idx].splice(0, TYPE_LENGTH[type], ...array);
        }
        else if (GPRegistersNameMap[register]) {
            const {bitWidth, index} = GPRegistersNameMap[register]
            this._GPRegisters[index].splice(0, bitWidth / VAR_SIZE, ...array);
        }
    }
    ;

    // get either an x, a y or a z register, where "register" is a string like xmm0
    get = (register) => {
        if (isSIMDRegister.test(register)) {
            const idx = +register.substring(3);// number of the register, should be between 0 and 32 on x64
            const type = register[0];// should be x, y or z
            //return the last n elements of the register.
            return this._SIMDRegisters[idx].slice(0, TYPE_LENGTH[type])// slice apparently copies the value
        }

        const {bitWidth, index} = GPRegistersNameMap[register];
        if (bitWidth && index)
            return this._GPRegisters[index].slice(0, bitWidth / VAR_SIZE);

        else return null;
    };

    // clear resets the "registers"
    clear = () => {
        this._SIMDRegisters.map(() =>
            new Array(TYPE_LENGTH["z"]).fill(0).map((val, i) => i));

        this._GPRegisters.map(() =>
            new Array(ARCHITECTURE_SIZE / VAR_SIZE).fill(0).map((val, i) => i));
    }
}

const instance = new Registry();
Object.freeze(instance);

export default instance;
