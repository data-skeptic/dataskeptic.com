import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { changePageTitle } from '../Layout/Actions/LayoutActions'

class Projects extends Component {
  static getPageMeta() {
    return {
      title: 'Projects | Data Skeptic'
    }
  }

  componentWillMount() {
    const { dispatch } = this.props
    const { title } = Projects.getPageMeta()
    dispatch(changePageTitle(title))
  }

  render() {
    return (
      <div className="center">
        <div className="row projects-container">
          <div className="col-xs-12 col-sm-6">
            <div className="project-box">
              <div className="project-img-container">
                <img className="project-img" src="/img/png/openhouse.png" />
              </div>
              <div className="project-title">OpenHouseProject.co</div>
              <p>
                OpenHouse makes analysis grade transactional home sales data
                available via web and API.
              </p>
              <div className="project-link">
                <a href="http://openhouseproject.co">OpenHouseProject.co</a>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6">
            <div className="project-box">
              <div className="project-img-container">
                <img className="project-img" src="/img/png/snl-impact.png" />
              </div>
              <div className="project-title">SNL Causal Impact</div>
              <p>
                As an appendix to our Causal Impact episode, we teamed up with{' '}
                <a href="http://github.com/kjblakemore">Karen Blakemore</a> to
                create a Shiny webapp to interact with the Saturday Night Live
                analysis.
              </p>
              <div className="project-link">
                <Link to="/l/snl-impact">dataskeptic.com/l/snl-impact</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 project-bottom">
            If you like our work, perhaps we can collaborate. Visit our{' '}
            <Link to="/services">Services</Link> page for details.
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({}))(Projects)
