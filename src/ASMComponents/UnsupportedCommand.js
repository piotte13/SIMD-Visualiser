import React, {Component} from "react";

export default class UnsupportedCommand extends Component {

    render() {
        return (
            <div>Unsupported Command: "{this.props.name}"</div>
        );
    }
}