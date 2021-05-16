import React, { Component } from 'react';

import './ConvolutionSteps.scss';

import {
    Context,
    Row,
    ScenarioLink,
    ScrollToTopOnMount,
    Topic,
    Visualization,
} from 'components/stateless-helpers';
import StepsPlot from './StepsPlot';
import {
    addSignals,
    addZeroes, createBlackmanWindow,
    createLowPassKernel,
    createNoise,
    createSignal,
    multiplySignals,
    normalize,
    round,
    spectralInvert
} from 'util/math-hacks';

type Props = {};

type State = {
    signalAmplitudes: number[];
    kernelAmplitudes: number[];
    iIndex: number;
    jIndex: number;
    playing: boolean;
};

const PLOT_AMPLITUDE = 10;
const TICK_INTERVAL = 25;

const shortSignal = [-2, -1, 0, 1, 2, 3, 3, 3, 3, 2, 1, 0, -1, -2, -3, -3, -3];
const longLength = 1000;
const longSignal = createSignal(longLength, [{frequency: 1, amplitude: 5}, {frequency: 10, amplitude: 1}], 4);
const lowWithNoiseSignal = addSignals(createSignal(longLength, [{frequency:1, amplitude: 3}], 4), createNoise(longLength, 0, 1.0));
const lowBackgroundSignal = createSignal(longLength, [{frequency: 1, amplitude: 1}, {frequency: 10, amplitude: 3}], 4);

const sampleKernel = [-1, 1, 1];
const flipKernel = [-1];
const derivativeKernel = [1, -1];
const delayKernel = [0, 0, 0, 1];

const longKernelLength = 100;
const rawLowPassKernel = normalize(multiplySignals(createLowPassKernel(0.02, longKernelLength), createBlackmanWindow(longKernelLength)));
const lowpassKernel = addZeroes(rawLowPassKernel);
const highpassKernel = addZeroes(spectralInvert(rawLowPassKernel));

const exampleKernels: { [index: string] : number[]} = {
    sampleKernel,
    flipKernel,
    derivativeKernel,
    delayKernel,
    lowpassKernel,
    highpassKernel,
};

const exampleSignals: { [index: string] : number[]} = {
    shortSignal,
    longSignal,
    lowWithNoiseSignal,
    lowBackgroundSignal,
};

class ConvolutionSteps extends Component<Props, State> {
    state = {
        signalAmplitudes: shortSignal,
        kernelAmplitudes: sampleKernel,
        iIndex: 5,
        jIndex: -1,
        playing: false,
    };

    onSelectKernel = (rawKey: string) => { const key = rawKey + 'Kernel';
        if (exampleKernels[key]) {
            const signalAmplitudes =  (exampleKernels[key].length > 0.25 * this.state.signalAmplitudes.length) ?
              longSignal :
              this.state.signalAmplitudes;

            const iIndex = signalAmplitudes.length + exampleKernels[key].length - 2;
            this.setState({iIndex: iIndex, jIndex: exampleKernels[key].length - 1, signalAmplitudes, kernelAmplitudes: exampleKernels[key]});
        } else {
            const iIndex = shortSignal.length + sampleKernel.length - 2;
            const jIndex = sampleKernel.length - 1;
            this.setState({iIndex, jIndex, signalAmplitudes: shortSignal, kernelAmplitudes: sampleKernel});
        }
    };

    onSelectSignal = (rawKey: string) => { const key = rawKey + 'Signal';
        if (exampleSignals[key]) {
            const kernelAmplitudes = this.state.kernelAmplitudes.length > 0.25 * exampleSignals[key].length ?
                sampleKernel :
                this.state.kernelAmplitudes;
            const iIndex = exampleSignals[key].length + kernelAmplitudes.length - 2;
            const jIndex = kernelAmplitudes.length - 1;
            this.setState({iIndex: iIndex, jIndex, signalAmplitudes: exampleSignals[key], kernelAmplitudes});
        } else {
            const iIndex = shortSignal.length + sampleKernel.length - 2;
            const jIndex = sampleKernel.length - 1;
            this.setState({iIndex, jIndex, signalAmplitudes: shortSignal, kernelAmplitudes: sampleKernel});
        }
    }

    incrementIndex = () => {
        const {iIndex, jIndex, kernelAmplitudes, signalAmplitudes} = this.state;
        if (iIndex === signalAmplitudes.length + kernelAmplitudes.length - 2 && jIndex === kernelAmplitudes.length - 1) {
            this.setState({playing: false, iIndex: 0, jIndex: -1});
        } else if (jIndex === kernelAmplitudes.length - 1) {
            this.setState({playing: false, iIndex: iIndex + 1, jIndex: -1});
        } else {
            this.setState({playing: false, jIndex: jIndex + 1 })
        }
    };

    doPlay = () => {
        const {iIndex, kernelAmplitudes, signalAmplitudes} = this.state;
        if (this.state.playing) {
            if (iIndex === signalAmplitudes.length + kernelAmplitudes.length - 2) {
                this.setState({iIndex: 0, jIndex: kernelAmplitudes.length - 1});
            } else {
                this.setState({iIndex: iIndex + 1, jIndex: kernelAmplitudes.length - 1 })
            }

            setTimeout(this.doPlay, TICK_INTERVAL);
        }
    };

    togglePlay = () => {
        this.setState({playing: !this.state.playing});
        setTimeout(this.doPlay, TICK_INTERVAL);
    };

    incrementToEnd = () => {
        const {kernelAmplitudes, signalAmplitudes} = this.state;
        this.setState({playing: false, iIndex: signalAmplitudes.length+kernelAmplitudes.length-2, jIndex: kernelAmplitudes.length-1});
    };

    buildCommentary(): string {
        const {iIndex, jIndex, kernelAmplitudes, playing, signalAmplitudes} = this.state;
        const signalIndex = iIndex - jIndex;

        if (playing || kernelAmplitudes.length > 10) {
            return '';
        }
        if (jIndex === -1) {
            return `The grey dots in the output signal represent the values that have already been calculated. The empty
            dot represents the value that is about to be calculated. Each dark black value in the signal will be
            multiplied with one of the kernel values to contribute to the output value.`;
        }

        if (signalIndex >= signalAmplitudes.length) {
            return `Things get a little odd as the kernel slides past the edge of the input signal. If there is no
            corresponding input value for a kernel value then it is assumed to be zero.`
        }

        if (signalIndex < 0) {
            return `Things get a little odd as the kernel slides up to the edge of the input signal. If there is no
            corresponding input value for a kernel value then it is assumed to be zero.`
        }

        const signalValue = signalAmplitudes[signalIndex];
        const kernelValue = kernelAmplitudes[jIndex];
        if (jIndex === 0) {
            return `Each value in the kernel is associated with the opposite value in the input signal in a 
           criss cross pattern. In this step the blue ${round(signalValue)} from the input signal is multiplied by the
           green ${round(kernelValue)} from the kernel to contribute ${round(signalValue * kernelValue)} to the output signal.`
        }

        if (jIndex === 1) {
            return `The running total is shown in orange in the output signal.`;
        }

        return `Once you get past the odd criss cross pattern it is just repetitive multiplication and addition. But if
        a computer does it fast enough you can get some amazing results.`;
    }

    render(): JSX.Element {
        const {signalAmplitudes, playing, kernelAmplitudes, iIndex, jIndex} = this.state;

        const commentary = this.buildCommentary();

        const productSpans = kernelAmplitudes.map((value, index) => {
            const signalIndex = iIndex - index;
            const signalText = ''+round(signalAmplitudes[signalIndex]);
            const kernelText = ''+round(value);
            const symbol = index < jIndex ? ' + ' : ' = ';
            const signalSpanClass = index === jIndex ? 'current-signal-span' : 'signal-span';
            const kernelSpanClass = index === jIndex ? 'current-kernel-span' : 'kernel-span';

            if (index > jIndex) {
                return null;
            }

            if (signalIndex >= 0 && signalIndex < signalAmplitudes.length) {
                return (
                <span key={index}>
                    <span>(</span>
                    <span className={signalSpanClass}>{signalText}</span>
                    <span>x</span>
                    <span className={kernelSpanClass}>{kernelText}</span>
                    <span>)</span>
                    <span>{symbol}</span>
                </span>); }

            return (
                <span key={index}>
                    <span className={signalSpanClass}>0</span><span>{symbol}</span>
                </span>);
        });

        const rawProductSum = kernelAmplitudes.reduce((total, value, index) => {
            const signalIndex = iIndex - index;
            return index <= jIndex && signalIndex >= 0 && signalIndex < signalAmplitudes.length ?
                total + value * signalAmplitudes[signalIndex] :
                total;
        }, 0);

        const productSum = round(rawProductSum);
        const resultSummary = jIndex >= 0 && !playing && kernelAmplitudes.length < 10 ?
            (<div> {productSpans}<span className="product-sum">{productSum}</span></div>) :
            null;

        return (
            <Topic className="ConvolutionSteps">
                <ScrollToTopOnMount />
                <h2>Convolution Steps</h2>
                <Context>
                    Convolution is a powerful way to alter or filter a signal by combining it with another signal.
                    In our case both signals are represented by discrete points rather than smooth or continuous curves.
                    <p/>
                    The signal that we are trying to modify is combined with a carefully selected smaller signal called
                    a kernel. Each element of the output signal is calculated by applying the kernel values to a block
                    of points in the signal that is the same size as the kernel. The kernel slides along the input signal
                    until all the values of the output signal have been calculated.

                    Use the 'Next' button below to see the sequence of steps that calculate each point in the output signal.
                </Context>
                <Visualization>
                    <StepsPlot width={800}
                               height={500}
                               plotAmplitude={PLOT_AMPLITUDE}
                               signalAmplitudes={signalAmplitudes}
                               kernelAmplitudes={kernelAmplitudes}
                               iIndex={iIndex}
                               jIndex={jIndex} />
                </Visualization>
                <Row>
                    <button onClick={this.incrementIndex}>Next</button>
                    <button onClick={this.togglePlay}>{this.state.playing ? 'Stop' : 'Play'}</button>
                    <button onClick={this.incrementToEnd}>End</button>
                    &nbsp;
                    {resultSummary}
                </Row>
                <Row>
                    <div className="commentary">
                        {commentary}
                    </div>
                </Row>
                <Context>
                    <h3>More Signals</h3>
                    The initial<ScenarioLink index="short" onClick={this.onSelectSignal}>sample signal</ScenarioLink>
                    is devised to make the math easy to follow. More interesting signals include
                    <ScenarioLink index="long" onClick={this.onSelectSignal}>high and low frequencies</ScenarioLink>,
                    <ScenarioLink index="lowBackground" onClick={this.onSelectSignal}>low frequency in the background</ScenarioLink> and
                    <ScenarioLink index="lowWithNoise" onClick={this.onSelectSignal}>low frequency with noise.</ScenarioLink>
                </Context>
                <Context>
                    <h3>More Kernels</h3>
                   The initial<ScenarioLink index="sample" onClick={this.onSelectKernel}>sample kernel</ScenarioLink>
                    is devised to make the math easy to follow. More interesting kernels include
                    <ScenarioLink index="flip" onClick={this.onSelectKernel}>flipping</ScenarioLink>
                    the signal, <ScenarioLink index="delay" onClick={this.onSelectKernel}>delaying</ScenarioLink> the signal,
                    <ScenarioLink index="derivative" onClick={this.onSelectKernel}>taking the derivative</ScenarioLink>
                    of the signal and <ScenarioLink index="lowpass" onClick={this.onSelectKernel}>filtering for low frequencies.</ScenarioLink>
                    Filters that allow low frequencies to pass through to the output signal and suppress higher frequencies are known as low pass filters.
                    <ScenarioLink index="highpass" onClick={this.onSelectKernel}>High pass filters</ScenarioLink> do the opposite
                    task as they allow high frequency signals to pass through to the output signal.
                </Context>
            </Topic>
        );
    };
}

export default ConvolutionSteps;
