// @scripts
import { SHOW_MODAL_DIALOG, HIDE_MODAL_DIALOG } from '../actions';
import { config } from '../config';
import { format } from '../util';

/**
 * @return {{isVisible: boolean, msg: string, onConfirm: function}}
 */
export const modalDialogReducer = (
    state = config.initialState.modalDialog, action
) => {
    switch (action.type) {
        case SHOW_MODAL_DIALOG:
            const {
                cancelLabel,
                customActions,
                okLabel,
                showCancel,
                title,
                width
            } = action.payload;
            const msgArgs = [].concat(action.payload.msgArgs || []);
            const msg =
                Boolean(action.payload.msg) && Boolean(msgArgs.length)
                    ? format(action.payload.msg, ...msgArgs)
                    : action.payload.msg;
            return {
                cancelLabel,
                customActions,
                isVisible: true,
                msg,
                okLabel,
                onConfirm: action.payload.onConfirm,
                showCancel,
                title,
                width
            };
        case HIDE_MODAL_DIALOG:
            return Object.assign({}, state, {
                isVisible: false,
                msg: null,
                onConfirm: null
            });
        default:
            return state;
    }
};
