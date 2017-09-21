import React, {Component} from 'react';
import styled from 'styled-components'
import Marker from '../../../components/Marker';
import CardList from '../Components/CardList';
import {connect} from "react-redux";

export default class Home extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <Intro>
                    <Marker>Data Skeptic</Marker> is your source for a perspective of scientific skepticism
                </Intro>
                <CardList/>
            </div>
        )
    }
}


const Intro = styled.h1`
    font-size: 48px;
    padding: 6px 0px;
    padding-left: 50px;
    text-align: justify;
    margin-top: 85px;
    border-left: 4px solid ${props => props.theme.colors.dark};
    color: ${props => props.theme.colors.dark}
`

