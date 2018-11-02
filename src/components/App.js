import React, {Component} from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/addon/selection/mark-selection.js'
import '../css/App.css';
import styled from 'styled-components'
import ButtonPanel from "./ButtonPanel";
import {generateAST} from "../Utils/Parser";
import WaitingScreen from "./WaitingScreen";
import AstVisualizer from "../Utils/ASTVisualizer";
import FrontPage from "./FrontPage";

const Container = styled.div`
  display: flex;
`

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh
  width: 50vw;
  overflow: scroll;
`

const RightContainer = styled.div`
  width: 50vw;
  height: 100vh;
  overflow: hidden;
`

class App extends Component {
    state = {
        code: 'int32_t a = g(k);\nint32_t b = 600;\nint32_t c = a + b;',
        disableButtons: false,
        status: 'compiles',
        compiling: false,
        ast: {}
    };

    constructor(props) {
        super(props)
        this.frontPage = <FrontPage/>;
        this.waitingScreen = <WaitingScreen/>;
    }

    componentDidMount() {
    }

    handleClear = (clearCode = true) => {
        this.setState(({code}) => ({
            code: clearCode === true ? '' : code
        }));
    };

    visualize = () => {
        this.setState({compiling: true});
        let ast = generateAST(this.cm.editor);
        this.setState({compiling: false, ast});
    };

    serialize = () => {

    };

    restart = () => {
        this.setState({compiling: false, ast: {}});
    };

    render() {
        const {code, disableButtons, status, compiling} = this.state;
        let rightPage = this.frontPage;
        if (compiling) {
            rightPage = this.waitingScreen;
        }
        else if (Object.keys(this.state.ast).length > 0) {
            rightPage = <AstVisualizer cm={this.cm} ast={this.state.ast}/>;
        }

        return (
            <Container>
                <LeftContainer>
                    <ButtonPanel
                        visualize={this.visualize}
                        serialize={this.serialize}
                        restart={this.restart}
                        disabled={disableButtons}
                        status={status}
                    />
                    <CodeMirror
                        ref={(cm) => this.cm = cm}
                        value={code}
                        options={{
                            mode: 'text/x-csrc',
                            theme: 'material',
                            lineNumbers: true,
                            lineWrapping: true,
                            gutters: ["CodeMirror-lint-markers"],
                        }}
                        onBeforeChange={(editor, data, code) => {
                            if (code === '') {
                                this.handleClear(true)
                            } else {
                                this.setState({code})
                                //this.myInterpreter = getInterpreter(code)
                            }
                        }}
                        onPaste={() => {
                            this.handleClear(false)
                        }}
                    />
                </LeftContainer>
                <RightContainer>
                    {rightPage}
                </RightContainer>
            </Container>
        );
    }
}

export default App;
