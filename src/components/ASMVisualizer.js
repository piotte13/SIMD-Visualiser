import React, {Component} from 'react';
import Vpslldq from "../ASMComponents/vpslldq";
import Vpaddd from "../ASMComponents/vpaddd";
import Ret from "../ASMComponents/ret";
import UnsupportedCommand from "../ASMComponents/UnsupportedCommand";
import Function from "../ASMComponents/Function";
import SequentialComponent from "../ASMComponents/SequentialComponent";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import styled from "styled-components";
import {Row, Col} from 'reactstrap';


const ButtonContainer = styled.div`
    text-align: center;
`


function commandFactory(c) {
    switch (c.name) {
        case "vpslldq":
            return <Vpslldq/>;
        case "vpaddd":
            return <Vpaddd/>;
        case "ret":
            return <Ret/>;
        default:
            return <UnsupportedCommand/>
    }
}

class AsmVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idx: 0,
            play: true,
            restart: false
        };

    }

    highlightCode(line) {
        const lineLength = this.props.cm.editor.getLine(line).length;
        this.props.cm.editor.doc.markText({line, ch: 0}, {line, ch: lineLength}, {
            className: 'highlighted-code'
        });
    };

    clearHighlightedCode() {
        this.props.cm.editor.doc.getAllMarks().forEach((m) => {
            m.clear()
        })
    };

    buildGraphicStack = () => {
        let stack = [];
        this.props.asm.forEach((func) => {
            let commands = func.body;
            stack.push(<Function name={func.name}/>);
            commands.forEach(c => {
                let command = commandFactory(c);
                stack.push(
                    //c.line - 1 because line number starts at 1 and we need to start at 0.
                    React.cloneElement(command, {name: c.name, params: c.params, line: c.line - 1})
                );
            });
        });
        return stack;
    };

    componentDonePlaying(isReverse = false) {
        if (this.state.play) {
            let increment = isReverse ? -1 : 1;
            this.setState({idx: this.state.idx + increment});
        }
    }

    play() {
        if (!this.state.play) {
            this.setState({idx: this.state.idx + 1});
        }
        this.setState({play: true})
    }

    pause() {
        this.setState({play: false})
    }

    forward() {
        this.setState({idx: this.state.idx + 1});
    }

    backward() {
        this.setState({idx: this.state.idx - 1});
    }

    restart() {
        this.setState({idx: -1});
        setTimeout(() => {
            this.setState({play: true});
            this.componentDonePlaying();
        })
    }

    getButtons = () => {
        let buttons = [];
        buttons.push(<FontAwesomeIcon icon="backward" onClick={this.backward.bind(this)}/>);
        buttons.push(<FontAwesomeIcon icon="pause" onClick={this.pause.bind(this)}/>);
        buttons.push(<FontAwesomeIcon icon="play" onClick={this.play.bind(this)}/>);
        buttons.push(<FontAwesomeIcon icon="forward" onClick={this.forward.bind(this)}/>);
        buttons.push(<FontAwesomeIcon icon="sync-alt" onClick={this.restart.bind(this)}/>);

        return (
            <Row>
                {
                    buttons.map((button, i) => (
                        <Col key={i}>
                            <ButtonContainer>
                                {button}
                            </ButtonContainer>
                        </Col>
                    ))
                }
            </Row>
        )
    };

    render() {
        return (
            <div>

                {this.getButtons()}

                {
                    this.buildGraphicStack().map((func, index) => (
                        <SequentialComponent
                            key={index}
                            component={func}
                            shouldBeVisible={this.state.idx >= index}
                            onComplete={this.componentDonePlaying.bind(this)}
                            highlightCode={this.highlightCode.bind(this)}
                            clearHighlightedCode={this.clearHighlightedCode.bind(this)}
                        />
                    ))
                }
            </div>
        );
    }
}

export default AsmVisualizer;