import React, {Component, Fragment} from 'react';

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
    right: 5,
    bottom: 40,
    left: 65,
};

const circleSize = 5;

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

        const labelOffset = 0;
        const axisLabelOffset = -8;

        const signalLabel = (
            <text className="section-label" x={labelOffset} y={this.calculateSvgSignalY(0)}>
               Signal
            </text>
        );

        const kernelLabel = (
            <text className="section-label" x={labelOffset} y={this.calculateSvgKernelY(0)}>
                Kernel
            </text>
        );

        const outputSignalLabel = (
            <text className="section-label" x={labelOffset} y={this.calculateSvgOutputSignalY(0)}>
                Output Signal
            </text>
        );

        const signalAxisLabels = yTickValues.map((yValue: number, index: number) => {
            return (
                <text
                    key={index}
                    className="axis-label"
                    x={this.calculateSvgX(0) + axisLabelOffset}
                    y={this.calculateSvgSignalY(yValue)}>
                    {yValue}
                </text>
            );
        });

        const kernelAxisLabels = yTickValues.map((yValue: number, index: number) => {
            return (
                <text
                    key={index}
                    className="axis-label"
                    x={this.calculateSvgX(iIndex-kernelAmplitudes.length+1) + axisLabelOffset}
                    y={this.calculateSvgKernelY(yValue)}>
                    {yValue}
                </text>
            );
        });
        const outputSignalAxisLabels = yTickValues.map((yValue: number, index: number) => {
            return (
                <text
                    key={index}
                    className="axis-label"
                    x={this.calculateSvgX(0) + axisLabelOffset}
                    y={this.calculateSvgOutputSignalY(yValue)}>
                {yValue}
                </text>
            );
        });

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
        }).filter(line => line !== null);

        const showDecorations = jIndex >= 0 && diagonalLines.length > 0;
        const signalCircles = signalAmplitudes.map((value, index) => {
            let className = 'unused-signal-value';
            if (showDecorations && index === (iIndex - jIndex)) {
                className = 'current-signal-value' ;
            } else if (index > (iIndex - kernelAmplitudes.length) && index <= iIndex) {
                className = 'signal-value';
            }
            return (<circle
                key={index}
                className={className}
                cx={this.calculateSvgX(index)}
                cy={this.calculateSvgSignalY(value)}
                r={circleSize}
            />);
        });

        const kernelCircles = kernelAmplitudes.map((value, index) => {
            const className = index === jIndex ? 'current-kernel-value' : 'kernel-value';
            return (<circle
                key={index}
                className={className}
                cx={this.calculateSvgX(iIndex - kernelAmplitudes.length +1 + index)}
                cy={this.calculateSvgKernelY(value)}
                r={circleSize}
            />);
        });

        const outputSignalCircles = outputSignalAmplitudes.map((value, index) => {
            const className = (index < iIndex) ? 'previous-out-signal-value' : 'future-out-signal-value';

            return (<circle
                key={index}
                className={className}
                cx={this.calculateSvgX(index)}
                cy={this.calculateSvgOutputSignalY(value)}
                r={circleSize}
            />);
        });

        const productSum = kernelAmplitudes.reduce((total, value, index) => {
            const signalIndex = iIndex - index;
            return index <= jIndex && signalIndex >= 0 && signalIndex < signalAmplitudes.length ?
                total + value * signalAmplitudes[signalIndex] :
                total;
        }, 0);

        const currentOutputSignalCircle = showDecorations ? (
            <circle
                className="current-out-signal-value"
                cx={this.calculateSvgX(iIndex)}
                cy={this.calculateSvgOutputSignalY(productSum)}
                r={circleSize}
            />
        ) : null;


        const crossRadius = 4;
        const crossBackgroundRadius = crossRadius + 5;

        const crossCenterX = (this.calculateSvgX(iIndex - jIndex) + this.calculateSvgX(iIndex - kernelAmplitudes.length + 1 + jIndex)) / 2;
        const crossCenterY = (this.calculateSvgSignalY(signalAmplitudes[iIndex - jIndex]) + this.calculateSvgKernelY(kernelAmplitudes[jIndex])) / 2;
        const multiplicationSign = showDecorations && iIndex - jIndex >= 0 && iIndex - jIndex < signalAmplitudes.length ? (
            <Fragment>
                <rect className="multiplication-sign-background"
                      x={crossCenterX - crossBackgroundRadius}
                      y={crossCenterY - crossBackgroundRadius}
                      width={2*crossBackgroundRadius}
                      height={2*crossBackgroundRadius}/>
                <line className="multiplication-sign"
                      x1={crossCenterX - crossRadius}
                      y1={crossCenterY - crossRadius}
                      x2={crossCenterX + crossRadius}
                      y2={crossCenterY + crossRadius}/>
                <line className="multiplication-sign"
                      x1={crossCenterX - crossRadius}
                      y1={crossCenterY + crossRadius}
                      x2={crossCenterX + crossRadius}
                      y2={crossCenterY - crossRadius}/>
            </Fragment>
        ) : null;

        const linesToPlus = kernelAmplitudes.map((value, index) => {
            const signalIndex = iIndex - index;
            const className = jIndex === index ? 'current-diagonal' : 'diagonal';
            return index <= jIndex && signalIndex >= 0 && signalIndex < signalAmplitudes.length ? (
                <path
                    key={index}
                    className={className}
                    d={`M ${this.calculateSvgX(iIndex - kernelAmplitudes.length + 1 + index)} ${this.calculateSvgKernelY(value)}
                        L ${this.calculateSvgX(iIndex)} ${this.calculateSvgKernelY(-10)}`
                    } />
            ) : null;
        });

        const plusRadius = 5;
        const plusBackgroundRadius = plusRadius + 4;
        const plusCenterX = this.calculateSvgX(iIndex);
        const plusCenterY = this.calculateSvgKernelY(-10);
        const plusSign = showDecorations ? (
            <Fragment>
                <rect className="plus-sign-background"
                      x={plusCenterX - plusBackgroundRadius}
                      y={plusCenterY - plusBackgroundRadius}
                      width={2*plusBackgroundRadius}
                      height={2*plusBackgroundRadius}/>
                <line className="plus-sign"
                      x1={plusCenterX - plusRadius}
                      y1={plusCenterY}
                      x2={plusCenterX + plusRadius}
                      y2={plusCenterY}/>
                <line className="plus-sign"
                      x1={plusCenterX}
                      y1={plusCenterY - plusRadius}
                      x2={plusCenterX}
                      y2={plusCenterY + plusRadius}/>
            </Fragment>
        ) : null;

        const lineToProductSum = showDecorations ? (
            <line className="current-diagonal"
                  x1={plusCenterX}
                  y1={plusCenterY}
                  x2={plusCenterX}
                  y2={this.calculateSvgOutputSignalY(productSum)} />
        ) : null;

        return (
            <div className="StepsPlot" style={{width: `${width}px`, height: `${height}px`}}>
                <svg
                    style={{width: `${width}px`, height: `${height}px`}}
                    viewBox={viewBox}
                >
                    {signalLabel}
                    {kernelLabel}
                    {outputSignalLabel}
                    {signalAxisLabels}
                    {kernelAxisLabels}
                    {outputSignalAxisLabels}
                    {horizontalSignalGridLines}
                    {horizontalKernelGridLines}
                    {horizontalOutputSignalGridLines}
                    {diagonalLines}
                    {linesToPlus}
                    {lineToProductSum}
                    {multiplicationSign}
                    {plusSign}
                    {signalCircles}
                    {kernelCircles}
                    {currentOutputSignalCircle}
                    {outputSignalCircles}
                </svg>
            </div>
        );
    }
}

export default StepsPlot;
