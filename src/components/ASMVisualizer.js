import React, {Component} from 'react';
import Vpslldq from "../ASMComponents/vpslldq";
import Vpaddd from "../ASMComponents/vpaddd";
import Vpsrldq from "../ASMComponents/vpsrldq";
import Ret from "../ASMComponents/ret";
import UnsupportedCommand from "../ASMComponents/UnsupportedCommand";
import Function from "../ASMComponents/Function";
import SequentialComponent from "../ASMComponents/SequentialComponent";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import styled from "styled-components";
import {Row, Col, Button} from 'reactstrap';
import '../css/ASMVisualizer.css'


const ButtonContainer = styled.div`
    text-align: center;
`


function commandFactory(c) {
    switch (c.name) {
        case "vpsrldq":
            return <Vpsrldq />;
        case "vpslldq":
            return <Vpslldq />;
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

    componentDidMount() {
        this.props.cm.editor.doc.getAllMarks().forEach((m) => {
            m.clear()
        })
    }

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

    componentDonePlaying(key) {
        if (this.state.play) {
            let increment = key === this.state.idx ? 1 : 0;
            this.setState({idx: this.state.idx + increment});
        }
    }

    play() {
        // if (!this.state.play) {
        //     this.setState({idx: this.state.idx + 1});
        // }
        this.setState({play: true})
    }

    pause() {
        this.setState({play: false})
    }

    forward() {
        this.setState({idx: this.state.idx + 1});
        //this.componentDonePlaying(this.state.idx - 1);
    }

    backward() {
        this.setState({idx: this.state.idx - 1});
        setTimeout(() => {
            this.componentDonePlaying(this.state.idx);
        })
    }

    restart() {
        this.setState({idx: -1});
        setTimeout(() => {
            this.setState({play: true});
            this.componentDonePlaying(-1);
        })
    }

    getButtons = (play) => {
        let buttons = [];
        //buttons.push(<FontAwesomeIcon icon="backward" onClick={this.backward.bind(this)}/>);

        play === true ?
            buttons.push({icon: <FontAwesomeIcon icon="pause"/>, onClick: this.pause.bind(this)})
            :
            buttons.push({icon: <FontAwesomeIcon icon="play"/>, onClick: this.play.bind(this)});

        //buttons.push(<FontAwesomeIcon icon="forward" onClick={this.forward.bind(this)}/>);
        buttons.push({icon: <FontAwesomeIcon icon="sync-alt"/>, onClick: this.restart.bind(this)});

        return (
            <Row>
                {
                    buttons.map((button, i) => (
                        <Col key={i}>
                            <ButtonContainer>
                                <Button outline color="primary" onClick={button.onClick} className={'playback-button'}>
                                    {button.icon}
                                </Button>
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

                {this.getButtons(this.state.play)}

                {
                    this.buildGraphicStack().map((func, index) => (
                        <SequentialComponent
                            key={index}
                            index={index}
                            component={func}
                            play={this.state.play}
                            shouldBeVisible={this.state.idx >= index}
                            onComplete={this.componentDonePlaying.bind(this)}
                            cm={this.props.cm}
                        />
                    ))
                }
            </div>
        );
    }
}

export default AsmVisualizer;