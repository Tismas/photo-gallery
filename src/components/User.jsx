import React, { Component } from 'react';
import { Link } from 'found';

import Gallery from './gallery/Gallery';

import { fetchUserPhotos } from '../store/actions/photosActions';
import withInfiniteScroll from './HOC/withInfiniteScroll';

import '../styles/user.scss';

class User extends Component {
    render() {
        return (
            <div className="user-container">
                <Link to="/" className="go-back-button"> Go back </Link>
                <Gallery photos={this.props.photos} />
            </div>
        );
    }
}


export default withInfiniteScroll(User, fetchUserPhotos);
