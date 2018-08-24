import update from 'immutability-helper';
import {
    TOGGLE_MODAL_REQUEST, TOGGLE_MODAL_SUCCESS,
} from '../actions/generic';

const initial = {
    modalWindow: {
        open: false,
        component: null,
    }
};

function updateRequest(state) {
    return update(state, {
        modalWindow: {$set: {
                open: state.modalWindow.open,
                component: state.modalWindow.component,
            }},
    });
}

function updateSuccess(state, action) {
    return update(state, {
        modalWindow: {$set: {
                open: action.component.open,
                component: action.component.component,
            }},
    });
}

function modal(state=initial, action) {
    switch (action.type) {
        case TOGGLE_MODAL_REQUEST:
            return updateRequest(state, action);
        case TOGGLE_MODAL_SUCCESS:
            return updateSuccess(state, action);
        default:
            return state;
    }
}

const reducers = {
    modal,
};

export default reducers;