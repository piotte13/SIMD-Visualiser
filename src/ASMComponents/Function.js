import React, {Component} from "react";
import styled from "styled-components";
import Registry from "../Utils/Registry";

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
        Registry.clear()
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
