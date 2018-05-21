import React, { Component } from 'react'
import { connect } from 'react-redux'
import page from "../Layout/hoc/page";

class Advertising extends Component {
  render() {
    return (
      <div className="advertise-page center">
        <h2>Advertising with Data Skeptic</h2>
        <ul>
          <li className="adv-li">
            <b>
              Data Skeptic consistently ranks in the top 5% of <u>all</u>{' '}
              podcasts
            </b>{' '}
            by downloads; but is special because of its devoted following among
            the data science community.
          </li>
          <li className="adv-li">
            We reach a{' '}
            <b>
              targeted segment of professionals including data scientists,
              analysts, and engineers
            </b>{' '}
            on a weekly basis. From the top CEOs, to the tech movers and
            shakers, we fulfill their appetite for facts-based knowledge in
            bite-sized audio.
          </li>
          <li className="adv-li">
            Our followers look towards us to sniff out the top data trends; to
            see how the community gathers and interpret data.{' '}
            <b>That makes Data Skeptic influential and powerful</b>.
          </li>
          <li className="adv-li">
            <b>In the end, we're a community</b>. And we can help you craft and
            deliver a message about your product or service to our highly
            targeted, devoted following.
          </li>
        </ul>

        <h2>Data Skeptic by the Numbers</h2>
        <ul>
          <li className="adv-li">
            <b>Data Skeptic is the top 5% of all podcasts</b> as evidenced by
            the growing 25k weekly downloads by unique subscribers.
          </li>
          <li className="adv-li">
            To put that into perspective,{' '}
            <b>21% of the USA market listens to podcasts</b>; which is{' '}
            <a
              target="_blank"
              href="http://www.convinceandconvert.com/social-media-measurement/the-5-key-2016-podcast-statistics/"
            >
              equal to the percentage of people who use Twitter (in the USA)
            </a>.
          </li>
          <li className="adv-li">
            <b>Our listeners discovered Data Skeptic organically</b>. More than
            45% of listeners organically found us on iTunes, Stitcher or some
            other podcast discovery software.
          </li>
          <li className="adv-li">
            <b>
              Podcast listeners are 19% more likely to follow brands compared to
              Social media users.
            </b>
          </li>
          <li className="adv-li">
            73% of podcast listeners, hear the podcast episode within 48 hours
            of downloading it; that is{' '}
            <a
              target="_blank"
              href="http://www.edisonresearch.com/wp-content/uploads/2016/05/The-Podcast-Consumer-2016.pdf"
            >
              immediate engagement
            </a>.
          </li>
          <li className="adv-li">
            <b>We're influential and growing.</b> Kyle Polich, as the Data
            Skeptic has spoken at high-profile events including IBM Insights,
            Big Data Day LA, and the Dallas Data Science conference.
          </li>
        </ul>

        <h2>Examples of Sponsorship Formats</h2>
        <ul>
          <li className="adv-li">
            We can help through a variety of ad types; see below two examples of
            the exceptional quality of our ads. Notice how the natural format
            allows seamless integration into the content.
          </li>
          <li className="adv-li">
            The first example shows an interview format which mirrors the
            regular DataSkeptic format to grab the viewer's attention.
          </li>
          <li className="adv-li">
            The second example highlights our sponsor in an approachable,
            down-to-earth style that engages listeners.
          </li>
        </ul>

        <h3>Interview style ads</h3>
        <iframe
          width="100%"
          height="166"
          scrolling="no"
          frameBorder="no"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/311032382&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"
        />

        <h3>Feature highlight ads</h3>
        <iframe
          width="100%"
          height="166"
          scrolling="no"
          frameBorder="no"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/311032627&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"
        />

        <br />
        <br />
        <br />

        <div className="advertising-action-wrapper">
          <div className="row coaching-end-box">
            <div className="col-xs-12 col-sm-5 coaching-left">
              <img src="/img/png/kyle-polich-wtext.png" />
            </div>
            <div className="col-xs-12 col-sm-7 coaching-right">
              <h2>Let's get started</h2>
              <p>
                For updated pricing, contact{' '}
                <a href="mailto:advertising@dataskeptic.com">
                  advertising@dataskeptic.com
                </a>.
              </p>
              <p>
                If you would like to have a conversation about how we can get
                your message to the Data Skeptic audience, feel free to schedule
                time with me via the button below.
              </p>
              <br />
              <br />
              <div className="book-me">
                <a className="book-me-link" href="https://calendly.com/polich">
                  <span className="book-me-1">Book me on </span>
                  <span className="book-me-2">calendly.com/polich</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="clear" />
      </div>
    )
  }
}

export default page(connect(state => ({ products: state.products }))(Advertising), {
  title: 'Advertising'
})
