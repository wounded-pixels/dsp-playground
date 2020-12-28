import React, {Component} from 'react';

import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

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
        const { curveNumber, curveParameters, includePhase } = this.props;

        const createFloatInput = (attribute: 'amplitude' | 'frequency' | 'phase', min: number, max: number, step:number) => {
          return (
              <div>
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
        const frequencyInput = createFloatInput('frequency', 0, 10, 0.1);
        const phaseInput = includePhase ?
            createFloatInput('phase', -1, 1, 0.1) :
            null;

        return (
            <div className="CurveControl">
                {amplitudeInput}
                {frequencyInput}
                {phaseInput}
            </div>
        );
    };
}

export default CurveControls
