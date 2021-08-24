import React, { FunctionComponent } from 'react';
import {Context, Topic} from 'components/stateless-helpers';
import { Link } from 'react-router-dom';

type Props = {};
const Topics: FunctionComponent<Props> = () => {
    return (
        <Topic>
            <h2>Topics</h2>
            <h3><Link to="/unit-circle">Sine, Cosine and the Unit Circle</Link></h3>
            <Context>
                DSP depends on sine waves and you need to understand the unit circle in order to understand sine waves.
                This visualization shows how the height and width of the triangle in the unit circle map to the sine and cosine curves.
            </Context>
            <h3><Link to="/sine-over-time">Sine over Time</Link></h3>
            <Context>
                In trigonometry sine is all about angles and the height of a triangle. In DSP it is all about
                sound or signal intensity over time.
            </Context>
            <h3><Link to="/add-sines">Addition of Sine Curves</Link></h3>
            <Context>
                Simple combinations of the humble sine curve yield many strange and useful curves.
                Let's start by specifying the amplitude and frequency of two curves and adding them together.
            </Context>
            <h3><Link to="/sum-many-sines">Sum of Many Sines</Link></h3>
            <Context>
                We can get interesting shapes by adding two sines together. What mischief can we create with twenty?
            </Context>
            <h3><Link to="/sounds-from-sines">Sounds from Sines</Link></h3>
            <Context>
                We can make some fairly interesting sounds by combining sine waves
            </Context>
            <h3><Link to="/convolution-steps">Convolution Steps</Link></h3>
            <Context>
                Convolution is not as complicated as it first appears. Ok, why it works is still magic to me but we can
                definitely understand the mechanics!
            </Context>
            <h3>Coming Soon</h3>
            <ul>
                <li>Encoding information with Amplitude Modulation</li>
                <li>Encoding information with Frequency Modulation</li>
                <li>Introduction to Convolution</li>
                <li>Convolution - DSP's Swiss army chainsaw</li>
                <li>Discrete Fast Fourier Transforms</li>
                <li>Sampling</li>
            </ul>
        </Topic>
    );
};

export default Topics;
