import React, {Component} from 'react';

import './CurveControl.scss';
import {clamp, snap} from 'util/math-hacks';

type Props = {
    yFunction: (angleValue: number) => number;
    onChange: (piRatio: number) => void;
    piRatio: number;
};

type State = {
    activeDrag: boolean;
};

const svgHeight = 300;
const svgWidth = 750;
const padding = {
    top: 35,
    right: 0,
    bottom: 35,
    left: 20,
};

const domainMinimum = 0;
const domainMaximum = 2 * Math.PI;
const domainWidth = domainMaximum - domainMinimum;
const rangeMinimum = -1;
const rangeMaximum = 1;
const rangeHeight = rangeMaximum - rangeMinimum;
const adjustedSvgHeight = svgHeight - padding.top - padding.bottom;
const adjustedSvgWidth = svgWidth - padding.left - padding.right;

const clampPiRatio = (raw: number): number =>  {
    return raw < 0 ?
        raw + 2 :
        raw;
};

class CurveControl extends Component<Props, State> {
    private svgRef: any = React.createRef();

    state = {
        activeDrag: false,
    };

    calculateSvgX(domainX: number): number {
        return padding.left + (domainX - domainMinimum) * adjustedSvgWidth / domainWidth;
    };

    calculateDomainX(eventX: number): number {
        const CTM = this.svgRef.current.getScreenCTM();
        const svgX = (eventX - CTM.e) / CTM.a;
        const adjustedSvgX = svgX - padding.left;
        return domainMinimum + adjustedSvgX * domainWidth / adjustedSvgWidth;
    };

    calculateSvgY(rangeY: number): number {
        const rawSvgY = (rangeY - rangeMinimum) * adjustedSvgHeight / rangeHeight;
        return padding.top + adjustedSvgHeight - rawSvgY;
    };

    calculateRangeY(eventY: number): number {
        const CTM = this.svgRef.current.getScreenCTM();
        const svgY = (eventY - CTM.f) / CTM.d;
        const svgUp = adjustedSvgHeight - svgY;
        return rangeMinimum + svgUp * rangeHeight / adjustedSvgHeight;
    };

    onChange = (newSvgX: number, newSvgY: number, evt: any) => {
        if (this.state.activeDrag) {
            evt.preventDefault();

            const newAngle = clamp(this.calculateDomainX(newSvgX), 0, 2 * Math.PI);
            const piRatio = snap(newAngle / Math.PI, 2);
            this.props.onChange(clampPiRatio(piRatio));
        }
    };

    onMove = (evt: React.MouseEvent) => {
        this.onChange(evt.clientX, evt.clientY, evt);
    };

    onTouch = (evt: React.TouchEvent) => {
        this.onChange(evt.touches[0].clientX, evt.touches[0].clientY, evt);
    };

    startDrag = (evt: any) => {
        evt.preventDefault();
        this.setState({activeDrag: true});
    };

    stopDrag = (evt: any) => {
        evt.preventDefault();
        this.setState({activeDrag: false});
    }

    render(): JSX.Element {
        const { yFunction, piRatio } = this.props;

        const viewBox = `0 0 ${svgWidth} ${svgHeight}`;

        const horizontalLineBegin = this.calculateSvgX(0);
        const horizontalLineEnd = this.calculateSvgX(piRatio * Math.PI);
        const verticalLineStart = this.calculateSvgY(0);
        const verticalLineEnd = this.calculateSvgY(yFunction(piRatio * Math.PI));

        const verticalStrokeColor = yFunction === Math.sin ? 'orange' : 'blue';

        const step = 0.1;
        let curvePath = `M ${this.calculateSvgX(0)} ${this.calculateSvgY(yFunction(0))} `;
        for (let angle = step; angle <= 2 * Math.PI + step; angle += step) {
           curvePath += `L ${this.calculateSvgX(angle)} ${this.calculateSvgY(yFunction(angle))} `;
        }

        const curve = (
          <path
          className="curve"
          d={curvePath}
          />
        );

        const angleLabelVerticalOffset = yFunction(piRatio * Math.PI) < 0 ? -15 : 25;
        const angleLabelHorizontalOffset = piRatio < 1.9 ? 0 : -45;
        const angleLabel = (
            <text
                className="angle-label"
                x={this.calculateSvgX(piRatio * Math.PI) + angleLabelHorizontalOffset}
                y={this.calculateSvgY(0) + angleLabelVerticalOffset}
                >
                {piRatio}&#960;
            </text>

        );

        const horizontalLine = (
            <path
                className="horizontal-line"
                d={`M ${horizontalLineBegin} ${verticalLineStart} L ${horizontalLineEnd} ${verticalLineStart}`}
            />
        );

        const verticalLine = (
            <path
                className="vertical-line"
                stroke={verticalStrokeColor}
                d={`M ${horizontalLineEnd} ${verticalLineStart} L ${horizontalLineEnd} ${verticalLineEnd}`}
            />
        );
        const activeChangeDescription = null;

        const knob = (
            <circle
                className="knob"
                cx={horizontalLineEnd}
                cy={verticalLineEnd}
                r={4}
                onMouseMove={this.onMove}
                onMouseDown={this.startDrag}
                onMouseUp = {this.stopDrag}
                onTouchStart = {this.startDrag}
                onTouchEnd = {this.stopDrag}
                onTouchMove={this.onTouch}
            />
        );

        return (
            <div className="CurveControl">
                <svg
                    ref={this.svgRef}
                    viewBox={viewBox}
                    onMouseMove={this.onMove}
                    onMouseDown={this.startDrag}
                    onMouseUp = {this.stopDrag}
                    onTouchStart = {this.startDrag}
                    onTouchEnd = {this.stopDrag}
                    onTouchMove={this.onTouch}
                >
                    {horizontalLine}
                    {verticalLine}
                    {curve}
                    {angleLabel}
                    {knob}
                    {activeChangeDescription}
                </svg>
            </div>
        );
    };
}

export default CurveControl