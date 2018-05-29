import React from 'react'
import ReactGA from 'react-ga'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'

import xml2js from 'xml2js'

import { calculateShipping, calculateTotal } from '../utils/store_utils'
import { extractFolders } from '../utils/blog_utils'

import Footer from '../Layout/Components/Footer/Footer'
import Header from './Header'
import Menu from './Menu'
import PlayerContainer from '../Player'
import Sidebar from './Sidebar'
import Overflow from '../Layout/Components/Overflow/Overflow'

import { toggleMobileMenu } from '../Layout/Actions/LayoutActions'
import MobileMenu from '../MobileMenu/Components/MobileMenu'
import { getItemsCount as getCartItemsCount } from '../Cart/Helpers/getItemsCount'
import { toggleCart } from '../Cart/Actions/CartActions'

import Launcher from '../Chat/Containers/Launcher'
import { BOT_ID, THINKING_MESSAGE } from '../Chat/Constants'
import ConversationHandler from '../Chat/Dialogs/ConversationHandler'
import { loggMessage } from '../Chat/Reducers/ChatbotReducer'
import { setMobile } from '../Layout/Reducers/LayoutReducer'

const MOBILE_WIDTH = 768

class MainView extends React.Component {
  addMessage = message =>
    this.setState(prevState => ({
      messages: [...prevState.messages, message]
    }))
  reply = (message, operatorId) => {
    operatorId = !!this.props.contributors[operatorId] ? operatorId : BOT_ID
    const author = this.props.contributors[operatorId]

    this.addMessage({
      ...message,
      author
    })
  }
  onMessage = message => {
    this.addMessage(message)
    let cstate = this.props.chatbot.toJS()
    const dispatch = this.props.dispatch

    dispatch(loggMessage(message))
    cstate.contributors = this.props.contributors
    ConversationHandler.get_reply(dispatch, this.reply, cstate, message)
  }
  onInactivity = () => {
    this.reply(
      {
        text:
          'Still there?  Let me know what you think of the bot by DMing me on Slack!  I would appreciate your candid feedback'
      },
      'kyle'
    )
  }

  loadState() {
    var cart_items = []
    var country = { short: 'us', long: 'United State of America' }
    return { cart_items, country }
  }

  generateEpisodeMap(episodes) {
    var map = {}
    for (var i = 0; i < episodes.length; i++) {
      var episode = episodes[i]
      var guid = episode.guid
      map[guid] = episode
    }
    return map
  }

  onPlayToggle(episode) {
    var player = this.state.player
    if (episode == undefined) {
      console.log('Stopping playback')
      this.setState({ player: { is_playing: false } })
    } else {
      var s = this.state
      s.player.has_shown = true
      if (player.is_playing) {
        if (episode == undefined) {
          console.log('Unusual situation for player to be in, but I can fix it')
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
    var country = { short, long }
    var total = calculateTotal(this.state.cart_items, short)
    var shipping = calculateShipping(this.state.cart_items, short)
    this.setState({ country, total, shipping })
  }

  addToCart(product, size) {
    var quan = 1
    if (size == undefined) {
      size = ''
    }
    var cart_elem = { product, size, quan }
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
    this.setState({ cart_items, total, shipping })
  }

  updateCartQuantity(product, size, delta) {
    if (size == undefined) {
      size = ''
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
    this.setState({ cart_items, total, shipping })
  }
  toggleCart() {
    var cart_visible = this.state.cart_visible
    cart_visible = !cart_visible
    this.setState({ cart_visible: cart_visible })
    this.logPageViewInner('cart toggle')
  }
  logPageView() {
    var logPageViewInner = this.logPageViewInner
  }
  logPageViewInner(page) {
    console.log(['logPageViewInner', page])
    ReactGA.set({ page })
    ReactGA.pageview(page)
  }

  /**
   * Handler for mobile menu navigation item click
   *
   */
  onNavigationItemClick() {
    this.props.dispatch(toggleMobileMenu())
  }

  /**
   * Determinate current class list
   *
   * @param {Boolean} isMobileMenuVisible Mobile Menu visibility state
   */
  getClassList({ isMobileMenuVisible }) {
    let classes = ['site']

    if (isMobileMenuVisible) {
      classes.push('no-scroll')
    }

    return classes.join(' ')
  }

  /**
   * Click handler for overflow view
   */
  onOverflowClick() {
    this.props.dispatch(toggleCart())
  }

  /**
   * Handler for footer link click
   *
   */
  onFooterItemClick() {
    // scroll page to the top
    // window.scrollTo(0, 0);
  }

  constructor(props) {
    super(props)
    var persisted = this.loadState()
    var total = calculateTotal(persisted.cart_items, persisted.country.short)
    var shipping = calculateShipping(
      persisted.cart_items,
      persisted.country.short
    )

    this.onNavigationItemClick = this.onNavigationItemClick.bind(this)
    this.onOverflowClick = this.onOverflowClick.bind(this)
    this.onFooterItemClick = this.onFooterItemClick.bind(this)

    this.state = {
      ready: false,
      messages: []
    }
  }

  componentDidMount() {
    this.reply({ text: 'What would you like to talk about?' })

    this.listenResize()
    window.addEventListener('resize', this.listenResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.listenResize)
  }

  listenResize = () => {
    const width = window.innerWidth
    const isMobile = width <= MOBILE_WIDTH

    if (this.props.isMobile !== isMobile) {
      this.props.dispatch(setMobile(isMobile))
    }
  }

  render() {
    this.logPageView()
    const {
      isMobile,
      isMobileMenuVisible,
      cart,
      isCartVisible,
      chatbot,
      contributors,
      showAds = true
    } = this.props
    const { pathname } = this.props.location
    const itemsCount = getCartItemsCount(cart.toJS().cart_items)
    const isOverflowMode = isCartVisible
    const thinking = chatbot.get('thinking')

    return (
      <div
        className={classNames('site', {
          'no-scroll': isMobileMenuVisible
        })}
      >
        <div className="container-fluid">
          <MobileMenu
            itemClick={this.onNavigationItemClick}
            pathname={pathname}
            cartItemsCount={itemsCount}
            visible={isMobileMenuVisible}
          />

          <div className="row row-centered">
            <Header pathname={pathname} />
          </div>
          <div className="row">
            <PlayerContainer />
          </div>
          {this.props.children}
          <Sidebar />
        </div>
        <Footer
          showAds={showAds}
          linkClick={this.onFooterItemClick}
          banner={this.props.bannerContent}
        />
        <Overflow visible={isOverflowMode} onClick={this.onOverflowClick} />
        <Launcher
          defaultBot={contributors[BOT_ID]}
          thinking={thinking}
          messages={this.state.messages}
          onMessage={this.onMessage}
          onInactivity={this.onInactivity}
          inactivityDelay={1000 * 60 * 1}
          isMobile={isMobile}
        />
      </div>
    )
  }
}

export default connect(state => ({
  cart: state.cart,
  isCartVisible: state.cart.getIn(['cart_visible']),
  site: state.site,
  isMobileMenuVisible: state.layout.getIn(['isMobileMenuVisible']),
  isMobile: state.layout.get('isMobile'),
  showAds: state.layout.getIn(['showAds']),
  chatbot: state.chatbot,
  contributors: state.site.get('contributors').toJS()
}))(MainView)
