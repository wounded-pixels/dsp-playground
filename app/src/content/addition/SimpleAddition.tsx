import {cloneDeep} from 'lodash';

import React, { Component } from 'react';

import Link from '@material-ui/core/Link';

import TimePlot from '../../components/TimePlot/TimePlot';
import CurveControls from '../../components/CurveControls/CurveControls';
import SineCurve from '../../model/SineCurve';
import { addSamples } from '../../util/samples';

import {CurveParameters} from '../../model/types';

type Props = {};

type State = {
    curveParameters: CurveParameters[];
};

const jaggedParameters = [
    {
        amplitude: 3,
        frequency: 2,
        phase: 0,
    },
    {
        amplitude: 1.6,
        frequency: 4,
        phase: 0,
    },
    {
        amplitude: 1,
        frequency: 6,
        phase: 0,
    }
];

const beatParameters = [
    {
        amplitude: 2,
        frequency: 7,
        phase: 0,
    },
    {
        amplitude: 2,
        frequency: 7.5,
        phase: 0,
    },
    {
        amplitude: 0,
        frequency: 8,
        phase: 0,
    }
];

class SimpleAddition extends Component<Props, State> {
    state = {
        curveParameters: cloneDeep(jaggedParameters)
    };

    onChangeCurveParameter = (curveNumber: number, parameterName: 'amplitude' | 'frequency' | 'phase', value: number) => {
        const state = this.state;
        state.curveParameters[curveNumber][parameterName] = value;
        this.setState(state);
    };

    onJagged = () => {
        this.setState({curveParameters: cloneDeep(jaggedParameters)});
    };

    onBeat = () => {
        this.setState({curveParameters: cloneDeep(beatParameters)});
    };

    render(): JSX.Element {
        const samplingRate = 600;
        const tEnd = 5;

        const {curveParameters} = this.state;
        const slow = new SineCurve(curveParameters[0])
            .sample(0, tEnd, samplingRate);

        const fast = new SineCurve(curveParameters[1])
            .sample(0, tEnd, samplingRate);

        const faster = new SineCurve(curveParameters[2])
            .sample(0, tEnd, samplingRate);

        const combined = addSamples(slow, fast, faster);

        const amplitude = 5;

        return (
            <div id="SimpleAddition" className="topic">
                <div className="title">Addition of Sine Curves</div>
                <div className="context">
                    Adding sine curves is deceptively simple, even when you use the formal name of superposition.
                    A <Link href='#' onClick={this.onJagged}>mixture of smooth curves</Link> at different frequencies
                    and amplitudes can produce curves that are surprisingly jagged.
                    A <Link href='#' onClick={this.onBeat}>mixture of curves with similar frequencies</Link> produces
                    a beat at a much lower frequency. Smaller differences produce slower beats. What strange shapes can
                    you create?
                </div>
                <div className="row">
                    <CurveControls onChange={this.onChangeCurveParameter} curveNumber={0} curveParameters={this.state.curveParameters[0]}/>
                    <TimePlot minY={-amplitude} maxY={amplitude} values={slow}/>
                </div>
                <div className="row">
                    <CurveControls onChange={this.onChangeCurveParameter} curveNumber={1} curveParameters={this.state.curveParameters[1]}/>
                    <TimePlot minY={-amplitude} maxY={amplitude} values={fast}/>
                </div>
                <div className="row">
                    <CurveControls onChange={this.onChangeCurveParameter} curveNumber={2} curveParameters={this.state.curveParameters[2]} />
                    <TimePlot minY={-amplitude} maxY={amplitude} values={faster}/>
                </div>
                <div className="column">
                    <TimePlot minY={-amplitude} maxY={amplitude} values={combined} plotTitle="All Together" />
                </div>
            </div>
        );
    };
}

export default SimpleAddition;
