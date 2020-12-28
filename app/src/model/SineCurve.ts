import {CurveParameters, TimeValue} from './types';

class SineCurve {
    private readonly curveParameters: CurveParameters;

    constructor(curveParameters: CurveParameters) {
        this.curveParameters = curveParameters;
    }

    sample(tStart: number, tEnd: number, samplingRate: number) : TimeValue[] {
        const {amplitude, frequency, phase} = this.curveParameters;
        const step = 1 / samplingRate;
        const pairs: TimeValue[] = [];
        for (let time = tStart; time <= tEnd; time += step) {
            const pair: TimeValue = {time, value: amplitude * Math.sin((time * frequency + phase) * 2 * Math.PI)};
            pairs.push(pair);
        }

        return pairs;

    }
}

export default SineCurve;