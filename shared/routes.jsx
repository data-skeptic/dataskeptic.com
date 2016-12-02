import React                   from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import configureStore from './store';

import App                     from 'components/index';
import Home                    from 'components/Home';
import LightsOut               from 'components/LightsOut';
import Menu                    from 'components/Menu';
import Membership              from 'components/Membership';
import Podcast                 from 'components/Podcast';
import Projects                from 'components/Projects';
import Services                from 'components/Services';

function loadData() {
	console.log("loadData")
};

export default (
	<Router>
		<Route path="/" name="app" component={App}>
			<IndexRoute component={Home}/>
		</Route>
		<Route path="/lightsout" component={App}>
			<IndexRoute component={LightsOut} />
		</Route>
		<Route path="/members" component={App}>
			<IndexRoute component={Membership} />
		</Route>
		<Route path="/podcast" component={App} onEnter={loadData}>
			<IndexRoute component={Podcast} />
		</Route>
		<Route path="/services" component={App}>
			<IndexRoute component={props => (<Services foo="value" bar="v2" location={props} />)} />
		</Route>
		<Route path="/projects" component={App}>
			<IndexRoute component={Projects} />
		</Route>
	</Router>
);


/*

products={products} products_loaded={products_loaded} addToCart={this.addToCart.bind(this)}
		return (
			<Router onUpdate={this.logPageView.bind(this)} history={browserHistory}>

						<div class="row row-centered">
							<Player config={player} onPlayToggle={this.onPlayToggle.bind(this)} episodes_loaded={this.state.episodes_loaded} />
						</div>




						<MatchWithProps exactly pattern="/"          component={Home}    props={{ episodes, blogs, onPlayToggle: this.onPlayToggle.bind(this), config: {player} }} />
						<MatchWithProps exactly pattern="/index.htm" component={Home}    props={{ episodes, blogs, onPlayToggle: this.onPlayToggle.bind(this), config: {player} }} />
						<MatchWithProps pattern="/podcast"           component={Podcast} props={{ episodes, onPlayToggle: this.onPlayToggle.bind(this), config: {player} }} />
						<MatchWithProps pattern="/blog*"             component={Blog}    props={{ onClick, blogs, folders, episodeMap, blogs_loaded, bucket, player, onPlayToggle: this.onPlayToggle.bind(this) }} />
						<Match pattern="/l/snl-impact" component={SnlImpact} />
						<MatchWithProps pattern="/store"             component={Store}    props={{ products, products_loaded, cart_items, total, shipping, country: this.state.country, updateCartQuantity: this.updateCartQuantity.bind(this), onChangeCountry: this.onChangeCountry.bind(this), addToCart: this.addToCart.bind(this) }} />
						<MatchWithProps pattern="/checkout"          component={Checkout} props={{ products, products_loaded, cart_items, total, shipping, country: this.state.country, updateCartQuantity: this.updateCartQuantity.bind(this), onChangeCountry: this.onChangeCountry.bind(this), clearCart: this.clearCart.bind(this), prod }} />
						<Match pattern="/services" component={Services} />
						<Miss component={NotFound} />
						<Footer />
						<Sidebar className="sidebar" toggleCart={this.toggleCart} cart_visible={cart_visible} cart_items={this.state.cart_items} updatable={true} onChangeCountry={this.onChangeCountry.bind(this)} country={this.state.country} updateCartQuantity={this.updateCartQuantity.bind(this)} shipping={this.state.shipping} total={this.state.total} />
					</div>
				</div>
			</Router>
*/