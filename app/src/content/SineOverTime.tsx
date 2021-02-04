import React, { Component } from 'react';
import {Topic} from 'components/stateless-helpers';

type Props = {};

type State = {
    amplitude: number;
    frequency: number;
}

class SineOverTime extends Component<Props, State> {
    state = {
        amplitude: 1,
        frequency: 1,
    };

    render(): JSX.Element {
        return (
            <Topic>
                <h2>Sine over Time</h2>
            </Topic>
        );
    }
}

export default SineOverTime;
