import React from 'react';

import '../../styles/common/notyfication.scss'

const UpdateNotyfication = props => {
    return (
        <div className="notyfication-container">
            <div className="notyfication-message">{props.message}</div>
            <div className="notyfication-button" onClick={props.actionCallback}>{props.cta}</div>
            <div className="notyfication-button" onClick={props.discardCallback}>Discard</div>
        </div>
    );
}

export default UpdateNotyfication;