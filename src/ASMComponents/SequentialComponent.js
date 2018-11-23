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
                    c.timeline.restart();
                    c.timeline.finished.then(this.props.onComplete);
                }
                else
                    this.props.onComplete()
            }
        });

        if (this.props.shouldBeVisible) {
            this.animeRef.restart()
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.shouldBeVisible && !this.props.shouldBeVisible) {
            this.animeRef.restart();
        }
        if (!nextProps.shouldBeVisible && this.props.shouldBeVisible) {
            this.animeRef.seek(0);
        }
    }

    onEnter = () => {
        if (this.component.current.props.line) {
            this.props.highlightCode(this.component.current.props.line);
        }
        let c = this.component.current;
        if (c && c.timeline) {
            this.isLoop = c.timeline.loop;
            c.timeline.loop = true;
            c.timeline.restart();
        }
    }

    onLeave = () => {
        this.props.clearHighlightedCode(this.component.current.props.line);
        let c = this.component.current;
        if (c && c.timeline) {
            c.timeline.loop = this.isLoop;
            c.timeline.restart();
            c.timeline.seek(Infinity);
        }
    }

    render() {
        return (
            <Container
                ref={this.container}
                onMouseEnter={this.onEnter}
                onMouseLeave={this.onLeave}
            >
                {React.cloneElement(this.props.component, {ref: this.component})}
            </Container>
        );
    }
}
