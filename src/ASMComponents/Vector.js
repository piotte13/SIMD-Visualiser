import React, {Component} from "react";
import styled from "styled-components";
import * as _ from "lodash";

const VectorContainer = styled.table`
      margin: 30px auto;
      width: ${({nbCols, colLen}) => (nbCols * colLen) + 'px;' }
      overflow: hidden;
      height: ${({colHeight}) => (colHeight) + 'px;'}
      box-shadow: 3px 3px 2px rgba(0,0,0,.4);
      background-color: var(--main);
      color: var(--clear-text-color);
      border-radius: 3px;
      display: block;
      position: relative;
`

const TD = styled.td`
    border-right: 1px solid var(--gray);
    width: ${({colLen}) => colLen + 'px;'}
    height: ${({colHeight}) => colHeight + 'px;'}
    display: inline-flex;
    // color: var(--clear-text-color);
    text-align: center;
    
    :last-child{
        border-right: none;
    }
`

export default class Vector extends Component {

    static defaultProps = {
        nbCols: 4,
        colLen: 50,
        colHeight: 50,
        children: []
    };

    constructor(props) {
        super(props)
        this.cols = [];
        _.times(props.nbCols, i => {
            this.cols.push(
                <TD colLen={props.colLen}
                    colHeight={props.colHeight}
                    key={i}>
                    {}
                </TD>
            )
        });
    }

    render() {
        return (
            <VectorContainer nbCols={this.props.nbCols}
                             colLen={this.props.colLen}
                             colHeight={this.props.colHeight}>
                <tbody>
                <tr>
                    {this.cols}
                </tr>
                {this.props.children}
                </tbody>
            </VectorContainer>
        );
    }
}