import React, {Component, PropTypes} from 'react';
import isArray from 'lodash.isarray';

class WizardContainer extends Component {

    static propTypes = {
        activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
    };

    constructor() {
        super();

        this.isStepVisible = this.isStepVisible.bind(this);
    }

    getVisibleKey() {
        return this.props.activeKey;
    }

    isArrayKey(key) {
        return key.indexOf(',') > -1;
    }

    parseArrayKey(key) {
        return key.split(',');
    }

    isStepVisible(candidateKey) {
        const visibleKey = this.getVisibleKey();

        if (this.isArrayKey(candidateKey)) {
            candidateKey = this.parseArrayKey(candidateKey);
            return candidateKey.indexOf(visibleKey) > -1
        }

        return (candidateKey === visibleKey);
    }

    render() {
        const {children = []} = this.props;
        let visibleChildren = children;

        // single wizard page
        if (isArray(children)) {
            visibleChildren = children.filter((step) => this.isStepVisible(step.key));
        }

        return (
            <div className="wizard-container">
                {visibleChildren}
            </div>
        )
    }

}

export default WizardContainer;