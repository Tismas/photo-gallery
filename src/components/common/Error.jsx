import React from 'react';

import '../../styles/common/errors.scss'

const Error = props => {
    return (
        <div className="error-container">
            <div className="error-header">{props.title}</div>
            <div className="error-message">{props.message}</div>
        </div>
    );
}

export default Error;