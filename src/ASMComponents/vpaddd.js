import React, {Component} from "react";
import Vector from "./Vector";
import * as Registry from "../Utils/Registry";
import styled from "styled-components";
import anime from "animejs";
import * as _ from "lodash";
import {TYPE_LENGTH} from "../Utils/Registry";

const TdNumbers = styled.td`
    width: ${({colLen}) => colLen}px;
    height: ${({colHeight}) => colHeight}px;
    text-align: center;
`

const TrNumbers = styled.tr`
    position: relative;
    top: ${({colHeight}) => -(colHeight + 5)}px;
    //font-size: 24px;
    font-family: monospace;
`

const Operator = styled.div`
        text-align: center;
        font-size: 24px;
        font-family: monospace;
    `

const INPUT1_INDEX = 1;
const INPUT2_INDEX = 2;
const OUTPUT_INDEX = 0;

export default class Vpaddd extends Component {

    constructor(props) {
        super(props);

        let registry = Registry.default;
        let input1 = registry.get(props.params[INPUT1_INDEX]);
        let input2 = registry.get(props.params[INPUT2_INDEX]);
        let nbCols = input1.length;

        this.state = {
            colLen: 50,
            colHeight: 50,
            nbCols,
            input1,
            input2,
            output: [],
        };

        //This will compute the output
        this.computeCommand();
        this.state.output = registry.get(props.params[OUTPUT_INDEX]);

        this.numbers1Ref = React.createRef();
        this.numbers2Ref = React.createRef();
        this.actualNumbersRef = React.createRef();
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
        let {output} = this.state;
        let input2 = _.cloneDeep(this.state.input2);

        timeline
            .add({
                targets: this.numbers1Ref.current,
                translateY: 70,
                duration: 1000,
                offset: 500
            })
            .add({
                targets: this.numbers2Ref.current,
                translateY: -70,
                duration: 1000,
                offset: 500
            })
            .add({
                targets: this.numbers1Ref.current,
                opacity: 0,
                duration: 500
            })

        this.actualNumbersRef.current.childNodes.forEach((e, i) => {
            timeline.add({
                targets: e,
                easing: 'easeInOutExpo',
                title: output[i],
                round: 1,
                duration: 1000,
                offset: 1500,
                update: (a) => {
                    if (a.progress > 0) {
                        e.innerHTML = (+e.title).toString(16)
                    }
                }
            });
        });


        return timeline;
    }

    //Compute the command and set the registry.
    computeCommand() {
        let {input1, input2} = this.state;
        let registry = Registry.default;
        let output = _.cloneDeep(input1);

        input2.forEach((e, i) => {
            output[i] += e;
        });
        registry.set(this.props.params[OUTPUT_INDEX], output);
    }


    render() {
        let {nbCols, colLen, colHeight, input1, input2} = this.state;

        return (
            <div>
                <div ref={this.numbers1Ref}>
                    <Vector colLen={colLen} colHeight={colHeight} nbCols={nbCols}>
                        <TrNumbers colHeight={colHeight}>
                            {input1.map((e, i) =>
                                <TdNumbers colLen={colLen} colHeight={colHeight} key={i}>{e.toString(16)}</TdNumbers>
                            )}
                        </TrNumbers>
                    </Vector>
                </div>
                <Operator>+</Operator>
                <div ref={this.numbers2Ref}>
                    <Vector colLen={colLen} colHeight={colHeight} nbCols={nbCols}>
                        <TrNumbers colHeight={colHeight} ref={this.actualNumbersRef}>
                            {input2.map((e, i) =>
                                <TdNumbers colLen={colLen} colHeight={colHeight} key={i}
                                           title={e.toString()}>{e.toString(16)}</TdNumbers>
                            )}
                        </TrNumbers>
                    </Vector>
                </div>
            </div>
        );
    }
}