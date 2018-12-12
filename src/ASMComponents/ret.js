import React, {Component} from "react";
import * as Registry from "../Utils/Registry";
import Vector from "./Vector";
import anime from 'animejs';

export default class Ret extends Component {

    static defaultProps = {
        type: "uint",
        bitWidth: 32,
        base: 16,
    };

    constructor(props) {
        super(props);

        let registry = Registry.default;
        //Ret returns value on top of the stack.  For now we will assume the value is always 128 bits... (Xmm)
        let returnValue = registry.get('xmm0');

        this.state = {
            returnValue,
        };

        this.vector = React.createRef();
        this.computeCommand();
    }

    getAnimation() {

        //We make an empty timeline because sequentialComponent needs to know when to jump to the next command.
        let timeline = anime.timeline({
            easing: "linear",
            autoplay: false,
        });

        timeline
            .add({
                targets: this.vector.current,
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
                targets: this.vector.current,
                filter: ["drop-shadow(0px 0px 10px rgba(42, 54, 59, 1))", "drop-shadow(0px 0px 1px rgba(42, 54, 59, .5))"],
                duration: 1000
            });

        return timeline;
    }

    //Compute the command and set the registry.
    computeCommand() {

    }

    render() {
        let {returnValue} = this.state;
        let {type, bitWidth, base} = this.props;

        return (
            <Vector type={type}
                    bitWidth={bitWidth}
                    base={base}
                    data={returnValue}
                    vectorRef={(ref) => this.vector = ref}/>
        );
    }
}
