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
        this._keys = new Array(NB_REGISTERS).fill(0).map(() =>
            new Array(TYPE_LENGTH["z"]).fill(0).map(() =>
                _.random(1, 255)
            )
        );
    }

    set = (register, array) => {
        const idx = +register.substring(3);
        const type = register[0];

        this._keys[idx].splice(0, TYPE_LENGTH[type], ...array);
    };

    get = (register) => {
        const idx = +register.substring(3);
        const type = register[0];
        //return the last n elements of the register.
        return this._keys[idx].slice(0, TYPE_LENGTH[type])
    };

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
