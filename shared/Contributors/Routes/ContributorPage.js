import React, {Component, PropTypes} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {changePageTitle} from "../../Layout/Actions/LayoutActions";
import {snserror} from "../../SnsUtil";
import NotFound from "../../NotFound/Components/NotFound";
import { Link } from 'react-router'
import moment from "moment/moment";

const getContributorInfo = (contributor='', contributors) =>
    contributors && contributors[contributor.toLowerCase()]

const renderTwitter = (twitter) =>  <a href={`https://twitter.com/${twitter}`}>@{twitter}</a>
const renderLinkedin = (linkedin) => <a href={linkedin}>LinkedIn</a>

const formatDate = (date) => moment(date).format('MMMM D, Y')

class ContributorPage extends Component {

    componentWillMount() {
        const contributor = getContributorInfo(this.props.params.contributor, this.props.contributors)
        let title = 'Not Found'
        if (!contributor) {
            this.missing()
        } else {
            const { prettyname } = contributor
            title = `${prettyname} | Data Skeptic`
        }

        this.props.dispatch(changePageTitle(title))
    }

    static getPageMeta() {
        return {
            title: `Contributors Page | Data Skeptic`
        }
    }

    missing() {
        const location = this.props.location.pathname
        console.log(location)
        snserror(location, "404!", "ds-blog404")
    }

    renderPosts(posts) {
        return posts.map(({title, abstract, prettyname, publish_date}, i) =>
            <Post key={i} to={`/blog${prettyname}`}>
                <Date>{formatDate(publish_date)}</Date>
                <Title>{title}</Title>
                <Abstract>{abstract}</Abstract>
            </Post>
        )
    }

    render() {
        const contributor = getContributorInfo(this.props.params.contributor, this.props.contributors)

        if (!contributor) {
            return <NotFound location={this.props.location}/>
        }

        const { prettyname, img, twitter, linkedin, bio } = contributor
        const posts = [
            {
                "blog_id": 1,
                "title": "Introduction",
                "author": "Kyle",
                "abstract": "The Data Skeptic Podcast features conversations with topics related to data science, statistics, machine learning, artificial intelligence and the like, all from the perspective of applying critical thinking and the scientific method to evaluate the veracity of claims and efficacy of approac",
                "publish_date": "2014-05-23T00:00:00.000Z",
                "prettyname": "/episodes/2014/introduction",
                "src_file": "episodes/2014/introduction.htm",
                "guid": "80d137c5e4a81e2b34752f33db7c03c0",
                "related": []
            },
            {
                "blog_id": 2,
                "title": "Type i / Type ii Errors",
                "author": "Kyle",
                "abstract": "In this first mini-episode of the Data Skeptic Podcast, we define and discuss type i and type ii errors (a.k.a. false positives and false negativ",
                "publish_date": "2014-05-30T00:00:00.000Z",
                "prettyname": "/episodes/2014/type-i--type-ii-errors",
                "src_file": "episodes/2014/type_i_type_ii.htm",
                "guid": "7718fa629f059b09818c365e44b745c1",
                "related": []
            }
        ]

        return (
            <Container>
                <About>
                    <Avatar src={img} height={64} width={64}/>
                    <Name>{prettyname}</Name>
                </About>
                <Bio>{bio}</Bio>
                <Navigation>
                    <Item line={true}>
                        <Category>Posts</Category>
                        <Value>{posts.length}</Value>
                    </Item>
                    <Item line={true}>
                        <Category>Twitter</Category>
                        <Value>{renderTwitter(twitter)}</Value>
                    </Item>
                    <Item>
                        <Category>Linkedin</Category>
                        <Value>{renderLinkedin(linkedin)}</Value>
                    </Item>
                </Navigation>
                <Blogs>
                    {this.renderPosts(posts)}
                </Blogs>
            </Container>
        )
    }
}

const Container = styled.div`
    margin: 25px auto;
    clear: both;
    max-width: 675px;
`

const About = styled.section`
    display: flex;
    flex-direction: columns;
    align-items: center;
    padding: 0px 15px;
`

const Name = styled.h2`
    margin: 0px;
    padding: 10px 20px;
`

const Avatar = styled.img`border-radius: 50%;`

const Bio = styled.p`
    padding: 15px;
    line-height: 24px;
`

const Navigation = styled.div`
    display: flex;
    flex-direction: columns;
    align-items: center;
    height: 50px;
    margin: 10px 0px;
`

const Item = styled.div`
    ${props => props.line && `border-right: 1px solid #eee;`}
    margin: 25px 15px;
    padding: 15px 0px;
    
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
    flex: 1
`

const Category = styled.div`
    font-weight: bold;
    font-size: 80%;
    text-transform: uppercase;
`

const Value = styled.div`

`

const Blogs = styled.div`
    padding: 15px;
`

const Post = styled(Link)`
    display: block;
    padding: 25px 0px;
    border-bottom: 1px solid #eee;
    color: #333;
    
    &:hover {
        color: #000;
        border-bottom-color: #eee;
    }
`

const Title = styled.h4`
    font-weight: normal;
    margin: 0px 0px 12px 0px;
`

const Date = styled.div`
    margin: 4px 0px;
    font-weight: bold;
    font-size: 90%;
    color: #7D8080;
    text-transform: uppercase;
    letter-spacing: 1px;
`

const Abstract = styled.div`
    margin: 8px 0px;
    line-height: 24px;
`

export default connect(
    (state) => ({
        contributors: state.site.get('contributors').toJS()
    })
)(ContributorPage);
