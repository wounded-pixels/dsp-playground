import React, {Component} from 'react';

import './FrequencyDomainControl.scss';
import {clamp, snap} from '../util/math-hacks';

type Props = {
    amplitudes: number[];
    maxAmplitude: number;
    onChange: (frequencyIndex: number, value: number) => void;
};

type State = {
    activeDragIndex: number;
};;

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
    private svgRef: any = React.createRef();

    state = {
        activeDragIndex: -1,
    };

    calculateKnobY = (value: number) => {
        const scale = (height - padding.top - padding.bottom) / (2 * this.props.maxAmplitude);
        const minY = -this.props.maxAmplitude;
        const rawY = (value - minY) * scale;
        return height - padding.bottom - rawY;
    };

    convertToPlotY = (eventY: number) => {
        const CTM = this.svgRef.current.getScreenCTM();
        return (eventY - CTM.f) / CTM.d;
    };

    onChange = (index: number, newY: number, evt: any) => {
        if (this.state.activeDragIndex === index) {
            evt.preventDefault();
            const {amplitudes, maxAmplitude} = this.props;
            const deltaY = newY - this.calculateKnobY(amplitudes[index]);
            const newAmplitude = snap(amplitudes[index] + step * Math.sign(-deltaY), 1);
            this.props.onChange(index, clamp(newAmplitude, -maxAmplitude, maxAmplitude));
        }
    };

    startDrag = (index: number, evt: any) => {
        evt.preventDefault();
        this.setState({activeDragIndex: index});
    };

    stopDrag = (evt: any) => {
        evt.preventDefault();
        this.setState({activeDragIndex: -1});
    }

    render(): JSX.Element {
        const {amplitudes, maxAmplitude} = this.props;

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
                const convertedY = this.convertToPlotY(evt.clientY);
                this.onChange(index, convertedY, evt);
            };

            const onTouch = (evt: React.TouchEvent) => {
                const convertedY = this.convertToPlotY(evt.touches[0].clientY);
                this.onChange(index, convertedY, evt);
            };

            return (
                <g key={index}>
                    <rect
                        className="channel-background"
                        x={calculateKnobX(index)}
                        y={this.calculateKnobY(maxAmplitude)}
                        width={knobDimensions.width}
                        height={this.calculateKnobY(-maxAmplitude) - this.calculateKnobY(maxAmplitude)}
                        onMouseMove={onMove}
                        onMouseDown={(evt) => this.startDrag(index, evt)}
                        onMouseUp = {(evt) => this.stopDrag(evt)}
                        onTouchStart = {(evt) => this.startDrag(index, evt)}
                        onTouchEnd = {(evt) => this.stopDrag(evt)}
                        onTouchMove={onTouch}
                    />
                    <rect
                        className="channel"
                        x={calculateKnobX(index) + knobDimensions.width*0.4}
                        y={this.calculateKnobY(maxAmplitude)}
                        width={0.2 * knobDimensions.width}
                        height={this.calculateKnobY(-maxAmplitude) - this.calculateKnobY(maxAmplitude)}
                        onMouseMove={onMove}
                        onMouseDown={(evt) => this.startDrag(index, evt)}
                        onMouseUp = {(evt) => this.stopDrag(evt)}
                        onTouchStart = {(evt) => this.startDrag(index, evt)}
                        onTouchEnd = {(evt) => this.stopDrag(evt)}
                        onTouchMove={onTouch}
                    />
                    <rect
                        className="knob"
                        x={calculateKnobX(index)}
                        y={this.calculateKnobY(amplitude) - knobDimensions.height /2 }
                        width={knobDimensions.width}
                        height={knobDimensions.height}
                        onMouseMove={onMove}
                        onMouseDown={(evt) => this.startDrag(index, evt)}
                        onMouseUp = {(evt) => this.stopDrag(evt)}
                        onTouchStart = {(evt) => this.startDrag(index, evt)}
                        onTouchEnd = {(evt) => this.stopDrag(evt)}
                        onTouchMove={onTouch}
                    />
                </g>
            );
        });

        const viewBox = `0 0 ${width} ${height}`;
        const changeDescriptionPosition = this.state.activeDragIndex < 10 ?
            {'right': '10px'} :
            {'left': '10px'};

        const {activeDragIndex} = this.state;

        const activeChangeDescription = activeDragIndex >= 0 ? (
            <div className="active-change-description">
                <div>{activeDragIndex + 1} Hz</div>
                <div>{this.props.amplitudes[activeDragIndex]}</div>
            </div>
        ) : null;

        return (
            <div className="FrequencyDomainControl">
                <svg
                    ref={this.svgRef}
                    viewBox={viewBox}>
                    {bottomLabel}
                    {amplitudeLabels}
                    {knobs}
                </svg>
                {activeChangeDescription}
            </div>
        );
    };
}

export default FrequencyDomainControl;
