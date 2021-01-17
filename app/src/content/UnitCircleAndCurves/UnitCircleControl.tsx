import React, {Component} from 'react';

import './UnitCircleControl.scss';
import {snap} from 'util/math-hacks';

type Props = {
    onChange: (piRatio: number) => void;
    piRatio: number;
};

type State = {
  activeDrag: boolean;
};

const sideLength = 150;
const padding = 20;

const domainMinimum = -1;
const rangeMinimum = -1;
const domainHeight = 2;
const domainWidth = 2;
const adjustedSvgHeight = sideLength - 2 * padding;
const adjustedSvgWidth = sideLength - 2 * padding;

const clampPiRatio = (raw: number): number =>  {
 return raw < 0 ?
    raw + 2 :
    raw;
};

class UnitCircleControl extends Component<Props, State> {
    private svgRef: any = React.createRef();

    state = {
        activeDrag: false,
    };

    calculateSvgX(domainX: number): number {
        return padding + (domainX - domainMinimum) * adjustedSvgWidth / domainWidth;
    };

    calculateDomainX(eventX: number): number {
        const CTM = this.svgRef.current.getScreenCTM();
        const svgX = (eventX - CTM.e) / CTM.a;
        const adjustedSvgX = svgX - padding;
        return domainMinimum + adjustedSvgX * domainWidth / adjustedSvgWidth;
    };

    calculateSvgY(domainY: number): number {
        const rawSvgY = (domainY - rangeMinimum) * adjustedSvgHeight / domainHeight;
        return padding + adjustedSvgHeight - rawSvgY;
    };

    calculateDomainY(eventY: number): number {
        const CTM = this.svgRef.current.getScreenCTM();
        const svgY = (eventY - CTM.f) / CTM.d;
        const svgUp = adjustedSvgHeight - svgY;
        return rangeMinimum + svgUp * domainHeight / adjustedSvgHeight;
    };

    onChange = (newSvgX: number, newSvgY: number, evt: any) => {
        if (this.state.activeDrag) {
            evt.preventDefault();

            const newDomainX = this.calculateDomainX(newSvgX);
            const newDomainY = this.calculateDomainY(newSvgY);

            const newAngle = Math.atan2(newDomainY, newDomainX);
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
        const { piRatio } = this.props;

        const viewBox = `0 0 ${sideLength} ${sideLength}`;

        const svgRadius = (sideLength - 2 * padding) / 2;

        const centerX = this.calculateSvgX(0);
        const centerY = this.calculateSvgY(0);

        const horizontalLineEnd = this.calculateSvgX(Math.cos(piRatio * Math.PI));
        const verticalLineEnd = this.calculateSvgY(Math.sin(piRatio * Math.PI));

        const backgroundCircle = (
            <circle
                className="background-circle"
                cx={centerX}
                cy={centerY}
                r={svgRadius}
                />
    );


        const horizontalLine = (
            <path
              className="horizontal-line"
              d={`M ${centerX} ${centerY} L ${horizontalLineEnd} ${centerY}`}
          />
        );

        const verticalLine = (
            <path
                className="vertical-line"
                d={`M ${horizontalLineEnd} ${centerY} L ${horizontalLineEnd} ${verticalLineEnd}`}
            />
        );
        const foregroundArc = null;
        const activeChangeDescription = null;

        const knob = (
            <circle
                className="knob"
                cx={horizontalLineEnd}
                cy={verticalLineEnd}
                r={2}
                onMouseMove={this.onMove}
                onMouseDown={this.startDrag}
                onMouseUp = {this.stopDrag}
                onTouchStart = {this.startDrag}
                onTouchEnd = {this.stopDrag}
                onTouchMove={this.onTouch}
            />
    );

        return (
            <div className="UnitCircleControl">
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
                    {backgroundCircle}
                    {foregroundArc}
                    {horizontalLine}
                    {verticalLine}
                    {knob}
                    {activeChangeDescription}
                </svg>
            </div>
        );
    };
}

export default UnitCircleControl