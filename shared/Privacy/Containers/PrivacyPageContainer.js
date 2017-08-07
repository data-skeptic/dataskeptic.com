import React, {Component} from 'react'
import PrivacyText from '../Components/PrivacyText'

class PrivacyPageContainer extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="center">
                <PrivacyText/>
            </div>
        );
    }
}

export default PrivacyPageContainer;