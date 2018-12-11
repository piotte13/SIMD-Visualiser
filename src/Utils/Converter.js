// should be in a distinct file
import * as _ from "lodash";
import uint32 from "uint32";


let toUINT = (array, toBitWidth, fromType, fromBitWidth) => {

    let output = [];

    if (toBitWidth === 32) {
        // we have four bytes per 32-bit int
        output = _.times(array.length / 4).map(i =>
            uint32.fromBytesBigEndian(array[4 * i], array[4 * i + 1], array[4 * i + 2], array[4 * i + 3])
        );
    }

    else if (toBitWidth === 8) {
        // Temporary... For testing purposes only.  Should and will be perfected.
        if (fromBitWidth === 8)
            output = array.map(value => Math.abs(value)) //new Uint8Array(array);

        else if (fromBitWidth === 32) {
            output = new Array(array.length * 4);
            // we have four bytes per 32-bit ints
            for (var z = 0; z < array.length; z++) {
                output[4 * z] = uint32.getByteBigEndian(array[z], 3);
                output[4 * z + 1] = uint32.getByteBigEndian(array[z], 2);
                output[4 * z + 2] = uint32.getByteBigEndian(array[z], 1);
                output[4 * z + 3] = uint32.getByteBigEndian(array[z], 0);
            }
        }
    }

    return output
};

let toINT = (array, toBitWidth, fromType, fromBitWidth) => {
    // TODO
    return array
};

let toDouble = (array, toBitWidth, fromType, fromBitWidth) => {
    // TODO
    return array
};


export function convert(data, toType, toBitWidth, fromType, fromBitWidth) {
    let values = [];

    switch (toType) {
        case "uint":
            values = toUINT(data, toBitWidth, fromType, fromBitWidth);
            break;
        case "int":
            values = toINT(data, toBitWidth, fromType, fromBitWidth);
            break;
        case "double":
            values = toDouble(data, toBitWidth, fromType, fromBitWidth);
            break;
        default:
            values = data.slice(0);
    }

    return values;
}


export function convertToStrings(data, toType, toBitWidth, base = 16, precision = 0, fromType = "int", fromBitWidth = 8) {

    let values = convert(data, toType, toBitWidth, fromType, fromBitWidth);
    //Convert values to given base representation.  Ex: Hex, decimal, binary...

    _.mixin({'toBase': (val, base) => val.toString(base)});

    return values.map(value =>
        _.chain(value)
            .round(precision)
            .toBase(base)
            .padStart(toBitWidth / 4, '0')  //to be perfected.
            .toUpper()
            .value()
    );
};