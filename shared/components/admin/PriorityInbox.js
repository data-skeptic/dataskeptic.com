import React from "react"
import ReactDOM from "react-dom"
import {Link} from 'react-router'
import {connect} from 'react-redux'
import axios from "axios";
import PriorityInboxForm from "./PriorityInboxForm";

class PriorityInbox extends React.Component {
    constructor(props) {
        super(props);
    }

    handleContactUs({name, email, message}) {
        const MAIL_SERVICE_URL = "api/v1/mail";
        const error = '';
        const data = {name, email, msg: message, error, type: "contact"};
        return axios.post(MAIL_SERVICE_URL, data);
    }

    notifyAdminBySms(data) {
        const SMS_SERVICE_URL = "api/v1/priorityInbox";
        return axios.post(SMS_SERVICE_URL, data);
    }

    handleSubmit =(data) => {
        return Promise.all([
            this.handleContactUs(data),
            this.notifyAdminBySms(data)
        ])
    }

    render() {
        var oadmin = this.props.admin.toJS()
        return (
            <div>
                <h3>Priority Inbox</h3>
                <div className="priority_inbox">
                    <PriorityInboxForm
                        onSubmit={this.handleSubmit}
                    />
                </div>
            </div>
        )
    }
}

export default connect(state => ({admin: state.admin}))(PriorityInbox)
