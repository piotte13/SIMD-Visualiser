import React from "react";
import styled from "styled-components";
import anime from 'animejs';

const Container = styled.div`
  margin: 20px 0;
  opacity: 0;
`

export default class SequentialComponent extends React.Component {

    constructor() {
        super();
        // create li DOM reference
        this.container = React.createRef();
        this.component = React.createRef();
    }


    componentDidMount() {
        this.animeRef = anime({
            targets: this.container.current,
            easing: "easeOutCubic",
            autoplay: false,
            translateY: ['5vh', 0],
            duration: 500,
            delay: 800,
            opacity: 1,
            complete: () => {
                let c = this.component.current;
                if (c && c.timeline) {
                    c.timeline.finished.then(this.props.onComplete);
                    c.timeline.restart();
                }
                else
                    this.props.onComplete()
            }
        });

        if (this.props.shouldPlay) {
            this.animeRef.restart()
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.shouldPlay) {
            this.animeRef.restart();
        }
    }

    render() {
        return (
            <Container ref={this.container}>
                {React.cloneElement(this.props.component, {ref: this.component})}
            </Container>
        );
    }
}
