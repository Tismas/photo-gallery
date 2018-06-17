import React from 'react';

import '../../styles/common/errors.scss'

const Error = props => {
    return (
        <div className="error-container">
            <div className="error-header">{props.title}</div>
            <div className="error-message">{props.message}</div>
            <button className="error-button" onClick={() => window.location.reload()}>Refresh</button>
        </div>
    );
}

export default Error;