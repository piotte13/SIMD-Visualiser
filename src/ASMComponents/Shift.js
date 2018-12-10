import React, {Component} from "react";
import * as Registry from "../Utils/Registry";
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

        let registry = Registry.default;
        let shiftLen = props.params[SHIFT_INDEX];
        let input = registry.get(props.params[INPUT_INDEX]);

        this.state = {
            shiftLen,
            input,
            output: []
        };
        this.computeCommand();
    }

    getAnimation() {
        let laneLength = this.numbersRef.current.firstChild.width.baseVal.value;
        let directionValue = {"right": 1, "left": -1};

        let timeline = anime.timeline({
            easing: "easeOutCubic",
            loop: false,
            autoplay: false
        });

        timeline
            .add({
                targets: this.numbersRef.current,
                translateX: () => directionValue[this.props.direction] * this.state.shiftLen * laneLength,
                duration: 2000,
                delay: 300
            });

        return timeline;
    }

    //Compute the command and set the registry.
    computeCommand() {
        let registry = Registry.default;
        let {params, bitWidth} = this.props;
        let shiftLen = params[SHIFT_INDEX] * (bitWidth / 8);
        let input = registry.get(params[INPUT_INDEX]);
        let output = _.cloneDeep(input);
        output.push(...new Array(shiftLen).fill(0));
        output = output.slice(-input.length);
        registry.set(params[OUTPUT_INDEX], output);

        //this.setState({output, input, shiftLen});
    }

    render() {
        let {input} = this.state;
        let {type, bitWidth, base, shiftData} = this.props;

        return (
            <Vector type={type}
                    bitWidth={bitWidth}
                    base={base}
                    data={input}
                    shiftData={shiftData}
                    numbersRef={(ref) => this.numbersRef = ref}/>
        );
    }
}