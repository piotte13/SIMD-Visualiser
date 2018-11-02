import React from "react";
import styled from 'styled-components'
import {getFlatColors} from "../Utils";

const Status = styled.div`
  background: ${({bg}) => bg};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: 300
  font-size: 14px;
  padding: 5px;
  padding-left: 10px;
  margin-bottom: 5px;

  > span {
    font-weight: 500;
    margin-left: 10px;
  }

  @media (max-width: 700px) {
    font-size: 8px;
  }
`

export default function CodeStatus({status = 'compiles'}) {
    let color = '';
    let message = '';
    if (status === 'compiles') {
        color = getFlatColors().five;
        message = 'Code status: Compiles..';
    }
    else if (status === 'error') {
        color = getFlatColors().two;
        message = 'Code status: Error..';
    }
    else if (status === 'warning') {
        color = getFlatColors().four;
        message = 'Code status: warning..';
    }

    return (
        <Status bg={color}>
            {message}
        </Status>
    );
}