import React from "react";
import styled from "styled-components";

const FunctionContainer = styled.div`
  padding-bottom: 20px;
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
`

export default function Function({name, body}) {
    return (
        <FunctionContainer>
            <FunctionName>{name}</FunctionName>
            <FunctionBody>{body}</FunctionBody>
        </FunctionContainer>

    );
}
