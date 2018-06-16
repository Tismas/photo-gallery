import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeLocation, changeSearchValue } from '../../store/actions/metaActions';

export default function withSubscription(WrappedComponent, action) {
    @connect(store => ({
        photos: store.photos.photos,
        fetched: store.photos.fetched,
        fetching: store.photos.fetching,
        fetchingMore: store.photos.fetchingMore,
        lastLocation: store.meta.lastLocation,
        page: store.photos.page,
        searchValue: store.meta.searchValue
    }))
    class Result extends Component {
        constructor() {
            super();
            this.loadMore = this.loadMore.bind(this);
        }

        componentWillMount() {
            if (this.props.photos.length == 0 || this.props.lastLocation.pathname != this.props.location.pathname) {
                this.props.dispatch(action({ userID: this.props.params.id }));
                this.props.dispatch(changeSearchValue({ searchValue: '' }));
                this.props.dispatch(changeLocation({ location: this.props.location }));
            }
        }

        componentDidMount() {
            window.addEventListener('scroll', this.loadMore);
        }

        componentWillUnmount() {
            window.removeEventListener('scroll', this.loadMore);
        }

        loadMore() {
            if (this.props.fetching || this.props.fetchingMore || !this.props.fetched) return;
            if (document.body.scrollHeight - window.scrollY - window.innerHeight < 400) {
                this.props.dispatch(action({ page: this.props.page + 1, userID: this.props.params.id, search: this.props.searchValue }));
            }
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };

    return Result;
}