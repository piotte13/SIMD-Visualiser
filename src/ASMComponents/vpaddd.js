import React from "react";
import Vector from "./Vector";
import * as Registry from "../Utils/Registry";
import styled from "styled-components";
import Anime from "react-anime";

export default function Vpaddd({name, params}) {
    let registry = Registry.default;
    let input1 = registry.get(params[1]);
    let input2 = registry.get(params[2]);
    let output = registry.get(params[0]);
    let nbCols = input1.length;
    const colLen = 50;
    const colHeight = 50;

    const TdNumbers = styled.td`
    width: ${colLen}px;
    height: ${colHeight}px;
    text-align: center;
    `

    const TrNumbers = styled.tr`
    position: relative;
    top: -${colHeight + 5}px;
    font-size: 24px;
    font-family: monospace;
    `

    const Operator = styled.div`
        text-align: center;
        font-size: 24px;
        font-family: monospace;
    `

    let numbers1 = [];
    for (let i = 0; i < nbCols; i++) {
        numbers1.push(<TdNumbers key={i}>{input1[i].toString(16)}</TdNumbers>)
    }

    let numbers2 = [];
    for (let i = 0; i < nbCols; i++) {
        numbers2.push(<TdNumbers key={i}>{input2[i].toString(16)}</TdNumbers>)
    }


    return (
        <div>
            {/*<Anime easing="easeOutCubic"*/}
            {/*duration={2000}*/}
            {/*loop={false}*/}
            {/*translateY={"-100px"}*/}
            {/*delay={1000}>*/}
            <div>
                <Vector colLen={colLen} colHeight={colHeight} nbCols={nbCols}>
                    <TrNumbers>
                        {numbers1}
                    </TrNumbers>
                </Vector>
            </div>
            {/*</Anime>*/}
            <Operator>+</Operator>
            {/*<Anime easing="easeOutCubic"*/}
            {/*duration={2000}*/}
            {/*loop={false}*/}
            {/*translateY={"100px"}*/}
            {/*delay={1000}>*/}
            <div>
                <Vector colLen={colLen} colHeight={colHeight} nbCols={nbCols}>
                    <TrNumbers>
                        {numbers2}
                    </TrNumbers>
                </Vector>
            </div>
            {/*</Anime>*/}
        </div>

    );
}