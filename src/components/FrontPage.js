import React, {Component} from 'react';
import styled from 'styled-components'
import CLogo from "../Images/c-programming.png";
import anime from "animejs";


const Image = styled.div`
    content: ${({url}) => 'url(' + url + ');'}
    width: 40vmin;
    margin: 8vh auto;
`
const AppTitle = styled.div`
    text-align: center;
    font-weight: 300;
    font-size: calc(12px + 3.6vw);
    letter-spacing: 1.8px;
    margin-top: 40px;
    border: medium none;
    margin-bottom: 20px;
`
const AppDescription = styled.div`
    text-align: center;
    font-weight: 300;
    margin: 0px auto;
    font-size: calc(8px + 0.91vw);
`
const Container = styled.div`
`

const GHButton = styled.button`
    padding: 3px 10px 3px 8px;
    font-size: 16px;
    line-height: 22px;
    border-radius: 4px;
    text-shadow: 0 1px 0 #fff;
    white-space: nowrap;
    cursor: pointer;
    color: #333;
    background-repeat: no-repeat;
    border: 1px solid #d5d5d5;
    font-weight: 700;
    vertical-align: top;
    margin: 0 10px;
    
    :hover{
        text-decoration: none;
        background-color: #ddd;
        background-image: -webkit-gradient(linear,left top,left bottom,color-stop(0,#eee),color-stop(100%,#ddd));
        background-image: -webkit-linear-gradient(top,#eee 0,#ddd 100%);
        background-image: -moz-linear-gradient(top,#eee 0,#ddd 100%);
        background-image: -ms-linear-gradient(top,#eee 0,#ddd 100%);
        background-image: -o-linear-gradient(top,#eee 0,#ddd 100%);
        background-image: linear-gradient(to bottom,#eee 0,#ddd 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#eeeeee', endColorstr='#dddddd', GradientType=0);
        border-color: #ccc;
    }
`

const ButtonGroup = styled.div`
    margin-top: 50px;
    text-align: center;
`

export default class FrontPage extends Component {
    constructor() {
        super();

        this.image = React.createRef();
        this.imageContainer = React.createRef();
    }

    componentDidMount() {
        let scaleAnime = anime({
            easing: "easeOutCubic",
            targets: this.imageContainer.current,
            direction: 'alternate',
            duration: 2000,
            scale: '.9',
            loop: true
        });

        let spinAnime = anime({
            targets: this.image.current,
            delay: 6000,
            duration: 4000,
            rotate: '360deg',
            loop: true
        })
    }


    render() {
        return <Container>

            <div ref={this.imageContainer}>
                <Image url={CLogo} ref={this.image}/>
            </div>

            <AppTitle>The Ultimate SIMD visualizer</AppTitle>
            <AppDescription>Built by <strong>Jérémie Piotte</strong>, <strong>Daniel Lemire</strong> and <strong>Pierre
                Marie
                Ntang</strong>
            </AppDescription>
            <ButtonGroup>
                <GHButton>View on GitHub</GHButton>
                <iframe
                    src="https://ghbtns.com/github-btn.html?user=piotte13&repo=SIMD-Visualiser&type=star&count=true&size=large"
                    frameBorder="0" scrolling="0" width="160px" height="30px"/>
            </ButtonGroup>
        </Container>;
    }
}