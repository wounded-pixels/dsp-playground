import React, { FunctionComponent } from 'react';
import { Context, Topic } from 'components/stateless-helpers';

type Props = {};
const About: FunctionComponent<Props> = () => {
  return (
    <Topic>
      <h2>About</h2>
      <Context>
        I believe that people learn by tinkering, exploring, breaking and
        re-assembling things. For most of us the math is only valuable to nail
        down the details after we see where things are headed. So, pretty much
        every page of this site has dials, sliders or gizmos that drive the
        visualizations. Tinker away!
      </Context>
      <h3>Goals</h3>
      <Context>
        Digital Signal Processing (DSP) can be a very daunting topic - lots of
        math and some pretty arcane terminology. It is also a ridiculously
        powerful foundation for a lot of very powerful technology. DSP is very
        much worth your time and effort. I hope this playground helps you build
        some intellectual momentum as you learn it.
      </Context>
      <h3>Who</h3>
      <Context>
        I am a software developer who works around DSP and finds it fascinating.
        I also really enjoy building visualizations. This site is my way of
        deepening my own understanding and (hopefully) giving a little bit back
        to the community.
      </Context>
    </Topic>
  );
};

export default About;
