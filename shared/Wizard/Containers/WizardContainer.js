import React, {Component, PropTypes} from 'react';

class WizardContainer extends Component {

    static propTypes = {
        children: PropTypes.node,
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
        const {children} = this.props;

        const visibleChildren = children.filter((step) => this.isStepVisible(step.key));

        return (
            <div className="wizard-container">
                {visibleChildren}
            </div>
        )
    }

}

export default WizardContainer;