import React, {Component} from "react";
import Vector from "./Vector";
import * as Registry from "../Utils/Registry";
import {convert} from "../Utils/Converter";

import anime from "animejs";
import uint32 from "uint32";

const INPUT1_INDEX = 1;
const INPUT2_INDEX = 2;
const OUTPUT_INDEX = 0;

export default class Arithmetic extends Component {
    static defaultProps = {
        type: "uint",
        bitWidth: 32,
        base: 16,
        operation: 'add',
    };

    constructor(props) {
        super(props);

        let registry = Registry.default;
        let input1 = registry.get(props.params[INPUT1_INDEX]);
        let input2 = registry.get(props.params[INPUT2_INDEX]);
        let input1_32bits = convert(input1, 'uint', 32, 'uint', 8);
        let input2_32bits = convert(input2, 'uint', 32, 'uint', 8);
        let output_32bits = new Array(input1_32bits.length);
        // why not do the computation in the constructor? This seems simpler. No multiple render calls.
        for (var i = 0; i < input1_32bits.length; i++) {
            output_32bits[i] = uint32.addMod32(input1_32bits[i], input2_32bits[i])
        }
        let output = convert(output_32bits, 'uint', 8, 'uint', 32);
        registry.set(props.params[OUTPUT_INDEX], output);

        this.state = {
            input1,
            input2,
            output
        };

        this.numbers1Ref = React.createRef();
        this.vector1 = React.createRef();
        this.numbers2Ref = React.createRef();
    }

    getAnimation() {

        let timeline = anime.timeline({
            easing: "easeOutCubic",
            loop: false,
            autoplay: false
        });
        console.log(this.vector1.current.vectorRef)
        let {output, input2} = this.state;

        timeline
        // move the byte arrays close
            .add({
                targets: this.vector1.current.vectorRef.current,
                translateY: 70,
                duration: 1000,
                offset: 500
            });

        return timeline;
    }


    render() {
        let {input1, input2, output} = this.state;
        let {type, bitWidth, base} = this.props;

        return (
            <Vector type={type}
                    bitWidth={bitWidth}
                    base={base}
                    data={input1}
                    numbersRef={(ref) => this.numbers1Ref = ref}
                    ref={this.vector1}
            />
        );
    }
}

