import React                                                 from 'react';
import { Provider }                                          from 'react-redux';
import { Router, Route, IndexRoute }                         from 'react-router';
import ReactGA from 'react-ga'
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-react-router';
import createBrowserHistory                                  from 'history/lib/createBrowserHistory';
import configureStore                                        from './store';

import Advertising             from 'components/Advertising';
import App                     from 'components/index';
import BlogContainer           from 'Blog/Routes/BlogContainer';
import BlogArticle             from 'Blog/Containers/BlogArticle';
import BlogRouter              from 'Blog/Routes/BlogRouter';
import Checkout                from 'Checkout/Routes/Checkout/Checkout';
import Coaching                from 'components/Coaching';
import Coaching2               from 'components/Coaching2';
import ContactUs               from 'Contacts/Routes/ContactUs';
import DontHackMe              from 'components/DontHackMe';
import Home                    from 'components/Home';
import LightsOut               from 'components/LightsOut';
import Menu                    from 'components/Menu';
import Membership              from 'components/Membership';
import NotFound                from 'NotFound/Components/NotFound';
import Podcast                 from 'Podcasts/Routes/Podcast';
import Press                   from 'components/Press';
import Projects                from 'components/Projects';
import Services                from 'components/Services';
import Store                   from 'components/Store';
import ThankYouPage            from 'Checkout/Routes/ThankYou/ThankYouPage';

import Admin                   from 'components/admin/Admin';
import Invoice                 from 'Checkout/Routes/Invoices/Invoice';

import SnlImpact               from 'components/l/SnlImpact';

function loadData() {
	if (typeof window !== 'undefined') {
		const p = window.location.pathname;
		ReactGA.set({ page: p });
		ReactGA.pageview(p);		
	}
}

function onUpdate() {
	console.log("onUpdate")
}


export default (
	<Router onUpdate={onUpdate}>
		<Route path="/advertising" name="app" component={App} onEnter={loadData}>
			<IndexRoute component={Advertising}/>
		</Route>
		<Route path="/blog(/:pageNum)" component={App} onEnter={loadData}>
			<IndexRoute component={BlogContainer}/>
		</Route>
		<Route path="/blog/*" component={App} onEnter={loadData}>
			<IndexRoute component={BlogRouter}/>
		</Route>
		<Route path="/coaching" name="app" component={App} onEnter={loadData}>
			<IndexRoute component={Coaching}/>
		</Route>
		<Route path="/coaching2" name="app" component={App} onEnter={loadData}>
			<IndexRoute component={Coaching2}/>
		</Route>
		<Route path="/" name="app" component={App} onEnter={loadData}>
			<IndexRoute component={Home}/>
		</Route>
		<Route path="/checkout" name="app" component={App} onEnter={loadData}>
			<IndexRoute component={Checkout}/>
		</Route>						
		<Route path="/contact-us" component={App} onEnter={loadData}>
			<IndexRoute component={ContactUs} />
		</Route>
		<Route path="/lightsout" component={App} onEnter={loadData}>
			<IndexRoute component={LightsOut} />
		</Route>
		<Route path="/members" component={App} onEnter={loadData}>
			<IndexRoute component={Membership} />
		</Route>
		<Route path="/podcast*" component={App} onEnter={loadData}>
			<IndexRoute component={Podcast} />
		</Route>
		<Route path="/services" component={App} onEnter={loadData}>
			<IndexRoute component={props => (<Services foo="value" bar="v2" location={props} />)} />
		</Route>
		<Route path="/store" component={App} onEnter={loadData}>
			<IndexRoute component={Store} />
		</Route>
		<Route path="/press" component={App} onEnter={loadData}>
			<IndexRoute component={Press} />
		</Route>
		<Route path="/projects" component={App} onEnter={loadData}>
			<IndexRoute component={Projects} />
		</Route>
		<Route path="/thank-you" component={App} onEnter={loadData}>
			<IndexRoute component={ThankYouPage} />
		</Route>

		<Route path="/admin" component={App}>
			<IndexRoute component={Admin} />
		</Route>
		<Route path="/invoice" component={App}>
			<IndexRoute component={Invoice} />
		</Route>

		<Route path="/wp-login.php" component={App} onEnter={loadData}>
			<IndexRoute component={DontHackMe} />
		</Route>
		<Route path="/l/snl-impact" component={App} onEnter={loadData}>
			<IndexRoute component={SnlImpact} />
		</Route>

		<Route path="/*" component={App} onEnter={loadData}>
			<IndexRoute component={NotFound} />
		</Route>

	</Router>
);
