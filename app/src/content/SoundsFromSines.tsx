import {cloneDeep} from 'lodash';

import React, { Component } from 'react';

import SineCurve from 'model/SineCurve';

import FrequencyDomainControl from 'components/FrequencyDomainControl';
import FrequencyDomainPlayer from 'components/FrequencyDomainPlayer';
import TimePlot from 'components/TimePlot';

import { addSamples } from 'util/samples';

import {Sample, TimeValue} from 'model/types';
import {
    Context,
    ScenarioLink,
    ScrollToTopOnMount,
    Topic,
    Visualization
} from 'components/stateless-helpers';


type Props = {};

type State = {
    amplitudes: number[];
};

const frequencies = [250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 2200];
const clearFrequencies = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0];
const justOneFrequencies = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0];

const examples: { [index: string] : number[]} = {
    clearFrequencies,
    justOneFrequencies,
};

class SoundsFromSines extends Component<Props, State> {
    state = {
        amplitudes: cloneDeep(justOneFrequencies),
    };

    onExample = (rawKey: string) => {
        const key = rawKey + 'Frequencies';
        if (examples[key]) {
            this.setState({amplitudes: cloneDeep(examples[key])});
        } else {
            this.setState({amplitudes: cloneDeep(justOneFrequencies)});
        }
    }

    onChange = (frequencyIndex: number, value: number) => {
        const amplitudes = [...this.state.amplitudes];
        amplitudes[frequencyIndex] = value;
        this.setState({amplitudes});
    };

    render(): JSX.Element {
        const plotAmplitude = 10;
        const controlAmplitude = 1;
        const samplingRate = 15000;
        const tEnd = 0.020;

        const curves: SineCurve[] = this.state.amplitudes.map((amplitude, index) => {
            return new SineCurve({amplitude, frequency: frequencies[index]});
        });

        const samples: TimeValue[][] = curves.map((curve: SineCurve) => curve.sample(0, tEnd, samplingRate));
        const combined: Sample = addSamples(...samples)
        return (
            <Topic>
                <ScrollToTopOnMount />
                <h2>Sounds from Sines</h2>
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
                        <FrequencyDomainPlayer amplitudes={this.state.amplitudes} frequencies={frequencies} maxAmplitude={controlAmplitude}/>
                    </div>
                    <div>
                        <FrequencyDomainControl
                            amplitudes={this.state.amplitudes}
                            frequencies={frequencies}
                            maxAmplitude={controlAmplitude}
                            onChange={this.onChange}
                        />
                    </div>
                </Visualization>
                <Context>
                    <h3>Things to Try</h3>
                    TBD
                    <h3>Why Bother?</h3>
                    TBD
                    <div>
                    </div>
                </Context>
            </Topic>
        );
    };
}

export default SoundsFromSines;
