import styled from 'styled-components'
import React from 'react'
import Ionicon from 'react-ionicons'

export default ({children, hide}) => (
    <Area>
        <Overflow onClick={hide} />
        <Side>
            <CloseButton onClick={hide} fontSize="32px" color="#000" icon="md-close"/>
            <Inner>{children}</Inner>
        </Side>
    </Area>
);

const Area = styled.div``

const Overflow = styled.div`
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background: rgba(0, 0, 0, 0.8);
    transition: all 300ms;
    z-index: 1;
    transform: translate(0);
`

const Side = styled.div`
    background: #FFFFFF;
    -webkit-transition: 1s;
    z-index: 999;
    transform: translate(0);
    width: 400px;
    height: 100%;
    position: fixed;
    margin: 0px;
    padding: 0px;
    top: 0px;
    right: 0px;
    transition: right 0.3s cubic-bezier(0.17, 0.68, 0.38, 0.84) 0.1s;
`

const Inner = styled.div`
    padding: 25px 32px;
    min-height: 100%;
    position: relative;
`

const CloseButton = styled(Ionicon)`
    position: absolute;
    top: 10px;
    right: 10px;
    border: 0px;
    cursor: pointer;
    z-index: 100;
`