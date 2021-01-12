import {cloneDeep} from 'lodash';

import React, { Component } from 'react';

import SineCurve from 'model/SineCurve';
import TimePlot from 'components/TimePlot';
import { addSamples } from 'util/samples';

import {Sample, TimeValue} from 'model/types';
import {Context, Hint, KeyIdea, ScenarioLink, Topic, Visualization} from 'components/stateless-helpers';
import FrequencyDomainControl from '../components/FrequencyDomainControl';
import { Link } from 'react-router-dom';

type Props = {};

type State = {
    amplitudes: number[];
};

const clearFrequencies = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0];
const justOneFrequencies = [0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0];
const spikyFrequencies =  [0, 0, 1, 0, 0, 1, 0, 0, 1.5, 0, 0, 2, 0, 0, 1, 0, 0, 3, 0, 0];
const oldBeatFrequencies = [0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0];
const flatBeatFrequencies = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, -4, 0 ,0, 0, 0];
const alternatingBeatFrequencies = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 2, -1, 0 ,0, 0];

const examples: { [index: string] : number[]} = {
    alternatingBeatFrequencies,
    clearFrequencies,
    flatBeatFrequencies,
    justOneFrequencies,
    spikyFrequencies,
    oldBeatFrequencies
};

class SumOfManySines extends Component<Props, State> {
    state = {
        amplitudes: cloneDeep(justOneFrequencies),
        logMessage: '',
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
        const plotAmplitude = 10;
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
                            The simplest example
                            <ScenarioLink index="justOne" onClick={this.onExample}>
                                is a single non-zero amplitude
                            </ScenarioLink>
                        </li>
                        <li>
                            A mixture of frequencies at regular intervals produces a
                            <ScenarioLink index="spiky" onClick={this.onExample}>
                                very spiky curve
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
                    <div>
                        <TimePlot values={combined} width={800} height={400} minY={-plotAmplitude} maxY={plotAmplitude}/>
                    </div>
                    <div>
                        <FrequencyDomainControl
                          amplitudes={this.state.amplitudes}
                          maxAmplitude={controlAmplitude}
                          onChange={this.onChange}
                        />
                    </div>
                </Visualization>
                <Context>
                    <h3>Things to Try</h3>
                    A harmonic series is made up of sine curves whose frequencies are integer multiples of a fundamental frequency.
                    <Hint text="Focus on the fundamental frequency">
                        Can you make a harmonic series that repeats 4 times a second? Or 5?
                    </Hint>
                    <h3>Why Bother?</h3>
                    <div>
                        As we discussed in the previous page on the <Link to="/add-sines">addition of sine curves</Link>,
                        creating complicated curves from simple sines allows us to communicate in the real world.
                    </div>
                    <KeyIdea>
                        Any periodic function can be represented by the sum of sine curves, provided you use enough of them.
                        Fourier analysis is the branch of mathematics that is dedicated to the tricky bit of calculating
                        the right amplitudes
                    </KeyIdea>
                </Context>
            </Topic>
        );
    };
}

export default SumOfManySines;
