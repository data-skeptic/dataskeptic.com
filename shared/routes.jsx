import React                                                 from 'react';
import { Provider }                                          from 'react-redux';
import { Router, Route, IndexRoute }                         from 'react-router';
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-react-router';
import createBrowserHistory                                  from 'history/lib/createBrowserHistory';
import configureStore                                        from './store';

import App                     from 'components/index';
import Blog                    from 'components/Blog';
import BlogArticle             from 'components/BlogArticle';
import BlogRouter              from 'components/BlogRouter';
import Checkout                from 'components/Checkout';
import Coaching                from 'components/Coaching';
import Coaching2               from 'components/Coaching2';
import ContactUs               from 'components/ContactUs';
import Home                    from 'components/Home';
import LightsOut               from 'components/LightsOut';
import Menu                    from 'components/Menu';
import Membership              from 'components/Membership';
import NotFound                from 'components/NotFound';
import Podcast                 from 'components/Podcast';
import Press                   from 'components/Press';
import Projects                from 'components/Projects';
import Services                from 'components/Services';
import Store                   from 'components/Store';

import Admin                   from 'components/admin/Admin';

import SnlImpact               from 'components/l/SnlImpact';

function loadData() {
	console.log("loadData")
};

export default (
	<Router>
		<Route path="/blog" component={App}>
			<IndexRoute component={Blog}/>
		</Route>
		<Route path="/blog/*" component={App}>
			<IndexRoute component={BlogRouter}/>
		</Route>
		<Route path="/coaching" name="app" component={App}>
			<IndexRoute component={Coaching}/>
		</Route>
		<Route path="/coaching2" name="app" component={App}>
			<IndexRoute component={Coaching2}/>
		</Route>
		<Route path="/" name="app" component={App}>
			<IndexRoute component={Home}/>
		</Route>
		<Route path="/checkout" name="app" component={App}>
			<IndexRoute component={Checkout}/>
		</Route>						
		<Route path="/contact-us" component={App}>
			<IndexRoute component={ContactUs} />
		</Route>
		<Route path="/lightsout" component={App}>
			<IndexRoute component={LightsOut} />
		</Route>
		<Route path="/members" component={App}>
			<IndexRoute component={Membership} />
		</Route>
		<Route path="/podcast*" component={App} onEnter={loadData}>
			<IndexRoute component={Podcast} />
		</Route>
		<Route path="/services" component={App}>
			<IndexRoute component={props => (<Services foo="value" bar="v2" location={props} />)} />
		</Route>
		<Route path="/store" component={App}>
			<IndexRoute component={Store} />
		</Route>
		<Route path="/press" component={App}>
			<IndexRoute component={Press} />
		</Route>
		<Route path="/projects" component={App}>
			<IndexRoute component={Projects} />
		</Route>

		<Route path="/admin" component={App}>
			<IndexRoute component={Admin} />
		</Route>

		<Route path="/l/snl-impact" component={App}>
			<IndexRoute component={SnlImpact} />
		</Route>

		<Route path="/*" component={App}>
			<IndexRoute component={NotFound} />
		</Route>

	</Router>
);
