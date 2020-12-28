import React, {Component} from 'react';

import { ScatterPlot } from '@wounded-pixels/eda';

import './TimePlot.scss';
import {TimeValue} from '../../model/types';

interface Props {
    values: TimeValue[];
    minY?: number;
    maxY?: number;
    plotTitle?: string;
}

class TimePlot extends Component<Props> {
    private divRef: any = React.createRef();
    private plot: any;

    componentDidMount() {
        const {values} = this.props;
        const plotTitle = this.props.plotTitle || '';
        const tStart = values[0].time;
        const tEnd = values[values.length - 1].time;
        const minY = this.props.minY || Math.min(...values.map(v => v.value));
        const maxY = this.props.maxY || Math.max(...values.map(v => v.value));
        const padding = (maxY - minY) * 0.1

        if (this.divRef && this.divRef.current) {
            this.plot = new ScatterPlot(this.divRef.current)
              .id(d => d.time)
              .plotTitle(plotTitle)
              .yAxisLabel('amplitude')
              .xAxisLabel('time')
              .radius(0.3)
              .fill('black')
              .stroke('none')
              .domain(tStart, tEnd)
              .range(minY - padding, maxY + padding)
              .aspectRatio(3)
              .position(d => d.time, d => d.value);

            this.plot.update(values);
        }
    };

    render(): JSX.Element {
        this.plot && this.plot.update(this.props.values);

        return (
          <div className="TimePlot" ref={this.divRef}>
          </div>
        );
    };
}

export default TimePlot;
