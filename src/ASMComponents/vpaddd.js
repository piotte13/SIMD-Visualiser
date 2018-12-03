import React, {Component} from "react";
import Vector from "./Vector";
import * as Registry from "../Utils/Registry";
import styled from "styled-components";
import anime from "animejs";
import uint32 from "uint32";

const TdNumbers = styled.td`
    width: ${({colLen}) => colLen}px;
    height: ${({colHeight}) => colHeight}px;
    text-align: center;
    line-height: ${({colHeight}) => colHeight}px;
`

const TrNumbers = styled.tr`
    position: relative;
    top: ${({colHeight}) => -(colHeight)}px;
    //font-size: 24px;
    font-family: monospace;
    display: inline-flex;
`

const Operator = styled.div`
        text-align: center;
        color: var(--main);
        font-size: 24px;
        font-weight: 700;
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

    getAnimation() {
        let timeline = anime.timeline({
            easing: "easeOutCubic",
            loop: false,
            autoplay: false
        });
        let {input2,output} = this.state;

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
                title: [input2[i],output[i]],
                round: 1,
                duration: 1000,
                offset: 1500,
                update: (a) => {
                    if (a.progress > 0) {
                        e.innerHTML = ('0'+(+e.title).toString(16)).substr(-2)
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
        let output = new Array(16).fill(0);
        // we have four bytes per 32-bit ints
        for(var z = 0; z < input1.length / 4; z++) {
            // little endian, so we do everything in reverse
            let int1 = uint32.fromBytesBigEndian(input1[4 * z], input1[4 * z + 1], input1[4 * z + 2], input1[4 * z + 3]);
            let int2 = uint32.fromBytesBigEndian(input2[4 * z], input2[4 * z + 1], input2[4 * z + 2], input2[4 * z + 3]);
            let result = uint32.addMod32(int1,int2);
            // we again write in reverse... least significant bit first
            output[4 * z] = uint32.getByteBigEndian(result, 3);
            output[4 * z + 1] = uint32.getByteBigEndian(result, 2);
            output[4 * z + 2] = uint32.getByteBigEndian(result, 1);
            output[4 * z + 3] = uint32.getByteBigEndian(result, 0);
        }
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
                                <TdNumbers colLen={colLen} colHeight={colHeight} key={i}>{('0'+e.toString(16)).substr(-2)}</TdNumbers>
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
                                           title={e.toString()}>{('0'+e.toString(16)).substr(-2)}</TdNumbers>
                            )}
                        </TrNumbers>
                    </Vector>
                </div>
            </div>
        );
    }
}

