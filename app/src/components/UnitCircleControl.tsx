import React, {Component} from 'react';

import './UnitCircleControl.scss';

type Props = {
    onChange: (piRatio: number) => void;
    piRatio: number;
};

const sideLength = 100;
const padding = 10;

class UnitCircleControl extends Component<Props> {
    private svgRef: any = React.createRef();

    calculateSvgX(domainX: number): number {
        const domainWidth = 2;
        const adjustedSvgWidth = sideLength - 2 * padding;
        return padding + (domainX + 1) * adjustedSvgWidth / domainWidth;
    };

    calculateSvgY(domainY: number): number {
      const domainHeight = 2;
      const adjustedSvgHeight = sideLength - 2 * padding;
      const rawSvgY = (domainY + 1) * adjustedSvgHeight / domainHeight;
      return padding + adjustedSvgHeight - rawSvgY;
    };

    render(): JSX.Element {
        const { onChange, piRatio } = this.props;

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
                r={svgRadius}/>
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
        const vector = null;
        const knob = null;
        const activeChangeDescription = null;

        return (
            <div className="UnitCircleControl">
                <svg
                    ref={this.svgRef}
                    viewBox={viewBox}>
                    {backgroundCircle}
                    {foregroundArc}
                    {horizontalLine}
                    {verticalLine}
                    {vector}
                    {knob}
                    {activeChangeDescription}
                </svg>
            </div>
        );
    };
}

export default UnitCircleControl