export const TOGGLE_MODAL_REQUEST = 'TOGGLE_MODAL_REQUEST';
export const TOGGLE_MODAL_SUCCESS = 'TOGGLE_MODAL_SUCCESS';

export function toggleModalRequest(component, open) {
    return {
        type: TOGGLE_MODAL_REQUEST,
        component,
        open,
    }
}

export function toggleModalSuccess(component, open) {
    return {
        type: TOGGLE_MODAL_SUCCESS,
        component,
        open,
    }
}
