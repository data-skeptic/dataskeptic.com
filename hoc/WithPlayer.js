import React,{Component} from 'react'

const withPlayer = WrappedComponent =>{
    return class WithPlayer extends Component{
        render(){
            return <WrappedComponent {...this.props}/>
        }
    }
}