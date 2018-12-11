import React, {Component} from "react";
import * as _ from "lodash";
import "../css/Vector.css";
import {convertToStrings} from "../Utils/Converter";

export default class Vector extends Component {

    static defaultProps = {
        type: "uint",
        bitWidth: 32,
        data: [],
        base: 10,
        shiftData: [],
        numbersRef: () => {
        },
        vectorRef: () => {
        }

    };

    constructor(props) {
        super(props);

        this.state = {
            width: window.innerWidth
        };

        this.numbersRef = React.createRef();
        this.vectorRef = React.createRef();
        props.numbersRef(this.numbersRef);
        props.vectorRef(this.vectorRef);
    }

    componentDidMount() {
        this.updateWidth();
        window.addEventListener("resize", this.updateWidth);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWidth);
    }

    updateWidth = () => {
        this.setState({width: window.innerWidth});
    };

    render() {
        let {data, shiftData, type, bitWidth, base} = this.props;

        let values = convertToStrings(data, type, bitWidth, base);
        let shiftValues = convertToStrings(shiftData, type, bitWidth, base);
        let elCount = values.length;
        let rectHeight = 50;
        let padding = 20;
        let rectLen = (this.state.width / 2) - padding;
        return (
            <svg width={rectLen + padding} height={rectHeight + padding} ref={this.vectorRef}
                 viewBox={`0 0 ${rectLen + padding} ${rectHeight + padding}`} xmlns="http://www.w3.org/2000/svg">
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
                     viewBox={`0 0 ${rectLen} ${rectHeight}`}>
                    <g ref={this.numbersRef}>
                        {
                            values.map((number, i) => {
                                let x = (rectLen / elCount) * i;
                                return (
                                    <svg key={i} width={rectLen / elCount} height={rectHeight} x={x}>
                                            <text x="50%" y="50%" dy=".3em" className="vector-values">{number}</text>
                                        </svg>
                                )
                            })
                        }
                        {
                            shiftValues.map((number, i) => {
                                let x = (rectLen / elCount) * i;
                                let offset = (rectLen / elCount) * shiftValues.length;
                                return (
                                    <React.Fragment key={i}>
                                        <svg width={rectLen / elCount} height={rectHeight} x={x + rectLen}>
                                            <text x="50%" y="50%" dy=".3em"
                                                  className="shift-values-right">{shiftValues[i]}</text>
                                        </svg>
                                        <svg width={rectLen / elCount} height={rectHeight} x={x - offset}>
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