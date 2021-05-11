import {CurveParameters} from "../model/types";

export function round(raw: number, multiplier = 100) {
    return Math.round(raw * multiplier) / multiplier;
}

export function clamp(value: number, min: number, max: number) {
    if (value > max) {
        return max;
    }

    if (value < min) {
        return min;
    }

    return value;
}

export function snap(value: number, digits: number) {
    const multiplier = 10 ** digits;
    return Math.round(value*multiplier) / multiplier;
}

export function convolve(signal: number[], kernel: number[]) {
    const output: number[] = [];
    const maxOutputIndex = signal.length + kernel.length - 1;
    for (let outIndex = 0; outIndex < maxOutputIndex; outIndex++) {
        output.push(0);
        for (let kernelIndex = 0; kernelIndex < kernel.length; kernelIndex++) {
            const signalIndex = outIndex - kernelIndex;
            if (signalIndex < 0 || signalIndex >= signal.length) {
                continue;
            }

            output[outIndex] += signal[signalIndex] * kernel[kernelIndex];
        }
    }

    return output;
}

export function createSignal(length: number, curveParameters: CurveParameters[], repetitions: number = 2) {
    const values: number[] = [];

    const lowestFrequency = Math.min(...curveParameters.map(cp => cp.frequency));
    const interval = repetitions * 2 * Math.PI / lowestFrequency; // we want the overall signal to repeat repetitions times
    const dt = interval / length;

    for (let time = 0; time < interval; time = time + dt) {
        let value = 0;
        for (const curveParameter of curveParameters) {
            value = value + curveParameter.amplitude * Math.sin(curveParameter.frequency * time);
        }

        values.push(value);
    }

    return values;
}

export function createNoise(length: number, mean: number, std: number) {
    const values = [];
    const sampleCount = 7;

    for (let index = 0; index < length; index++) {
        let sum = 0;
        for (let sampleIndex = 0; sampleIndex < sampleCount; sampleIndex++) {
            sum += Math.random();
        }

        // center at zero
        sum = sum - sampleCount/2;

        // apply std
        sum = sum * std;

        // recenter on mean
        sum += mean;

        values.push(sum);
    }

    return values;
}

export function addSignals(first: number[], second: number[]) {
    const values = [];

    const maxIndex = Math.min(first.length, second.length);
    for (let index = 0; index < maxIndex; index++) {
        values.push(first[index] + second[index]);
    }

    return values;
}

export function sinc(time: number) {
    if (time === 0) {
        return 1;
    }

    return Math.sin(Math.PI * time) / (Math.PI * time);
}

export function createLowPassKernel(cutoffFrequency: number, length: number = 51) {
    const values = [];
    for (let step = -Math.round(length / 2); step <= length / 2; step++) {
        values.push(sinc(2 * cutoffFrequency * step));
    }

    return normalize(values);
}

export function spectralInvert(kernel: number[]) {
    const values = kernel.map(value => -value);
    const middleIndex = Math.round(values.length/2);
    values[middleIndex] += 1;
    return values;
}

export function  normalize(raw: number[]) {
    const sum = raw.reduce((sum, value) => { return value +  sum;}, 0);
    return raw.map(value => value / sum);
}
