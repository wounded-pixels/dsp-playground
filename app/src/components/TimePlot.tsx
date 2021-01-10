import React, {Component} from 'react';

import './TimePlot.scss';
import {Sample} from 'model/types';
import {PointPlot} from 'canvas-components/PointPlot';

interface Props {
    values: Sample;
    width: number;
    height: number;
    minY?: number;
    maxY?: number;
    plotTitle?: string;
}

class TimePlot extends Component<Props> {
    private divRef: any = React.createRef();
    private plot: any;

    componentDidMount() {
        const {values, width, height} = this.props;
        const plotTitle = this.props.plotTitle || '';
        const tStart = values[0].time;
        const tEnd = values[values.length - 1].time;
        const minY = this.props.minY || Math.min(...values.map(v => v.value));
        const maxY = this.props.maxY || Math.max(...values.map(v => v.value));

        if (this.divRef && this.divRef.current) {
            this.plot = new PointPlot(this.divRef.current, width, height)
              .plotTitle(plotTitle)
              .xAxisLabel('time')
              .domain(tStart, tEnd)
              .range(minY, maxY)
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
