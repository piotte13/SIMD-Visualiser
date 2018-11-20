import React from "react";
import styled from "styled-components";
import anime from 'animejs';

const FunctionContainer = styled.div`
  padding-top: 20px;
`
const FunctionName = styled.div`
    font-size: 32px;
    font-weight: normal;
    color: rgb(72, 72, 72);
    margin-bottom: 15px;
    text-align: center;
`

const FunctionBody = styled.div`
    //padding-left: 20px;
    //transform: translateY(100vh);
`

export default function Function({name}) {

    return (
        <FunctionContainer>
            <FunctionName>{name}</FunctionName>
        </FunctionContainer>
    );
}
