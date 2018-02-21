import React, { Component }  from 'react'
import {connect} from 'react-redux';
import styled from 'styled-components'
import {
	JobsListingTitle,
  Container,
  Box
} from './style'
import {click, getImpressionId, impression} from "../../../Tracking/Jobs";

const Text = ({text}) => <span dangerouslySetInnerHTML={{__html: text}}/>

class JobListing extends Component {

	state = {
		viewMore: false,
	}

	constructor(props) {
		super(props)

		this.impression_id = null
	}

	componentWillReceiveProps = async (nextProps) => {
		const { jobListing } = nextProps
		if (!jobListing) return
		const { loaded, jobs } = jobListing
		if (!loaded) return
		if (!jobs[0]) return

		const jobId = jobs[0].id
		this.impression_id = getImpressionId(jobId)
		if (!this.impression_id) {
			this.impression_id = await impression(jobId)
		}
	}

	trackApply = (id) => {
		console.log('track', id, this.impression_id)
		click(id, this.impression_id)
	}

  toggleViewMore = () => this.setState(prevState => ({ viewMore: !prevState.viewMore }))

  renderJobBox = (job, viewMore) => {
    const {id, title, location, type, description, url, company, company_url } = job
	  return (
		  <Box>
			  <Title>{title}</Title>
			  <Types>
				  <Type>{type}</Type>
				  <Space>{'|'}</Space>
				  <Location>{location}</Location>
				  <Space>{'|'}</Space>
				  <CompanyName><a href={company_url} target="_blank">{company}</a></CompanyName>
			  </Types>
			  <Description>
				  {!viewMore
					  ? <span>
                {/*<Text text={description.substring(0, 120)+'...'} />*/}
                <Text text={description} />
                <ViewMore onClick={this.toggleViewMore}>View More</ViewMore>
              </span>
					  : <Text text={description} />
				  }
			  </Description>
			  <Apply href={url} target="_blank" onClick={() => this.trackApply(id)}>Apply now</Apply>
		  </Box>
    )
  }

  render () {
    const { jobListing } = this.props
    const { viewMore } = this.state
    const { loaded, jobs } = jobListing

    if (!loaded) return <div>...</div>

    return (
      <Container>
        {loaded
          ? this.renderJobBox(jobs[0], viewMore)
          : <span>...</span>
        }
      </Container>
    )
  }
}

export default connect(state => ({
	  jobListing: state.cms.get('jobListing').toJS()
}))(JobListing)

const Title = styled.div`
  display: inline-block;
  margin: 0px;
  font-size: 22px;
  font-weight: 400;
  line-height: 40px;
`

const Types = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  line-height: 24px;
  color: #333;
`

const Space = styled.span`
  display: inline-block;
  padding: 0px 4px;
`

const Location = styled.span`
  
`

const Type = styled.span`
  
`

const Description = styled.div`

`

const CompanyName = styled.span`
  flex-grow: 1;
  border: 0px;
  margin-right: 12px;
  font-weight: bold;
  
  > a {
	  text-decoration: none;
	  border: 0px;
	  
	  &:hover {
	    border: 0px;
	  }
  }
`

const ViewMore = styled.span`
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  color: #000;
  line-height: 17px;
  margin-left: 5px;
  margin-right: 3px;
  border: 0;
  background: transparent;
  position: relative;
  padding-right: 20px;

  :before, :after {
    border-right: 2px solid;
    content: '';
    display: block;
    height: 8px;
    margin-top: -6px;
    position: absolute;
    transform: rotate(135deg);
    right: 10px;
    top: 50%;
    width: 0;
  }

  :after {
    margin-top: -1px;
    transform: rotate(45deg);
  }
`

const Apply = styled.a`
  margin-top: 8px;
  display: block;
  text-decoration: none;
  width: 160px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #F0D943;
  font-size: 16px;
  color: #333333;
  border: none;
  border-radius: 5px;
  
  &:hover {
    border: none;
  }
`
