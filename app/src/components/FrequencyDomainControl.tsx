import React, {Component} from 'react';

interface Props {
    amplitudes: number[];
}

class FrequencyDomainControl extends Component<Props> {
    render(): JSX.Element {
        return (
            <div className="FrequencyDomainControl">
                hi
            </div>
        );
    }
}

export default FrequencyDomainControl;