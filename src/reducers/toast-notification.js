// @scripts
import { SHOW_TOAST_NOTIFICATION, HIDE_TOAST_NOTIFICATION } from '../actions';
import { config } from '../config';
import { format } from '../util';

/**
 * @return {{isVisible: boolean, msg: string, type: string}}
 */
export const toastNotificationReducer = (
    state = config.initialState.toastNotification, action
) => {
    switch (action.type) {
        case SHOW_TOAST_NOTIFICATION:
            const msgArgs = [].concat(action.payload.msgArgs || []);
            const msg =
                Boolean(action.payload.msg) && Boolean(msgArgs.length)
                    ? format(action.payload.msg, ...msgArgs)
                    : action.payload.msg;
            return {
                isVisible: true,
                msg,
                type: action.payload.type
            };
        case HIDE_TOAST_NOTIFICATION:
            return {
                isVisible: false,
                msg: null,
                type: null
            };
        default:
            return state;
    }
};
