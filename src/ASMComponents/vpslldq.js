import React from "react";
import styled from "styled-components";
import Anime from "react-anime";
import * as _ from "lodash";


const NB_COLS = 16;
const COL_SIZE = 50;

const Container = styled.div`
  margin: 20px auto;
  width: calc(${NB_COLS} * ${COL_SIZE}px);
  overflow: hidden;
  height: ${COL_SIZE + 4}px;
  box-shadow: 3px 3px 2px rgba(0,0,0,.4);
  background-color: var(--main);
  color: var(--clear-text-color);
  border-radius: 3px;
`

const TD = styled.td`
    border-right: 1px solid var(--gray);
    width: ${COL_SIZE}px;
    height: ${COL_SIZE}px;
    // color: var(--clear-text-color);
    text-align: center;
    
    :last-child{
        border-right: none;
    }
`

const TdNumbers = styled.td`
    width: ${COL_SIZE}px;
    height: ${COL_SIZE}px;
    text-align: center;
`

const TdZeroes = styled.td`
    width: ${COL_SIZE}px;
    height: ${COL_SIZE}px;
    text-align: center;
    color: var(--two);
`

const TrNumbers = styled.tr`
    position: relative;
    top: -${COL_SIZE + 1}px;
    font-size: 24px;
    font-family: monospace;
`

function getCells() {
    let cells = []
    for (let i = 0; i < NB_COLS; i++) {
        cells.push(<TD key={i}></TD>)
    }
    return cells
}

function getNumbers() {
    let cells = []
    for (let i = 0; i < NB_COLS; i++) {
        cells.push(<TdNumbers key={i}>{_.random(0, 9)}</TdNumbers>)
    }
    return cells
}

function getZeroes(qty) {
    let cells = []
    for (let i = 0; i < NB_COLS; i++) {
        cells.push(<TdZeroes key={i}>{(i < NB_COLS - qty) ? "" : 0}</TdZeroes>)
    }
    return cells
}

export default function Vpslldq({name, params}) {
    return (
        <Container>
            <tbody>
            <tr>
                {getCells()}
            </tr>
            <Anime easing="easeOutCubic"
                   duration={2000}
                   loop={false}
                   translateX={-params[2] * COL_SIZE}
                   delay={1000}>
                <TrNumbers>
                    {getNumbers()}
                </TrNumbers>
            </Anime>
            <Anime easing="easeOutCubic"
                   duration={500}
                   loop={false}
                   translateY={-52}
                   delay={3000}>
                <TrNumbers>
                    {getZeroes(params[2])}
                </TrNumbers>
            </Anime>
            </tbody>
        </Container>
    );
}