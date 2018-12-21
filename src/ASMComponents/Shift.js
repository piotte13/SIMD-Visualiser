import React, {Component} from "react";
import Registry from "../Utils/Registry";
import Vector from "./Vector";
import * as _ from "lodash";
import anime from 'animejs';

const SHIFT_INDEX = 2;
const INPUT_INDEX = 1;
const OUTPUT_INDEX = 0;

export default class Shift extends Component {

    static defaultProps = {
        type: "uint",
        bitWidth: 32,
        base: 16,
        direction: 'left',
        // if no shiftData provided, default to zeroes.
        shiftData: new Array(64).fill(0)
    };

    constructor(props) {
        super(props);

        let shiftLen = props.params[SHIFT_INDEX];
        let input = Registry.get(props.params[INPUT_INDEX]);
        const defaultBitWidth = props.defaultValues.length > 0 ? props.defaultValues[0].bitWidth : props.bitWidth;
        const defaultBase = props.defaultValues.length > 0 ? props.defaultValues[0].base : props.base;
        this.state = {
            shiftLen,
            input,
            output: [],
            defaultBitWidth,
            defaultBase
        };
        this.computeCommand();
    }

    getAnimation() {
        let directionValue = {"right": 1, "left": -1};
        let {bitWidth} = this.props;
        let {shiftLen, input} = this.state;
        //In order to make it responsive, we have to calculate the shift in percentage of the vector length. Clever.
        let shiftPercentage = 100 * directionValue[this.props.direction] * shiftLen * bitWidth / (input.length * 8);

        let timeline = anime.timeline({
            easing: "easeOutCubic",
            loop: false,
            autoplay: false
        });

        //TODO: Convert the visualisation from the desired visualization bitWidth (from the parameter page) to the command bitWidth (props).
        // const nbOfConversion = Math.log2(this.props.bitWidth) - Math.log2(this.state.defaultBitWidth);
        //
        // _.times(Math.abs(nbOfConversion)).forEach(() => {
        //     const multiplicative = nbOfConversion > 0 ? 2 : 0.5;
        //     timeline
        //        .add({
        //            duration: 600,
        //            delay: 300,
        //            complete: () => {this.setState({defaultBitWidth: this.state.defaultBitWidth * multiplicative})}
        //        })
        // });

        timeline
            .add({
                targets: this.numbersRef.current,
                translateX: `${shiftPercentage}%`,
                duration: 2000,
                delay: 1000
            });

        // _.times(Math.abs(nbOfConversion)).forEach(() => {
        //     const multiplicative = nbOfConversion < 0 ? 2 : 0.5;
        //     timeline
        //         .add({
        //             duration: 600,
        //             delay: 300,
        //             complete: () => {this.setState({defaultBitWidth: this.state.defaultBitWidth * multiplicative})}
        //         })
        // });

        return timeline;
    }

    //Compute the command and set the registry.
    computeCommand() {
        let {params, bitWidth} = this.props;
        let shiftLen = params[SHIFT_INDEX] * (bitWidth / 8);
        let input = Registry.get(params[INPUT_INDEX]);
        let output = _.cloneDeep(input);
        output.push(...new Array(shiftLen).fill(0));
        output = output.slice(-input.length);
        Registry.set(params[OUTPUT_INDEX], output);
    }

    render() {
        let {input, defaultBitWidth, defaultBase} = this.state;
        let {type, bitWidth, base, shiftData} = this.props;

        return (
            <Vector type={type}
                    bitWidth={bitWidth}
                    base={defaultBase}
                    data={input}
                    shiftData={shiftData}
                    numbersRef={(ref) => this.numbersRef = ref}/>
        );
    }
}