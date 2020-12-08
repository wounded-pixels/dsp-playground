import TimeValue from './TimeValue';

class SineCurve {
    private amplitude: number;
    private frequency: number;
    private phase: number;

    constructor(amplitude: number, frequency: number, phase: number = 0) {
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.phase = phase;
    }

    sample(tStart: number, tEnd: number, samplingRate: number) : TimeValue[] {
        const step = 1 / samplingRate;
        const pairs: TimeValue[] = [];
        for (let time = tStart; time <= tEnd; time += step) {
            const pair = new TimeValue(time, this.amplitude * Math.sin(time * this.frequency * 2 * Math.PI));
            pairs.push(pair);
        }

        return pairs;

    }
}

export default SineCurve;