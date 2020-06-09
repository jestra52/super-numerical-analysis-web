// @scripts
import { constants } from '../core';

// @constants
export const HIDE_TOAST_NOTIFICATION = 'HIDE_TOAST_NOTIFICATION';
export const SHOW_TOAST_NOTIFICATION = 'SHOW_TOAST_NOTIFICATION';

/**
 * @param {string} msg
 * @param {?object|object[]} msgArgs
 * @param {string} type - See constants.notificationType
 */
export const showToastNotification = ({ msg, msgArgs, type }) =>
    ({
        type: SHOW_TOAST_NOTIFICATION,
        payload: {
            msg,
            msgArgs,
            type
        }
    });

/**
 * @param {string} msg
 * @param {?object|object[]} msgArgs
 */
export const showToastNotificationError = (msg, msgArgs) =>
    showToastNotification({
        msg,
        msgArgs,
        type: constants.notificationType.ERROR
    });

/**
 * @param {string} msg
 * @param {?object|object[]} msgArgs
 */
export const showToastNotificationInfo = (msg, msgArgs) =>
    showToastNotification({
        msg,
        msgArgs,
        type: constants.notificationType.INFO
    });

/**
 * @param {string} msg
 * @param {?object|object[]} msgArgs
 */
export const showToastNotificationSuccess = (msg, msgArgs) =>
    showToastNotification({
        msg,
        msgArgs,
        type: constants.notificationType.SUCCESS
    });

/**
 * @param {string} msg
 * @param {?object|object[]} msgArgs
 */
export const showToastNotificationWarning = (msg, msgArgs) =>
    showToastNotification({
        msg,
        msgArgs,
        type: constants.notificationType.WARNING
    });

export const hideToastNotification = () =>
    ({
        type: HIDE_TOAST_NOTIFICATION
    });
