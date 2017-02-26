import React, {Component} from 'react';

import {Link} from 'react-router';

import classNames from 'classnames';

export class PaginationContainer extends Component {

    constructor() {
        super();

        this.goToNextPage = this.goToNextPage.bind(this);
        this.goToPrevPage = this.goToPrevPage.bind(this);
    }

    getPagesCount() {
        const count = Math.ceil(this.props.total / this.props.perPage);
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

        this.props.onPageClick();
    }

    goToPrevPage(e) {
        if (!this.canGoToPrevPage()) {
            e.preventDefault();
            return;
        }

        this.props.onPageClick();
    }

    generatePages(count = 1, currentPage, pagesCount, canNext, canPrev) {
        let p = [];

        let from = 1;
        let to = count;

        for (let i = from; i <= to; i++) {
            p.push(i)
        }

        return p;
    }

    render() {
        const {currentPage, total, perPage, pagesCount = 10} = this.props;
        const {onPageClick} = this.props;
        const count = this.getPagesCount();


        const prevPage = this.getPrevPage();
        const nextPage = this.getNextPage();

        const canPrev = this.canGoToPrevPage();
        const canNext = this.canGoToNextPage();

        const pages = this.generatePages(count, currentPage, pagesCount, canNext, canPrev);

        return (
            <ul className="paginator col-md-4">
                <li className={ classNames('prev', {'disabled': !canPrev}) }>
                    <Link to={`/blog/${prevPage}`} onClick={this.goToPrevPage}>previous</Link>
                </li>
                {pages.map((x, i) =>
                    <li key={i}>
                        <Link to={`/blog/${x}`}
                              className={ classNames({'current': x === currentPage}) }
                              onClick={ (e) => {
                                  onPageClick(x, e)
                              } }>{x}
                        </Link>
                    </li>
                )}
                <li className={ classNames('next', {'disabled': !canNext}) }>
                    <Link to={`/blog/${nextPage}`} onClick={this.goToNextPage}>next</Link>
                </li>
            </ul>
        )
    }

}


export default PaginationContainer;

