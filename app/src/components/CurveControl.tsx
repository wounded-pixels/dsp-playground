import React, { Component } from 'react';

import { FormHelperText, Input } from '@material-ui/core';

import { CurveParameters } from 'model/types';

import './CurveControl.scss';

type Props = {
  curveNumber: number;
  curveParameters: CurveParameters;
  onChange: (
    curveNumber: number,
    parameterName: 'amplitude' | 'frequency' | 'phase',
    value: number
  ) => void;
};

class CurveControl extends Component<Props> {
  render(): JSX.Element {
    const { curveNumber, curveParameters } = this.props;

    const createFloatInput = (
      attribute: 'amplitude' | 'frequency' | 'phase',
      min: number,
      max: number,
      step: number
    ) => {
      return (
        <div className="float-input">
          <FormHelperText>{attribute}</FormHelperText>
          <Input
            value={curveParameters[attribute]}
            type="number"
            inputProps={{
              step: step,
              min: min,
              max: max,
            }}
            onChange={(_evt) => {
              this.props.onChange(
                curveNumber,
                attribute,
                parseFloat(_evt.target.value)
              );
            }}
          />
        </div>
      );
    };

    const amplitudeInput = createFloatInput('amplitude', -4, 4, 0.1);
    const frequencyInput = createFloatInput('frequency', 0, 20, 0.1);

    return (
      <div className="CurveControl">
        {amplitudeInput}
        {frequencyInput}
      </div>
    );
  }
}

export default CurveControl;
