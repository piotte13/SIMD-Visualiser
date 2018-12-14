import React, {Component} from 'react';
import Ret from "../ASMComponents/ret";
import UnsupportedCommand from "../ASMComponents/UnsupportedCommand";
import Function from "../ASMComponents/Function";
import SequentialComponent from "../ASMComponents/SequentialComponent";
import styled from "styled-components";
import {Row, Col, Button, Container} from 'reactstrap';
import '../css/ASMVisualizer.css'
import Shift from "../ASMComponents/Shift";
import Arithmetic from "../ASMComponents/Arithmetic";


const ButtonContainer = styled.div`
    text-align: center;
`

const AnimationContainer = styled.div`
   overflow: auto;
   height: calc(100% - 40px);
`

function commandFactory(c) {
    switch (c.name) {
        case "vpslldq":
            return <Shift direction="left" bitWidth={8}/>;
        case "vpsrldq":
            return <Shift direction="right" bitWidth={8}/>;
        case "vpaddd":
            return <Arithmetic operation={"add"} bitWidth={32}/>;
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
        this.props.cm.current.editor.doc.getAllMarks().forEach((m) => {
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

    // forward() {
    //     this.setState({idx: this.state.idx + 1});
    //     //this.componentDonePlaying(this.state.idx - 1);
    // }

    // backward() {
    //     this.setState({idx: this.state.idx - 1});
    //     setTimeout(() => {
    //         this.componentDonePlaying(this.state.idx);
    //     })
    // }

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
            buttons.push({icon: <i className="fas fa-pause"></i>, onClick: this.pause.bind(this)})
            :
            buttons.push({icon: <i className="fas fa-play"></i>, onClick: this.play.bind(this)});

        //buttons.push(<FontAwesomeIcon icon="forward" onClick={this.forward.bind(this)}/>);
        buttons.push({icon: <i className="fas fa-sync-alt"></i>, onClick: this.restart.bind(this)});

        return (
            <Container>
                <Row>
                    {
                        buttons.map((button, i) => (
                            <Col key={i}>
                                <ButtonContainer>
                                    <Button color="primary" outline onClick={button.onClick}
                                            className={'playback-button'}>
                                        {button.icon}
                                    </Button>
                                </ButtonContainer>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        )
    };

    render() {
        return (
            this.props.asm.length > 0 ?
                <div style={{"height": "inherit"}}>

                {this.getButtons(this.state.play)}
                    <AnimationContainer>
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
                    </AnimationContainer>
            </div>
                :
                []
        );
    }
}

export default AsmVisualizer;