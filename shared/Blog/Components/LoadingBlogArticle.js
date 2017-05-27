import React, { Component } from 'react'
import { Link } from 'react-router'

import BlogAuthorTop from './BlogAuthorTop'

class LoadingBlogArticle extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const contributor = {
            prettyname: 'Lorem',
            twitterimg: '',
            twitterlink: '',
            linkedinimg: '',
            linkedinlink: ''
        }

        return (
            <div className="center loading">
                <div className="row blog-author-top">
                    <div className="col-xs-12 col-sm-4"><span className="preloader"><b>Author:</b> {'Lorem ipsum dolor sit'}</span></div>
                    <div className="col-xs-12 col-sm-4"><span className="preloader"><img src="/img/blank.gif" /> {'Lorem ipsum dolor sit'}</span></div>
                    <div className="col-xs-12 col-sm-4"><span className="preloader"><img src="/img/blank.gif" /> {'Lorem ipsum dolor sit'}</span></div>
                </div>

                <div id='blog-content'>
                    <h2 className="preloader">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</h2>
                    <p><span className="preloader">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</span></p>
                    <p><span className="preloader">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt </span></p>

                    <p><span className="preloader">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat nisi ut aliquip</span></p>
                    <p><span className="preloader">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat nisi ut aliquip</span></p>
                    <p><span className="preloader">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat nisi ut aliquip</span></p>
                    <p><span className="preloader">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat nisi ut aliquip</span></p>
                    <p><span className="preloader">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat nisi ut aliquip</span></p>
                    <p><span className="preloader">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat nisi ut aliquip</span></p>
                    <p><span className="preloader">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat nisi ut aliquip</span></p>
                    <p><span className="preloader">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat nisi ut aliquip</span></p>
                    <p><span className="preloader">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat nisi ut aliquip</span></p>
                    <p><span className="preloader">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat nisi ut aliquip</span></p>
                    <p><span className="preloader">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat nisi ut aliquip</span></p>
                </div>
            </div>
        )
    }
}

export default LoadingBlogArticle;