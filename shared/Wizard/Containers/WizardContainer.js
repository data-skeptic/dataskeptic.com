import React, {Component, PropTypes} from 'react';

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