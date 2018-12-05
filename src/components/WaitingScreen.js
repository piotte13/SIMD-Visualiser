import React, {Component} from 'react';
import styled from 'styled-components'
import cog from "../Images/cog.svg";
import anime from "animejs";

const Cog = styled.div`
    content: ${({url}) => 'url(' + url + ');'}
    height: 40vh;
    margin: 30vh auto;
    color: var(--dark-main)
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
        return <Cog ref={this.cog} url={cog}/>
    }
}