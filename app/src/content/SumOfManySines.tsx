import {cloneDeep} from 'lodash';

import React, { Component } from 'react';

import SineCurve from 'model/SineCurve';
import TimePlot from 'components/TimePlot';
import { addSamples } from 'util/samples';

import {Sample, TimeValue} from 'model/types';
import {Context, Hint, KeyIdea, Row, ScenarioLink, Symbol, Topic, Visualization} from 'components/stateless-helpers';
import { Link } from 'react-router-dom';
import FrequencyDomainControl from '../components/FrequencyDomainControl';

type Props = {};

type State = {
    amplitudes: number[];
};

class SumOfManySines extends Component<Props, State> {
    state = {
      amplitudes: [0, 0, 4, 0, 0, 2, 0, 0, 1, 0, 0, 0.5, 0, 0, 0, 0, 0, 0, 0, 0],
    };

    onChange = (frequencyIndex: number, value: number) => {
      const amplitudes = [...this.state.amplitudes];
      amplitudes[frequencyIndex] = value;
      this.setState({amplitudes});
    };

    render(): JSX.Element {
        const plotAmplitude = 8;
        const controlAmplitude = 4;
        const samplingRate = 600;
        const tEnd = 5;

        const curves: SineCurve[] = this.state.amplitudes.map((amplitude, index) => {
           return new SineCurve({amplitude, frequency: index + 1});
        });

        const samples: TimeValue[][] = curves.map((curve: SineCurve) => curve.sample(0, tEnd, samplingRate));
        const combined: Sample = addSamples(...samples)
        return (
            <Topic>
                <h2>Sum of Many Sines</h2>
                <Context>
                    la la la
                </Context>
                <Visualization>
                    <Row>
                        <TimePlot values={combined} width={600} height={200} minY={-plotAmplitude} maxY={plotAmplitude}/>
                    </Row>
                    <Row>
                        <FrequencyDomainControl
                          amplitudes={this.state.amplitudes}
                          maxAmplitude={controlAmplitude}
                          onChange={this.onChange}/>
                    </Row>
                </Visualization>
            </Topic>
        );
    };
}

export default SumOfManySines;
