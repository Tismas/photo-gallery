import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../styles/common/extend-text-button.scss';

const propTypes = {
    onClick: PropTypes.func.isRequired
};


class ExtendTextButton extends Component {
    render() {
        return (
            <div className="extend-text-button" onClick={this.props.onClick}>
                ...
            </div>
        );
    }
}


ExtendTextButton.propTypes = propTypes;


export default ExtendTextButton;
