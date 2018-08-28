import update from 'immutability-helper';
import {
    TOGGLE_MODAL_REQUEST, TOGGLE_MODAL_SUCCESS,
    UPDATE_BREADCRUMBS_REQUEST, UPDATE_BREADCRUMBS_SUCCESS
} from '../actions/generic';

const initial = {
    modalWindow: {
        open: false,
        component: null,
    },
    breadcrumbItems: [],
};

function updateModalRequest(state) {
    return update(state, {
        modalWindow: {$set: {
                open: state.modalWindow.open,
                component: state.modalWindow.component,
            }},
    });
}

function updateModalSuccess(state, action) {
    return update(state, {
        modalWindow: {$set: {
                open: !state.modalWindow.open,
                component: action.component.component,
            }},
    });
}


function modal(state=initial, action) {
    switch (action.type) {
        case TOGGLE_MODAL_REQUEST:
            return updateModalRequest(state, action);
        case TOGGLE_MODAL_SUCCESS:
            return updateModalSuccess(state, action);
        default:
            return state;
    }
}

function updateBreadcrumbRequest(state) {
    return update(state, {
        breadcrumbItems: {$set: state.breadcrumbItems},
    });
}

function updateBreadcrumbSuccess(state, action) {
    return update(state, {
        breadcrumbItems: {$set: action.breadcrumbItems.breadcrumbItems},
    });
}


function breadCrumbs(state=initial, action) {
    switch (action.type) {
        case UPDATE_BREADCRUMBS_REQUEST:
            return updateBreadcrumbRequest(state, action);
        case UPDATE_BREADCRUMBS_SUCCESS:
            return updateBreadcrumbSuccess(state, action);
        default:
            return state;
    }
}

const reducers = {
    modal,
    breadCrumbs,
};

export default reducers;