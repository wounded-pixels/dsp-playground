import { Sample, TimeValue } from 'model/types';

export const addSamples = (...samples: Sample[]): Sample => {
  const sum: TimeValue[] = [];

  for (let col_index = 0; col_index < samples[0].length; col_index++) {
    sum.push({ time: samples[0][col_index].time, value: 0 });
    for (let sample_index = 0; sample_index < samples.length; sample_index++) {
      sum[col_index].value += samples[sample_index][col_index].value;
    }
  }

  return sum;
};
