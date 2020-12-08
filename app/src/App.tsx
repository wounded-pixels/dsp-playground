import React from 'react';
import TimePlot from './components/TimePlot/TimePlot';

import SineCurve from './model/SineCurve';

import './App.scss';

function App() {
    const samplingRate = 200;
    const slow = new SineCurve(2, 0.5)
        .sample(0, 10, samplingRate);

    const fast = new SineCurve(0.5, 2)
        .sample(0, 10, samplingRate);



  return (
    <div className="App">
      <TimePlot  values={slow} />
      <TimePlot  values={fast} />
    </div>
  );
}

export default App;
