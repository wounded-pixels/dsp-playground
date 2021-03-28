import React, {Component} from 'react';

import './FrequencyDomainPlayer.scss';

type Props = {
    amplitudes: number[];
    frequencies: number[];
    maxAmplitude: number;
};

type State = {
    first: boolean,
    playing: boolean,
};

class FrequencyDomainPlayer extends Component<Props, State> {
    // @ts-ignore
    private audioCtx: AudioContext = new (window.AudioContext || window.webkitAudioContext)();

    private oscillators: OscillatorNode[] = [];
    private amplitudeNodes: GainNode[] = [];
    private mergeGainNode: GainNode = this.audioCtx.createGain();

    state = {
        first: true,
        playing: false,
    };

    componentDidMount() {

        for (let ctr = 0; ctr < this.props.amplitudes.length; ctr++) {
            const oscillator = this.audioCtx.createOscillator();
            oscillator.frequency.setValueAtTime(this.props.frequencies[ctr], this.audioCtx.currentTime);

            const amplitudeNode = this.audioCtx.createGain();
            amplitudeNode.gain.value = 0;

            oscillator.connect(amplitudeNode);
            amplitudeNode.connect(this.mergeGainNode);

            this.oscillators.push(oscillator);
            this.amplitudeNodes.push(amplitudeNode);
        }

        this.mergeGainNode.connect(this.audioCtx.destination);
    }

    togglePlayer = () => {
        const playing = !this.state.playing;

        if (playing && this.state.first) {
            for (const oscillator of this.oscillators) {
                oscillator.start();
            }
            this.setState({first: false});
        }

        this.setState({playing});
    };

    render(): JSX.Element {
        const title = this.state.playing ? 'Stop' : 'Play';

        if (this.state.playing) {
            this.amplitudeNodes.forEach((node, index) => {
                node.gain.value = 1 * this.props.amplitudes[index] / this.props.maxAmplitude;
            });
        } else {
            for (const amplitudeNode of this.amplitudeNodes) {
                amplitudeNode.gain.value = 0;
            }
        }

        return (
            <button onClick={this.togglePlayer}>{title}</button>
        );
    };
}


export default FrequencyDomainPlayer;
