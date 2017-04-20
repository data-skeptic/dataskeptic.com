import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Episode from "../Components/Episode";
import Loading from "../../Common/Components/Loading"
import YearSelector from '../../components/YearSelector.js'

import Container from '../../Layout/Components/Container/Container';
import Content from '../../Layout/Components/Content/Content';
import SideBar from '../../Layout/Components/SideBar/SideBar';

import { get_podcasts } from '../../utils/redux_loader'
import { year_from_path } from '../../utils/redux_loader'

import { changePageTitle } from '../../Layout/Actions/LayoutActions';

class Podcast extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const dispatch = this.props.dispatch;
        const { isLoaded } = this.props;
        const pathname = this.props.location.pathname;

        get_podcasts(dispatch, pathname);

        const {title} = Podcast.getPageMeta();
        dispatch(changePageTitle(title));
    }

    static getPageMeta() {
        return {
            title: 'Podcasts | Data Skeptic'
        }
    }

    render() {
        const pathname = this.props.location.pathname;
        const {list = [], years = [], isLoaded = false} = this.props;

        let year = year_from_path(pathname);
        if (year === -1) {
            year = years[0]
        }

        return (
            <div className="podcasts-page">
                <Container>

                    <Content>
                        { isLoaded ?
                            list.map(function (episode, index) {
                                return <Episode key={index} episode={episode}/>
                            })
                          : <Loading />
                        }
                    </Content>
                    <SideBar title="Year">
                        <YearSelector years={years} year={year}/>
                    </SideBar>

                </Container>
            </div>
        )
    }

}

export default connect(
    state => ({
        eps: state.episodes.toJS(),
        list: state.episodes.getIn(['episodes']).toJS(),
        years: state.episodes.getIn(['years']).toJS(),
        isLoaded: state.episodes.getIn(['loaded'])
    })
)(Podcast)

