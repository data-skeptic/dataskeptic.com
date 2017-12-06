import React, {Component} from 'react'
import { connect } from 'react-redux'


const withPlayer = WrappedComponent => {
    return(
        @connect(
            state => ({

            }),
            {}
        )
    class WithPlayer extends Component {
        render() {
            const {...rest} = this.props
            return (
                <div>
                    {JSON.stringify(this.props)}
                    <WrappedComponent {...rest}/>
                </div>
            )
        }
    })
}
export default withPlayer