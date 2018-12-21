import React, {Component} from "react";
import Vector from "./Vector";
import Registry from "../Utils/Registry";
import {convert} from "../Utils/Converter";
import {Row, Col, Container} from 'reactstrap';
import * as _ from "lodash";


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

        let input1 = Registry.get(props.params[INPUT1_INDEX]);
        let input2 = Registry.get(props.params[INPUT2_INDEX]);
        let input1_converted = convert(input1, props.type, props.bitWidth, 'uint', 8);
        let input2_converted = convert(input2, props.type, props.bitWidth, 'uint', 8);
        let output_converted = new Array(input1_converted.length);
        // why not do the computation in the constructor? This seems simpler. No multiple render calls.
        for (var i = 0; i < input1_converted.length; i++) {
            output_converted[i] = uint32.addMod32(input1_converted[i], input2_converted[i])
        }
        let output = convert(output_converted, 'uint', 8, props.type, props.bitWidth);
        Registry.set(props.params[OUTPUT_INDEX], output);

        this.state = {
            input1,
            input2,
            output,
            input1_converted,
            input2_converted,
            output_converted,
            showOutput: false
        };
        this.state.output = _.cloneDeep(input2);
        // console.log(input1_converted, output_converted);
        // let test1 = convert(input1_converted, 'uint', 8, props.type, props.bitWidth);
        // let test2 = convert(output_converted, 'uint', 8, props.type, props.bitWidth);
        // test1 = convert(test1, props.type, props.bitWidth, 'uint', 8);
        // test2 = convert(test2, props.type, props.bitWidth, 'uint', 8);
        // console.log(test1, test2);

        this.vector1 = React.createRef();
        this.vector2 = React.createRef();
        this.vector3 = React.createRef();
        this.vector4 = React.createRef();
        this.equals = React.createRef();
    }

    getAnimation() {

        let timeline = anime.timeline({
            easing: "easeOutCubic",
            loop: false,
            autoplay: false
        });
        let {output_converted} = this.state;
        let input2_converted = _.cloneDeep(this.state.input2_converted);
        let mock = {nextTick: 0, currentTick: 0};

        timeline
            .add({
                targets: this.equals.current,
                opacity: [0, 1],
                duration: 500,
                offset: 500
            })
            .add({
                targets: this.vector3.current,
                translateY: [-95, 0],
                duration: 1500,
                offset: "+=500"
            })
            .add({
                targets: this.vector4.current,
                translateY: [-258, -70],
                duration: 1500,
                offset: "-=1500"
            })
            .add({
                targets: mock,
                //find the maximum difference between input and output. this tells us the range of the animation (number of ticks).
                nextTick: _.max(input2_converted.map((v, i) => Math.abs(output_converted[i] - v))),
                duration: 2000,
                round: 1,
                offset: "-=200",
                begin: () => {
                    this.setState({output: _.cloneDeep(this.state.input2)});
                },
                update: (animation) => {
                    //Update() is not called only upon update of the target... So we need to check if it changed...
                    if (animation.began && mock.nextTick !== mock.currentTick) {
                        input2_converted = input2_converted.map((val, i) => {
                            let diff = output_converted[i] - val;
                            if (diff > 0) return val + 1;
                            if (diff < 0) return val - 1;
                            return val;
                        });
                        mock.currentTick = mock.nextTick;
                        this.setState({output: convert(input2_converted, 'uint', 8, this.props.type, this.props.bitWidth)});
                    }
                }
            });

        return timeline;
    }


    render() {
        let {input1, input2, output} = this.state;
        let {type, bitWidth, base} = this.props;
        let colCount = input1.length * 8 / bitWidth;

        return (
            <div style={{'height': '260px'}}>
                <Vector type={type}
                        bitWidth={bitWidth}
                        base={base}
                        data={input1}
                        vectorRef={(ref) => this.vector1 = ref}
                />
                <Container>
                    <Row>
                        {_.times(colCount).map(i => <Col key={i}>+</Col>)}
                    </Row>
                </Container>
                <Vector type={type}
                        bitWidth={bitWidth}
                        base={base}
                        data={input2}
                        vectorRef={(ref) => this.vector2 = ref}
                />
                <div ref={this.equals}>
                    <Container>
                        <Row>
                            {_.times(colCount).map(i => <Col key={i}>=</Col>)}
                        </Row>
                    </Container>
                </div>
                <Vector type={type}
                        bitWidth={bitWidth}
                        base={base}
                        data={output}
                        vectorRef={(ref) => this.vector3 = ref}
                />
                <Vector type={type}
                        bitWidth={bitWidth}
                        base={base}
                        data={output}
                        vectorRef={(ref) => this.vector4 = ref}
                />
            </div>
        );
    }
}

