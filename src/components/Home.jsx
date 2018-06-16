import React, { Component } from 'react';

import Gallery from './gallery/Gallery';

import { fetchPhotos } from '../store/actions/photosActions';
import withInfiniteScroll from './HOC/withInfiniteScroll';

import '../styles/home.scss';

class Home extends Component {
    render() {
        return (
            <Gallery photos={this.props.photos} />
        );
    }
}


export default withInfiniteScroll(Home, fetchPhotos);
