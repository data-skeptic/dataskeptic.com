import React, {Component} from 'react'

const withPlayer = WrappedComponent => {
    return class WithPlayer extends Component {
        render() {
         const {...rest} = this.props
            return (
                <div>
                    {JSON.stringify(this.props)}
                    <WrappedComponent {...rest}/>
                </div>
            )
        }
    }
}
export default withPlayer