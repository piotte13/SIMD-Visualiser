import React, {Component} from "react";
import styled from "styled-components";
import * as Registry from "../Utils/Registry";
import Vector from "./Vector";
import * as _ from "lodash";
import anime from 'animejs';



const TdNumbers = styled.td`
    width: ${({colLen}) => colLen}px;
    height: ${({colHeight}) => colHeight}px;
    text-align: center;
`

const TdZeroes = styled.td`
    width: ${({colLen}) => colLen}px;
    height: ${({colHeight}) => colHeight}px;
    text-align: center;
    color: var(--two);
`

const TrNumbers = styled.tr`
    position: relative;
    top: ${({colHeight}) => -(colHeight)}px;
    //font-size: 24px;
    font-family: monospace;
`
const SHIFT_INDEX = 2;
const INPUT_INDEX = 1;
const OUTPUT_INDEX = 0;

export default class Vpslldq extends Component {

    constructor(props) {
        super(props);

        let registry = Registry.default;
        let shiftLen = (props.params[SHIFT_INDEX] * 8) / Registry.VAR_SIZE;
        let input = registry.get(props.params[INPUT_INDEX]);
        let nbCols = input.length;

        this.state = {
            colLen: 50,
            colHeight: 50,
            nbCols,
            shiftLen,
            input,
            output: [],
        };
        this.computeCommand();
        this.numbersRef = React.createRef();
        this.zeroesRef = React.createRef();
    }

    componentDidMount() {
        this.timeline = this.createTimeline();
    }

    createTimeline() {
        let timeline = anime.timeline({
            easing: "easeOutCubic",
            loop: false,
            autoplay: false
        });

        timeline
            .add({
                targets: this.numbersRef.current,
                translateX: () => -this.state.shiftLen * this.state.colLen,
                duration: 2000,
                delay: 300
            })
            .add({
                targets: this.zeroesRef.current,
                translateY: () => -50,
                duration: 500,
            });
        return timeline;
    }

    //Compute the command and set the registry.
    computeCommand() {
        let registry = Registry.default;
        let shiftLen = (this.props.params[SHIFT_INDEX] * 8) / Registry.VAR_SIZE;
        let input = registry.get(this.props.params[INPUT_INDEX]);
        let output = _.cloneDeep(input);
        output.push(...new Array(shiftLen).fill(0));
        output = output.slice(-input.length);
        registry.set(this.props.params[OUTPUT_INDEX], output);

        //this.setState({output, input, shiftLen});
    }

    render() {
        let {nbCols, colLen, colHeight, shiftLen, input} = this.state;

        return (
            <Vector colLen={colLen} colHeight={colHeight} nbCols={nbCols}>
                <TrNumbers colHeight={colHeight} ref={this.numbersRef}>
                    {input.map((e, i) =>
                        <TdNumbers colLen={colLen} colHeight={colHeight} key={i}>{e.toString(16)}</TdNumbers>
                    )}
                </TrNumbers>
                <TrNumbers colHeight={colHeight} ref={this.zeroesRef}>
                    {input.map((e, i) =>
                        <TdZeroes colLen={colLen} colHeight={colHeight}
                                  key={i}>{(i < nbCols - shiftLen) ? "" : 0}</TdZeroes>
                    )}
                </TrNumbers>
            </Vector>
        );
    }
}