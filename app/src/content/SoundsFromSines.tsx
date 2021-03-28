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
const justOneFrequencies = [0, 0.8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0];
const harmonicFrequencies = [0, 1, 0, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0, 0.2, 0, 0, 0 ,0, 0, 0];
const buzzFrequencies = [0.9, 1, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0];
const buzzierFrequencies = [0.3, 0.8, 0.3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0.6, 0.9, 1.0 ,0.6, 0.2, 0];

const examples: { [index: string] : number[]} = {
    clearFrequencies,
    justOneFrequencies,
    harmonicFrequencies,
    buzzFrequencies,
    buzzierFrequencies,
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
                    Each slider allows you to change the amplitude of a sine at that frequency. To hear the sine waves
                    press the Play button below the plot.
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
                        <li>
                            A
                            <ScenarioLink index="harmonic" onClick={this.onExample}>
                                harmonic series
                            </ScenarioLink>
                            is made up of sine curves whose frequencies are integer multiples of a
                            fundamental frequency. Such as 300 Hz, 600 Hz and 900 Hz in which the first frequency,
                            300 Hz, is the fundamental frequency.
                        </li>
                        <li>
                            A
                            <ScenarioLink index="buzz" onClick={this.onExample}>
                                buzzing sound
                            </ScenarioLink>
                            can be produced with sine curves whose frequencies are close together. In this case the
                            silent part of the buzz is the roughly 7 milliseconds in which the waves mostly cancel out.
                            If you make the quiet part longer and increase the amplitude of the loud part then the sound
                            becomes even more
                            <ScenarioLink index="buzzier" onClick={this.onExample}>
                                ticky
                            </ScenarioLink>
                        </li>
                    </ul>
                </Context>
                <Visualization>
                    <TimePlot values={combined} width={800} height={400} minY={-plotAmplitude} maxY={plotAmplitude}/>
                    <FrequencyDomainPlayer amplitudes={this.state.amplitudes} frequencies={frequencies} maxAmplitude={controlAmplitude}/>
                    <FrequencyDomainControl
                        amplitudes={this.state.amplitudes}
                        frequencies={frequencies}
                        maxAmplitude={controlAmplitude}
                        onChange={this.onChange}
                    />
                </Visualization>
                <Context>
                    <h3>Things to Try</h3>
                    <li>
                        Can you make a higher pitched
                        <ScenarioLink index="harmonic" onClick={this.onExample}>
                            harmonic
                        </ScenarioLink>?
                    </li>
                    <li>
                       You can make a harmonic that is smooth and looks like a saw tooth by decreasing the amplitudes
                        as the frequencies increase. Or you can make the curve smoother and less toothy by keeping the
                        amplitudes the same. How does that change the sound? Which do you find more appealing?
                    </li>
                    <li>Try making interesting shapes with the sound off. Can you guess what they will sound like?</li>
                    <h3>Why Bother?</h3>
                    There is a lot more to learn, but these basic principles are key to understanding acoustics and even
                    music theory.
                    <div>
                    </div>
                </Context>
            </Topic>
        );
    };
}

export default SoundsFromSines;
