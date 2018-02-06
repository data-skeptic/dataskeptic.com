import React from "react"
import {Link} from 'react-router'
import {connect} from 'react-redux'
import Select from 'react-select'
import ReactModal from 'react-modal'

import AlertPicker from "./AlertPicker"
import ModalEscalationPolicyQuickAdd from './ModalEscalationPolicyQuickAdd'

// TODO: review this
//       https://reactcommunity.org/react-modal/examples/set_app_element.html
//       https://reactcommunity.org/react-modal/examples/inline_styles.html
// see also ModalEscalationPolicyQuickAdd
//ReactModal.setAppElement('#modal_escalation_policy_quickadd');

class AlertsAdd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          showModal: false
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
  
    handleOpenModal () {
        console.log("hmo")
        this.setState({ showModal: true });
    }
  
    handleCloseModal () {
        this.setState({ showModal: false });
    }

    componentWillMount() {
    	var dispatch = this.props.dispatch
    	//dispatch({type: "INITIALIZE_TIME_SERIES_EXPLORER", payload: {}})
    }

    handleEscalationPolicyPicked(selectedOption) {
        var dispatch = this.props.dispatch
        dispatch({type: "TSE_SET_ESCALATION_POLICY", payload: {selectedOption}})
    }

    handleAlertSave() {
        var dispatch = this.props.dispatch
        dispatch({type: "TSE_SAVE_ALERT", payload: {dispatch}})
    }

    render() {
        var escalation_policy = this.props.escalation_policy
    	var escalation_policies = this.props.escalation_policies
        var contact_methods = this.props.contact_methods
        var alert_type = this.props.alert_type
        if (escalation_policies == undefined) {
            return <div>Loading...</div>
        }
        var modal = (
            <ReactModal 
               id="modal_escalation_policy_quickadd"
               isOpen={this.state.showModal}
               contentLabel="Quick Add Escalation Policy"
               onRequestClose={this.handleCloseModal}>
               <div className="modal-escalation-policy-quick-add">
                   <button onClick={this.handleCloseModal}>Close</button>
                   <ModalEscalationPolicyQuickAdd contact_methods={contact_methods} />
               </div>
            </ReactModal>
        )
        if (escalation_policies.length == 0) {
            return (
                <div className="row">
                    <div className="col-sm-8"><p>You don't have any escalation policies set up yet.</p></div>
                    <div className="col-sm-4"><button className="escalation-quick-add" onClick={this.handleOpenModal}>Quick Add One</button></div>
                    {modal}
                </div>
            )
        }
        var value = undefined
        if (escalation_policy != undefined) {
            value = escalation_policy.id
        }
        var options = []
        for (var policy of escalation_policies) {
            var methods = policy.methods
            var value = -1
            var names = []
            for (var method of methods) {
                names.push(method.type + ' to ' + method.value)
                value = method.id
            }
            var label = names.join(', ')
            var option = {value, label}
            options.push(option)
        }
        return (
        	<div className="time-series-alerts">
                <h4>Add Alert</h4>
                <AlertPicker alert_type={alert_type} />

                <div className="row">
                    <div className="col-xs-12 col-sm-2">
                        Escalation Policy:
                    </div>
                    <div className="col-xs-12 col-sm-8">
                        <Select
                            name="escalation_policy"
                            value={value}
                            onChange={this.handleEscalationPolicyPicked.bind(this)}
                            options={options}
                        />
                    </div>
                    <div className="col-xs-12 col-sm-2">
                        <button className="escalation-quick-add" onClick={this.handleOpenModal}>New policy</button>
                        {modal}
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12">
                        <button className="save-alert-btn" onClick={this.handleAlertSave.bind(this)}>Save</button>
                    </div>
                </div>
        	</div>
        )
    }
}

export default connect(state => ({timeseries: state.timeseries}))(AlertsAdd)

