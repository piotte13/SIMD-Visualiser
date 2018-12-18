import React, {Component} from 'react';
import styled from 'styled-components'
import {
    Button, Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle, Row, Col, Container, ButtonGroup
} from 'reactstrap';
import * as _ from "lodash";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import * as Registry from "../Utils/Registry";

const PageContainer = styled.div`
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
        
        .row{
            margin-bottom: 10px;
        }
    
`

const RandomizeButton = styled.div`
    float: right;
    cursor: pointer;
    color: var(--one);
    font-size: 1.7rem;
`

const VectorContainer = styled(Container)`
    width: 96% !important;
    height: 50px;
    background-color: var(--main);
    border-radius: 3px;
    //margin: 0 2%;
    box-shadow: 3px 3px 2px rgba(0,0,0,.4);
    
    .row{
        height: 100%;
    
        .col{
            text-align: center;
            padding: 0;
            
            input{
                width: 100%;
                height: 100%;
                color: var(--clear-text-color);
                text-align: center;
                border-radius: 0;
                border: none;
                background-color: inherit;
                border-right: solid 1px var(--gray);
            }
            
            :last-child input{
                    border-right: none;
                }
        }
    }
}
`;

export default class ParametersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeList: new Array(props.asm.length)
        }
        console.log(this.props.asm)
    }

    componentDidMount() {

    }

    getSliderMarks(paramBitLen) {
        const minLaneWidth = 4;
        const maxLaneWidth = _.min([paramBitLen, 64]);
        const nbOfMarks = Math.log(maxLaneWidth) / Math.log(2) - 1;
        let marks = {};
        _.times(nbOfMarks).forEach(i => {
            const percentage = 100 * (i + 1) / nbOfMarks;
            marks[percentage] = Math.pow(2, i + 2);
        });

        return marks
    };

    onTypeChange(selected, functionNumber, paramNumber) {
        this.props.asm[functionNumber].params[paramNumber].type = selected;
        this.forceUpdate();
    }

    onWidthChange(newWidth, functionNumber, paramNumber) {
        const bitLen = this.props.asm[functionNumber].params[paramNumber].bitWidth *
            this.props.asm[functionNumber].params[paramNumber].lanes;
        this.props.asm[functionNumber].params[paramNumber].bitWidth = newWidth;
        this.props.asm[functionNumber].params[paramNumber].lanes = bitLen / newWidth;
        this.forceUpdate();
    }

    onBaseChange(selected, functionNumber, paramNumber) {
        this.props.asm[functionNumber].params[paramNumber].base = selected;
        this.forceUpdate();
    }

    onVectorValueChange(val) {
        //console.log(val);
    }

    buildContent() {
        let content = [];
        this.props.asm.forEach((func, i) => {
            content.push(
                <FunctionContainer key={i}>
                    <FunctionName>{func.name}</FunctionName>
                    <hr/>
                    {
                        func.params.map((param, j) => {
                            const paramBitLen = param.bitWidth * param.lanes;
                            const marks = this.getSliderMarks(paramBitLen);
                            //const registry = Registry.default;

                            return <ParameterContainer key={j}>
                                <Card>
                                    <CardBody>
                                        <CardTitle>
                                            {`Parameter ${j + 1}:`}&nbsp;&nbsp;
                                            <strong>{`${paramBitLen} bits`}</strong>
                                            <RandomizeButton><i className="fas fa-dice"></i></RandomizeButton>
                                        </CardTitle>
                                    </CardBody>
                                    <VectorContainer>
                                        <Row>
                                            {
                                                _.times(param.lanes).map(i => (
                                                    <Col>
                                                        <input type="text"
                                                               value={_.padStart(i + 1, param.bitWidth / 4, '0')}
                                                               onChange={this.onVectorValueChange}/>
                                                    </Col>
                                                ))
                                            }
                                        </Row>
                                    </VectorContainer>
                                    <CardBody>
                                        <Container>
                                            <Row>
                                                <Col xs="3" sm="2">Lane Width: &nbsp;</Col>
                                                <Col>
                                                    <Slider style={{margin: "20px auto"}}
                                                            handleStyle={{
                                                                height: 20,
                                                                width: 20,
                                                                marginLeft: -10,
                                                                marginTop: -8,
                                                            }}
                                                            min={0}
                                                            defaultValue={_.invert(marks)[param.bitWidth]}
                                                            marks={marks}
                                                            step={null}
                                                            onChange={(val) => this.onWidthChange(marks[val], i, j)}/>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="3" sm="2">Type: </Col>
                                                <Col>
                                                    <ButtonGroup>
                                                        <Button color="info"
                                                                onClick={() => this.onTypeChange('int', i, j)}
                                                                active={param.type === 'int'}>Integer</Button>
                                                        <Button color="info"
                                                                onClick={() => this.onTypeChange('float', i, j)}
                                                                active={param.type === 'float'}>Floating Point</Button>
                                                    </ButtonGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="3" sm="2">Base: </Col>
                                                <Col>
                                                    <ButtonGroup>
                                                        <Button color="info"
                                                                onClick={() => this.onBaseChange('binary', i, j)}
                                                                active={param.base === 'binary'}>Binary</Button>
                                                        <Button color="info"
                                                                onClick={() => this.onBaseChange('decimal', i, j)}
                                                                active={param.base === 'decimal'}>Decimal</Button>
                                                        <Button color="info"
                                                                onClick={() => this.onBaseChange('hexadecimal', i, j)}
                                                                active={param.base === 'hexadecimal'}>Hexadecimal</Button>
                                                    </ButtonGroup>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </CardBody>
                                </Card>
                            </ParameterContainer>
                        })
                    }
                </FunctionContainer>
            )
        });

        return content;
    }

    render() {
        const {asm, onComplete} = this.props;
        console.log(asm);
        return (
            <PageContainer>
                <Title>Choose your parameters</Title>
                {
                    this.buildContent()
                }
                <SubmitButton>
                    <Button color="info" onClick={onComplete}>Let's go</Button>
                </SubmitButton>
            </PageContainer>
        )
    }
}