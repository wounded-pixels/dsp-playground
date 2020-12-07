import React from 'react';
import TimePlot from './components/TimePlot/TimePlot';

import './App.scss';

function App() {
  return (
    <div className="App">
      <TimePlot xStart={0} xEnd={2} ys={[1,2,3,2,1,2,3,2,1,2,3,2,1]}/>
    </div>
  );
}

export default App;
