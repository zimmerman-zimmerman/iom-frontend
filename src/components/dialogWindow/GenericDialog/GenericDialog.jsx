import React from 'react';
import PropsType from 'prop-types';
import { Button } from 'antd';


import './GenericDialog.scss';

const GenericDialog = (props) => (
        <div className='dialog-container'>
            <div className='text'>{props.text}</div>
            <Button type='primary' className='button' onClick={props.handleClick}>{props.buttonText}</Button>
        </div>
);

GenericDialog.propTypes = {
    text: PropsType.string,
    buttonText: PropsType.string,
    handleClick: PropsType.func,
};

export default GenericDialog;