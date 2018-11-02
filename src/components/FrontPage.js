import React from 'react';
import Anime from 'react-anime';
import '../css/WaitingScreen.css'
import styled from 'styled-components'
import CLogo from "../Images/c-programming.png";

const Image = styled.div`
    content: ${({url}) => 'url(' + url + ');'}
    width: 500px;
    margin: 100px auto;
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
export default function FrontPage() {

    return (
        <div>
            <Anime easing="easeOutCubic"
                   duration={2000}
                   direction="alternate"
                   loop={true}
                   scale={.9}>
                <div>
                    <Anime rotate={"360deg"}
                           loop={true}
                           delay={5000}
                           duration={2500}>
                        <Image url={CLogo}/>
                    </Anime>
                </div>
            </Anime>
            <AppTitle>The Ultimate C code visualizer</AppTitle>
            <AppDescription>Built by <strong>Jérémie Piotte</strong> and <strong>Pierre-Marie</strong></AppDescription>
        </div>
    );
}