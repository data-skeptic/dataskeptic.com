import React, { Component } from 'react'
import styled from 'styled-components'
import {connect} from "react-redux";

class GuestImage extends Component {

    render() {
        const { body, dest, title } = this.props

        return (
            <Wrapper>
                <Avatar src={dest} alt={title} />
            </Wrapper>
        )
    }

}

const Wrapper = styled.div`
    margin: 5px 5px 0px 0px;
`

const Avatar = styled.img`
    max-width: 60px;
    border-radius: 50%;
`

export default connect(state => ({
    contributors: state.site.get('contributors').toJS()
}))(GuestImage)