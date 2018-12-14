import React, {Component} from 'react';
import styled from "styled-components";
import SvgCryingboy from "../Images/Cryingboy";

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
const ImageContainer = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50vh;
`

class ErrorHandler extends Component {

    componentDidMount() {
        if (this.props.error.length !== 0) {
            this.highlightCode();
        }
    }

    componentWillUnmount() {
        this.clearHighlightedCode()
    }

    highlightCode = () => {
        const line = this.props.error[0].tag.line - 1;
        let cm = this.props.cm.current;
        if (cm) {
            const lineLength = cm.editor.getLine(line).length;
            cm.editor.doc.markText({line, ch: 0}, {line, ch: lineLength}, {
                className: 'highlighted-code'
            });
        }
    };

    clearHighlightedCode = () => {
        let cm = this.props.cm.current;
        cm && cm.editor.doc.getAllMarks().forEach((m) => {
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
                <ImageContainer>
                    <SvgCryingboy/>
                </ImageContainer>
            </ErrorPageContainer>
        );
    }
}

export default ErrorHandler;