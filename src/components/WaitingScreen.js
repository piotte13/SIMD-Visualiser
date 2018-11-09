import React from 'react';
import Anime from 'react-anime';
import styled from 'styled-components'
import cog from "../Images/cog.svg";

const Cog = styled.div`
    content: ${({url}) => 'url(' + url + ');'}
    height: 40vh;
    margin: 30vh auto;
    color: var(--dark-main)
`

export default function WaitingScreen() {

    return (
                <Anime loop={true}
                       easing={"linear"}
                       rotate='360deg'
                       duration={4000}>
                    <Cog url={cog}/>
                </Anime>
    );
}