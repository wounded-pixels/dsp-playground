import React, { FunctionComponent } from 'react';
import {Context, Topic} from 'components/stateless-helpers';
import { Link } from 'react-router-dom';

type Props = {};
const Topics: FunctionComponent<Props> = () => {
    return (
        <Topic>
            <h2>Topics</h2>
            <h3>Coming Soon - Sine, Cosine and the Unit Circle</h3>
            <Context>
                DSP depends on sine waves and you need to understand the unit circle in order to understand sine waves.
                This visualization shows how the height and width of the triangle in the unit circle map to the sine and cosine curves.
            </Context>
            <h3>Coming Soon - Sine over Time</h3>
            <Context>
                In trigonometry sine is all about angles of triangles. In DSP it is all about
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
        </Topic>
    );
};

export default Topics;
