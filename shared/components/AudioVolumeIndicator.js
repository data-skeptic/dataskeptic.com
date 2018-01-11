import React, { Component } from 'react'

class AudioVolumeIndicator extends Component {

    componentDidMount() {
        this.ctx = this.refs.canvas.getContext('2d')

        this.init()
    }

    componentWillUnmount() {
        this.stop()
    }

    init() {
        const { audioId } = this.props

        this.context = new AudioContext();
        this.audio = this.context.createMediaElementSource(document.getElementById(audioId));
        this.analyser = this.context.createAnalyser(); //we create an analyser
        this.analyser.smoothingTimeConstant = 0.9;
        this.analyser.fftSize = 512; //the total samples are half the fft size.
        this.audio.connect(this.analyser);
        this.analyser.connect(this.context.destination);

        this.start()
    }

    start() {
        if (!this.drawing) {
            this.drawing = window.requestAnimationFrame(this.loop);
        }
    }

    stop() {
        if (this.drawing) {
            window.cancelAnimationFrame(this.drawing);
            this.drawing = undefined;
        }
    }

    loop = () => {
        this.drawing = undefined;

        this.draw()
        this.start()
    }

    draw = () => {
        const ctx = this.ctx
        const analyser = this.analyser
        const {width, height} = this.props

        const array = new Uint8Array(analyser.fftSize);
        analyser.getByteTimeDomainData(array);
        ctx.clearRect(0, 0, width, height);

        var average = 0;
        var max = 0;
        for (let i = 0; i < array.length; i++) {
            let a = Math.abs(array[i] - 128);
            average += a;
            max = Math.max(max, a);
        }

        average /= array.length;
        ctx.fillStyle = 'blue';
        ctx.fillRect(0, 512-average, 512, 512);
        ctx.beginPath();
        ctx.arc(128, 128, average, 0, Math.PI * 2, true);
        ctx.arc(128 + 256, 128, max, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

        this.start()
    }

    render() {
        const {width, height, style} = this.props

        return (
            <canvas
                ref='canvas'
                width={width}
                height={height}
                style={style}
            />
        )
    }

}

export default AudioVolumeIndicator