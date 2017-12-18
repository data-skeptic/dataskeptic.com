import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setCurrentPlaying} from '../redux/modules/playerReducer'
import ReactDOM from 'react-dom'

const withPlayer = WrappedComponent => {
    return (
        @connect(
            state => ({}),
            {setCurrentPlaying}
        )

    class WithPlayer extends Component {
        player = document.createElement('div');
        componentDidMount() {
            if(document){
                const playerRoot = document.getElementById('player-root');
                playerRoot.appendChild(this.player)
                this.player = document.createElement('div');
            }

        }


        renderPlayer = () => {
            const {...rest} = this.props
            return (
                <div>
                    {JSON.stringify(this.props)}
                    <WrappedComponent {...rest}/>
                </div>
            )
        }

        render() {
            return ReactDOM.createPortal(this.renderPlayer(), this.player,)
        }
    }

)
}
export default withPlayer