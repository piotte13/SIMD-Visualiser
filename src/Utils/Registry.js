import * as _ from "lodash";

export const NB_REGISTERS = 32;
export const VAR_SIZE = 8; //Octets
export const TYPE_LENGTH = {
    x: 512 / (4 * VAR_SIZE),
    y: 512 / (2 * VAR_SIZE),
    z: 512 / VAR_SIZE
};

class Registry {
    constructor() {
        // the array _keys contains NB_REGISTERS arrays
        // of size 512 / VAR_SIZE filled with byte-sized values (randomized)
        this._keys = new Array(NB_REGISTERS).fill(0).map(() =>
            new Array(TYPE_LENGTH["z"]).fill(0).map((val, i) => i)
        );
    }

    // stores the value in array into the "register" where register is something like xmm0
    set = (register, array) => {
        const idx = +register.substring(3); // should  be the number of the register, between 0 and 32
        const type = register[0];// should be x, y, z

        this._keys[idx].splice(0, TYPE_LENGTH[type], ...array);
    };

    // get either an x, a y or a z register, where "register" is a string like xmm0
    get = (register) => {
        const idx = +register.substring(3);// number of the register, should be between 0 and 32 on x64
        const type = register[0];// should be x, y or z
        //return the last n elements of the register.
        return this._keys[idx].slice(0, TYPE_LENGTH[type])// slice apparently copies the value
    };

    // clear resets the "registers" to randomized valued (?)
    clear = () => {
        this._keys.map(() =>
            new Array(TYPE_LENGTH["z"]).fill(0).map(() =>
                _.random(1, 255)
            ));
    }
}

const instance = new Registry();
Object.freeze(instance);

export default instance;
