import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {getActiveYear, getPage, getYears, setActiveYear} from '../../../redux/modules/podcastReducer'
import CategoriesListItem from "../Components/CategoriesListItem";
import ParamRouter from "../../../components/Router";


@connect(
    state => ({
        years: getYears(state),
        activeYear:getActiveYear(state),
        page: getPage(state)
    }),
    {setActiveYear}
)
export default class YearList extends Component {

    setActiveYear = year => {
        const page = this.props.page

        if (year) {
            ParamRouter.pushRoute('Podcasts Page', {year, page: 1})
        } else {
            ParamRouter.pushRoute('Podcasts', {page})
        }
    }

    render() {
        const {activeYear} = this.props;
        const yearMock = ['2017','2016','2015','2014']
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