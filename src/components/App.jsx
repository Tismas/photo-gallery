import React, { Component } from 'react';
import { connect } from 'react-redux';

import Photo from './Photo';

import { fetchPhotos } from '../store/actions/photosActions';

import '../styles/app.scss';

@connect(store => ({
    photos: store.photos.photos,
    photosFetched: store.photos.fetched,
    photosFetching: store.photos.fetching,
    photosFetchError: store.photos.error,
}))
class App extends Component {
    componentWillMount() {
        this.props.dispatch(fetchPhotos());
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
