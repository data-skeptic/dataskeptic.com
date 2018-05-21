import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
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

      <Route path="/loading" component={Loading} />

      <Route path="/lightsout" component={LightsOut} />

      <Route path="/members" component={Membership} />

      <Route path="/about" component={About} />

      <Route path="/advertising" component={Advertising} />

      <Route path="/coaching" component={Coaching} />

      <Route path="/coaching2" component={Coaching2} />

      <Route path="/coaching-weekly" component={CoachingBiWeekly} />

      <Route path="/coaching-biweekly" component={CoachingBiWeekly} />

      <Route path="/checkout" component={Checkout} />

      <Route path="/thank-you" component={CheckoutThankYouPage} />

      <Route path="/contact-us" component={ContactUs} />

      <Route path="/careers" component={Careers}>
        <Route path="city/:id" component={CityCareers} />
        <Route path="jobs/add" component={PublicAddJob} />
      </Route>

      <Route path="/blog" component={BlogRouter}>
        <Route path="*" component={BlogRouter} />
      </Route>

      <Route path="/podcast" component={Podcast}>
        <Route path="*" component={Podcast} />
      </Route>

      <Route
        path="/services*"
        component={props => <Services foo="value" bar="v2" location={props} />}
      />

      <Route path="/store" component={Store} />

      <Route path="/press" component={Press} />

      <Route path="/projects" component={Projects} />

      <Route path="/rfc" component={Proposals}>
        <Route path="thank-you" component={ProposalsThankYouPage} />
      </Route>

      <Route path="/login" component={Login} />

      <Route path="/signup" component={SignUp} />

      <Route path="/logout" component={Logout} />

      <Route path="/questions" component={QuestionsContainer} />

      <Route path="/membership" component={MembershipPortal} showAds={true}>
        <Route path="change" component={ChangeMembership} showAds={true} />

        <Route path="inbox" component={MembershipInbox} showAds={true} />

        <Route
          path="analytics"
          component={MembershipAnalytics}
          showAds={true}
        />

        <Route
          path="downloads"
          component={MembershipDownloads}
          showAds={true}
        />
      </Route>

      <Route path="/profile/playlist" component={UserPlaylist} showAds={true} />

      <Route path="/admin" component={AdminHome}>
        <Route path="cms">
          <Route path="pending" component={AdminCmsPending} />
          <Route path="recent" component={AdminCmsRecent} />
          <Route path="feature" component={AdminCmsFeature} />
          <Route path="add_related" component={AdminCmsAddRelated} />
          <Route path="recent_related" component={AdminCmsRecentRelated} />
        </Route>
        <Route path="orders">
          <Route path="new" component={AdminOrdersNew} />
          <Route path="processing" component={AdminOrdersProcessing} />
        </Route>
        <Route path="emails">
          <Route path="send" component={AdminEmailsSend} />
        </Route>
        <Route path="job">
          <Route path="add" component={AdminAddJob} />
        </Route>

        <Route path="login" component={Login} />
        <Route path="tse" component={Explorer} />
      </Route>

      <Route path="/drip-result" component={DripThankYou} showAds={true} />

      <Route
        path="/drip-unsubscribe"
        component={DripUnsubscribe}
        showAds={true}
      />

      <Route path="/analytics" component={Analytics} />

      <Route path="/wp-login.php" component={DontHackMe} />

      <Route path="/l/snl-impact" component={SnlImpact} />

      <Route path="/privacy" component={PrivacyPageContainer} />

      <Route path="/contributors/:contributor" component={ContributorPage} />

      <Route path="/search" component={SERP} />

      <Route path="/live" component={Live} />

      <Route path="/404" component={NotFound} />

      <Route path="*" component={NotFound} />
    </Route>
  </Router>
)
