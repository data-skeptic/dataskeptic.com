import React from "react";
import {Link} from 'react-router';
import {connect} from 'react-redux';

class ModalEscalationPolicyQuickAdd extends React.Component {
    constructor(props) {
        super(props)
    }

    handleChange(type, event) {
        var dispatch = this.props.dispatch
        var value = event.target.value
        var payload = {type, value} 
        dispatch({type: "TSE_UPDATE_CONTACT_INFO", payload })
    }

    handleAdd() {
        var dispatch = this.props.dispatch
        var payload = {dispatch}
        dispatch({type: "TSE_ADD_ESCALATION_POLICY", payload })
    }
    
    render() {
        var contact_methods = this.props.contact_methods
        console.log(contact_methods)
        var email = ""
        var sms = ""
        var voice_call = ""
        for (var method of contact_methods) {
            var type = method.type
            if (type == "email") {
                email = method.value
            }
            if (type == "sms") {
                sms = method.value
            }
            if (type == "voice_call") {
                voice_call = method.value
            }
        }
        return (
        	<div className="modal-escalation-policy-quick-add-inner">
                <p>Fill in only the services you want.  Multiple services is permitted.</p>
                <div className="row">
                    <div className="col-xs-2">Email:</div>
                    <div className="col-xs-10"><input onChange={this.handleChange.bind(this, "email")} value={email} /></div>
                </div>
                <div className="row">
                    <div className="col-xs-2">SMS:</div>
                    <div className="col-xs-10"><input onChange={this.handleChange.bind(this, "sms")} value={sms} /></div>
                </div>
                <div className="row">
                    <div className="col-xs-2">Voice call:</div>
                    <div className="col-xs-10"><input onChange={this.handleChange.bind(this, "voice_call")} value={voice_call} /></div>
                </div>
                <div className="row">
                    <div className="col-xs-2"></div>
                    <div className="col-xs-10"><button onClick={this.handleAdd.bind(this)} >Add Escalation Policy</button></div>
                </div>
        	</div>
        )
    }
}

export default connect(state => ({timeseries: state.timeseries}))(ModalEscalationPolicyQuickAdd)

