import React, {Component} from "react";
import styled from "styled-components";
import Anime from "react-anime";
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
    top: ${({colHeight}) => -(colHeight + 5)}px;
    font-size: 24px;
    font-family: monospace;
`


export default class Vpslldq extends Component {

    constructor(props) {
        super(props);

        let registry = Registry.default;
        let shiftLen = (props.params[2] * 8) / Registry.VAR_SIZE;
        let input = registry.get(props.params[1]);
        let nbCols = input.length;

        this.state = {
            colLen: 50,
            colHeight: 50,
            nbCols,
            shiftLen,
            input,
            output: [],
            numbers: [],
            zeroes: []
        };

        this.numbersRef = React.createRef();
        this.zeroesRef = React.createRef();
    }

    componentDidMount() {
        console.log("mounted");
        this.computeCommand();
        this.createContent();
        this.timeline = this.createTimeline();
    }

    componentDidUpdate() {
        this.timeline.play();
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
                delay: 1000
            })
            .add({
                targets: this.zeroesRef.current,
                translateY: () => -54,
                duration: 500,
            });
        return timeline;
    }

    createContent() {
        let {nbCols, colLen, colHeight, input, shiftLen} = this.state;
        let numbers = [];
        for (let i = 0; i < nbCols; i++) {
            numbers.push(<TdNumbers colLen={colLen} colHeight={colHeight} key={i}>{input[i].toString(16)}</TdNumbers>)
        }

        let zeroes = [];
        for (let i = 0; i < nbCols; i++) {
            zeroes.push(<TdZeroes colLen={colLen} colHeight={colHeight}
                                  key={i}>{(i < nbCols - shiftLen) ? "" : 0}</TdZeroes>)
        }

        this.setState({numbers, zeroes});
    }

    //Compute the command and set the registry.
    computeCommand() {
        let registry = Registry.default;
        let {input, shiftLen} = this.state;
        let output = _.cloneDeep(input);
        output.splice(output.length - shiftLen, shiftLen, ...new Array(shiftLen).fill(0));
        registry.set(this.props.params[0], output);

        this.setState({output});
    }

    render() {
        let {nbCols, colLen, colHeight, numbers, zeroes} = this.state;

        return (
            <Vector colLen={colLen} colHeight={colHeight} nbCols={nbCols}>
                <TrNumbers colHeight={colHeight} ref={this.numbersRef}>
                    {numbers}
                </TrNumbers>
                <TrNumbers colHeight={colHeight} ref={this.zeroesRef}>
                    {zeroes}
                </TrNumbers>
            </Vector>
        );
    }
}