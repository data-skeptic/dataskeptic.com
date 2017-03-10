import React, {Component} from 'react';

export class Countdown extends Component {

    constructor() {
        super();

        this.state = {
            sec: 0
        }

        this.tick = this.tick.bind(this);
    };

    tick() {
        this.setState({sec: this.state.sec - 1});
        console.log('[Count] tick', this.state.sec)
        if (this.state.sec <= 0) {
            clearInterval(this.interval);
        }
    }

    componentDidMount() {
        this.setState({ sec : this.props.sec || 0 });
        console.log('[Count] init', this.state.sec)
        this.interval = setInterval(this.tick, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const {sec} = this.state;

        return (
            <div className="countdown">
                {sec}
            </div>
        )
    }
}

export default Countdown;
