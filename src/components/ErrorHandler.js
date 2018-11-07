import React, {Component} from 'react';
import styled from "styled-components";

const ErrorPageContainer = styled.div`
    padding: 50px;
`

const TextJumbo = styled.div`
    font-size: 60px;
    font-weight: 700;
    color: rgb(72, 72, 72);
    margin-bottom: 15px;
`

const ErrorMessage = styled.div`
    font-size: 32px;
    font-weight: normal;
    color: rgb(72, 72, 72);
    margin-bottom: 15px;
    margin-top: 25px;
`

const ErrorPosition = styled.div`
    font-size: 14px;
    font-weight: bold;
    color: #767676;
    margin-bottom: 15px;
    margin-top: 25px;
`

class ErrorHandler extends Component {

    constructor(props) {
        super(props)
        console.log(props.error)
        if (props.error.length !== 0) {
            this.highlightCode()
        }
    }

    componentWillUnmount() {
        this.clearHighlightedCode()
    }

    highlightCode = () => {
        const line = this.props.error[0].tag.line - 1;
        const lineLength = this.props.cm.editor.getLine(line).length;
        this.props.cm.editor.doc.markText({line, ch: 0}, {line, ch: lineLength}, {
            className: 'highlighted-code'
        });
    };

    clearHighlightedCode = () => {
        this.props.cm.editor.doc.getAllMarks().forEach((m) => {
            m.clear()
        })
    };

    getErrorMessage = () => {
        return this.props.error[0].tag.text;
    }
    getErrorPosition = () => {
        return <div>
            <p>Line: {this.props.error[0].tag.line} </p>
            <p> Column: {this.props.error[0].tag.column} </p>
        </div>

    }

    render() {
        return (
            <ErrorPageContainer>
                <TextJumbo>Oops!</TextJumbo>
                <ErrorMessage>
                    {this.getErrorMessage()}
                </ErrorMessage>
                <ErrorPosition>
                    {this.getErrorPosition()}
                </ErrorPosition>
            </ErrorPageContainer>
        );
    }
}

export default ErrorHandler;