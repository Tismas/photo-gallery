import React, { Component } from 'react';

import Gallery from './gallery/Gallery';

import { fetchPhotos, getCachedPhotos } from '../store/actions/photosActions';
import { changeSearchValue } from '../store/actions/metaActions';
import withInfiniteScroll from './HOC/withInfiniteScroll';

import '../styles/home.scss';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            searchValue: ''
        };

        this.onChange = this.onChange.bind(this);
        this.handleSubmitByEnter = this.handleSubmitByEnter.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(getCachedPhotos);
    }

    search() {
        this.props.dispatch(changeSearchValue({ searchValue: this.state.searchValue }));
        this.props.dispatch(fetchPhotos({ search: this.state.searchValue }));
    }

    handleSubmitByEnter(e) {
        if (e.keyCode == 13)
            this.search();
    }

    onChange(e) {
        this.setState({ searchValue: e.target.value });
    }

    render() {
        return (
            <div className="home-container">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-input"
                        value={this.state.searchValue}
                        onKeyDown={this.handleSubmitByEnter}
                        onChange={this.onChange}
                    />
                    <button className="search-button" onClick={this.search.bind(this)}>
                        Search
                    </button>
                </div>
                <Gallery photos={this.props.photos} />
            </div>
        );
    }
}


export default withInfiniteScroll(Home, fetchPhotos);
