export const TOGGLE_MODAL_REQUEST = 'TOGGLE_MODAL_REQUEST';
export const TOGGLE_MODAL_SUCCESS = 'TOGGLE_MODAL_SUCCESS';

export function toggleModalRequest(component) {
    return {
        type: TOGGLE_MODAL_REQUEST,
        component,
    }
}

export function toggleModalSuccess(component) {
    return {
        type: TOGGLE_MODAL_SUCCESS,
        component,
    }
}
