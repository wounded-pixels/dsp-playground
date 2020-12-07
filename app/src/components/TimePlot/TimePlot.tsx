import React, {Component} from 'react';

import { ScatterPlot } from '@wounded-pixels/eda';

interface Props {
    ys: number[];
    xStart: number;
    xEnd: number;
}

class TimePlot extends Component<Props> {
    private divRef: any = React.createRef();
    private plot: any;

    componentDidMount() {
        const { xStart, xEnd, ys } = this.props;
        const step = (xEnd - xStart) / ys.length;

        const data = ys.map((value, index) => {
            return {
                id: index,
                x: xStart + step*index,
                y: value
            };
        });

        if (this.divRef && this.divRef.current) {
            this.plot = new ScatterPlot(this.divRef.current)
                .id(d => d.id)
                .radius(0.3)
                .stroke('black')
                .domain(xStart,xEnd)
                .range(-3,4)
                .position(d => d.x, d => d.y);

            this.plot.update(data);
        }
    };

    render(): JSX.Element {
        return (
            <div style={{width: '100%'}}>
                <div ref={this.divRef} style={{display: 'flex', flexDirection: 'column'}}>
                </div>
            </div>
    );
    };
}

export default TimePlot;