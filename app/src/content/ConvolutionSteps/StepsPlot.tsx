import React, {Component} from 'react';

import './StepsPlot.scss';

import { calculateDefaultTicks } from '@wounded-pixels/eda';
import {convolve} from 'util/math-hacks';

type Props = {
    width: number;
    height: number;
    plotAmplitude: number;
    signalAmplitudes: number[];
    kernelAmplitudes: number[];
    iIndex: number;
    jIndex: number;
};

const padding = {
    top: 5,
    right: 25,
    bottom: 40,
    left: 25,
};

class StepsPlot extends Component<Props> {
    calculateSvgX(timeIndex: number): number {
        const {signalAmplitudes, kernelAmplitudes, width} = this.props;
        const domainWidth = signalAmplitudes.length + kernelAmplitudes.length + 1;
        const adjustedSvgWidth = width - padding.left - padding.right;
        return padding.left + (timeIndex + kernelAmplitudes.length - 1) * adjustedSvgWidth / domainWidth;
    };

    calculateSvgY(value: number, section: number): number {
        const {height, plotAmplitude} = this.props;
        const rangeHeight = plotAmplitude * 2;
        const adjustedSvgHeight = (height - padding.top - padding.bottom) / 3;
        const rawSvgY = (value + plotAmplitude) * adjustedSvgHeight / rangeHeight;
        return padding.top + section * adjustedSvgHeight + adjustedSvgHeight - rawSvgY;
    };

    calculateSvgSignalY(value: number): number {
        return this.calculateSvgY(value, 0);
    };

    calculateSvgKernelY(value: number): number {
        return this.calculateSvgY(value, 1);
    };

    calculateSvgOutputSignalY(value: number): number {
        return this.calculateSvgY(value, 2);
    };

    render(): JSX.Element {
        const {width, height, iIndex, jIndex, plotAmplitude, kernelAmplitudes, signalAmplitudes} = this.props;

        const outputSignalAmplitudes = convolve(signalAmplitudes, kernelAmplitudes);
        const viewBox = `0 0 ${width} ${height}`;

        const yTickValues = calculateDefaultTicks(-plotAmplitude, plotAmplitude);

        const horizontalSignalGridLines = yTickValues.map((yValue: number, index: number) => {
            return (
                <path
                    key={index}
                    className="grid-line"
                    d={`M ${this.calculateSvgX(0)} ${this.calculateSvgSignalY(yValue)}
                        L ${this.calculateSvgX(signalAmplitudes.length-1)} ${this.calculateSvgSignalY(yValue)}`
                      } />
            );
        });

        const horizontalKernelGridLines = yTickValues.map((yValue: number, index: number) => {
            return (
                <path
                    key={index}
                    className="grid-line"
                    d={`M ${this.calculateSvgX(iIndex-kernelAmplitudes.length+1)} ${this.calculateSvgKernelY(yValue)}
                        L ${this.calculateSvgX(iIndex)} ${this.calculateSvgKernelY(yValue)}`
                    } />
            );
        });

        const horizontalOutputSignalGridLines= yTickValues.map((yValue: number, index: number) => {
            return (
                <path
                    key={index}
                    className="grid-line"
                    d={`M ${this.calculateSvgX(0)} ${this.calculateSvgOutputSignalY(yValue)}
                        L ${this.calculateSvgX(signalAmplitudes.length+kernelAmplitudes.length-1)} ${this.calculateSvgOutputSignalY(yValue)}`
                    } />
            );
        });

        const signalCircles = signalAmplitudes.map((value, index) => {
            return (<circle
                key={index}
                className="signal-value"
                cx={this.calculateSvgX(index)}
                cy={this.calculateSvgSignalY(value)}
                r={3}
            />);
        });

        const kernelCircles = kernelAmplitudes.map((value, index) => {
            return (<circle
                key={index}
                className="signal-value"
                cx={this.calculateSvgX(iIndex - kernelAmplitudes.length +1 + index)}
                cy={this.calculateSvgKernelY(value)}
                r={3}
            />);
        });

        const outputSignalCircles = outputSignalAmplitudes.map((value, index) => {
            const className = (index < iIndex) ? 'previous-signal-value' : 'future-signal-value';

            return (<circle
                key={index}
                className={className}
                cx={this.calculateSvgX(index)}
                cy={this.calculateSvgOutputSignalY(value)}
                r={3}
            />);
        });

        const productSum = kernelAmplitudes.reduce((total, value, index) => {
            const signalIndex = iIndex - index;
            return index <= jIndex && signalIndex >= 0 && signalIndex < signalAmplitudes.length ?
                total + value * signalAmplitudes[signalIndex] :
                total;
        }, 0);

        const currentOutputSignalCircle = (
            <circle
                className="current-signal-value"
                cx={this.calculateSvgX(iIndex)}
                cy={this.calculateSvgOutputSignalY(productSum)}
                r={3}
            />
        );

        const diagonalLines = kernelAmplitudes.map((value, index) => {
            const signalIndex = iIndex - index;
            const className = jIndex === index ? 'current-diagonal' : 'diagonal';
            return index <= jIndex && signalIndex >= 0 && signalIndex < signalAmplitudes.length ? (
                <path
                    key={index}
                    className={className}
                    d={`M ${this.calculateSvgX(signalIndex)} ${this.calculateSvgSignalY(signalAmplitudes[signalIndex])}
                        L ${this.calculateSvgX(iIndex - kernelAmplitudes.length + 1 + index)} ${this.calculateSvgKernelY(value)}`
                    } />
            ) : null;
        });


        return (
            <div className="StepsPlot" style={{width: `${width}px`, height: `${height}px`}}>
                <svg
                    style={{width: `${width}px`, height: `${height}px`}}
                    viewBox={viewBox}
                >
                    {horizontalSignalGridLines}
                    {horizontalKernelGridLines}
                    {horizontalOutputSignalGridLines}
                    {signalCircles}
                    {kernelCircles}
                    {outputSignalCircles}
                    {currentOutputSignalCircle}
                    {diagonalLines}
                </svg>
            </div>
        );
    }
}

export default StepsPlot;
