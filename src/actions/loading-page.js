// @constants
export const HIDE_LOADING_PAGE = 'HIDE_LOADING_PAGE';
export const SHOW_LOADING_PAGE = 'SHOW_LOADING_PAGE';

/**
 * @param {string} msg
 * @param {?object|object[]} msgArgs
 */
export const showLoadingPage = (msg, msgArgs) =>
    ({
        type: SHOW_LOADING_PAGE,
        payload: {
            msg,
            msgArgs
        }
    });

export const hideLoadingPage = () =>
    ({
        type: HIDE_LOADING_PAGE
    });
