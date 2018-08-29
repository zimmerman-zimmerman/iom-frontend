import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import * as genericActions from '../../services/actions/generic';
import isEqual from 'lodash/isEqual';

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(44, 44, 44, 0.8)',
        zIndex: '10',
    },
    content : {
        margin: 'auto',
        width : 'fit-content',
        height: 'fit-content',
    }
};

class DialogWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            component: null,
        };
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidUpdate(prevProps){
        if(!isEqual(this.props.modal, prevProps.modal)){
            this.setState({
                modalOpen: this.props.modal.open,
                component: this.props.modal.component,
            })
        }
    }

    closeModal() {
        this.props.dispatch(genericActions.toggleModalRequest(null, false))
    }

    render() {
        return (
            <Modal
                isOpen={this.state.modalOpen}
                style={customStyles}
                onRequestClose={this.closeModal}
            >
                {this.state.component}
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        modal: state.modal.modalWindow,
    }
};

export default (connect(mapStateToProps)(DialogWindow));
