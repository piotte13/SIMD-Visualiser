import React, {Component} from "react";
import styled from "styled-components";
import * as Registry from "../Utils/Registry";
import Vector from "./Vector";
import anime from 'animejs';


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

const RetContainer = styled.div`
        border-radius: 3px;
        width: ${({width}) => width}px;
        margin: 0 auto;
}
`


export default class Ret extends Component {

    constructor(props) {
        super(props);

        let registry = Registry.default;
        //Ret returns value on top of the stack.  For now we will assume the value is always 128 bits... (Xmm)
        let returnValue = registry.get('xmm0');
        let nbCols = returnValue.length;

        this.state = {
            colLen: 50,
            colHeight: 50,
            nbCols,
            returnValue,
        };

        this.computeCommand();
        this.ref = React.createRef();

    }

    getAnimation() {

        //We make an empty timeline because sequentialComponent needs to know when to jump to the next command.
        let timeline = anime.timeline({
            easing: "linear",
            autoplay: false,
        });

        timeline
            .add({
                targets: this.ref.current,
                duration: 1000
            });

        let eternalGlow = anime.timeline({
            easing: "linear",
            loop: true,
            autoplay: true,
            direction: 'alternate'
        });

        eternalGlow // Creates the glow arround the returned vector (glowing box shadow)
            .add({
                targets: this.ref.current,
                boxShadow: ["0px 0px 20px 5px var(--main)", "0px 0px 2px 1px var(--main)"],
                duration: 1000
            });

        return timeline;
    }

    //Compute the command and set the registry.
    computeCommand() {

    }

    render() {
        let {nbCols, colLen, colHeight, returnValue} = this.state;

        return (
            <RetContainer ref={this.ref} width={colLen * nbCols}>
                <Vector colLen={colLen} colHeight={colHeight} nbCols={nbCols}>
                    <TrNumbers colHeight={colHeight}>
                        {returnValue.map((e, i) =>
                            <TdNumbers colLen={colLen} colHeight={colHeight} key={i}>{('0'+e.toString(16).toUpperCase()).substr(-2)}</TdNumbers>
                        )}
                    </TrNumbers>
                </Vector>
            </RetContainer>
        );
    }
}
