import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';

import Error from './common/Error';

import '../styles/app.scss';
import '../styles/common/loaders.scss';

@connect(store => ({
    error: store.photos.error,
    fetching: store.photos.fetching,
    fetchingMore: store.photos.fetchingMore
}))
class App extends Component {
    render() {
        if (this.props.error)
            return <Error title="ERROR" message={this.props.error} />;
        if (this.props.fetching)
            return <Spinner name="cube-grid" className="loader-main" fadeIn="quarter" />

        return (
            <div>
                {this.props.children}

                {this.props.fetchingMore ?
                    <Spinner name="circle" className="loader-more" fadeIn="quarter" />
                    : null}
            </div>
        );
    }
}

export default App;
