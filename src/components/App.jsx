import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';

import Error from './common/Error';
import UpdateNotyfication from './common/UpdateNotyfication';
import { updateInstalled, discardUpdate } from '../store/actions/swActions';
import { discardInstallNotyfication } from '../store/actions/metaActions';

import '../styles/app.scss';
import '../styles/common/loaders.scss';

@connect(store => ({
    error: store.photos.error,
    fetching: store.photos.fetching,
    fetchingMore: store.photos.fetchingMore,
    updatePending: store.serviceWorker.updatePending,
    canAddToHomescreen: store.meta.canAddToHomescreen,
    deferredPrompt: store.meta.deferredPrompt
}))
class App extends Component {
    showInstallPrompt() {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(() => {
            this.props.dispatch(discardInstallNotyfication());
        });
    }

    render() {
        if (this.props.fetching)
            return <Spinner name="cube-grid" className="loader-main" fadeIn="quarter" />

        return (
            <div>
                {this.props.children}

                {this.props.fetchingMore ?
                    <Spinner name="circle" className="loader-more" fadeIn="quarter" /> : null}
                {this.props.updatePending ? 
                    <UpdateNotyfication 
                        message="New application version is available" 
                        cta="Refresh"
                        actionCallback={() => this.props.dispatch(updateInstalled())}
                        discardCallback={() => this.props.dispatch(discardUpdate())}
                    /> : null}
                {this.props.deferredPrompt ? 
                    <UpdateNotyfication
                        message="You can add this app to homescreen!"
                        cta="Install"
                        actionCallback={() => this.showInstallPrompt.bind(this)}
                        discardCallback={() => this.props.dispatch(discardInstallNotyfication())}
                    /> : null}
                {this.props.error ? <Error title="ERROR" message={"Ups... You probably have no internet connection"} /> : null}
            </div>
        );
    }
}

export default App;
