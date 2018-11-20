import React, {Component} from 'react';
import Vpslldq from "../ASMComponents/vpslldq";
import Vpaddd from "../ASMComponents/vpaddd";
import Ret from "../ASMComponents/ret";
import UnsupportedCommand from "../ASMComponents/UnsupportedCommand";
import Function from "../ASMComponents/Function";
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
            idx: 0,
            play: true,
            restart: false
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

    componentDonePlaying(isReverse = false) {
        let increment = isReverse ? -1 : 1;
        this.setState({idx: this.state.idx + increment});
    }

    render() {
        return (
            <div>
                <button className="play" onClick={() => this.setState({play: true})}>Play</button>
                <button className="pause" onClick={() => this.setState({play: false})}>Pause</button>
                {
                    this.buildGraphicStack().map((func, index) => (
                        <SequentialComponent
                            key={index}
                            component={func}
                            shouldPlay={this.state.idx === index && this.state.play}
                            onComplete={this.componentDonePlaying.bind(this)}
                        />
                    ))
                }
            </div>
        );
    }
}

export default AsmVisualizer;