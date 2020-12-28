import React, { Component } from 'react';
import TimePlot from './components/TimePlot/TimePlot';
import CurveControls from './components/CurveControls/CurveControls';
import SineCurve from './model/SineCurve';
import { addSamples } from './util/samples';

import {CurveParameters} from './model/types';

import './App.scss';

type Props = {};

type State = {
    curveParameters: CurveParameters[];
};

class App extends Component<Props, State> {
    state = {
        curveParameters: [
            {
                amplitude: 3,
                frequency: 2,
                phase: 0,
            },
            {
                amplitude: 1,
                frequency: 4,
                phase: 0,
            },
            {
                amplitude: 0.5,
                frequency: 9,
                phase: 0,
            }
        ]
    };

    onChangeCurveParameter = (curveNumber: number, parameterName: 'amplitude' | 'frequency' | 'phase', value: number) => {
        const state = this.state;
        state.curveParameters[curveNumber][parameterName] = value;
        this.setState(state);
    };

    render(): JSX.Element {
        const samplingRate = 400;
        const tEnd = 2;

        const {curveParameters} = this.state;
        const slow = new SineCurve(curveParameters[0])
            .sample(0, tEnd, samplingRate);

        const fast = new SineCurve(curveParameters[1])
            .sample(0, tEnd, samplingRate);

        const faster = new SineCurve(curveParameters[2])
            .sample(0, tEnd, samplingRate);

        const combined = addSamples(slow, fast, faster);


        return (
            <div className="App">
                <div className="topic">
                    <div className="row">
                        <CurveControls onChange={this.onChangeCurveParameter} curveNumber={0} curveParameters={this.state.curveParameters[0]}/>
                        <TimePlot minY={-3} maxY={5} values={slow}/>
                    </div>
                    <div className="row">
                        <CurveControls onChange={this.onChangeCurveParameter} curveNumber={1} curveParameters={this.state.curveParameters[1]}/>
                        <TimePlot minY={-3} maxY={5} values={fast}/>
                    </div>
                    <div className="row">
                        <CurveControls onChange={this.onChangeCurveParameter} curveNumber={2} curveParameters={this.state.curveParameters[2]} />
                        <TimePlot minY={-3} maxY={5} values={faster}/>
                    </div>
                    <div className="column">
                        <TimePlot minY={-3} maxY={5} values={combined} plotTitle="All Together" />
                    </div>
                </div>
            </div>
        );
    };
};
export default App;
