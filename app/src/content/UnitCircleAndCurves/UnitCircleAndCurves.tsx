import React, { Component } from 'react';

import {Context, Row, ScrollToTopOnMount, Topic, Visualization} from 'components/stateless-helpers';
import UnitCircleControl from './UnitCircleControl';
import AnnotatedCurveControl from './AnnotatedCurveControl';

type Props = {};

type State = {};

const clampPiRatio = (raw: number): number =>  {
    const clamped = raw < 0 ? raw + 2 : raw;
    return Math.round(clamped * 100)/100;
};

class UnitCircleAndCurves extends Component<Props, State> {
    state = {
        piRatio: 0.25,
    };

    onChangePiRatio = (piRatio: number) => {
        this.setState({piRatio: clampPiRatio(piRatio)});
    };

    render(): JSX.Element {
        return (
            <Topic>
                <ScrollToTopOnMount />
                <h2>Sine, Cosine, and the Unit Circle</h2>
                <Context>
                </Context>
                <Visualization>
                    <Row>
                        <AnnotatedCurveControl onChange={this.onChangePiRatio} piRatio={this.state.piRatio} yFunction={Math.sin}/>
                        <UnitCircleControl onChange={this.onChangePiRatio} piRatio={this.state.piRatio}/>
                    </Row>
                    <Row>
                        <AnnotatedCurveControl onChange={this.onChangePiRatio} piRatio={this.state.piRatio} yFunction={Math.cos}/>
                    </Row>

                </Visualization>
                <Context>
                </Context>
                <Context>
                    <h3>Next Steps</h3>
                    <div>
                    </div>
                </Context>
            </Topic>
        );
    };
}
export default UnitCircleAndCurves;