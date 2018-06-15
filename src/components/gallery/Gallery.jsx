import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Photo from './Photo';

import '../../styles/gallery/gallery.scss';


const propTypes = {
    photos: PropTypes.array.isRequired
};


class Gallery extends Component {
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


Gallery.propTypes = propTypes;


export default Gallery;
