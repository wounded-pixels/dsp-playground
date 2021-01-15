import React, { Component } from 'react';

import {Context, Row, Topic, Visualization} from 'components/stateless-helpers';
import AnglePlot from '../components/AnglePlot';

type Props = {};

type State = {};
const plotHeight = 150;

class UnitCircleAndCurves extends Component<Props, State> {
    state = {
        piRatio: 0.25,
    };

    onChangePiRatio = (piRatio: number) => {
        this.setState({piRatio});
    };

    render(): JSX.Element {
        return (
            <Topic>
                <h2>Addition of Sine Curves</h2>
                <Context>
                </Context>
                <Visualization>
                    <Row>
                        <AnglePlot width={500} height={plotHeight} piRatio={this.state.piRatio} yFunction={Math.sin}/>
                    </Row>
                    <Row>
                        <AnglePlot width={500} height={plotHeight} piRatio={this.state.piRatio} yFunction={Math.cos}/>
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