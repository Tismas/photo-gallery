import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';

import Error from './common/Error';
import Gallery from './gallery/Gallery';

import { fetchPhotos, fetchMorePhotos } from '../store/actions/photosActions';

import '../styles/app.scss';
import '../styles/common/loaders.scss';

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
        if (this.props.fetching || this.props.fetchingMore || !this.props.fetched) return;
        if(document.body.scrollHeight - window.scrollY - window.innerHeight < 400)
            this.props.dispatch(fetchMorePhotos(this.props.page + 1));
    }

    render() {
        if (this.props.error)
            return <Error title="ERROR" message={this.props.error} />;
        if (this.props.fetching)
            return <Spinner name="cube-grid" className="loader-main" fadeIn="quarter" />
        
        return (
            <div>
                <Gallery photos={this.props.photos} />

                {this.props.fetchingMore ? 
                    <Spinner name="circle" className="loader-more" fadeIn="quarter" /> 
                : null }
            </div>
        );
    }
}

export default App;
