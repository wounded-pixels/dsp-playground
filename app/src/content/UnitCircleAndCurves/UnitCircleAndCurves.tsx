import React, { Component } from 'react';

import {Context, RevealLink, Row, ScrollToTopOnMount, Topic, Visualization} from 'components/stateless-helpers';
import UnitCircleControl from './UnitCircleControl';
import AnnotatedCurveControl from './AnnotatedCurveControl';

type Props = {};

type State = {};

const clampPiRatio = (raw: number): number =>  {
    const clamped = raw < 0 ? raw + 2 : raw;
    return Math.round(clamped * 100)/100;
};

class UnitCircleAndCurves extends Component<Props, State> {
    state = {
        piRatio: 0.25,
        revealLevel: 0,
    };

    onChangePiRatio = (piRatio: number) => {
        this.setState({piRatio: clampPiRatio(piRatio)});
    };

    setReveal = (revealLevel: number) => {
        this.setState({revealLevel});
    };

    render(): JSX.Element {
        const {revealLevel} = this.state;

        return (
            <Topic>
                <ScrollToTopOnMount />
                <h2>Sine, Cosine, and the Unit Circle</h2>
                <Context>
                    This visualization shows the anatomy of a
                    <RevealLink onClick={() => this.setReveal(0)}>unit circle</RevealLink>
                    and how a
                    <RevealLink onClick={() => this.setReveal(1)}>traditional trig triangle</RevealLink>
                    fits inside the unit circle.<p/>
                    Then it shows how a unit circle is related to a
                    <RevealLink onClick={() => this.setReveal(2)}>sine curve.</RevealLink>
                    Finally it brings<RevealLink onClick={() => this.setReveal(3)}>Cosine curves</RevealLink>
                    into the picture.<p/>
                    But let's start at the beginning.
                </Context>
                <Row>
                    <Visualization>
                        <UnitCircleControl onChange={this.onChangePiRatio} piRatio={this.state.piRatio} revealLevel={revealLevel}/>
                    </Visualization>
                    <Context>
                        <Context>
                            <h3>Unit Circle</h3>
                            A unit circle is a circle that is centered at x=0, y=0.<p/>
                            The white line from (0,0) to the circle always has length of 1.
                            The green arc shows the distance around the perimeter of the circle.<p/>
                            Perhaps you recall the formula for the perimeter
                            of a circle?<br/>
                            As you drag the grey knob around, what do you expect the arc length to be at the top?<br/>
                            At the far left? At the bottom? Not that you will ever quite see it, but how about the far right?<p/>
                            Now that our circle makes sense, let's add
                            <RevealLink onClick={() => {
                                this.setReveal(1);
                                this.onChangePiRatio(0.25)}
                            }>
                                a triangle!
                            </RevealLink>
                        </Context>
                    {revealLevel >= 1 && (
                        <Context>
                            <h3>The Triangle</h3>
                            We just put a traditional triangle from trigonometry inside of our circle with the hypotenuse along the radius
                            with a length of 1.
                            The horizontal side is shown in blue and the vertical side is shown in orange.<p/>
                            The length of the arc gives us a way to describe the inside angle of the triangle in radians.<p/>
                            Focus on the length of the orange vertical line as you change the angle. It leads directly to our next topic,
                            <RevealLink onClick={() => this.setReveal(2)}>sine curves</RevealLink>
                        </Context>
                    )}
                    </Context>
                </Row>
                {revealLevel >= 2 && (
                    <Row>
                        <Context>
                            <h3>Sine Curve</h3>
                            In our normal trig triangle, the sine of the angle is the length of
                            the opposite side divided by the hypotenuse.
                            Or to put it the other way, the height of the opposite side of a triangle is the hypotenuse
                            multiplied by the sine of the angle.<p/>
                            But our triangle is trapped in a unit circle so the hypotenuse is always 1 and the opposite side
                            of the triangle and the sine of the angle are exactly the same.<p/>
                            As you manipulate the angle you can see how the vertical side of the triangle in the unit circle
                            matches up to the value of the sine curve.
                        </Context>
                        <AnnotatedCurveControl onChange={this.onChangePiRatio} piRatio={this.state.piRatio} yFunction={Math.sin}/>
                    </Row>
                )}

                <Context>
                    {revealLevel >= 3 && <AnnotatedCurveControl onChange={this.onChangePiRatio} piRatio={this.state.piRatio} yFunction={Math.cos}/>}
                </Context>
                <Context>
                    <h3>Next Steps</h3>
                    <div>
                    </div>
                </Context>
            </Topic>
        );
    };
}
export default UnitCircleAndCurves;