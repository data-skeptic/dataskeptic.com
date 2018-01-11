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

        // store previous values
        this.capYPositionArray = [];

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

        this.capYPositionArray = [];
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
        const {barWidth = 10, barSpace = 4, capHeight = 2} = this.props
        const {
            normalLevelColor = '#0f0',
            averageLevelColor = '#ff0',
            highLevelColor = '#f00',
            capColor='#000'
        } = this.props

        const array = new Uint8Array(analyser.fftSize);
        analyser.getByteFrequencyData(array);

        let gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(1, normalLevelColor);
        gradient.addColorStop(0.5, averageLevelColor);
        gradient.addColorStop(0, highLevelColor);

        let capYPositionArray = this.capYPositionArray;

        let meterNum = width

        let cwidth = width,
            cheight = height - barSpace;

        ctx.clearRect(0, 0, cwidth, cheight);

        const step = Math.round(array.length / meterNum);
        for (let i = 0; i < meterNum; i++) {
            let value = array[i * step]

            if (capYPositionArray.length < Math.round(meterNum)) {
                capYPositionArray.push(value)
            }
            ctx.fillStyle = capColor

            //draw the cap, with transition effect
            if (value < capYPositionArray[i]) {
                ctx.fillRect(i * (barSpace + barWidth), cheight - (--capYPositionArray[i]), barWidth, capHeight);
            } else {
                ctx.fillRect(i * (barSpace + barWidth), cheight - value, barWidth, capHeight);
                capYPositionArray[i] = value;
            }

            ctx.fillStyle = gradient;
            ctx.fillRect(i * (barWidth+barSpace), cheight - value + capHeight, barWidth, cheight); //the meter
        }
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