import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ExtendTextButton from './common/ExtendTextButton.jsx';

import '../styles/photo.scss';


const propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    uploadDate: PropTypes.objectOf(Date).isRequired,
};


class Photo extends Component {
    constructor() {
        super();
        this.state = {
            descriptionExtended: false
        }
    }

    extend() {
        this.setState({ descriptionExtended: true });
    }

    render() {
        const { url, title, description, author, uploadDate } = this.props;
        return (
            <div className="photo-wrapper">
                <div style={{ background: `url(${url}` }} className="photo" />
                <div className="photo-details">
                    <div className="photo-title"> {title} </div>
                    {description ?
                        <div className="photo-desc">
                            {this.state.descriptionExtended || description.length < 203 ?
                                description
                                :
                                [description.substr(0, 200), <ExtendTextButton onClick={this.extend.bind(this)} />]}
                        </div>
                        :
                        null
                    }
                    <div className="photo-author"> <b>Author</b>: {author} </div>
                    <div className="photo-date"> <b>Upload Date</b>: {uploadDate.toGMTString()} </div>
                </div>
            </div>
        );
    }
}


Photo.propTypes = propTypes;


export default Photo;
