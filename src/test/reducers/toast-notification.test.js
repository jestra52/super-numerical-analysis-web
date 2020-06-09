// @scripts
import { HIDE_TOAST_NOTIFICATION, SHOW_TOAST_NOTIFICATION } from '../../actions';
import { config } from '../../config';
import { format } from '../../util';
import { toastNotificationReducer } from '../../reducers/toast-notification';

test('toastNotificationReducer: SHOW_TOAST_NOTIFICATION (with msgArgs)', () => {
    const action = {
        type: SHOW_TOAST_NOTIFICATION,
        payload: {
            msg: 'The email was sent to {0} on {1}',
            msgArgs: ['user@email.com', '01/01/2018'],
            type: 'info'
        }
    };
    const newState = toastNotificationReducer(config.initialState.toastNotification, action);
    const expectedState = {
        isVisible: true,
        msg: format(action.payload.msg, ...action.payload.msgArgs),
        type: action.payload.type
    };
    expect(newState).toEqual(expectedState);
});

test('toastNotificationReducer: SHOW_TOAST_NOTIFICATION (without msgArgs)', () => {
    const action = {
        type: SHOW_TOAST_NOTIFICATION,
        payload: {
            msg: 'The email was sent',
            type: 'info'
        }
    };
    const newState = toastNotificationReducer(config.initialState.toastNotification, action);
    const expectedState = {
        isVisible: true,
        msg: action.payload.msg,
        type: action.payload.type
    };
    expect(newState).toEqual(expectedState);
});

test('toastNotificationReducer: HIDE_TOAST_NOTIFICATION', () => {
    const initialState = {
        isVisible: true,
        msg: 'The email was sent',
        type: 'success'
    };
    const action = {
        type: HIDE_TOAST_NOTIFICATION
    };
    const newState = toastNotificationReducer(initialState, action);
    const expectedState = {
        isVisible: false,
        msg: null,
        type: null
    };
    expect(newState).toEqual(expectedState);
});

test('toastNotificationReducer: DEFAULT', () => {
    const initialState = {
        isVisible: true,
        msg: 'The email was sent',
        type: 'success'
    };
    const action = {
        type: 'UNLISTENED_ACTION'
    };
    const newState = toastNotificationReducer(initialState, action);
    expect(newState).toEqual(initialState);
});
