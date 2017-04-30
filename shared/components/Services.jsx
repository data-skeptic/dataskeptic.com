import React from "react"
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import ContactFormContainer from "../Contacts/Containers/ContactFormContainer/ContactFormContainer";

import {changePageTitle} from '../Layout/Actions/LayoutActions';

class Services extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {dispatch} = this.props;
        const {title} = Services.getPageMeta(this.props);
        dispatch(changePageTitle(title));
    }

    static getPageMeta() {
        return {
            title: 'Services | Data Skeptic'
        }
    }

    render() {
        return (
            <div className="center services-outer">
                <div className="row services-container">
                    <div className="col-xs-12 col-sm-6 services-box">
                        <div className="services-inner">
                            <div className="services-title">Technology Advisor</div>
                            <p>When creating data science microservices, products, and systems, you need a scalable
                                robust infrastructure and deployment plan. Picking the right platform to suit your use
                                case is difficult. We can help cut through the marketing BS and identify the solutions
                                that will scale for you.</p>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 services-box">
                        <div className="services-inner">
                            <div className="services-title">Team Building</div>
                            <p>Are you looking to hire your first data scientist or expand your fledgling team? Finding
                                the right data scientist to match your unique business needs can be challenging. We can
                                help you identify the backgrounds appropriate for achieving your goals and help recruit
                                a world class team.</p>
                        </div>
                    </div>
                </div>
                <div className="row services-container">
                    <div className="col-xs-12 col-sm-6 services-box">
                        <div className="services-inner">
                            <div className="services-title">Solutions</div>
                            <p>Does your organization need a key data science solution, but not an expensive long term
                                team? Let us help take you from proof of concept to production delivery. The team behind
                                Data Skeptic can build to your vision and integrate with your existing technology
                                stack.</p>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 services-box">
                        <div className="services-inner">
                            <div className="services-title">Advertising</div>
                            <p>Data Skeptic is the #1 ranked data science related podcast on iTunes. We reach a highly
                                targeted audience on a weekly basis via the podcast as well as via the Data Skeptic blog
                                and other outlets. Let's talk about how we can help get your message to our
                                audience.</p>
                        </div>
                    </div>
                </div>
                <div className="clear"></div>
                <ContactFormContainer />
            </div>
        )
    }
}

export default connect(
    state => ({})
)(Services)



