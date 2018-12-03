import React, {Component} from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/addon/selection/mark-selection.js'
import '../css/App.css';
import styled from 'styled-components'
import ButtonPanel from "./ButtonPanel";
import {generateASM, generateAST} from "../Utils/Parser";
import WaitingScreen from "./WaitingScreen";
import AstVisualizer from "./ASTVisualizer";
import FrontPage from "./FrontPage";
import {compile} from "../Utils/Compiler";
import ErrorHandler from "./ErrorHandler";
import {Pane, Tabs} from "../Utils/Tabs";
import AsmVisualizer from "./ASMVisualizer";

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
    constructor(props) {
        super(props);
        let savedState = localStorage.getItem('app-state');
        if (savedState) {
            this.state = JSON.parse(savedState);
        }
        else {
            this.state = {
                code: `#include <x86intrin.h>\n\n__m128i PrefixSum(__m128i curr) {\n  __m128i Add = _mm_slli_si128(curr, 4); \n  curr = _mm_add_epi32(curr, Add);   \n  Add = _mm_slli_si128(curr, 8);    \n  return _mm_add_epi32(curr, Add);       \n}`,
                codeWasModifiedSinceLastCompile: true,
                disableButtons: false,
                status: 'compiles',
                compiling: false,
                ast: {},
                clangAst: {},
                asm: [],
                error: [],
            };
        }

        this.frontPage = <FrontPage/>;
        this.waitingScreen = <WaitingScreen/>;
        this.asmVisualizer = null
        this.astVisualizer = null;
    }

    handleClear = (clearCode = true) => {
        this.setState(({code}) => ({
            code: clearCode === true ? '' : code
        }));
    };

    visualize = () => {
        this.setState({compiling: true});
        if (this.state.codeWasModifiedSinceLastCompile) {
            this.setState({ast: generateAST(this.cm.editor)});
            compile(this.cm.editor.getValue(), (error, asm, ast) => {
                if (error.length === 0) {
                    asm = generateASM(asm);
                    this.setState({
                        compiling: false,
                        status: 'compiles',
                        error,
                        clangAst: ast,
                        asm,
                        codeWasModifiedSinceLastCompile: false
                    });
                }
                else {
                    this.setState({compiling: false, status: 'error', error, clangAst: {}, asm: {}});
                }
            })
        }
        else this.setState({compiling: false});
    };

    componentDidMount() {
        if (this.state.asm.length > 0) {
            console.log("hello")
            this.asmVisualizer = <AsmVisualizer cm={this.cm} asm={this.state.asm}/>;
        }
        if (this.state.ast) {
            this.astVisualizer = <AstVisualizer cm={this.cm} ast={this.state.ast}/>;
        }
    }


    componentWillUpdate(nextProps, nextState) {
        if (nextState.asm !== this.state.asm) {
            this.asmVisualizer = <AsmVisualizer cm={this.cm} asm={nextState.asm}/>;
        }
        if (nextState.ast !== this.state.ast) {
            this.astVisualizer = <AstVisualizer cm={this.cm} ast={nextState.ast}/>;
        }
        localStorage.setItem("app-state", JSON.stringify(nextState));
    }

    serialize = () => {

    };

    restart = () => {
        this.asmVisualizer = null;
        this.astVisualizer = null;
        this.setState({
            compiling: false,
            codeWasModifiedSinceLastCompile: true,
            ast: {},
            clangAst: {},
            asm: [],
            error: [],
        });
    };

    render() {
        const {code, disableButtons, status, compiling} = this.state;
        let rightPage = this.frontPage;
        if (compiling) {
            rightPage = this.waitingScreen;
        }
        else if (this.state.error.length > 0) {
            rightPage = <ErrorHandler cm={this.cm} error={this.state.error}/>
        }
        else if (this.asmVisualizer && this.astVisualizer && this.state.asm.length > 0) {
            rightPage = <Tabs selected={0}>
                <Pane label="Graphical">
                    {this.asmVisualizer}
                </Pane>
                <Pane label="AST">
                    {this.astVisualizer}
                </Pane>
            </Tabs>
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
                            this.setState({codeWasModifiedSinceLastCompile: true});
                            if (code === '') {
                                this.handleClear(true)
                            } else {
                                this.setState({code});
                                //this.myInterpreter = getInterpreter(code)
                            }
                        }}
                        onPaste={() => {
                            this.setState({codeWasModifiedSinceLastCompile: true});
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
