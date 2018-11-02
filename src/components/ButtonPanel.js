import React from 'react';
import styled from 'styled-components'
import CodeStatus from "./CodeStatus";

const ButtonPanelContainer = styled.div`
  background: #1F292E;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Top = styled.div`
  padding: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
`

const Buttons = styled.div`
  > button {
    border: none;
    background: none;
    color: #fff;
    font-size: 18px;
    padding: 8px;
    text-shadow: -1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.5);

    @media (max-width: 700px) {
      font-size: 10px;
    }
  }

  > button:hover {
    color: #fff;
    cursor: pointer;
  }

  > button:disabled {
    color: #919191;
  }

  > button:active {
    color: #fff;
    text-shadow: none;
  }
`

export default function ButtonPanel({visualize, serialize, restart, disabled = false, status}) {
    return (
        <ButtonPanelContainer>
            <Top>
                <Buttons>
                    <button disabled={disabled} onClick={visualize}>Visualize</button>
                    <button onClick={serialize}>Serialize</button>
                    <button onClick={restart}>Restart</button>
                </Buttons>
            </Top>
            <CodeStatus status={status}/>
        </ButtonPanelContainer>
    );
}