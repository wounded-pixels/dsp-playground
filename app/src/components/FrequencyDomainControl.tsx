import React, {Component} from 'react';

import './FrequencyDomainControl.scss';
import {Row} from './stateless-helpers';

interface Props {
    amplitudes: number[];
    maxAmplitude: number;
    onChange: (frequencyIndex: number, value: number) => void;
}

class FrequencyDomainControl extends Component<Props> {
    render(): JSX.Element {
        const {amplitudes, maxAmplitude, onChange} = this.props;
        const sliders = amplitudes.map((amplitude: number, index: number) => {
           return (
             <div key={index} className="slider-wrapper">
               <input
                 max={maxAmplitude}
                 min={-maxAmplitude}
                 onChange={(_evt) => {
                   onChange(index, parseFloat(_evt.target.value));
                 }}
                 step="0.2"
                 type="range"
                 value={amplitude} />
             </div>
           ) ;
        });

        return (
            <div className="FrequencyDomainControl">
              <div className="top">
                <div className="frequency-labels" >
                  <span>{maxAmplitude}</span>
                  <span>{0}</span>
                  <span>{-maxAmplitude}</span>
                </div>
                <div className="frequency-sliders">
                  {sliders}
                </div>
              </div>
              <div className="bottom">
                <div className="frequency-label"> </div>
                <div className="frequency-label">
                  frequencies (1 Hz to 20 Hz)
                </div>
              </div>
            </div>
        );
    }
}

export default FrequencyDomainControl;
