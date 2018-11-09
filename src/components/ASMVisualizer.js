import React, {Component} from 'react';
import Vpslldq from "../ASMComponents/vpslldq";
import Vpaddd from "../ASMComponents/vpaddd";
import Ret from "../ASMComponents/ret";
import UnsupportedCommand from "../ASMComponents/UnsupportedCommand";
import Function from "../ASMComponents/Function";

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
        this.state = {};
    }

    buildGraphicStack = () => {
        let stack = [];
        this.props.asm.forEach((func, idx) => {
            let commands = func.body;
            let body = [];
            commands.forEach(c => {
                body.push(commandFactory(c))
            });
            stack.push(<Function key={idx} name={func.name} body={body}/>);
        });
        return stack;
    };

    render() {
        return (
            <div>
                {this.buildGraphicStack()}
            </div>
        );
    }
}

export default AsmVisualizer;