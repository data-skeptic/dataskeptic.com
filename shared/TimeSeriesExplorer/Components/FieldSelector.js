import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class FieldSelector extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    var fields = this.props.fields
    return (
      <div className="fields-selector">
        Fields:<br />
        <select className="tse-selector" onChange={this.props.onChange}>
          {fields.map(field => <option>{field}</option>)}
        </select>
      </div>
    )
  }
}

export default connect(state => ({ timeseries: state.timeseries }))(
  FieldSelector
)
