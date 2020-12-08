import React, {Component} from 'react';

import { ScatterPlot } from '@wounded-pixels/eda';
import TimeValue from '../../model/TimeValue';

interface Props {
    values: TimeValue[];
}

class TimePlot extends Component<Props> {
    private divRef: any = React.createRef();
    private plot: any;

    componentDidMount() {
        const { values } = this.props;
        const tStart = values[0].time;
        const tEnd = values[values.length-1].time;
        const minY = Math.min(...values.map(v => v.value));
        const maxY = Math.max(...values.map(v => v.value));
        const padding = (maxY - minY) * 0.1

        if (this.divRef && this.divRef.current) {
            this.plot = new ScatterPlot(this.divRef.current)
                .id(d => d.time)
                .radius(0.3)
                .fill('black')
                .stroke('none')
                .domain(tStart,tEnd)
                .range(minY-padding, maxY+padding)
                .position(d => d.time, d => d.value);

            this.plot.update(values);
        }
    };

    render(): JSX.Element {
        return (
            <div style={{width: '100%'}}>
                <div ref={this.divRef} style={{'display': 'flex', 'flexDirection': 'column', 'height': '280px'}} />
            </div>
    );
    };
}

export default TimePlot;