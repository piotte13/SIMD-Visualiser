import React from 'react';
import Anime from 'react-anime';
import '../css/WaitingScreen.css'
import styled from 'styled-components'

const Circle = styled.div`
    border-radius: 50%;
    height: ${({radius}) => radius + "px"};
    width: ${({radius}) => radius + "px"};
    background: var(--main);
    position: absolute;
    top: 50%;
    left: 75%;
    margin: ${({radius}) => -radius / 2 + "px" + " 0 0 " + -radius / 2 + "px"};
`
const DottedCircle = styled.div`
    border-radius: 50%;
    height: ${({radius}) => radius + "px"};
    width: ${({radius}) => radius + "px"};
    border: ${({dotSize}) => dotSize + "px dashed var(--main);"};
    position: absolute;
    top: 50%;
    left: 50%;
    margin: ${({radius, dotSize}) => -((radius / 2) + dotSize) + "px" + " 0 0 " + -((radius / 2) + dotSize) + "px"};
    overflow: hidden;
`
const CenteredText = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 55px;
    font-family: -apple-system, BlinkMacSystemFont;
`
export default function WaitingScreen() {

    return (
        <Anime easing="easeOutCubic"
               duration={1500}
               direction="alternate"
               loop={true}
               delay={(el, index) => index * 10}
               scale={.90}
        >
            <Circle radius={400}>
                <Anime loop={true}
                       easing={"linear"}
                       rotate='360deg'
                       duration={8000}>
                    <DottedCircle radius={395} dotSize={40}/>
                </Anime>
                <CenteredText>
                    Compiling
                </CenteredText>
            </Circle>
        </Anime>
    );
}