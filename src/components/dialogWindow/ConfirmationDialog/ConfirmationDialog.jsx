import React from 'react';
import PropsType from 'prop-types';
import { Button, Icon } from 'antd';
import { connect } from 'react-redux';

import './ConfirmationDialog.scss';

const ConfirmationDialog = (props) => (
    <div className='confirm-container'>
        <Icon className='confirm-icon' type="check"/>
        <div className='confirm-title'>{props.title}</div>
        <div className='confirm-desc'>{props.descText}</div>
        <Button type='primary' className='confirm-button'
                onClick={props.handleClick}>{props.buttonText}</Button>
    </div>
);

ConfirmationDialog.propTypes = {
    title: PropsType.string,
    descText: PropsType.string,
    buttonText: PropsType.string,
    handleClick: PropsType.func,
};

export default (connect(null)(ConfirmationDialog));