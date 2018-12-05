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

// should be in a distinct file
let convertto32bitsfrom8bits = (array) => {
    let output = new Array(array.length / 4);
    // we have four bytes per 32-bit ints
    for(var z = 0; z < array.length / 4; z++) {
        output[z] = uint32.fromBytesBigEndian(array[4 * z], array[4 * z + 1], array[4 * z + 2], array[4 * z + 3]);
    }
    return output
};

// should be in a distinct file
let convertto8bitsfrom32bits = (array) => {
    let output = new Array(array.length * 4);
    // we have four bytes per 32-bit ints
    for(var z = 0; z < array.length; z++) {
        output[4 * z] = uint32.getByteBigEndian(array[z], 3);
        output[4 * z + 1] = uint32.getByteBigEndian(array[z], 2);
        output[4 * z + 2] = uint32.getByteBigEndian(array[z], 1);
        output[4 * z + 3] = uint32.getByteBigEndian(array[z], 0);
    }
    return output
};

export default class Vpaddd extends Component {

    constructor(props) {
        super(props);

        let registry = Registry.default;
        let input1 = registry.get(props.params[INPUT1_INDEX]);
        let input2 = registry.get(props.params[INPUT2_INDEX]);
        let input1_32bits = convertto32bitsfrom8bits(input1);
        let input2_32bits = convertto32bitsfrom8bits(input2);
        let output_32bits = new Array(input1_32bits.length);
        // why not do the computation in the constructor? This seems simpler. No multiple render calls.
        for(var i = 0; i < input1_32bits.length; i++) {
            output_32bits[i] = uint32.addMod32(input1_32bits[i],input2_32bits[i])
        }
        let output = convertto8bitsfrom32bits(output_32bits)
        let nbCols = input1.length;
        let nbCols_32bits = input1.length / 4;

        this.state = {
            colLen: 50,
            colLen32: 200,
            colHeight: 50,
            nbCols,
            nbCols_32bits,
            input1,
            input2,
            input1_32bits,
            input2_32bits,
            output_32bits,
            output
        };

        this.state.output = registry.get(props.params[OUTPUT_INDEX]);

        this.numbers1Ref = React.createRef();
        this.numbers2Ref = React.createRef();
        this.numbers1Ref_32bits = React.createRef();
        this.numbers2Ref_32bits = React.createRef();
        this.operator = React.createRef();
        this.actualNumbersRef2 = React.createRef();
        this.actualNumbersRef2_32bits = React.createRef();

    }

    getAnimation() {
        //
        // Daniel : this whole thing is unreasonably long and complicated.
        //
        let timeline = anime.timeline({
            easing: "easeOutCubic",
            loop: false,
            autoplay: false
        });
        let {output, input2, input2_32bits, output_32bits} = this.state;

        timeline 
            // move the byte arrays close
            .add({
                targets: this.numbers2Ref.current,
                translateY: -70,
                duration: 1000,
                offset: 500
            })
            .add({
                targets: this.numbers1Ref.current,
                translateY: 70,
                duration: 1000,
                offset: 500
            })
            // at 1.5 s fade out the bytes and bring in the 32-bit words
            .add({
                targets: this.numbers1Ref.current,
                duration: 1000,
                opacity: 0,
                offset: 1500
            })
            .add({
                targets: this.numbers2Ref.current,
                duration: 1000,
                opacity: 0,
                offset: 1500
            })
            .add({
                targets: this.numbers1Ref_32bits.current,
                duration: 1000,
                opacity: 1,
                offset: 1500
            })
            .add({
                targets: this.numbers2Ref_32bits.current,
                duration: 1000,
                opacity: 1,
                offset: 1500
            })
            // then merge the two 32-bit array
            .add({
                targets: this.numbers2Ref_32bits.current,
                translateY: -70,
                duration: 1000,
                offset: 2500
            })
            .add({
                targets: this.numbers1Ref_32bits.current,
                translateY: 70,
                duration: 1000,
                offset: 2500
            })
            .add({
                targets: this.numbers2Ref.current,
                translateY: -150,
                duration: 1000,
                offset: 2500
            })
            .add({
                targets: this.numbers1Ref.current,
                translateY: 150,
                duration: 1000,
                offset: 2500
            })
            .add({
                targets: this.operator.current,
                opacity: 0,
                duration: 1
            })
            // fade out the first ref
            .add({
                targets: this.numbers1Ref_32bits.current,
                opacity: 0,
                duration: 500
            })
        this.actualNumbersRef2.current.childNodes.forEach((e, i) => {
            timeline.add({
                targets: e,
                easing: 'easeInOutExpo',
                title: [input2[i], output[i]],
                round: 1,
                duration: 1000,
                offset: 3000,
                update: (a) => {
                    if (a.progress > 0) {
                        e.innerHTML = ('0'+(+e.title).toString(16).toUpperCase()).substr(-2)
                    }
                }
            });

        this.actualNumbersRef2_32bits.current.childNodes.forEach((e, i) => {
            timeline.add({
                targets: e,
                easing: 'easeInOutExpo',
                title: [input2_32bits[i], output_32bits[i]],
                round: 1,
                duration: 1000,
                offset: 3000,
                update: (a) => {
                    if (a.progress > 0) {
                        e.innerHTML = ('0000000'+(+e.title).toString(16).toUpperCase()).substr(-8)
                    }
                }
            });
        });
        timeline
            .add({
                targets: this.numbers2Ref_32bits.current,
                duration: 1000,
                opacity: 0,
                offset: 5000
            })
            .add({
                targets: this.numbers2Ref.current,
                duration: 1000,
                opacity: 1,
                offset: 5000
            })
        });
        // this was long!!!
        return timeline;
    }

    


    render() {
        const hiddenStyle = {
            opacity: 0
          };
        //
        // it is really not clear how to use Vector and TrNumbers and TdNumbers... should we specify colLen once or all over?
        //
        let {nbCols, nbCols_32bits, colLen32, colLen, colHeight, input1, input2, input1_32bits, input2_32bits} = this.state;
        return (
            <div>
                <div ref={this.numbers1Ref}>
                    <Vector colLen={colLen} colHeight={colHeight} nbCols={nbCols}>
                        <TrNumbers colHeight={colHeight}>
                            {input1.map((e, i) =>
                                <TdNumbers colLen={colLen} colHeight={colHeight} key={i}>{('0'+e.toString(16).toUpperCase()).substr(-2)}</TdNumbers>
                            )}
                        </TrNumbers>
                    </Vector>
                </div>
                <div ref={this.numbers1Ref_32bits} style={hiddenStyle}>
                    <Vector colLen={colLen32} colHeight={colHeight} nbCols={nbCols_32bits}>
                        <TrNumbers colHeight={colHeight}>
                            {input1_32bits.map((e, i) =>
                                <TdNumbers colLen={colLen32}  colHeight={colHeight} key={i}>{('0000000'+e.toString(16).toUpperCase()).substr(-8)}</TdNumbers>
                            )}
                        </TrNumbers>
                    </Vector>
                </div>
                <Operator ref={this.operator}>+</Operator>
                <div ref={this.numbers2Ref_32bits} style={hiddenStyle}>
                    <Vector colLen={colLen32} colHeight={colHeight} nbCols={nbCols_32bits}>
                        <TrNumbers colHeight={colHeight} ref={this.actualNumbersRef2_32bits}>
                            {input2_32bits.map((e, i) =>
                                <TdNumbers  colLen={colLen32}  colHeight={colHeight} key={i}
                                           title={e.toString()}>{('00000'+e.toString(16).toUpperCase()).substr(-8)}</TdNumbers>
                            )}
                        </TrNumbers>
                    </Vector>
                </div>
                <div ref={this.numbers2Ref}>
                    <Vector colLen={colLen} colHeight={colHeight} nbCols={nbCols}>
                        <TrNumbers colHeight={colHeight} ref={this.actualNumbersRef2}>
                            {input2.map((e, i) =>
                                <TdNumbers colLen={colLen} colHeight={colHeight} key={i}
                                           title={e.toString()}>{('0'+e.toString(16).toUpperCase()).substr(-2)}</TdNumbers>
                            )}
                        </TrNumbers>
                    </Vector>
                </div>
            </div>
        );
    }
}

