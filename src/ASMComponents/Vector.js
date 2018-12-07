import React, {Component} from "react";
import * as _ from "lodash";
import "../css/Vector.css";

export default class Vector extends Component {

    static defaultProps = {
        type: "int32",
        data: [],
        numbersRef: () => {
        },
        vectorRef: () => {
        }
    };

    constructor(props) {
        super(props)

    }

    getValues() {
        let numbers = [];
        switch (this.props.type) {
            case "int8":
                numbers = this.props.data;
                break;
            case "int32":
                numbers = this.props.data;
                break;
            default:
                numbers = this.props.data;
        }
        return numbers;
    }

    getElementCount() {
        let count = 0;
        switch (this.props.type) {
            case "int32":
                count = this.props.data.length / 4;
                break;
            case "int8":
                count = this.props.data.length;
                break;
            default:
                count = this.props.data.length;
        }
        return count;
    }

    render() {
        let elCount = this.getElementCount();
        let values = this.getValues();
        let rectHeight = 50;
        let rectLen = 800;
        let padding = 30;
        //let vectorLen = elCount * 50;

        return (
            <svg width={rectLen + padding} height={rectHeight + padding}
                 viewBox={`0 0 ${rectLen + padding} ${rectHeight + padding}"`} xmlns="http://www.w3.org/2000/svg">
                <rect x={padding / 2} y={padding / 2} width={rectLen} height={rectHeight} rx="3" ry="3"
                      className="vector-container"/>
                {
                    _.times(elCount - 1, Number).map(i => {
                        let x = padding / 2 + (rectLen / elCount) * (i + 1);
                        return <line x1={x} y1={padding / 2} x2={x} y2={rectHeight + padding / 2}
                                     className="vector-line"/>
                    })
                }
                {
                    values.map((number, i) => {
                        let x = padding / 2 + (rectLen / elCount) * i;
                        return <svg width={rectLen / elCount} height={rectHeight} x={x} y={padding / 2}>
                            <text x="50%" y="50%" dy=".3em" className="vector-values">{number}</text>
                        </svg>
                        // <text x={x} y={( rectHeight + padding + 12 )/2} className="vector-values" textLength={rectLen / elCount} >{number}</text>
                    })
                }
            </svg>
        );
    }
}