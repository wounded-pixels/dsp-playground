import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  Context,
  RevealLink,
  Row,
  ScrollToTopOnMount,
  Symbol,
  Title,
  Topic,
  Visualization,
} from 'components/stateless-helpers';
import CurveControl from '../components/CurveControl';
import TimePlot from '../components/TimePlot';
import { Sample } from '../model/types';
import SineCurve from '../model/SineCurve';

type Props = {};

type State = {
  amplitude: number;
  frequency: number;
};

class SineOverTime extends Component<Props, State> {
  state = {
    amplitude: 2,
    frequency: 1,
    phase: 0,
  };

  onChangeCurveParameter = (
    curveNumber: number,
    parameterName: 'amplitude' | 'frequency' | 'phase',
    value: number
  ) => {
    const state = this.state;
    state[parameterName] = value;
    this.setState(state);
  };

  render(): JSX.Element {
    const maxAmplitude = 5;
    const timePlotHeight = 150;
    const samplingRate = 600;
    const tEnd = 5;

    const { amplitude, frequency } = this.state;
    const firstSample: Sample = new SineCurve({ amplitude, frequency }).sample(
      0,
      tEnd,
      samplingRate
    );

    return (
      <Topic>
        <ScrollToTopOnMount />
        <h2>Sine over Time</h2>
        <Context>
          As the <Link to="/unit-circle">previous topic</Link> showed, a sine
          curve tracks the height of the opposite side of a right triangle as
          the inner angle goes from zero to 2π in radians.
          <p />
          Sine and cosine curves can also be used to model a lot of other
          physical phenomena. A single curve can be used to model:
          <ul>
            <li>alternating current in a wire</li>
            <li>the sound from a perfect tuning fork</li>
            <li>a constant frequency radio signal</li>
          </ul>
          In these applications the horizontal axis is no longer an angle but
          rather time. Instead of a length, the vertical axis represents some
          sort of intensity or strength.
          <p />
          When discussing these curves, the most important characteristic is
          usually the frequency, as in how frequently does the curve repeat in a
          single second. A
          <RevealLink
            onClick={() => {
              this.setState({ amplitude: 2 });
              this.setState({ frequency: 1 });
            }}
          >
            1 Hertz
          </RevealLink>
          (1 Hz) sine curve repeats once every second.
          <p />
          To get a curve that repeats N times a second, the argument to sine
          must be 2π multiplied by N. We would then describe it as having a
          frequency of N hertz.
          <p />
          The amplitude is how far the sine curve extends above and below the
          axis.
        </Context>
        <Visualization>
          <Row>
            <Symbol width="150px">&nbsp;</Symbol>
            <Title width="500px">
              {amplitude} sin({frequency} x 2π x time){' '}
            </Title>
          </Row>
          <Row>
            <CurveControl
              onChange={this.onChangeCurveParameter}
              curveNumber={0}
              curveParameters={{ amplitude, frequency }}
            />
            <TimePlot
              width={500}
              height={timePlotHeight}
              minY={-maxAmplitude}
              maxY={maxAmplitude}
              values={firstSample}
            />
          </Row>
        </Visualization>
        <Context>
          <h3>Real life amplitudes and frequencies</h3>
          <ul>
            <li>
              Household current in the US is usually 120 Volts in amplitude with
              a frequency of 60 Hz
            </li>
            <li>
              A middle C tuning fork produces a roughly 50 decibel wave at
              261.63 Hz
            </li>
            <li>
              A FM radio station produces waves with amplitudes that are
              generally below 50 thousand watts (50 kilowatts or 50kW) and
              frequencies that start at 88 million Hertz (88 megahertz or
              88MHz).
            </li>
          </ul>
        </Context>
        <Context>
          <h3>Next Steps</h3>A single sine or cosine curve is pretty boring. As
          we will see in the next topic, adding{' '}
          <Link to="/add-sines">two curves</Link> together can be surprisingly
          interesting.
        </Context>
      </Topic>
    );
  }
}

export default SineOverTime;
