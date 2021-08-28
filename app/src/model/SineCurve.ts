import { CurveParameters, Sample, TimeValue } from './types';

class SineCurve {
  private readonly curveParameters: CurveParameters;

  constructor(curveParameters: CurveParameters) {
    this.curveParameters = curveParameters;
  }

  sample(tStart: number, tEnd: number, samplingRate: number): Sample {
    const { amplitude, frequency } = this.curveParameters;
    const phase = this.curveParameters.phase || 0;

    const step = 1 / samplingRate;
    const pairs: TimeValue[] = [];
    for (let time = tStart; time <= tEnd; time += step) {
      const pair: TimeValue = {
        time,
        value: amplitude * Math.sin((time * frequency + phase) * 2 * Math.PI),
      };
      pairs.push(pair);
    }

    return pairs;
  }
}

export default SineCurve;
