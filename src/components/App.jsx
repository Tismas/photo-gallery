import React, { Component } from 'react';
import { connect } from 'react-redux';

import Photo from './Photo';

import { fetchPhotos, fetchMorePhotos } from '../store/actions/photosActions';

import '../styles/app.scss';

@connect(store => ({
    ...store.photos
}))
class App extends Component {
    constructor() {
        super();
        this.handleInfiniteScroll = this.handleInfiniteScroll.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(fetchPhotos());
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleInfiniteScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleInfiniteScroll);
    }

    handleInfiniteScroll() {
        if (this.props.fetching || this.props.fetchingMore) return;
        if(document.body.scrollHeight - window.scrollY - window.innerHeight < 400)
            this.props.dispatch(fetchMorePhotos(this.props.page + 1));
    }

    render() {
        return (
            <div className="photos-container">
                {this.props.photos.map((e, i) =>
                    e.url ? <Photo key={i} {...e} /> : null
                )}
            </div>
        );
    }
}

export default App;
