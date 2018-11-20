import React from "react";
import styled from "styled-components";
import anime from 'animejs';

const Container = styled.div`
  margin: 20px 0;
  transform: translateY(100vh);
`

export default class SequentialComponent extends React.Component {

    constructor() {
        super();
        // create li DOM reference
        this.container = React.createRef();
    }


    componentDidUpdate() {
        this.animeRef = anime({
            targets: this.container.current,
            translateY: () => {
                if (this.props.status === 'entered') {
                    return ['30vh', '0px'];
                } else if (this.props.status === 'exiting') {
                    return '100vh';
                }
            },
            duration: 1000
        });
    }

    render() {
        console.log(this.props.status);
        return (
            <Container ref={this.container}>
                {this.props.children}
            </Container>
        );
    }
}
