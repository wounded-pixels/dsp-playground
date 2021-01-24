import {cloneDeep} from 'lodash';

import React, { Component } from 'react';

import CurveControl from 'components/CurveControl';
import SineCurve from 'model/SineCurve';
import TimePlot from 'components/TimePlot';
import { addSamples } from 'util/samples';

import {CurveParameters, Sample} from 'model/types';
import {
    Context,
    Hint,
    KeyIdea,
    Row,
    ScenarioLink,
    ScrollToTopOnMount,
    Symbol,
    Topic,
    Visualization
} from 'components/stateless-helpers';
import { Link } from 'react-router-dom';

type Props = {};

type State = {
    curveParameters: CurveParameters[];
};

const jaggedParameters: CurveParameters[] = [
    { amplitude: 3.1, frequency: 2.7},
    { amplitude: 1.3, frequency: 9.1},
];

const flatParameters: CurveParameters[] = [
    { amplitude: 3, frequency: 1},
    { amplitude: 0.5, frequency: 3}
];

const beatParameters: CurveParameters[] = [
    { amplitude: 2, frequency: 7},
    { amplitude: 2, frequency: 8},
];

const examples: { [index: string] : CurveParameters[] }  = { jaggedParameters, beatParameters, flatParameters };

class SimpleAddition extends Component<Props, State> {
    state = {
        curveParameters: [
            {amplitude: 1, frequency: 1},
            {amplitude: 1, frequency: 2},
        ] as CurveParameters[]
    };

    onChangeCurveParameter = (curveNumber: number, parameterName: 'amplitude' | 'frequency' | 'phase', value: number) => {
        const state = this.state;
        state.curveParameters[curveNumber][parameterName] = value;
        this.setState(state);
    };

    onExample = (rawKey: string) => {
        const key = rawKey + 'Parameters';
        if (examples[key]) {
            this.setState({curveParameters: cloneDeep(examples[key])});
        } else {
            this.setState({curveParameters: cloneDeep(jaggedParameters)});
        }
    };

    render(): JSX.Element {
        const samplingRate = 600;
        const tEnd = 5;

        const {curveParameters} = this.state;
        const firstSample: Sample = new SineCurve(curveParameters[0])
            .sample(0, tEnd, samplingRate);

        const secondSample: Sample = new SineCurve(curveParameters[1])
            .sample(0, tEnd, samplingRate);

        const combined: Sample = addSamples(firstSample, secondSample);

        const amplitude = 5;
        const timePlotHeight = 150;

        return (
            <Topic>
                <ScrollToTopOnMount />
                <h2>Addition of Sine Curves</h2>
                <Context>
                    Adding sine curves is pretty simple, but it can produce some very strange results:
                    The inputs below allow you to control the amplitude and frequency of two sine curves.
                    Their sum is shown at the bottom.
                    <ul>
                    <li>
                        A combination of two smooth curves can be
                        <ScenarioLink index="jagged" onClick={this.onExample}>
                          surprisingly jagged
                        </ScenarioLink>
                    </li>
                    <li>
                        A mixture of curves with similar frequencies produces a
                        <ScenarioLink index="beat" onClick={this.onExample}>
                          wave of waves
                        </ScenarioLink>
                        or beat
                    </li>
                    <li>
                        It is even easy to get a curve with a
                        <ScenarioLink index="flat" onClick={this.onExample}>
                          flattened top and bottom
                        </ScenarioLink>
                    </li>
                    </ul>
                    What strange patterns can you create?
                </Context>
                <Visualization>
                  <Row>
                      <CurveControl onChange={this.onChangeCurveParameter} curveNumber={0} curveParameters={this.state.curveParameters[0]}/>
                      <TimePlot width={500} height={timePlotHeight} minY={-amplitude} maxY={amplitude} values={firstSample}/>
                  </Row>
                  <Row>
                      <Symbol width="310px">+</Symbol>
                      <Symbol width="700px">&nbsp;</Symbol>
                  </Row>
                  <Row>
                      <CurveControl onChange={this.onChangeCurveParameter} curveNumber={1} curveParameters={this.state.curveParameters[1]}/>
                      <TimePlot width={500} height={timePlotHeight} minY={-amplitude} maxY={amplitude} values={secondSample}/>
                  </Row>
                  <Row>
                      <Symbol width="310px">=</Symbol>
                      <TimePlot width={500} height={2 * timePlotHeight} minY={-2*amplitude} maxY={2*amplitude} values={combined} />
                  </Row>
                </Visualization>
                <Context>
                  <h3>Things to Try</h3>
                  <Hint text="Focus on the difference between the two frequencies">
                    Can you see a pattern with beats? Specifically, can you make the
                    <ScenarioLink index="beat" onClick={this.onExample}> beat </ScenarioLink> slower
                  </Hint>
                  <Hint text="Focus on the ratio of the frequencies and the ratio of the amplitudes">
                    What other combinations cause
                    <ScenarioLink index="flat" onClick={this.onExample}>
                      flat tops and bottoms
                    </ScenarioLink>
                  </Hint>
                  <h3>Why Bother?</h3>
                  <div>
                      Our world may be more digital every day, but the real world is analog - radio waves travel from here
                      to Mars or from your phone to your Bluetooth headphones. Sound waves travel from your speakers to your ears.
                  </div>
                  <KeyIdea>
                      When data travels through air, wires, fiber optic cables or the vacuum of space
                      it is usually encoded with fancy combinations of sine waves!
                  </KeyIdea>
                  <div>
                      Many academic and professional pursuits build on these concepts:
                      <ul>
                          <li>Acoustics</li>
                          <li>Electronic music</li>
                          <li>Electrical Engineering</li>
                          <li>Radios and Software Defined Radios</li>
                          <li>Radar systems</li>
                      </ul>
                  </div>
                </Context>
                <Context>
                    <h3>Next Steps</h3>
                    <div>
                        If adding two sine curves produce interesting results then we clearly have to try
                        more. Many many more. So, we need a way to quickly control the amplitudes of
                        <Link to="/sum-many-sines"> many sines</Link>.
                    </div>
                </Context>
            </Topic>
        );
    };
}
export default SimpleAddition;
