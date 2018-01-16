import React, { Component } from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux"

class Analytic extends Component {

    render() {
        return (
            <div>
                Analytic
            </div>
        )
    }

}

export default connect(
    (state) => ({

    }),
    (dispatch) => bindActionCreators({

    }, dispatch)
)(Analytic);