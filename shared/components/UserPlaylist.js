import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {bindActionCreators} from 'redux'
import Loading from '../Common/Components/Loading'
import { Link } from 'react-router'
import MembershipHeader from './membership/MembershipHeader'
import ChangeMembership from './membership/ChangeMembership'

import {changePageTitle} from '../Layout/Actions/LayoutActions';
import moment from "moment/moment";
import {redirects_map} from "../../redirects";

const MOCKED_EPISODES = [
    {
        title: 'Markov Decision Processes',
        desc: '<p>Formally, an MDP is defined as the tuple containing states, actions, the transition function, and the reward function. This podcast examines each of these and presents them in the context of simple examples.  Despite MDPs suffering from the <a href= "https://dataskeptic.com/blog/episodes/2015/the-curse-of-dimensionality"> curse of dimensionality</a>, they\'re a useful formalism and a basic concept we will expand on in future episodes.</p>',
        pubDate: '2018-01-26T16:00:00.000Z',
        mp3: 'http://traffic.libsyn.com/dataskeptic/markov-decision-process.mp3?dest-id=201630',
        duration: '20:24',
        img: 'https://static.libsyn.com/p/assets/6/2/a/c/62aca57ac4026e5f/ds-couch-mini-400.png',
        guid: '6471f356e05ac62de6819943e1ecc53f',
        link: 'https://dataskeptic.com/blog/episodes/2018/markov-decision-processes',
        num: 198,
        blog_id: 325,
        author: 'Kyle',
        'abstract': 'Formally, an MDP is defined as the tuple containing states, actions, the transition function, and the reward function.  The rest of this post will define each of these components.',
        publish_date: '2018-01-26T17:27:18.000Z',
        prettyname: '/episodes/2018/markov-decision-processes',
        src_file: 'episodes/2018/markov-decision-processes.htm',
        related: []
    },
    {
        title: 'Neuroscience Frontiers',
        desc: '<p>Last week on Data Skeptic, we visited the Laboratory of Neuroimaging, or LONI, at USC and learned about their data-driven platform that enables scientists from all over the world to share, transform, store, manage and analyze their data to understand neurological diseases better. We talked about how neuroscientists measure the brain using data from MRI scans, and how that data is processed and analyzed to understand the brain. This week, we\'ll continue the second half of our two-part episode on LONI.</p>',
        pubDate: '2018-01-19T16:00:00.000Z',
        mp3: 'http://traffic.libsyn.com/dataskeptic/neuroscience-frontiers.mp3?dest-id=201630',
        duration: '29:06',
        img: 'https://static.libsyn.com/p/assets/2/9/7/f/297f489c0255ce1a/DS-PodcastCover-R2.png',
        guid: '642bd344413becadc177b428285b7d26',
        link: 'https://dataskeptic.com/blog/episodes/2018/neuroscience-frontiers',
        num: 197,
        blog_id: 329,
        author: 'Kyle',
        'abstract': 'Last week on Data Skeptic, we visited the Laboratory of Neuroimaging, or LONI, at USC and learned about their data-driven platform that enables scientists from all over the world to share, transform, store, manage and analyze their data to understand neurological diseases better. We talked about how neuroscientists measure the brain using data from MRI scans, and how that data is processed and analyzed to understand the brain. This week, we\'ll continue the second half of our two-part episode on LONI.',
        publish_date: '2018-01-18T00:00:00.000Z',
        prettyname: '/episodes/2018/neuroscience-frontiers',
        src_file: 'episodes/2018/neuroscience-frontiers.htm',
        related: [
            {
                content_id: 87,
                blog_id: 329,
                dest: 'https://s3.amazonaws.com/dataskeptic.com/guests/2018/farshid-sepehrband.jpg',
                type: 'person',
                title: 'Farshid Sepehrband ',
                body: 'Farshid Sepehrband is a project specialist at the Laboratory of Neuroimaging (LONI) working under Dr. Arthur Toga. He received his PhD in Biotechnology and Neuroscience from the University of Queensland, Australia. Prior to that, Farshid obtained his MSc in Digital Electronics from Sharif University of Technology, Iran and his BSc in Computer Hardware Engineering from Tehran Central Azad University, Iran. One of his main interests is to use MRI to map macro- and micro-structures of brain tissue, in order to obtain micro-level neuroanatomical biomarkers. Farshid is also interested in studying microstructural alterations of brain tissue that occur during development and aging.',
                blog_id2: null,
                author: null,
                publish_date: null,
                guid: null,
                prettyname: null
            },
            {
                content_id: 88,
                blog_id: 329,
                dest: 'https://s3.amazonaws.com/dataskeptic.com/guests/2018/ryan-cabeen.jpg',
                type: 'person',
                title: 'Ryan Cabeen',
                body: 'Ryan Cabeen is a postdoctoral scholar at the USC Stevens Neuroimaging and Informatics Institute working on the development of neuroimaging tools for studying brain microstructure and connectivity. He received his PhD in Computer Science at Brown University and his BSc in Engineering and Applied Science at the California Institute of Technology. Ryan’s research interests lie in the development and evaluation of computational tools for modeling, visualizing and analyzing scientific imaging datasets. Currently, he is investigating computational techniques to better understand the brain’s structure through diffusion magnetic resonance imaging (MRI).',
                blog_id2: null,
                author: null,
                publish_date: null,
                guid: null,
                prettyname: null
            },
            {
                content_id: 89,
                blog_id: 329,
                dest: 'https://s3.amazonaws.com/dataskeptic.com/guests/2018/arthur-toga.jpg',
                type: 'person',
                title: 'Dr. Arthur Toga',
                body: 'Dr. Arthur Toga is the Director of the Mark and Mary Stevens Neuroimaging and Informatics Institute at USC and the Provost Professor of Ophthalmology, Neurology, Psychiatry and Behavioral Sciences, Radiology and Engineering at USC’s Keck School of Medicine. His research is focused on neuroimaging, mapping brain structure and function, and brain atlasing. Dr. Toga’s team at the Laboratory of Neuro Imaging (LONI) has been working on the development and implementation of databases and data mining tools for linking disparate data from genetics, imaging, clinical and behavior, supporting global efforts in Alzheimer’s disease, Huntington’s and Parkinson’s disease.',
                blog_id2: null,
                author: null,
                publish_date: null,
                guid: null,
                prettyname: null
            },
            {
                content_id: 90,
                blog_id: 329,
                dest: 'https://s3.amazonaws.com/dataskeptic.com/guests/2018/meng-law.jpg',
                type: 'person',
                title: 'Dr. Meng Law',
                body: 'Dr. Meng Law is the Director of Neuroradiology at USC Keck School of Medicine and the Director of the Neuroimaging Core for the USC Alzheimer Disease Research Center. His main areas of treatment as a clinical radiologist include Alzheimer\'s disease, concussions, multiple sclerosis, traumatic brain injury, brain tumors, acute ischemic stroke, epilepsy, spinal disorders, aneurysms, and more. Although he is primarily a clinical physician, Dr. Law is also involved in research using MRI to study brain tumors, traumatic brain injury and Alzheimer’s disease.',
                blog_id2: null,
                author: null,
                publish_date: null,
                guid: null,
                prettyname: null
            },
            {
                content_id: 91,
                blog_id: 329,
                dest: 'https://www.loni.usc.edu/',
                type: 'external-link',
                title: 'Laboratory of Neuro Imaging',
                body: 'The Laboratory of Neuro Imaging (LONI) at USC  seeks to improve understanding of the brain in health and disease.',
                blog_id2: null,
                author: null,
                publish_date: null,
                guid: null,
                prettyname: null
            }
        ]
    },
    {
        title: 'Neuroimaging and Big Data',
        desc: '<p>Last year, Kyle had a chance to visit the Laboratory of Neuroimaging, or LONI, at USC, and learn about how some researchers are using data science to study the function of the brain. We’re going to be covering some of their work in two episodes on Data Skeptic. In this first part of our two-part episode, we\'ll talk about the data collection and brain imaging and the LONI pipeline. We\'ll then continue our coverage in the second episode, where we\'ll talk more about how researchers can gain insights about the human brain and their current challenges. Next week, we’ll also talk more about what all that has to do with data science machine learning and artificial intelligence. Joining us in this week’s episode are members of the LONI lab, which include principal investigators, Dr. Arthur Toga and Dr. Meng Law, and researchers, Farshid Sepherband, PhD and Ryan Cabeen, PhD.</p>',
        pubDate: '2018-01-12T16:00:00.000Z',
        mp3: 'http://traffic.libsyn.com/dataskeptic/neuroimaging-and-big-data.mp3?dest-id=201630',
        duration: '26:37',
        img: 'https://static.libsyn.com/p/assets/5/8/9/b/589bcbd422eb9626/DS-PodcastCover-R2.png',
        guid: 'a9b3c28fbee332dc383caecb4efd7efb',
        link: 'https://dataskeptic.com/blog/episodes/2018/neuroimaging-and-big-data',
        num: 196,
        blog_id: 326,
        author: 'Kyle',
        'abstract': 'Last year, Kyle had a chance to visit the Laboratory of Neuroimaging, or LONI, at USC, and learn about how some researchers are using data science to study the function of the brain. We\'re going to be covering some of their work in two episodes on Data Skeptic. In this first part of our two-part episode, we\'ll talk about the data collection and brain imaging and the LONI pipeline. We\'ll then continue our coverage in the second episode, where we\'ll talk more about how researchers can gain insights about the human brain and their current challenges. Next week, we\'ll also talk more about what all that has to do with data science machine learning and artificial intelligence. Joining us in this week\'s episode are members of the LONI lab, which include principal investigators, Dr. Arthur Toga and Dr. Meng Law, and researchers, Farshid Sepherband, PhD and Ryan Cabeen, PhD.',
        publish_date: '2018-01-12T00:00:00.000Z',
        prettyname: '/episodes/2018/neuroimaging-and-big-data',
        src_file: 'episodes/2018/neuroimaging-and-big-data.htm',
        related: [
            {
                content_id: 69,
                blog_id: 326,
                dest: 'https://s3.amazonaws.com/dataskeptic.com/guests/2018/farshid-sepehrband.jpg',
                type: 'person',
                title: 'Farshid Sepehrband ',
                body: 'Farshid Sepehrband is a project specialist at the Laboratory of Neuroimaging (LONI) working under Dr. Arthur Toga. He received his PhD in Biotechnology and Neuroscience from the University of Queensland, Australia. Prior to that, Farshid obtained his MSc in Digital Electronics from Sharif University of Technology, Iran and his BSc in Computer Hardware Engineering from Tehran Central Azad University, Iran. One of his main interests is to use MRI to map macro- and micro-structures of brain tissue, in order to obtain micro-level neuroanatomical biomarkers. Farshid is also interested in studying microstructural alterations of brain tissue that occur during development and aging.',
                blog_id2: null,
                author: null,
                publish_date: null,
                guid: null,
                prettyname: null
            },
            {
                content_id: 70,
                blog_id: 326,
                dest: 'https://s3.amazonaws.com/dataskeptic.com/guests/2018/ryan-cabeen.jpg',
                type: 'person',
                title: 'Ryan Cabeen',
                body: 'Ryan Cabeen is a postdoctoral scholar at the USC Stevens Neuroimaging and Informatics Institute working on the development of neuroimaging tools for studying brain microstructure and connectivity. He received his PhD in Computer Science at Brown University and his BSc in Engineering and Applied Science at the California Institute of Technology. Ryan’s research interests lie in the development and evaluation of computational tools for modeling, visualizing and analyzing scientific imaging datasets. Currently, he is investigating computational techniques to better understand the brain’s structure through diffusion magnetic resonance imaging (MRI).',
                blog_id2: null,
                author: null,
                publish_date: null,
                guid: null,
                prettyname: null
            },
            {
                content_id: 71,
                blog_id: 326,
                dest: 'https://s3.amazonaws.com/dataskeptic.com/guests/2018/arthur-toga.jpg',
                type: 'person',
                title: 'Dr. Arthur Toga',
                body: 'Dr. Arthur Toga is the Director of the Mark and Mary Stevens Neuroimaging and Informatics Institute at USC and the Provost Professor of Ophthalmology, Neurology, Psychiatry and Behavioral Sciences, Radiology and Engineering at USC’s Keck School of Medicine. His research is focused on neuroimaging, mapping brain structure and function, and brain atlasing. Dr. Toga’s team at the Laboratory of Neuro Imaging (LONI) has been working on the development and implementation of databases and data mining tools for linking disparate data from genetics, imaging, clinical and behavior, supporting global efforts in Alzheimer’s disease, Huntington’s and Parkinson’s disease.',
                blog_id2: null,
                author: null,
                publish_date: null,
                guid: null,
                prettyname: null
            },
            {
                content_id: 72,
                blog_id: 326,
                dest: 'https://s3.amazonaws.com/dataskeptic.com/guests/2018/meng-law.jpg',
                type: 'person',
                title: 'Dr. Meng Law',
                body: 'Dr. Meng Law is the Director of Neuroradiology at USC Keck School of Medicine and the Director of the Neuroimaging Core for the USC Alzheimer Disease Research Center. His main areas of treatment as a clinical radiologist include Alzheimer\'s disease, concussions, multiple sclerosis, traumatic brain injury, brain tumors, acute ischemic stroke, epilepsy, spinal disorders, aneurysms, and more. Although he is primarily a clinical physician, Dr. Law is also involved in research using MRI to study brain tumors, traumatic brain injury and Alzheimer’s disease.',
                blog_id2: null,
                author: null,
                publish_date: null,
                guid: null,
                prettyname: null
            },
            {
                content_id: 73,
                blog_id: 326,
                dest: 'https://www.loni.usc.edu/',
                type: 'external-link',
                title: 'Laboratory of Neuro Imaging',
                body: 'The Laboratory of Neuro Imaging (LONI) at USC  seeks to improve understanding of the brain in health and disease.',
                blog_id2: null,
                author: null,
                publish_date: null,
                guid: null,
                prettyname: null
            }
        ]
    },
    {
        title: 'The Agent Model of Intelligence',
        desc: '<p>In artificial intelligence, the term \'agent\' is used to mean an autonomous, thinking agent with the ability to interact with their environment. An agent could be a person or a piece of software. In either case, we can describe aspects of the agent in a standard framework.</p>',
        pubDate: '2018-01-05T16:00:00.000Z',
        mp3: 'http://traffic.libsyn.com/dataskeptic/the-agent-model-of-intelligence.mp3?dest-id=201630',
        duration: '17:21',
        img: 'https://static.libsyn.com/p/assets/b/8/2/e/b82e6c9131f13bce/ds-couch-mini-400.png',
        guid: '75ac8840c3ac7437aba957629de21c14',
        link: 'https://dataskeptic.com/blog/episodes/2018/the-agent-model-of-intelligence',
        num: 195,
        blog_id: 323,
        author: 'Kyle',
        'abstract': 'In artificial intelligence, the term \'agent\' is used to mean an autonomous, thinking agent with the ability to interact with their environment.  An agent could be a person or a piece of software.  In either case, we can describe aspects of the agent in a standard framew',
        publish_date: '2018-01-05T00:00:00.000Z',
        prettyname: '/episodes/2018/the-agent-model-of-intelligence',
        src_file: 'episodes/2018/the-agent-model-of-intelligence.htm',
        related: []
    }
]

const renderDate = (date) => moment(date).format('MMMM D, YYYY')
const formatLink = (link) => {
    link = link.replace('https://dataskeptic.com', '');
    link = link.replace('http://dataskeptic.com', '');

    if (!!redirects_map[link]) {
        return redirects_map[link];
    }

    return link;
}

const renderPlayedSymbol = (playing, playedEpisodeGuid, guid) =>
    playing && (playedEpisodeGuid === guid)
        ? <span>&#10073;&#10073;</span>
        : <span>&#9658;</span>

class UserPlaylist extends Component {

    componentWillMount() {
        const {title} = UserPlaylist.getPageMeta();
        this.props.dispatch(changePageTitle(title))
    }

    componentDidMount() {
        var dispatch = this.props.dispatch
        if (!this.props.loggedIn) {
            window.location.href = '/login'
        }
    }

    static getPageMeta() {
        return {
            title: 'My Playlist | Data Skeptic'
        }
    }

    startPlay = (episode) => {
        this.props.dispatch({type: "PLAY_EPISODE", payload: episode})
    }

    goToPodcasts = () => this.props.history.push('/podcast')

    renderEpisode = (episode) =>
        <Episode key={episode.blog_id}>
            <Inner>
                <Preview>
                    <Link to={formatLink(episode.link)}>
                        <img src={episode.img} alt={episode.title}/>
                    </Link>
                </Preview>
                <Info>
                    <Date>{renderDate(episode.pubDate)}</Date>
                    <EpisodeTitle to={formatLink(episode.link)}>{episode.title}</EpisodeTitle>
                    <Description>{episode.abstract}</Description>
                </Info>
                <Play>
                    <PlayButton onClick={() => this.startPlay(episode)}>{renderPlayedSymbol(this.props.isPlaying, this.props.playerEpisodeGuid, episode.guid)}</PlayButton>
                </Play>
            </Inner>
        </Episode>

    renderPlaylist(playlist) {
        playlist = MOCKED_EPISODES
        return (
            <Section>
                {playlist.map(this.renderEpisode)}
            </Section>
        )
    }

    renderEmpty() {
        return (
            <Section>
                <p>You don't have anything in your playlist. Please click one of the buttons below</p>
                <Buttons>
                    <ActionButton first={true}>Add all episodes</ActionButton>
                    <ActionButton>Add all episodes for 20XX</ActionButton>
                    <ActionButton onClick={this.goToPodcasts} last={true}>Visit podcast page</ActionButton>
                </Buttons>
            </Section>
        )
    }

    render() {
        const { user, loggedIn } = this.props
        if (!loggedIn) return <div/>

        const { lists: {playlist} } = user

        return (
            <Container>
                <PageTitle>My playlist</PageTitle>
                {playlist && (playlist.length > 0)
                    ? this.renderPlaylist(playlist)
                    : this.renderEmpty()
                }
            </Container>
        )
    }
}

const Container = styled.div`
    margin: 25px auto;
    clear: both;
    max-width: 675px;
`

const PageTitle = styled.h2`
`

const Section = styled.div`
    padding-top: 12px;
`

const Buttons = styled.div`
    display: flex;
`

const ActionButton = styled.button`
    background: #fff;
    border: 1px solid #d7d9d9;
    padding: 8px 12px;
    font-weight: bold;
    
    ${props => props.first && `
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        border-right: 0px;
    `}
    
    ${props => props.last && `
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        border-left: 0px;
    `}
`

const Episode = styled.div`
    padding-bottom: 18px;
    margin-bottom: 18px;
    border-bottom: 1px solid #979797;
`

const Inner = styled.div`
    display: flex;
    flex-direction: columns;
`

const Preview = styled.div`
    width: 60px;
    
    img {
        max-width: 100%;
    }
`
const Info = styled.div`
    flex: 2;
    padding: 0px 12px;    
`

const Date = styled.div`
    font-size: 14px;
    font-weight: bold;
    color: #7D8080;
    letter-spacing: 1px;
    text-transform: uppercase;
`

const EpisodeTitle = styled(Link)`
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 1px;
`

const Play = styled.div`
    display: flex;
`

const PlayButton = styled.button`
    background: #565858;
    border-radius: 20px;
    color: #fff;
    width: 40px;
    height: 40px;
    border: none;
    outline: none;
    
    &:hover {
        background-color: #38383A;
    }
    
    &:focus {
        background-color: #222222;
    }
`

const Description = styled.div`
    font-size: 14px;
    color: #575959;
    letter-spacing: 0;
    line-height: 24px;
`

const Actions = styled.div`
    padding-top: 4px;
    padding-bottom: 8px;
    padding-left: ${60+12}px;
`

export default connect(
    (state) => ({
        user: state.auth.getIn(['user']).toJS(),
        loggedIn: state.auth.getIn(['loggedIn']),
        isPlaying: state.player.getIn(['is_playing']),
        playerEpisodeGuid: state.player.getIn(['episode', 'guid'])
    })
)(UserPlaylist);
