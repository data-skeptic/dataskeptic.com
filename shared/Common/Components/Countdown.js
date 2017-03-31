import React, {Component, PropTypes} from 'react';

import moment from 'moment';

export class Countdown extends Component {

    static propTypes = {
        onDeadlineReached: PropTypes.func,
    };

    constructor() {
        super();

        this.state = {
            diff: '00:00:00:00'
        };

        this.tick = this.tick.bind(this);
    };

    tick() {
        if (!this.props.to) {
            this.stopTick();
            return;
        }

        const now = moment(new Date());
        const end = moment(this.props.to || 0); // another date
        const diff = moment.utc(moment(end, "DD/MM/YYYY HH:mm:ss").diff(moment(now, "DD/MM/YYYY HH:mm:ss"))).format("DD:HH:mm:ss")

        console.log('update');
        if (now > end) {
            this.stopTick();
            this.props.onDeadlineReached();
        } else {
            this.setState({diff: diff});
        }
    }

    componentDidMount() {
        this.startTick();
    }

    componentWillReceiveProps(nextProps) {
        const diff = (moment(nextProps.to)).diff(moment(this.props.to));
        if (diff !== 0) {
            this.stopTick();
            this.startTick();
        }
    }

    startTick() {
        this.interval = setInterval(this.tick, 1000);
    }

    stopTick() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }

        this.setState({
            diff: '00:00:00:00'
        });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const {diff} = this.state;

        return (
            <span className="countdown">
                {diff.toString()}
            </span>
        )
    }
}

export default Countdown;
