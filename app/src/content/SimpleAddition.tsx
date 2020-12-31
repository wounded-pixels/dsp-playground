import {cloneDeep} from 'lodash';

import React, { Component, CSSProperties } from 'react';

import {Link} from '@material-ui/core';

import CurveControls from 'components/CurveControls';
import SineCurve from 'model/SineCurve';
import TimePlot from 'components/TimePlot';
import { addSamples } from 'util/samples';

import {CurveParameters} from 'model/types';
import {Hint} from '../components/stateless-helpers';

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

    buildExampleLink = (key: string, text: string) => {
        return <Link onClick={() => this.onExample(key)}>{' '+text}</Link>;
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
        const firstSamples = new SineCurve(curveParameters[0])
            .sample(0, tEnd, samplingRate);

        const secondSamples = new SineCurve(curveParameters[1])
            .sample(0, tEnd, samplingRate);

        const combined = addSamples(firstSamples, secondSamples);

        const amplitude = 5;
        const timePlotHeight = 150;

        const symbolStyles: CSSProperties = {
            fontWeight: 'bold',
            fontSize: '32px',
            width: '150px',
        }

        return (
            <div id="SimpleAddition" className="topic">
                <div className="title">Addition of Sine Curves</div>
                <div className="context">
                    Adding sine curves is pretty simple, but it can produce some very strange results:
                    <ul className="examples">
                    <li>
                        A combination of two smooth curves can be
                        {this.buildExampleLink('jagged', 'surprisingly jagged')} </li>
                    <li>
                        A mixture of curves with similar frequencies produces a
                        {this.buildExampleLink('beat', 'wave of waves or beat')}
                    </li>
                    <li>
                        It is even easy to get a curve with a
                        {this.buildExampleLink('flat', 'flattened top and bottom')}
                    </li>
                    </ul>
                    What strange patterns can you create?
                </div>
                <div className="row">
                    <CurveControls onChange={this.onChangeCurveParameter} curveNumber={0} curveParameters={this.state.curveParameters[0]}/>
                    <TimePlot width={500} height={timePlotHeight} minY={-amplitude} maxY={amplitude} values={firstSamples}/>
                </div>
                <div className="row">
                    <span style={symbolStyles}>+</span>
                </div>
                <div className="row">
                    <CurveControls onChange={this.onChangeCurveParameter} curveNumber={1} curveParameters={this.state.curveParameters[1]}/>
                    <TimePlot width={500} height={timePlotHeight} minY={-amplitude} maxY={amplitude} values={secondSamples}/>
                </div>
                <div className="row">
                    <div style={symbolStyles}>=</div>
                    <TimePlot width={500} height={2 * timePlotHeight} minY={-2*amplitude} maxY={2*amplitude} values={combined} />
                </div>
                <div className="sub-title">Things to Try</div>
                <Hint text="Focus on the difference between the two frequencies">
                    Can you see a pattern with beats? Specifically, can you make the {this.buildExampleLink('beat', 'beat')} slower?
                </Hint>
                <Hint text="Focus on the ratio of the frequencies and the ratio of the amplitudes">
                    What other combinations cause {this.buildExampleLink('flat','flat tops and bottoms')}?
                </Hint>
                <div className="sub-title">Why Bother?</div>
                <div className="context">
                    Our world may be more digital every day, but the real world is analog - radio waves travel from here
                    to Mars or from your phone to your Bluetooth headphones. Sound waves travel from your speakers to your ears.

                    <div>
                        <div className="key-idea">For data to travel through the air or through a wire it must be encoded with fancy combinations of
                            sine waves!</div>
                    </div>
                </div>
            </div>
        );
    };
}
export default SimpleAddition;
