// should be in a distinct file
import * as _ from "lodash";
import uint32 from "uint32";

let toUINT = (array, bitWidth) => {

    let output = [];

    if (bitWidth === 32) {
        // we have four bytes per 32-bit int
        output = _.times(array.length / 4).map(i =>
            uint32.fromBytesBigEndian(array[4 * i], array[4 * i + 1], array[4 * i + 2], array[4 * i + 3])
        );
    }

    else if (bitWidth === 8) {
        // Temporary... For testing purposes only.  Should and will be perfected.
        output = array.map(value => Math.abs(value)) //new Uint8Array(array);
    }

    return output
};

let toINT = (array, bitWidth) => {
    // TODO
    return array
};

export function valuesToStrings(data, type, bitWidth, base = 10) {
    let values = [];

    switch (type) {
        case "uint":
            values = toUINT(data, bitWidth);
            break;
        case "int":
            values = toINT(data, bitWidth);
            break;
        default:
            values = data.slice(0);
    }

    //Convert values to given base representation.  Ex: Hex, decimal, binary...
    values = values.map(value => value.toString(base).toUpperCase());

    return values;
};