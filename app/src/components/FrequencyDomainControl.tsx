import React, {Component} from 'react';

import './FrequencyDomainControl.scss';
import {clamp} from "../util/math-hacks";

interface Props {
    amplitudes: number[];
    maxAmplitude: number;
    onChange: (frequencyIndex: number, value: number) => void;
}

const width = 600;
const height = 300;

const padding = {
    top: 10,
    right: 0,
    bottom: 50,
    left: 30,
};

const step = 0.1;

const knobAllocation = (width - padding.left - padding.right) / 20;
const knobDimensions = {
    width: knobAllocation * 0.6,
    height: 10,
    margin: knobAllocation * 0.2,
    hitBox: 5,
};

const calculateKnobX = (index: number) => {
    return padding.left + index * (knobDimensions.width + 2 * knobDimensions.margin);
};


class FrequencyDomainControl extends Component<Props> {
    calculateKnobY = (value: number) => {
        const scale = (height - padding.top - padding.bottom) / (2 * this.props.maxAmplitude);
        const minY = -this.props.maxAmplitude;
        const rawY = (value - minY) * scale;
        return height - padding.bottom - rawY;
    };

    render(): JSX.Element {
        const {amplitudes, maxAmplitude, onChange} = this.props;

        const bottomLabel = (
          <text
            className="bottom-label"
            x={0.4 * width}
            y={height - 0.5 * padding.bottom}
            >
              frequencies from 1 to 20 Hz
          </text>
        );

        const amplitudeLabels = [-maxAmplitude, 0, maxAmplitude].map((value: number, index: number) => {
           return (
             <text
                 key={index}
                 className="amplitude-label"
                 x={2}
                 y={this.calculateKnobY(value) + 6}
             >
                 {value}
             </text>
           );
        });

        const knobs = amplitudes.map((amplitude: number, index: number) => {
            const onMove = (evt: React.MouseEvent) => {
                const newAmplitude = amplitudes[index] + step * Math.sign(-evt.movementY);
                onChange(index, clamp(newAmplitude, -maxAmplitude, maxAmplitude));
            };

            const onTouch = (evt: React.TouchEvent) => {
                if (evt.touches.length > 1) {
                    const deltaY = evt.touches[evt.touches.length-1].clientY - evt.touches[0].clientY;
                    const newAmplitude = amplitudes[index] + step * Math.sign(-deltaY);
                    onChange(index, clamp(newAmplitude, -maxAmplitude, maxAmplitude));
                }
            };

            return (
                <g key={index}>
                    <rect
                        className="channel"
                        x={calculateKnobX(index) + knobDimensions.width*0.4}
                        y={this.calculateKnobY(maxAmplitude)}
                        width={0.2 * knobDimensions.width}
                        height={this.calculateKnobY(-maxAmplitude) - this.calculateKnobY(maxAmplitude)}
                    />
                    <rect
                        className="knob"
                        x={calculateKnobX(index)}
                        y={this.calculateKnobY(amplitude) - knobDimensions.height /2 }
                        width={knobDimensions.width}
                        height={knobDimensions.height}
                        onMouseMove={onMove}
                        onTouchMove={onTouch}
                    />
                </g>
            );
        });

        const viewBox = `0 0 ${width} ${height}`;

        return (
            <div className="FrequencyDomainControl">
                <svg viewBox={viewBox}>
                    {bottomLabel}
                    {amplitudeLabels}
                    {knobs}
                </svg>
            </div>
        );
    };
}

export default FrequencyDomainControl;
