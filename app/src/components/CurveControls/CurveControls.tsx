import React, {Component} from 'react';

import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import {CurveParameters} from '../../model/types';

import './CurveControl.scss';

interface Props {
    curveNumber: number;
    curveParameters: CurveParameters;
    onChange: (curveNumber: number, parameterName: 'amplitude' | 'frequency' | 'phase', value: number) => void;
}

class CurveControls extends Component<Props> {
    render(): JSX.Element {
        const { amplitude, frequency, phase } = this.props.curveParameters;
        return (
                <div className="CurveControl">
                    <div style={{display: 'flex', width: '100%'}} >
                        <Typography>{amplitude} Sin(2 Pi {frequency} + {phase})</Typography>
                    </div>
                    <div style={{display: 'flex', width: '100%'}}>
                        <Typography>Amplitude</Typography>
                        <Slider
                            value={amplitude}
                            min={0}
                            max={3}
                            step={0.1}
                            onChange={(_evt, value: number | number[]) => {
                                this.props.onChange(this.props.curveNumber, 'amplitude', value as number);
                            }}
                        />
                    </div>
                    <div style={{display: 'flex', width: '100%'}}>
                        <Typography>Frequency</Typography>
                        <Slider
                            value={frequency}
                            min={0}
                            max={3}
                            step={0.1}
                            onChange={(_evt, value: number | number[]) => {
                                this.props.onChange(this.props.curveNumber, 'frequency', value as number);
                            }}
                    />
                    </div>
                    <div style={{display: 'flex', width: '100%'}}>
                        <Typography>Phase</Typography>
                        <Slider
                            value={phase}
                            min={0}
                            max={3}
                            step={0.1}
                            onChange={(_evt, value: number | number[]) => {
                                this.props.onChange(this.props.curveNumber, 'phase', value as number);
                            }}
                        />
                    </div>
                </div>
        );
    };
};
export default CurveControls;


