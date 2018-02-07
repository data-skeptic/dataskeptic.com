import React from "react";
import {Link} from 'react-router';
import {connect} from 'react-redux';
import ReactEcharts from 'echarts-for-react';

class Plot extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
    	var dispatch = this.props.dispatch
    	//dispatch({type: "INITIALIZE_TIME_SERIES_EXPLORER", payload: {}})
    }

    render() {
    	var otimeseries = this.props.timeseries.toJS()
        var plot_data = otimeseries['plot_data']
        if (plot_data == undefined) {
            return (
                <div className="time-series-plot">
                    Nothing to show.
                </div>
            )
        }
        var xlabels = []
        var data = []
        for (var item of plot_data) {
            var time  = item['time']
            var datum = item['val']
            xlabels.push(time)
            data.push(datum)
        }
        var option = {
            xAxis: {
                type: 'category',
                data: xlabels
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: data,
                type: 'line'
            }]
        };
        var plot_title = "Plot Title"
        return (
        	<div className="time-series-plot">
        		<h4>{plot_title}</h4>
                
                <ReactEcharts
                  option={option}
                  style={{height: '300px', width: '100%'}}
                  className='echarts-for-echarts'
                  theme='my_theme' />
        	</div>
        )
    }
}

export default connect(state => ({timeseries: state.timeseries}))(Plot)

