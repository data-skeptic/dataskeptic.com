import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Alerts from './Alerts'
import DatabaseSelector from './DatabaseSelector'
import MeasurementSelector from './MeasurementSelector'
import FieldSelector from './FieldSelector'
import TagSelector from './TagSelector'
import Select from 'react-select'

class Options extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    var dispatch = this.props.dispatch
    //dispatch({type: "INITIALIZE_TIME_SERIES_EXPLORER", payload: {}})
  }

  handleDatabaseChange() {
    var dispatch = this.props.dispatch
    dispatch({ type: 'TSE_SET_DATABASE', payload: { dispatch } })
  }

  handleMeasurementChange(selectedOption) {
    var dispatch = this.props.dispatch
    dispatch({
      type: 'TSE_SET_MEASUREMENT',
      payload: { dispatch, selectedOption }
    })
  }

  handleTagChange(selectedOption) {
    console.log(selectedOption)
    var tag = selectedOption.target.value
    var dispatch = this.props.dispatch
    dispatch({ type: 'TSE_SET_TAG', payload: { dispatch, tag } })
  }

  handleFieldChange(selectedOption) {
    console.log(selectedOption)
    var field = selectedOption.target.value
    var dispatch = this.props.dispatch
    dispatch({ type: 'TSE_SET_FIELD', payload: { dispatch, field } })
  }

  handleFunctionChange(selectedOption) {
    var dispatch = this.props.dispatch
    dispatch({ type: 'TSE_SET_FUNC', payload: { selectedOption } })
  }

  handleRangeChange(selectedOption) {
    var dispatch = this.props.dispatch
    dispatch({ type: 'TSE_SET_RANGE', payload: { selectedOption } })
  }

  handleResolutionChange(selectedOption) {
    var dispatch = this.props.dispatch
    dispatch({ type: 'TSE_SET_RESOLUTION', payload: { selectedOption } })
  }

  handleSearch() {
    var dispatch = this.props.dispatch
    dispatch({ type: 'TSE_SEARCH', payload: { dispatch } })
  }

  render() {
    var config = this.props.config
    let {
      databases,
      measurements,
      database,
      measurement,
      field,
      fields,
      tag,
      tags,
      func,
      range,
      resolution
    } = config
    return (
      <div className="time-series-options">
        <div className="row">
          <div className="col-xs-12 col-sm-3">
            <DatabaseSelector
              databases={databases}
              onChange={this.handleDatabaseChange.bind(this)}
            />
          </div>
          <div className="col-xs-12 col-sm-3">
            <MeasurementSelector
              measurements={measurements}
              measurement={measurement}
              onChange={this.handleMeasurementChange.bind(this)}
            />
          </div>
          <div className="col-xs-12 col-sm-3">
            <TagSelector
              tags={tags}
              tag={tag}
              onChange={this.handleTagChange.bind(this)}
            />
          </div>
          <div className="col-xs-12 col-sm-3">
            <FieldSelector
              fields={fields}
              field={field}
              onChange={this.handleFieldChange.bind(this)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-4">
            Function:
            <Select
              name="func"
              value={func}
              onChange={this.handleFunctionChange.bind(this)}
              options={[
                { value: 'COUNT', label: 'COUNT' },
                { value: 'MEAN', label: 'MEAN' },
                { value: 'MEDIAN', label: 'MEDIAN' },
                { value: 'MODE', label: 'MODE' },
                { value: 'MIN', label: 'MIN' },
                { value: 'MAX', label: 'MAX' },
                { value: 'STDDEV', label: 'STDDEV' },
                { value: 'SUM', label: 'SUM' },
                { value: 'DISTINCT', label: 'DISTINCT' }
              ]}
            />
          </div>
          <div className="col-xs-12 col-sm-4">
            Range:
            <Select
              name="range"
              value={range}
              onChange={this.handleRangeChange.bind(this)}
              options={[
                { value: '-10m', label: '10 minutes' },
                { value: '-30m', label: '30 minutes' },
                { value: '-1h', label: '1 hour' },
                { value: '-3h', label: '3 hours' },
                { value: '-12h', label: '12 hours' },
                { value: '-1d', label: '1 day' },
                { value: '-7d', label: '7 days' },
                { value: '-30d', label: '30 days' }
              ]}
            />
          </div>
          <div className="col-xs-12 col-sm-4">
            Resolution:
            <Select
              name="resolution"
              value={resolution}
              onChange={this.handleResolutionChange.bind(this)}
              options={[
                { value: '1m', label: '1 minute' },
                { value: '15m', label: '15 minutes' },
                { value: '1h', label: '1 hour' },
                { value: '1d', label: '1 day' }
              ]}
            />
          </div>
        </div>
        <button
          className="time-series-options-search-btn"
          onClick={this.handleSearch.bind(this)}
        >
          Search
        </button>
      </div>
    )
  }
}

export default connect(state => ({ timeseries: state.timeseries }))(Options)
