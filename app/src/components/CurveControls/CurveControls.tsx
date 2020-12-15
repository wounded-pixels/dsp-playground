import React, {Component} from 'react';

import Slider from '@material-ui/core/Slider';
import {CurveParameters} from '../../model/types';

interface Props {
    curveNumber: number;
    curveParameters: CurveParameters;
    onChange: (curveNumber: number, parameterName: 'amplitude' | 'frequency' | 'phase', value: number) => void;
}

class CurveControls extends Component<Props> {
    render(): JSX.Element {

        return (
                <div style={{display: 'flex', width: '100%'}}>
                    <Slider
                        value={this.props.curveParameters.amplitude}
                        min={0}
                        max={3}
                        step={0.1}
                        onChange={(_evt, value: number | number[]) => {
                            this.props.onChange(this.props.curveNumber, 'amplitude', value as number);
                        }}
                    />
                    <Slider
                        value={this.props.curveParameters.frequency}
                        min={0}
                        max={3}
                        step={0.1}
                        onChange={(_evt, value: number | number[]) => {
                            this.props.onChange(this.props.curveNumber, 'frequency', value as number);
                        }}
                    />
                    <Slider
                        value={this.props.curveParameters.phase}
                        min={0}
                        max={3}
                        step={0.1}
                        onChange={(_evt, value: number | number[]) => {
                            this.props.onChange(this.props.curveNumber, 'phase', value as number);
                        }}
                    />
                </div>
        );
    };
};
export default CurveControls;


