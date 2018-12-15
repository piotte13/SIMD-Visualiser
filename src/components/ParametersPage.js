import React, {Component} from 'react';
import styled from 'styled-components'
import {
    Button, Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle
} from 'reactstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

const Container = styled.div`
    padding: 50px;
    
`

const Title = styled.div`
    font-size: 60px;
    font-weight: 700;
    color: rgb(72, 72, 72);
    margin-bottom: 15px;
    text-align: center;
`

const SubmitButton = styled.div`
    position: absolute;
    bottom: 50px;
    left: 75%;
`
const FunctionContainer = styled.div`

`
const FunctionName = styled.div`
    text-align: center;
    margin-top: 50px;
    font-size: 32px;
    font-weight: normal;
    color: rgb(72, 72, 72);
`

const ParameterContainer = styled.div`
    padding: 20px 0;
    
    .card-title {
        margin-bottom: 0;
        height: 100%;
        line-height: 1.7rem;
    }
    
    .card-body{
        padding: 1rem;
    }
`

const RandomizeButton = styled.div`
    float: right;
    cursor: pointer;
    color: var(--one);
    font-size: 1.7rem;
`

const VectorContainer = styled.div`
    width: 96%;
    height: 50px;
    background-color: var(--main);
    border-radius: 3px;
    margin: 0 2%;
    box-shadow: 3px 3px 2px rgba(0,0,0,.4);
}
`;

export default class ParametersPage extends Component {
    constructor() {
        super();

    }

    componentDidMount() {

    }

    buildContent() {
        let content = [];
        this.props.asm.forEach((func, i) => {
            content.push(
                <FunctionContainer key={i}>
                    <FunctionName>{func.name}</FunctionName>
                    <hr/>
                    {
                        func.params.map((param, i) =>
                            <ParameterContainer key={i}>
                                <Card>
                                    <CardBody>
                                        <CardTitle>
                                            {`Parameter ${i + 1}:`}&nbsp;&nbsp;
                                            <strong>{`${param.bitWidth * param.lanes} bits`}</strong>
                                            <RandomizeButton><i className="fas fa-dice"></i></RandomizeButton>
                                        </CardTitle>
                                    </CardBody>
                                    <VectorContainer/>
                                    <CardBody>
                                        <CardText>
                                            <Slider style={{margin: "20px auto"}}
                                                    handleStyle={{
                                                        height: 20,
                                                        width: 20,
                                                        marginLeft: -10,
                                                        marginTop: -8,
                                                    }}
                                                    min={0}
                                                    defaultValue={param.bitWidth}
                                                    marks={{20: 4, 40: 8, 60: 16, 80: 32, 100: 64}}
                                                    step={null}/>
                                        </CardText>

                                    </CardBody>
                                </Card>
                            </ParameterContainer>
                        )
                    }
                </FunctionContainer>
            )
        });

        return content;
    }

    render() {
        const {asm, onComplete} = this.props;
        return (
            <Container>
                <Title>Choose your parameters</Title>
                {
                    this.buildContent()
                }
                <SubmitButton>
                    <Button color="info" onClick={onComplete}>Let's go</Button>
                </SubmitButton>
            </Container>
        )
    }
}