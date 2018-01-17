import React                                                 from 'react';
import {Provider}                                          from 'react-redux';
import {Router, Route, IndexRoute, History}                         from 'react-router';
import ReactGA from 'react-ga'
import {reduxReactRouter, routerStateReducer, ReduxRouter} from 'redux-react-router';
import createBrowserHistory                                  from 'history/lib/createBrowserHistory';
import configureStore                                        from './store';

import About                   from 'components/About';
import Advertising             from 'components/Advertising';
import App                     from 'components/index';
import BlogRouter              from 'Blog/Routes/BlogRouter';
import Checkout                from 'Checkout/Routes/Checkout/Checkout';
import Coaching                from 'components/Coaching';
import Coaching2               from 'components/Coaching2';
import CoachingBiWeekly        from 'components/CoachingBiWeekly';
import ContactUs               from 'Contacts/Routes/ContactUs';
import DontHackMe              from 'components/DontHackMe';
import Home                    from 'components/Home';
import LightsOut               from 'components/LightsOut';
import Loading                 from 'Common/Components/Loading.js';
import Login                   from 'components/Login';
import Logout                  from 'components/Logout';
import Menu                    from 'components/Menu';
import Membership              from 'components/Membership';
import MembershipPortal        from 'components/MembershipPortal';
import ChangeMembership        from 'components/membership/ChangeMembership';
import MembershipInbox         from 'components/membership/MembershipInbox';
import MembershipAnalytics     from 'components/membership/MembershipAnalytics';
import Analytics               from 'components/Analytics';
import NotFound                from 'NotFound/Components/NotFound';
import Podcast                 from 'Podcasts/Routes/Podcast';
import Proposals               from 'Proposals/Routes/Proposals';
import Press                   from 'components/Press';
import Projects                from 'components/Projects';
import Services                from 'components/Services';
import Store                   from 'components/Store';
import CheckoutThankYouPage    from 'Checkout/Routes/ThankYouRoute/ThankYouRoute';
import ProposalsThankYouPage   from 'Proposals/Routes/ThankYou/ThankYouPage';
import PrivacyPageContainer    from 'Privacy/Containers/PrivacyPageContainer'

import AdminHome               from 'components/admin/AdminHome';
import AdminCmsPending         from 'components/admin/AdminCmsPending';
import AdminCmsAddRelated      from 'components/admin/AdminCmsAddRelated';
import AdminCmsRecent          from 'components/admin/AdminCmsRecent';
import AdminCmsFeature         from 'components/admin/AdminCmsFeature';
import AdminCmsRecentRelated   from 'components/admin/AdminCmsRecentRelated';
import AdminEmailsSend         from 'components/admin/AdminEmailsSend';
import AdminOrdersNew          from 'components/admin/AdminOrdersNew';
import AdminOrdersProcessing   from 'components/admin/AdminOrdersProcessing';

import SnlImpact               from 'components/l/SnlImpact';

const env = (process.env.NODE_ENV === "production") ? 'prod' : 'dev'

function loadData() {
    if (env === "dev") {
        return; // ga initialize at index.js only for prod
    }

	if (typeof window !== 'undefined') {
		const p = window.location.pathname;
		ReactGA.set({ page: p });
		ReactGA.pageview(p);		
	}
}

function onUpdate() {
    console.log("onUpdate")
}

function requireAuth(nextState, replaceState) {
   replaceState({nextPathname: nextState.location.pathname}, '/login')
};

export default (
    <Router onUpdate={onUpdate}>
        <Route path="/about" name="app" component={App} onEnter={loadData}>
            <IndexRoute component={About}/>
        </Route>
        <Route path="/advertising" name="app" component={App} onEnter={loadData}>
            <IndexRoute component={Advertising}/>
        </Route>
        <Route path="/blog*" component={App} onEnter={loadData}>
            <IndexRoute component={BlogRouter}/>
        </Route>
        <Route path="/coaching" name="app" component={App} onEnter={loadData}>
            <IndexRoute component={Coaching}/>
        </Route>
        <Route path="/coaching2" name="app" component={App} onEnter={loadData}>
            <IndexRoute component={Coaching2}/>
        </Route>
        <Route path="/coaching-weekly" name="app" component={App} onEnter={loadData}>
            <IndexRoute component={Coaching2}/>
        </Route>
        <Route path="/coaching-biweekly" name="app" component={App} onEnter={loadData}>
            <IndexRoute component={CoachingBiWeekly}/>
        </Route>
        <Route path="/" name="app" component={App} onEnter={loadData}>
            <IndexRoute component={Home}/>
        </Route>
        <Route path="/checkout" name="app" component={App} onEnter={loadData}>
            <IndexRoute component={Checkout}/>
        </Route>
        <Route path="/thank-you" component={App} onEnter={loadData}>
            <IndexRoute component={CheckoutThankYouPage}/>
        </Route>
        <Route path="/checkout/thank-you" component={App} onEnter={loadData}>
            <IndexRoute component={CheckoutThankYouPage}/>
        </Route>
        <Route path="/contact-us" component={App} onEnter={loadData}>
            <IndexRoute component={ContactUs}/>
        </Route>
        <Route path="/loading" component={App} onEnter={loadData}>
            <IndexRoute component={Loading}/>
        </Route>
        <Route path="/lightsout" component={App} onEnter={loadData}>
            <IndexRoute component={LightsOut}/>
        </Route>
        <Route path="/members" component={App} onEnter={loadData}>
            <IndexRoute component={Membership}/>
        </Route>
        <Route path="/podcast*" component={App} onEnter={loadData}>
            <IndexRoute component={Podcast}/>
        </Route>
        <Route path="/services" component={App} onEnter={loadData}>
            <IndexRoute component={props => (<Services foo="value" bar="v2" location={props}/>)}/>
        </Route>
        <Route path="/store" component={App} onEnter={loadData}>
            <IndexRoute component={Store}/>
        </Route>
        <Route path="/press" component={App} onEnter={loadData}>
            <IndexRoute component={Press}/>
        </Route>
        <Route path="/projects" component={App} onEnter={loadData}>
            <IndexRoute component={Projects}/>
        </Route>
        <Route path="/rfc" showAds={false} component={App} onEnter={loadData}>
            <IndexRoute component={Proposals}/>
        </Route>
        <Route path="/rfc/thank-you" showAds={false} component={App} onEnter={loadData}>
            <IndexRoute component={ProposalsThankYouPage}/>
        </Route>

        <Route path="/login" component={App}>
            <IndexRoute component={Login}/>
        </Route>

        <Route path="/logout" component={App}>
            <IndexRoute component={Logout}/>
        </Route>

        <Route path="/membershipPortal" showAds={false} component={App}>
            <IndexRoute component={MembershipPortal}/>
        </Route>
        <Route path="/membership/change" showAds={false} component={App}>
            <IndexRoute component={ChangeMembership}/>
        </Route>
        <Route path="/membership/inbox" showAds={false} component={App}>
            <IndexRoute component={MembershipInbox}/>
        </Route>
        <Route path="/membership/analytics" showAds={false} component={App}>
            <IndexRoute component={MembershipAnalytics}/>
        </Route>

        <Route path="/analytics" component={App}>
            <IndexRoute component={Analytics}/>
        </Route>

        <Route path="/wp-login.php" component={App} onEnter={loadData}>
            <IndexRoute component={DontHackMe}/>
        </Route>
        <Route path="/l/snl-impact" component={App} onEnter={loadData}>
            <IndexRoute component={SnlImpact}/>
        </Route>
        <Route path="/privacy-policy" component={App} onEnter={loadData}>
            <IndexRoute component={PrivacyPageContainer}/>
        </Route>

        <Route path="/admin" component={App}>
            <IndexRoute component={AdminHome}  />
        </Route>

        <Route path="/admin/cms/pending" component={App}>
            <IndexRoute component={AdminCmsPending}  />
        </Route>

        <Route path="/admin/cms/recent" component={App}>
            <IndexRoute component={AdminCmsRecent}  />
        </Route>

        <Route path="/admin/cms/feature" component={App}>
            <IndexRoute component={AdminCmsFeature}  />
        </Route>

        <Route path="/admin/cms/add_related" component={App}>
            <IndexRoute component={AdminCmsAddRelated}  />
        </Route>

        <Route path="/admin/cms/recent_related" component={App}>
            <IndexRoute component={AdminCmsRecentRelated}  />
        </Route>

        <Route path="/admin/orders/new" component={App}>
            <IndexRoute component={AdminOrdersNew}  />
        </Route>

        <Route path="/admin/orders/processing" component={App}>
            <IndexRoute component={AdminOrdersProcessing}  />
        </Route>

        <Route path="/admin/emails/send" component={App}>
            <IndexRoute component={AdminEmailsSend}  />
        </Route>

        <Route path="/admin/login" component={App}>
            <IndexRoute component={Login}/>
        </Route>

        <Route path="/*" component={App} onEnter={loadData}>
            <IndexRoute component={NotFound}/>
        </Route>

    </Router>
);
