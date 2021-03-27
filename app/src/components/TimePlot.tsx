import React, {Component} from 'react';

import './TimePlot.scss';
import {Sample} from 'model/types';
import { calculateDefaultTicks } from '@wounded-pixels/eda';

type Props = {
    values: Sample;
    width: number;
    height: number;
    minY?: number;
    maxY?: number;
};

const padding = {
    top: 5,
    right: 0,
    bottom: 40,
    left: 25,
};

class TimePlot extends Component<Props> {
    calculateSvgX(domainX: number): number {
        const {values, width} = this.props;
        const tStart = values[0].time;
        const tEnd = values[values.length - 1].time;
        const domainWidth = tEnd - tStart;
        const adjustedSvgWidth = width - padding.left - padding.right;
        return padding.left + (domainX - tStart) * adjustedSvgWidth / domainWidth;
    };

    calculateSvgY(rangeY: number): number {
        const {values, height} = this.props;
        const minY = this.props.minY || Math.min(...values.map(v => v.value));
        const maxY = this.props.maxY || Math.max(...values.map(v => v.value));
        const rangeHeight = maxY - minY;
        const adjustedSvgHeight = height - padding.top - padding.bottom;
        const rawSvgY = (rangeY - minY) * adjustedSvgHeight / rangeHeight;
        return padding.top + adjustedSvgHeight - rawSvgY;
    };

    render(): JSX.Element {
        const {values, width, height} = this.props;
        const tStart = values[0].time;
        const tEnd = values[values.length - 1].time;
        const minY = this.props.minY || Math.min(...values.map(v => v.value));
        const maxY = this.props.maxY || Math.max(...values.map(v => v.value));

        const xTickValues = calculateDefaultTicks(tStart, tEnd);
        const yTickValues = calculateDefaultTicks(minY, maxY);

        const viewBox = `0 0 ${width} ${height}`;

        let curvePath = `M ${this.calculateSvgX(tStart)} ${this.calculateSvgY(values[0].value)} `;
        for (let index=1; index < values.length; index++) {
            curvePath += `L ${this.calculateSvgX(values[index].time)} ${this.calculateSvgY(values[index].value)} `;
        }

        const horizontalGridLines = yTickValues.map((yValue: number, index: number) => {
            return (
                <path
                    key={index}
                    className="grid-line"
                    d={`M ${this.calculateSvgX(tStart)} ${this.calculateSvgY(yValue)} L ${this.calculateSvgX(tEnd)} ${this.calculateSvgY(yValue)}`}
                />
            );
        });

        const verticalGridLines = xTickValues.map((xValue: number, index: number) => {
          return (
            <path
                key={index}
                className="grid-line"
                d={`M ${this.calculateSvgX(xValue)} ${this.calculateSvgY(minY)} L ${this.calculateSvgX(xValue)} ${this.calculateSvgY(maxY)}`}
            />
          );
        });

        const curve = (
          <path
            className="curve"
            d={curvePath}
          />
        );

        const bottomLabel = (
            <text
                className="bottom-label"
                x={0.52 * width}
                y={height - 0.2 * padding.bottom}
            >
                time
            </text>
        );

        const xLabels = xTickValues.map((xValue, index) => {
            return (
                <text
                    key={index}
                    className="x-axis-label"
                    x={this.calculateSvgX(xValue)}
                    y={height - 0.6 * padding.bottom}
                >
                    {xValue}
                </text>
            )
        });

        const yLabels = yTickValues.map((yValue, index) => {
            return index % 2 === 0 ? (
                <text
                    key={index}
                    className="y-axis-label"
                    x={padding.left * 0.75}
                    y={this.calculateSvgY(yValue)}
                    >
                    {yValue}
                </text>
            ) : null;
        });

        return (
          <div className="TimePlot" style={{width: `${width}px`, height: `${height}px`}}>
             <svg
                 style={{width: `${width}px`, height: `${height}px`}}
                 viewBox={viewBox}
             >
                 {verticalGridLines }
                 {horizontalGridLines}
                 {xLabels}
                 {yLabels}
                 {bottomLabel}
                 {curve}
             </svg>
          </div>
        );
    };
}

export default TimePlot;
