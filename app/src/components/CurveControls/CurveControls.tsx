import React, {Component} from 'react';

import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';

import {CurveParameters} from '../../model/types';

import './CurveControl.scss';

interface Props {
    curveNumber: number;
    curveParameters: CurveParameters;
    includePhase?: boolean | undefined;
    onChange: (curveNumber: number, parameterName: 'amplitude' | 'frequency' | 'phase', value: number) => void;
}

class CurveControls extends Component<Props> {
    render(): JSX.Element {
        const { amplitude, frequency, phase } = this.props.curveParameters;
        const { curveNumber, curveParameters, includePhase } = this.props;

        const equation = includePhase && phase !== 0 ?
            (<Typography>{amplitude} Sin(({frequency} time + {phase}) 2 &pi;)</Typography>) :
            (<Typography>{amplitude} Sin({frequency} time 2 &pi;)</Typography>);

        const createFloatInput = (attribute: 'amplitude' | 'frequency' | 'phase', min: number, max: number, step:number) => {
          return (
              <div style={{display: 'flex', width: '100%'}}>
                  <FormHelperText>{attribute}</FormHelperText>
                  <Input
                      value={curveParameters[attribute]}
                      type="number"
                      inputProps={{
                          'step': step,
                          'min': min,
                          'max': max,
                      }}
                      onChange={(_evt) => {
                          this.props.onChange(curveNumber, attribute, parseFloat(_evt.target.value));
                      }}
                  />
              </div>
          );
        };

        const amplitudeInput = createFloatInput('amplitude', -4, 4, 0.1);
        const frequencyInput = createFloatInput('frequency', 0, 10, 0.2);
        const phaseInput = includePhase ?
            createFloatInput('phase', -1, 1, 0.1) :
            null;

        return (
            <div className="CurveControl">
                <div style={{display: 'flex', width: '100%'}} >
                    {equation}
                </div>
                {amplitudeInput}
                {frequencyInput}
                {phaseInput}
            </div>
        );
    };
};
export default CurveControls;


