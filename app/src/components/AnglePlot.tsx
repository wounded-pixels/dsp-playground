import React, {Component} from 'react';

import './AnglePlot.scss';
import {PointPlot} from 'canvas-components/PointPlot';

type Props = {
    width: number;
    height: number;
    piRatio: number;
    yFunction: (angle: number) => number;
    plotTitle?: string;
};

const stepSize = 0.01;

const allValues: {piRatio: number}[] = [];
for (let piRatio=0; piRatio <= 2; piRatio += stepSize) {
    allValues.push({piRatio});
}

class AnglePlot extends Component<Props> {
    private divRef: any = React.createRef();
    private plot: any;

    componentDidMount() {
        const {width, height, yFunction} = this.props;
        const plotTitle = this.props.plotTitle || '';

        if (this.divRef && this.divRef.current) {
            this.plot = new PointPlot(this.divRef.current, width, height)
              .plotTitle(plotTitle)
              .domain(0, 2)
              .range(-1, 1)
              .position(d => d.piRatio, d => yFunction(d.piRatio * Math.PI));

            const values = this.calculateValues();
            this.plot.update(values);
        }
    };

    calculateValues(): {piRatio: number}[] {
        const values: {piRatio: number}[] = [];
        for (let piRatio=0; piRatio <= this.props.piRatio; piRatio += stepSize) {
            values.push({piRatio});
        }

        return values;
    }

    render(): JSX.Element {
        const values = this.calculateValues();
        this.plot && this.plot.update(values);

        return (
          <div className="AnglePlot" ref={this.divRef}>
          </div>
        );
    };
}

export default AnglePlot;
