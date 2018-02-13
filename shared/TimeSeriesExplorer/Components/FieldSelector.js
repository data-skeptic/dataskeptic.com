import React from "react";
import {Link} from 'react-router';
import {connect} from 'react-redux';

class FieldSelector extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                Fields:
                <select className="tse-selector">
                    <option value="lat">lat</option>
                </select>
            </div>
        )
    }
}

export default connect(state => ({timeseries: state.timeseries}))(FieldSelector)

