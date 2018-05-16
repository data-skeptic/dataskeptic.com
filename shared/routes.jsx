import React from 'react'
import { Router, Route, IndexRoute } from 'react-router';
import ReactGA from 'react-ga'

import About from 'components/About'
import Advertising from 'components/Advertising'
import App from 'components/index'
import BlogRouter from 'Blog/Routes/BlogRouter'
import Checkout from 'Checkout/Routes/Checkout/Checkout'
import Coaching from 'components/Coaching'
import Coaching2 from 'components/Coaching2'
import CoachingBiWeekly from 'components/CoachingBiWeekly'
import ContactUs from 'Contacts/Routes/ContactUs'
import Careers from 'Jobs/Routes/Careers'
import CityCareers from 'Jobs/Routes/CityCareers'
import DontHackMe from 'components/DontHackMe'
import Explorer from 'TimeSeriesExplorer/Components/Explorer'
import Home from 'components/Home'
import LightsOut from 'components/LightsOut'
import Live from 'components/Live'
import Loading from 'Common/Components/Loading.js'
import Login from 'components/Login'
import SignUp from 'components/SignUp'
import Logout from 'components/Logout'
import Membership from 'components/Membership'
import MembershipPortal from 'components/MembershipPortal'
import ChangeMembership from 'components/membership/ChangeMembership'
import MembershipInbox from 'components/membership/MembershipInbox'
import MembershipAnalytics from 'components/membership/MembershipAnalytics'
import MembershipDownloads from 'components/membership/MembershipDownloads'
import Analytics from 'components/Analytics'
import NotFound from 'NotFound/Components/NotFound'
import Podcast from 'Podcasts/Routes/Podcast'
import Proposals from 'Proposals/Routes/Proposals'
import Press from 'components/Press'
import Projects from 'components/Projects'
import Services from 'components/Services'
import Store from 'components/Store'
import CheckoutThankYouPage from 'Checkout/Routes/ThankYouRoute/ThankYouRoute'
import ProposalsThankYouPage from 'Proposals/Routes/ThankYou/ThankYouPage'
import AudioExample from 'Proposals/Routes/AudioExample'
import PrivacyPageContainer from 'Privacy/Containers/PrivacyPageContainer'
import QuestionsContainer from './Questions/Containers/QuestionsContainer'
import ContributorPage from './Contributors/Routes/ContributorPage'

import AdminHome from 'components/admin/AdminHome'
import AdminCmsPending from 'components/admin/AdminCmsPending'
import AdminCmsAddRelated from 'components/admin/AdminCmsAddRelated'
import AdminCmsRecent from 'components/admin/AdminCmsRecent'
import AdminCmsFeature from 'components/admin/AdminCmsFeature'
import AdminCmsRecentRelated from 'components/admin/AdminCmsRecentRelated'
import AdminEmailsSend from 'components/admin/AdminEmailsSend'
import AdminOrdersNew from 'components/admin/AdminOrdersNew'
import AdminOrdersProcessing from 'components/admin/AdminOrdersProcessing'
import AdminAddJob from 'components/admin/AdminAddJob'
import PublicAddJob from 'components/jobs/PublicAddJob'

import UserPlaylist from 'components/UserPlaylist'

import DripThankYou from 'components/drip/ThankYou'
import DripUnsubscribe from 'components/drip/DripUnsubscribe'

import SERP from 'Search/Containers/SERP'

import SnlImpact from 'components/l/SnlImpact'

const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'

function loadData() {
  if (env === 'dev') {
    return // ga initialize at index.js only for prod
  }

  if (typeof window !== 'undefined') {
    const p = window.location.pathname
    ReactGA.set({ page: p })
    ReactGA.pageview(p)
  }
}

export default (
  <Router>
    <Route path="/" name="app" component={App} onEnter={loadData}>
      <IndexRoute component={Home} />
      <Route path="/404" component={NotFound} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
)
