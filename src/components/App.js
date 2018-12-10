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
import {createBrowserHistory} from 'history';
import * as qs from 'qs';
import Vector from "../ASMComponents/Vector";
import * as _ from "lodash";
import {TYPE_LENGTH} from "../Utils/Registry";
import anime from 'animejs';


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
        this.history = createBrowserHistory();
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
            visualize: false
        };
        if (this.props.match.params.code) {
            this.state.code = qs.parse(this.props.match.params.code).code
        }
        else if (savedState) {
            this.state = JSON.parse(savedState);
            this.state.visualize = false;
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
            this.setState((state) => {
                Object.keys(state.ast).forEach(k => delete state.ast[k]);
                Object.assign(state.ast, generateAST(this.cm.editor))
            });
            compile(this.cm.editor.getValue(), (error, asm, ast) => {
                if (error.length === 0) {
                    asm = generateASM(asm);
                    this.setState((state) => {
                        state.asm.splice(0, state.asm.length);
                        asm.forEach(e => {
                            state.asm.push(e)
                        });
                        return {
                            compiling: false,
                            status: 'compiles',
                            error,
                            clangAst: ast,
                            codeWasModifiedSinceLastCompile: false,
                            visualize: true
                        }
                    });
                }
                else {
                    this.setState({compiling: false, status: 'error', error, clangAst: {}, asm: {}});
                }
            })
        }
        else this.setState({compiling: false, visualize: true});
    };

    componentDidMount() {
        this.asmVisualizer = <AsmVisualizer cm={this.cm} asm={this.state.asm}/>;
        this.astVisualizer = <AstVisualizer cm={this.cm} ast={this.state.ast}/>;

        let laneLen = this.numbersRef.current.firstChild.width.baseVal.value

        let timeline = anime.timeline({
            easing: "easeOutCubic",
            loop: false,
            autoplay: true
        });

        timeline
            .add({
                targets: this.numbersRef.current,
                translateX: laneLen * 8,
                duration: 2000,
                delay: 300
            })
            .add({
                targets: this.numbersRef.current,
                translateX: -laneLen * 8,
                duration: 2000,
                delay: 300
            });
    }


    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem("app-state", JSON.stringify(nextState));
    }

    restart = () => {
        this.setState((state) => {
            Object.keys(state.ast).forEach(k => delete state.ast[k]);
            state.asm.splice(0, state.asm.length);
            return {
                compiling: false,
                codeWasModifiedSinceLastCompile: true,
                clangAst: {},
                error: [],
                visualize: false
            }
        });
    };

    getShareLink = () => {
        //We need to specify the whole URL since we are in dev and bitly cannot work with localhost links.
        return 'https://piotte13.github.io/SIMD-Visualiser/#/link/' + qs.stringify({code: this.state.code})
        //return window.location.origin + "/link" + qs.stringify(this.state)
    };

    render() {
        const {code, disableButtons, status, compiling} = this.state;

        let rightPage = <Vector
            type="uint"
            bitWidth={8}
            base={16}
            data={
                new Array(16).fill(0).map(() =>
                    _.random(1, 255))
            }
            numbersRef={(ref) => this.numbersRef = ref}
        /> //this.frontPage;
        if (compiling) {
            rightPage = this.waitingScreen;
        }
        else if (this.state.error.length > 0) {
            rightPage = <ErrorHandler cm={this.cm} error={this.state.error}/>
        }
        else if (this.state.visualize) {
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
                        restart={this.restart}
                        getShareLink={this.getShareLink}
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
                            this.history.push(this.history.location.pathname);
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
