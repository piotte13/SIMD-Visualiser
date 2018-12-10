import React, {Component} from "react";
import * as _ from "lodash";
import "../css/Vector.css";
import uint32 from "uint32";


// should be in a distinct file
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

let getValues = (data, type, bitWidth, base = 10) => {
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






export default class Vector extends Component {

    static defaultProps = {
        type: "uint",
        bitWidth: 32,
        data: [],
        base: 10,
        // if no shiftData provided, default to zeroes.
        shiftData: new Array(64).fill(0),
        numbersRef: () => {
        }
    };

    constructor(props) {
        super(props);

        this.numbersRef = React.createRef();
        props.numbersRef(this.numbersRef)
    }

    render() {
        let {data, shiftData, type, bitWidth, base} = this.props;

        let values = getValues(data, type, bitWidth, base);
        let shiftValues = getValues(shiftData, type, bitWidth, base);
        let elCount = values.length;
        let rectHeight = 50;
        let rectLen = 800;
        let padding = 20;

        return (
            <svg width={rectLen + padding} height={rectHeight + padding}
                 viewBox={`0 0 ${rectLen + padding}px ${rectHeight + padding}px`} xmlns="http://www.w3.org/2000/svg">
                <rect x={padding / 2} y={padding / 2} width={rectLen} height={rectHeight} rx="3" ry="3"
                      className="vector-container"/>
                {
                    _.times(elCount - 1, Number).map(i => {
                        let x = padding / 2 + (rectLen / elCount) * (i + 1);
                        return <line key={i} x1={x} y1={padding / 2} x2={x} y2={rectHeight + padding / 2}
                                     className="vector-line"/>
                    })
                }
                <svg width={rectLen} height={rectHeight} x={padding / 2} y={padding / 2}
                     viewBox={`0 0 ${rectLen}px ${rectHeight}px`}>
                    <g ref={this.numbersRef}>
                        {
                            values.map((number, i) => {
                                let x = (rectLen / elCount) * i;
                                return (
                                    <React.Fragment key={i}>
                                        <svg width={rectLen / elCount} height={rectHeight} x={x}>
                                            <text x="50%" y="50%" dy=".3em" className="vector-values">{number}</text>
                                        </svg>
                                        <svg width={rectLen / elCount} height={rectHeight} x={x + rectLen}>
                                            <text x="50%" y="50%" dy=".3em"
                                                  className="shift-values-right">{shiftValues[i]}</text>
                                        </svg>
                                        <svg width={rectLen / elCount} height={rectHeight} x={x - rectLen}>
                                            <text x="50%" y="50%" dy=".3em"
                                                  className="shift-values-left">{shiftValues[i]}</text>
                                        </svg>
                                    </React.Fragment>
                                )
                            })
                        }
                    </g>
                </svg>
            </svg>
        );
    }
}