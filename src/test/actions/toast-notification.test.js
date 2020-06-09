// @scripts
import { constants } from '../../core';

import {
    HIDE_TOAST_NOTIFICATION,
    SHOW_TOAST_NOTIFICATION,
    hideToastNotification,
    showToastNotificationError,
    showToastNotificationInfo,
    showToastNotificationSuccess,
    showToastNotificationWarning
} from '../../actions';

test('showToastNotificationError', () => {
    const msg = 'There was an error updating the record!';
    const actionCreator = showToastNotificationError(msg);
    const expectedActions = [{
        type: SHOW_TOAST_NOTIFICATION,
        payload: {
            msg,
            msgArgs: undefined,
            type: constants.notificationType.ERROR
        }
    }];
    return global.testDispatch(actionCreator, expectedActions);
});

test('showToastNotificationInfo', () => {
    const msg = 'The record was updated on: {0}';
    const msgArgs = '01/01/2018';
    const actionCreator = showToastNotificationInfo(msg, msgArgs);
    const expectedActions = [{
        type: SHOW_TOAST_NOTIFICATION,
        payload: {
            msg,
            msgArgs,
            type: constants.notificationType.INFO
        }
    }];
    return global.testDispatch(actionCreator, expectedActions);
});

test('showToastNotificationSuccess', () => {
    const msg = 'The email was sent to {0} on {1}';
    const msgArgs = ['user@email.com', '01/01/2018'];
    const actionCreator = showToastNotificationSuccess(msg, msgArgs);
    const expectedActions = [{
        type: SHOW_TOAST_NOTIFICATION,
        payload: {
            msg,
            msgArgs,
            type: constants.notificationType.SUCCESS
        }
    }];
    return global.testDispatch(actionCreator, expectedActions);
});

test('showToastNotificationWarning', () => {
    const msg = 'Your suscription will finish tomorrow';
    const actionCreator = showToastNotificationWarning(msg);
    const expectedActions = [{
        type: SHOW_TOAST_NOTIFICATION,
        payload: {
            msg,
            msgArgs: undefined,
            type: constants.notificationType.WARNING
        }
    }];
    return global.testDispatch(actionCreator, expectedActions);
});

test('hideToastNotification', () => {
    const actionCreator = hideToastNotification();
    const expectedActions = [{
        type: HIDE_TOAST_NOTIFICATION
    }];
    return global.testDispatch(actionCreator, expectedActions);
});
