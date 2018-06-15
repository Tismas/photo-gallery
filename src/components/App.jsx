import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        console.log(this.props);
        return (
            <div>
                {this.props.photos.map((e, i) =>
                    <div key={i}>
                        <img src={e.url} />
                        <div>
                            <div> Title: {e.title} </div>
                            <div> Description: {e.description} </div>
                            <div> Author: {e.author} </div>
                            <div> Upload Date: {e.uploadDate.toGMTString()} </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default App;
