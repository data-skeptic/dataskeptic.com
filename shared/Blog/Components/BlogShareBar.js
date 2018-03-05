import React, { Component } from 'react'
import { Link } from 'react-router'

import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share'

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  RedditShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  EmailShareButton
} = ShareButtons

const FacebookIcon = generateShareIcon('facebook')
const TwitterIcon = generateShareIcon('twitter')
const GooglePlusIcon = generateShareIcon('google')
const LinkedinIcon = generateShareIcon('linkedin')
const PinterestIcon = generateShareIcon('pinterest')
const VKIcon = generateShareIcon('vk')
const OKIcon = generateShareIcon('ok')
const TelegramIcon = generateShareIcon('telegram')
const WhatsappIcon = generateShareIcon('whatsapp')
const RedditIcon = generateShareIcon('reddit')
const TumblrIcon = generateShareIcon('tumblr')
const MailruIcon = generateShareIcon('mailru')
const EmailIcon = generateShareIcon('email')
const LivejournalIcon = generateShareIcon('livejournal')

export default class BlogShareBar extends Component {
  render() {
    var shareUrl = this.props.shareUrl
    var title = this.props.title
    var exampleImage = this.props.exampleImage
    return (
      <div className="blog-share-bar-container">
        <h3>Share this post</h3>
        <div className="blog-share-container">
          <FacebookShareButton
            url={shareUrl}
            quote={title}
            className="blog-share-container__share-button"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>

        <div className="blog-share-container">
          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="blog-share-container__share-button"
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>

        <div className="blog-share-container">
          <TelegramShareButton
            url={shareUrl}
            title={title}
            className="blog-share-container__share-button"
          >
            <TelegramIcon size={32} round />
          </TelegramShareButton>
        </div>

        <div className="blog-share-container">
          <WhatsappShareButton
            url={shareUrl}
            title={title}
            separator=":: "
            className="blog-share-container__share-button"
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>

        <div className="blog-share-container">
          <GooglePlusShareButton
            url={shareUrl}
            className="blog-share-container__share-button"
          >
            <GooglePlusIcon size={32} round />
          </GooglePlusShareButton>
        </div>

        <div className="blog-share-container">
          <LinkedinShareButton
            url={shareUrl}
            title={title}
            windowWidth={750}
            windowHeight={600}
            className="blog-share-container__share-button"
          >
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </div>

        <div className="blog-share-container">
          <PinterestShareButton
            url={String(window.location)}
            media={`${String(window.location)}/${exampleImage}`}
            windowWidth={1000}
            windowHeight={730}
            className="blog-share-container__share-button"
          >
            <PinterestIcon size={32} round />
          </PinterestShareButton>
        </div>

        <div className="blog-share-container">
          <VKShareButton
            url={shareUrl}
            image={`${String(window.location)}/${exampleImage}`}
            windowWidth={660}
            windowHeight={460}
            className="blog-share-container__share-button"
          >
            <VKIcon size={32} round />
          </VKShareButton>
        </div>

        <div className="blog-share-container">
          <OKShareButton
            url={shareUrl}
            image={`${String(window.location)}/${exampleImage}`}
            windowWidth={660}
            windowHeight={460}
            className="blog-share-container__share-button"
          >
            <OKIcon size={32} round />
          </OKShareButton>
        </div>

        <div className="blog-share-container">
          <RedditShareButton
            url={shareUrl}
            title={title}
            windowWidth={660}
            windowHeight={460}
            className="blog-share-container__share-button"
          >
            <RedditIcon size={32} round />
          </RedditShareButton>
        </div>

        <div className="blog-share-container">
          <TumblrShareButton
            url={shareUrl}
            title={title}
            windowWidth={660}
            windowHeight={460}
            className="blog-share-container__share-button"
          >
            <TumblrIcon size={32} round />
          </TumblrShareButton>
        </div>

        <div className="blog-share-container">
          <LivejournalShareButton
            url={shareUrl}
            title={title}
            description={shareUrl}
            className="blog-share-container__share-button"
          >
            <LivejournalIcon size={32} round />
          </LivejournalShareButton>
        </div>

        <div className="blog-share-container">
          <EmailShareButton
            url={shareUrl}
            subject={title}
            body="body"
            className="blog-share-container__share-button"
          >
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
        <div className="clear" />
      </div>
    )
  }
}
