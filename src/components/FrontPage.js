import React from 'react';
import Anime from 'react-anime';
import styled from 'styled-components'
import CLogo from "../Images/c-programming.png";

const Image = styled.div`
    content: ${({url}) => 'url(' + url + ');'}
    width: 40vmin;
    margin: 10vh auto;
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

export default function FrontPage() {

    return (
        <Container>
            <Anime easing="easeOutCubic"
                   duration={2000}
                   direction="alternate"
                   loop={true}
                   scale={.9}>
                <div>
                    <Anime rotate={"360deg"}
                           loop={true}
                           delay={6000}
                           duration={4000}>
                        <Image url={CLogo}/>
                    </Anime>
                </div>
            </Anime>
            <AppTitle>The Ultimate SIMD visualizer</AppTitle>
            <AppDescription>Built by <strong>Jérémie Piotte</strong> and <strong>Pierre Marie
                Ntang</strong></AppDescription>
        </Container>
    );
}