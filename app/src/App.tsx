import React, { Component } from 'react';
import TimePlot from './components/TimePlot/TimePlot';

import SineCurve from './model/SineCurve';
import { addSamples } from './util/samples';

import Slider from '@material-ui/core/Slider';

import './App.scss';

type CurveParameters = {
    amplitude: number;
};

type Props = {};

type State = {
    curveParameters: CurveParameters[];
};

class App extends Component<Props, State> {
    state = {
        curveParameters: [
            {
                amplitude: 1,
                frequency: 1,
            }
        ]
    };

    onChangeCurveParameter = (curveNumber: number, parameterName: 'amplitude' | 'frequency', value: number) => {
        const state = this.state;
        state.curveParameters[0][parameterName] = value;
        this.setState(state);
    };

    render(): JSX.Element {
        const samplingRate = 400;
        const tEnd = 5;

        const {amplitude, frequency} = this.state.curveParameters[0];
        const slow = new SineCurve(amplitude, frequency)
            .sample(0, tEnd, samplingRate);

        const fast = new SineCurve(0.5, 2)
            .sample(0, tEnd, samplingRate);

        const faster = new SineCurve(0.25, 4)
            .sample(0, tEnd, samplingRate);

        const combined = addSamples(slow, fast, faster);


        return (
            <div className="App">
                <Slider
                    value={this.state.curveParameters[0].amplitude}
                    min={0}
                    max={3}
                    step={0.1}
                    onChange={(_evt, value: number | number[]) => {
                        this.onChangeCurveParameter(0, 'amplitude', value as number);
                    }}
                />
                <Slider
                    value={this.state.curveParameters[0].frequency}
                    min={0}
                    max={3}
                    step={0.1}
                    onChange={(_evt, value: number | number[]) => {
                        this.onChangeCurveParameter(0, 'frequency', value as number);
                    }}
                />
                <TimePlot values={slow}/>
                <TimePlot values={fast}/>
                <TimePlot values={faster}/>
                <TimePlot values={combined}/>
            </div>
        );
    };
};
export default App;
