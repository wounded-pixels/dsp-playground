import React, { Component } from 'react';

import './ConvolutionSteps.scss';

import {
    Context,
    Row,
    ScrollToTopOnMount,
    Topic,
    Visualization,
} from 'components/stateless-helpers';
import StepsPlot from './StepsPlot';

type Props = {};

type State = {
    signalAmplitudes: number[];
    kernelAmplitudes: number[];
    iIndex: number;
    jIndex: number;
};

class ConvolutionSteps extends Component<Props, State> {
    state = {
        signalAmplitudes: [0,1,1,0,-1,-1,0,2,2,1],
        kernelAmplitudes: [-2,-1,1,2],
        iIndex: 3,
        jIndex: 0,
    };

    incrementIndex = () => {
        const {iIndex, jIndex, kernelAmplitudes, signalAmplitudes} = this.state;
        if (iIndex === signalAmplitudes.length + kernelAmplitudes.length - 2 && jIndex === kernelAmplitudes.length - 1) {
            this.setState({iIndex: 0, jIndex: 0});
        } else if (jIndex === kernelAmplitudes.length - 1) {
            this.setState({iIndex: iIndex + 1, jIndex: 0});
        } else {
            this.setState({jIndex: jIndex + 1 })
        }
    };

    render(): JSX.Element {
        const {signalAmplitudes, kernelAmplitudes, iIndex, jIndex} = this.state;

        const productSpans = kernelAmplitudes.map((value, index) => {
            const signalIndex = iIndex - index;
            const signalText = ''+signalAmplitudes[signalIndex];
            const kernelText = ''+value;
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
                </span>);
            }

            return (
                <span key={index}>
                    <span className={signalSpanClass}>0</span><span>{symbol}</span>
                </span>);
        });

        const productSum = kernelAmplitudes.reduce((total, value, index) => {
            const signalIndex = iIndex - index;
            return index <= jIndex && signalIndex >= 0 && signalIndex < signalAmplitudes.length ?
                total + value * signalAmplitudes[signalIndex] :
                total;
        }, 0);

        return (
            <Topic className="ConvolutionSteps">
                <ScrollToTopOnMount />
                <h2>Convolution Steps</h2>
                <Context>
                    Convolution is a powerful way to alter or filter a signal by combining it with another signal.
                    In our case both signals are represented by discrete points rather than smooth or continuous curves.

                    The signal that we are trying to modify is combined with a carefully selected smaller signal called
                    a kernel. Each element of the output signal is calculated by applying the kernel values to the nearby
                    values of the input signal.
                </Context>
                <Visualization>
                    <StepsPlot width={700}
                               height={500}
                               plotAmplitude={10}
                               signalAmplitudes={signalAmplitudes}
                               kernelAmplitudes={kernelAmplitudes}
                               iIndex={iIndex}
                               jIndex={jIndex} />
                </Visualization>

                <Row>
                    <button onClick={this.incrementIndex}>Next</button>
                    &nbsp;
                    {productSpans}<span className="product-sum">{productSum}</span>
                </Row>
            </Topic>
        );
    };
}

export default ConvolutionSteps;
