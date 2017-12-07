import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {getActiveYear, getYears,setActiveYear} from '../../../redux/modules/podcastReducer'
import CategoriesListItem from "../Components/CategoriesListItem";
import Router from '../../../components/Router'



@connect(
    state => ({
        years: getYears(state),
        activeYear:getActiveYear(state)
    }),
    {setActiveYear}
)
export default class YearList extends Component {
    setActiveYear = label => {
        Router.pushRoute(`/podcasts/${label}`)
    }
    render() {
        const {activeYear} = this.props;
        const yearMock = ['2014','2015','2016','2017']
        return (
            <Wrapper>
                <Title>Years</Title>
                <List>
                    {yearMock.map(year => <CategoriesListItem
                        key={year}
                        setActiveYear={this.setActiveYear}
                        activeYear={activeYear}
                        value={year}/>)}
                </List>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    background-color: #38383a;
    color: #fff;
    margin-top:20px;
    padding: 0 30px;
    width: 30%;
    flex-basis: 30%;
    height: 100%;
    position: sticky;
    top: 64px;
    padding-bottom: 30px;
`
const Title = styled.h2`
  
`
const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`
export const Item = styled.li`
  padding:5px 0;
  cursor: pointer;
  color:${props => props.active ? "yellow" : "white"}
`