export type CurveParameters = {
    amplitude: number;
    frequency: number;
    phase?: number;
};

export type TimeValue = {
    time: number;
    value: number;
};

export type Sample = TimeValue[];

export type LabeledPath = {
    label: string;
    path: string;
}
