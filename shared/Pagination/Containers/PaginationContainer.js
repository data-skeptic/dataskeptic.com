import React, { Component } from 'react';

import { Link } from 'react-router';

import classNames from 'classnames';

export class PaginationContainer extends Component {

    constructor() {
        super();

        this.goToNextPage = this.goToNextPage.bind(this);
        this.goToPrevPage = this.goToPrevPage.bind(this);
    }

    getPagesCount() {
        const count = Math.ceil(Math.round(this.props.total / this.props.perPage));
        return count;
    }

    getPrevPage() {
        return +this.props.currentPage - 1;
    }

    getNextPage() {
        return +this.props.currentPage + 1;
    }

    canGoToPrevPage() {
        return this.getPrevPage() > 0;
    }

    canGoToNextPage() {
        return this.getNextPage() <= this.getPagesCount();
    }

    goToNextPage(e) {
        if (!this.canGoToNextPage()) {
            e.preventDefault();
            return;
        }

        const next = this.getNextPage();
        this.props.onPageClick(next);
    }

    goToPrevPage(e) {
        if (!this.canGoToPrevPage()) {
            e.preventDefault();
            return;
        }

        const prev = this.getPrevPage();
        this.props.onPageClick(prev);
    }

    generatePages(count = 1) {
       let p = [];
       // server side rendering doesn't support [,...Array(count)] generation
       for (let i=0;i<count;i++) { p.push(i+1) }
       return p;
    }

    render() {
        const { currentPage, total, perPage } = this.props;
        const { onPageClick } = this.props;
        const count = this.getPagesCount();

        const pages = this.generatePages(count);

        const prevPage = this.getPrevPage();
        const nextPage = this.getNextPage();

        const canPrev = this.canGoToPrevPage();
        const canNext = this.canGoToNextPage();

        return (
            <ul className="paginator col-md-4">
                <li className={ classNames('prev', {'disabled': !canPrev} ) }>
                    <Link to={`/blog/${prevPage}`} onClick={this.goToPrevPage}>previous</Link>
                </li>
                {pages.map((x, i) =>
                    <li key={i}><Link to={`/blog/${x}`} className={ classNames({'current': x == currentPage}) } onClick={ (e) => { onPageClick(x, e) } }>{x}</Link></li>
                )}
                <li className={ classNames('next', {'disabled': !canNext} ) }>
                    <Link to={`/blog/${nextPage}`} onClick={this.goToNextPage}>next</Link>
                </li>
            </ul>
        )
    }

}


export default PaginationContainer;

