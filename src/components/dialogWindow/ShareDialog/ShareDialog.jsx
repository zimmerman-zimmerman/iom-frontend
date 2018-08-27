import React, { Component } from 'react';
import PropsType from 'prop-types';
import { Button, Icon, Divider } from 'antd';
import {injectIntl, intlShape } from 'react-intl';
import { FacebookShareButton, GooglePlusShareButton, TwitterShareButton,
    FacebookIcon, TwitterIcon, GooglePlusIcon } from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { connect } from 'react-redux';

import * as genericActions from '../../../services/actions/generic';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';


import './ShareDialog.scss';

class ShareDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
        };

        this.copyLink = this.copyLink.bind(this);
        this.socialShare = this.socialShare.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
    }

    trans(id, text) {
        const { intl } = this.props;
        return intl.formatMessage({id: id, defaultMessage: text});
    };

    copyLink(){
        this.props.dispatch(genericActions.toggleModalRequest(<ConfirmationDialog
            title={this.trans('shared.link.copied.title', 'Shared link was copied')}
            descText={this.trans('shared.link.copied.desc', 'The link will has been copied to your clipboard')}
            buttonText={this.trans('disclaimer.button.text', 'CONTINUE')}
            handleClick={() => this.props.dispatch(genericActions.toggleModalRequest(null, false))}
        />, true));
    }

    socialShare(){
        this.props.dispatch(genericActions.toggleModalRequest(<ConfirmationDialog
            title={this.trans('shared.link.social.title', 'Link shared!')}
            descText={this.trans('shared.link.social.desc', 'The link was shared via social media')}
            buttonText={this.trans('disclaimer.button.text', 'CONTINUE')}
            handleClick={() => this.props.dispatch(genericActions.toggleModalRequest(null, false))}
        />, true));
    }

    sendEmail(){
        window.location.href = (`mailto:${this.state.email}?subject=Share a Link&body=${window.location}`);
    }

    render(){
        return (
            <div className='container'>
                <div>
                    <header className='title'> {this.trans("share.dialog.title", "Share current page")} </header>
                    <div className='share-link-box'>
                        <input  className='share-link-input' type="text"
                                placeholder={this.trans("share.dialog.shareable.link", "Get shareable link")}/>
                        <CopyToClipboard text={window.location}
                                         onCopy={this.copyLink}>
                            <Icon className="share-link-icon" type="link"/>
                        </CopyToClipboard>
                    </div>
                    <div className='label'>
                        {this.trans("share.dialog.share.email", "Share via email")}
                    </div>
                    <div className='share-email-box'>
                        <input  className='share-email-input' type="text"
                                placeholder={this.trans("share.dialog.enter.email", "Enter email adresses")}
                                value={this.state.email}
                                onChange={(e) => this.setState({ email: e.target.value })}/>
                        <Button className='send-button' onClick={this.sendEmail}>{this.trans("button.send", "SEND")}</Button>
                    </div>
                    <div className='label'>
                        {this.trans("share.dialog.share.social", "Share with your friends using these")}
                    </div>
                    <div className='social-share-container'>
                        <div className='social-button-container'>
                            <div className='social-button'>
                                <FacebookShareButton onShareWindowClose={this.socialShare}
                                                     url={window.location}
                                                     children={<FacebookIcon size={40} round/>} />
                            </div>
                            <div className='social-label'> Facebook </div>
                        </div>
                        <div className='social-button-container'>
                            <div className='social-button'>
                                <GooglePlusShareButton onShareWindowClose={this.socialShare}
                                                       url={window.location}
                                                       children={<GooglePlusIcon size={40} round/>} />
                            </div>
                            <div className='social-label'> Google + </div>
                        </div>
                        <div className='social-button-container'>
                            <div className='social-button'>
                                <TwitterShareButton onShareWindowClose={this.socialShare}
                                                    url={window.location}
                                                    children={<TwitterIcon size={40} round/>} />
                            </div>
                            <div className='social-label'> Twitter </div>
                        </div>
                    </div>
                </div>
                <Divider/>
                <div>
                    <Button className='cancel-button'
                            onClick={() => this.props.dispatch(genericActions.toggleModalRequest(null, false))}>
                        {this.trans("button.cancel", "CANCEL")}</Button>
                    <Button className='done-button'
                            onClick={() => this.props.dispatch(genericActions.toggleModalRequest(null, false))}>
                        {this.trans("button.done", "DONE")}</Button>
                </div>
            </div>
        )
    }
}

ShareDialog.propTypes = {
    intl: intlShape.isRequired
};

export default (connect(null)(injectIntl(ShareDialog)));