import React, { PropTypes } from 'react'
import ReactGA from 'react-ga'
import { connect } from 'react-redux'

import xml2js from "xml2js"

import { calculateShipping, calculateTotal } from '../utils/store_utils'
import { extractFolders } from '../utils/blog_utils'

import Footer from './Footer'
import Header from './Header'
import Menu from './Menu'
import Player from './Player'
import Sidebar from './Sidebar'

class MainView extends React.Component {
  constructor(props) {
    super(props)
    var persisted = this.loadState()
    var total = calculateTotal(persisted.cart_items, persisted.country.short)
    var shipping = calculateShipping(persisted.cart_items, persisted.country.short)
  }

  loadState() {
    var cart_items = []
    var country = {short: "us", long: "United State of America"}
    return {cart_items, country}
  }

  generateEpisodeMap(episodes) {
    var map = {}
    for (var i=0; i < episodes.length; i++) {
      var episode = episodes[i]
      var guid = episode.guid
      map[guid] = episode
    }
    return map
  }

  onPlayToggle(episode) {
    var player = this.state.player
    if (episode == undefined) {
      console.log("Stopping playback")
      this.setState({player: {is_playing: false}})
    } else {
      var s = this.state
      s.player.has_shown = true
      if (player.is_playing) {
        if (episode == undefined) {
          console.log("Unusual situation for player to be in, but I can fix it")
          s.player.episode = episode
          s.player.is_playing = true
          this.setState(s)
        } else {
          if (episode.guid == player.episode.guid) {
            s.player.is_playing = false
            this.setState(s)
          } else {
            s.player.episode = episode
            s.player.is_playing = true
            this.setState(s)
          }
        }
      } else {
        s.player.episode = episode
        s.player.is_playing = true
        this.setState(s)
      }
    }
  }
  
  onChangeCountry(short, long) {
    var country = {short, long}
    var total = calculateTotal(this.state.cart_items, short)
    var shipping = calculateShipping(this.state.cart_items, short)
    this.setState({country, total, shipping})
  }

  addToCart(product, size) {
    var quan = 1
    if (size == undefined) {
      size = ""
    }
    var cart_elem = {product, size, quan}
    var s = JSON.stringify(this.state.cart_items)
    var cart_items = JSON.parse(s)
    var found = false
    for (var i in cart_items) {
      var item = cart_items[i]
      if (item['product']['id'] == product['id'] && item['size'] == size) {
        item['quan'] += 1
        found = true
      }
    }
    if (!found) {
      cart_items.push(cart_elem)
    }
    var short = this.state.country.short
    var total = calculateTotal(cart_items, short)
    var shipping = calculateShipping(cart_items, short)
    this.setState({cart_items, total, shipping})
  }

  updateCartQuantity(product, size, delta) {
    if (size == undefined) {
      size = ""
    }
    var cart_items = JSON.parse(JSON.stringify(this.state.cart_items))
    for (var i in cart_items) {
      var item = cart_items[i]
      if (item['product']['id'] == product['id'] && item['size'] == size) {
        item['quan'] += delta
        if (item['quan'] <= 0) {
          cart_items.splice(i, 1)
        }
        i = cart_items.length
      }
    }
    var short = this.state.country.short
    var total = calculateTotal(cart_items, short)
    var shipping = calculateShipping(cart_items, short)
    this.setState({cart_items, total, shipping})
  }
  toggleCart() {
    var cart_visible = this.state.cart_visible
    cart_visible = !cart_visible
    this.setState({cart_visible: cart_visible})
    this.logPageViewInner("cart toggle")
  }
  logPageView() {
    var logPageViewInner = this.logPageViewInner
  }
  logPageViewInner(page) {
    console.log(["logPageViewInner", page])
    ReactGA.set({ page });
    ReactGA.pageview(page);
  }

  static propTypes = {
      children: PropTypes.object
  }

  render() {
    this.logPageView()
    
    const {pathname} = this.props.location;
    return (
        <div className="site">
          <div className="container-fluid">
            <div className="row row-centered">
              <Header pathname={pathname} />
            </div>
            <div className="row row-centered">
              <Player />
            </div>
            {this.props.children}
            <Footer />
            <Sidebar />
          </div> 
        </div>
    )
  }
}

export default connect(state => ({ cart: state.cart, site: state.site }))(MainView)

