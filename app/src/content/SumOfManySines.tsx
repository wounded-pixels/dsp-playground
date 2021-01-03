import {cloneDeep} from 'lodash';

import React, { Component } from 'react';

import SineCurve from 'model/SineCurve';
import TimePlot from 'components/TimePlot';
import { addSamples } from 'util/samples';

import {Sample, TimeValue} from 'model/types';
import {Context, Row, ScenarioLink, Topic, Visualization} from 'components/stateless-helpers';
import FrequencyDomainControl from '../components/FrequencyDomainControl';

type Props = {};

type State = {
    amplitudes: number[];
};

const clearFrequencies = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0];
const justOneFrequencies = [0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0];
const sharpFrequencies =  [0, 0, 4, 0, 0, 2, 0, 0, 1, 0, 0, 0.5, 0, 0, 0, 0, 0, 0, 0, 0];
const oldBeatFrequencies = [0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0];
const flatBeatFrequencies = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, -4, 0 ,0, 0, 0];
const alternatingBeatFrequencies = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 2, -1, 0 ,0, 0];

const examples: { [index: string] : number[]} = {
    alternatingBeatFrequencies,
    clearFrequencies,
    flatBeatFrequencies,
    justOneFrequencies,
    sharpFrequencies,
    oldBeatFrequencies
};

class SumOfManySines extends Component<Props, State> {
    state = {
      amplitudes: cloneDeep(justOneFrequencies)
    };

    onExample = (rawKey: string) => {
        const key = rawKey + 'Frequencies';
        if (examples[key]) {
            this.setState({amplitudes: cloneDeep(examples[key])});
        } else {
            this.setState({amplitudes: cloneDeep(oldBeatFrequencies)});
        }
    }

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
                    Each slider allows you to change the amplitude of a sine at that frequency.
                    <ul>
                        <li>
                            The
                            <ScenarioLink index="justOne" onClick={this.onExample}> simplest example</ScenarioLink>
                            is a single non-zero amplitude
                        </li>
                        <li>
                            A mixture of frequencies at regular intervals produces a
                            <ScenarioLink index="sharp" onClick={this.onExample}>
                                very sharp curve
                            </ScenarioLink>
                        </li>
                        <li>
                            A mixture of curves with similar frequencies produces a
                            <ScenarioLink index="beat" onClick={this.onExample}>
                                wave of waves
                            </ScenarioLink>
                            or beat. You may recall this combination from the previous page
                        </li>
                        <li>
                            If you use three curves and are willing to go negative for one you can get a
                            beat with a
                            <ScenarioLink index="flatBeat" onClick={this.onExample}>
                                flattened top and bottom
                            </ScenarioLink>
                        </li>
                        <li>
                            With a gap between the primary frequencies you can get alternating
                            <ScenarioLink index="alternatingBeat" onClick={this.onExample}>
                                long and short beats
                            </ScenarioLink>
                        </li>
                        <li>
                            You may want to
                            <ScenarioLink index="clear" onClick={this.onExample}>
                            clear all frequencies
                            </ScenarioLink>
                        </li>
                    </ul>
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
