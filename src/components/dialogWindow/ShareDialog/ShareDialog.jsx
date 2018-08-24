import React, { Component } from 'react';
import PropsType from 'prop-types';
import { Button, Input, Icon } from 'antd';
import {injectIntl, intlShape } from "react-intl";
import Trans from '../../../locales/Trans';


import './ShareDialog.scss';

const Search = Input.Search;

class ShareDialog extends Component {


    trans(id, text) {
        const { intl } = this.props;
        return intl.formatMessage({id: id, defaultMessage: text});
    };

    shareLink(){
        console.log('fuking work you piece of shit')
    }


    render(){
        return (
            <div className='container'>
                <header className='title'> {this.trans("share.dialog.title", "Share current page")} </header>
                <Input className='share-link-input'
                    placeholder={this.trans("share.dialog.shareable.link", "Get shareable link")}
                    suffix={<Icon className="share-link-icon" type="link" onClick={this.shareLink}/>}
                />
                <label>
                    {this.trans("share.dialog.share.email", "Share via email")}
                </label>
                <Input className='share-email-input'
                       placeholder={this.trans("share.dialog.enter.email", "Enter email adresses")}
                       suffix={<Button type='primary' className='button' onClick={this.shareLink}>{this.trans("button.send", "SEND")}</Button>}
                />
            </div>
        )
    }
}

ShareDialog.propTypes = {
    intl: intlShape.isRequired
};

export default injectIntl(ShareDialog);