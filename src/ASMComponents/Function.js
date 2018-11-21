import React, {Component} from "react";
import styled from "styled-components";
import anime from 'animejs';
import * as Registry from "../Utils/Registry";

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

export default class Function extends Component {

    constructor(props) {
        super(props);

        //Reset the registry because this is a new function!
        let registry = Registry.default;
        registry.clear()
    }


    render() {
        return (
            <FunctionContainer>
                <FunctionName>{this.props.name}</FunctionName>
            </FunctionContainer>
        );
    }
}
