import React, {Component} from "react";
import styled from "styled-components";
import Registry from "../Utils/Registry";
import {convert} from "../Utils/Converter";

const FunctionContainer = styled.div`
`
const FunctionName = styled.div`
    font-size: 32px;
    font-weight: normal;
    color: rgb(72, 72, 72);
    margin-bottom: 15px;
    text-align: center;
`

export default class Function extends Component {

    constructor(props) {
        super(props);

        //Reset the registry because this is a new function!
        Registry.clear();

        props.params.forEach(param => {
            Registry.set(param.register, convert(param.value, 'uint', 8, 'uint', param.bitWidth));
        })
    }


    render() {
        return (
            <FunctionContainer>
                <FunctionName>{this.props.name}</FunctionName>
                <hr/>
            </FunctionContainer>
        );
    }
}
