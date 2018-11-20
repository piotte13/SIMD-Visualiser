import React, {Component} from 'react';
import Vpslldq from "../ASMComponents/vpslldq";
import Vpaddd from "../ASMComponents/vpaddd";
import Ret from "../ASMComponents/ret";
import UnsupportedCommand from "../ASMComponents/UnsupportedCommand";
import Function from "../ASMComponents/Function";
import {TransitionGroup, Transition} from 'react-transition-group';
import SequentialComponent from "../ASMComponents/SequentialComponent";


function commandFactory(c) {
    switch (c.name) {
        case "vpslldq":
            return <Vpslldq name={c.name} params={c.params}/>;
        case "vpaddd":
            return <Vpaddd name={c.name} params={c.params}/>;
        case "ret":
            return <Ret name={c.name} params={c.params}/>;
        default:
            return <UnsupportedCommand name={c.name}/>
    }
}

class AsmVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idx: 0
        };

    }

    buildGraphicStack = () => {
        let stack = [];
        this.props.asm.forEach((func) => {
            let commands = func.body;
            stack.push(<Function name={func.name}/>);
            commands.forEach(c => {
                let command = commandFactory(c);
                stack.push(command);
            });
        });
        return stack;
    };

    render() {
        console.log(this.props)
        return (
            <TransitionGroup>
                {
                    this.buildGraphicStack().map((func, index) => (
                        <Transition
                            key={index}
                            timeout={0}
                            appear={true}
                            mountOnEnter
                            unmountOnExit>
                            {
                                (status) => (
                                    <SequentialComponent status={status}>
                                        {func}
                                    </SequentialComponent>
                                )
                            }
                        </Transition>
                    ))
                }
            </TransitionGroup>
        );
    }
}

export default AsmVisualizer;