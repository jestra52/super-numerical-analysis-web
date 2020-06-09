// @scripts
import { SHOW_LOADING_PAGE, HIDE_LOADING_PAGE } from '../actions';
import { config } from '../config';
import { format } from '../util';

/**
 * @return {{isVisible: boolean, msg: string}}
 */
export const loadingPageReducer = (
    state = config.initialState.loadingPage, action
) => {
    switch (action.type) {
        case SHOW_LOADING_PAGE:
            const msgArgs = [].concat(action.payload.msgArgs || []);
            const msg =
                Boolean(action.payload.msg) && Boolean(msgArgs.length)
                    ? format(action.payload.msg, ...msgArgs)
                    : action.payload.msg;
            return {
                isVisible: true,
                msg
            };
        case HIDE_LOADING_PAGE:
            return {
                isVisible: false,
                msg: null
            };
        default:
            return state;
    }
};
