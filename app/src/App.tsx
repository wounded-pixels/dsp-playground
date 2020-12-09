import React from 'react';
import TimePlot from './components/TimePlot/TimePlot';

import SineCurve from './model/SineCurve';

import { addSamples } from './util/samples';

import './App.scss';

function App() {
    const samplingRate = 400;
    const tEnd = 5;
    const slow = new SineCurve(2, 0.5)
        .sample(0, tEnd, samplingRate);

    const fast = new SineCurve(0.5, 2)
        .sample(0, tEnd, samplingRate);

    const faster = new SineCurve(0.25, 4)
        .sample(0, tEnd, samplingRate);

    const combined = addSamples(slow, fast, faster);



  return (
    <div className="App">
      <TimePlot  values={slow} />
      <TimePlot  values={fast} />
      <TimePlot  values={faster} />
      <TimePlot  values={combined} />
    </div>
  );
}

export default App;
