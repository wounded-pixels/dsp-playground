import React, {Component} from 'react';

import './TimePlot.scss';
import {Sample} from 'model/types';

type Props = {
    values: Sample;
    width: number;
    height: number;
    minY?: number;
    maxY?: number;
    plotTitle?: string;
};

const padding = {
    top: 40,
    right: 0,
    bottom: 40,
    left: 20,
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
        const plotTitle = this.props.plotTitle || '';
        const tStart = values[0].time;
        const tEnd = values[values.length - 1].time;
        const minY = this.props.minY || Math.min(...values.map(v => v.value));
        const maxY = this.props.maxY || Math.max(...values.map(v => v.value));

        const viewBox = `0 0 ${width} ${height}`;

        let curvePath = `M ${this.calculateSvgX(tStart)} ${this.calculateSvgY(values[0].value)} `;
        for (let index=1; index < values.length; index++) {
            curvePath += `L ${this.calculateSvgX(values[index].time)} ${this.calculateSvgY(values[index].value)} `;
        }

        const curve = (
          <path
            className="curve"
            d={curvePath}
          />
        );

        return (
          <div className="TimePlot">
             <svg
                viewBox={viewBox}
             >
                 {curve}
             </svg>
          </div>
        );
    };
}

export default TimePlot;
