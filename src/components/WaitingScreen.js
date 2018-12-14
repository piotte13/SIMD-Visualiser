import React, {Component} from 'react';
import styled from 'styled-components'
import anime from "animejs";
import SvgCog from "../Images/Cog";

const Container = styled.div`
    height: 40vh;
    margin: 30vh auto;
    color: var(--dark-main);
    text-align: center;
`

export default class WaitingScreen extends Component {

    constructor() {
        super();

        this.cog = React.createRef();
    }

    componentDidMount() {
        this.cogAnim = anime({
            targets: this.cog.current,
            loop: true,
            rotate: '360deg',
            duration: 4000,
            easing: 'linear'
        })
    }

    render() {
        return (
            <Container>
                <SvgCog ref={this.cog} height="100%"/>
            </Container>
        );
    }
}