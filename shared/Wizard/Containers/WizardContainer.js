import React, {Component, PropTypes} from 'react';
import isArray from 'lodash/isArray';

class WizardContainer extends Component {

    static propTypes = {
        children: PropTypes.node,
        activeKey: PropTypes.string
    };

    constructor() {
        super();

        this.isStepVisible = this.isStepVisible.bind(this);
    }

    getVisibleKey() {
        return this.props.activeKey;
    }

    isStepVisible(candidateKey) {
        const visibleKey = this.getVisibleKey();
        // TODO array


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