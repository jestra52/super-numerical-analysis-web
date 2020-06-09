// @scripts
import { HIDE_MODAL_DIALOG, SHOW_MODAL_DIALOG } from '../../actions';
import { config } from '../../config';
import { modalDialogReducer } from '../../reducers/modal-dialog';
import { format } from '../../util';

test('modalDialogReducer: SHOW_MODAL_DIALOG (with msgArgs)', () => {
    const action = {
        type: SHOW_MODAL_DIALOG,
        payload: {
            msg: 'Are you sure you want to delete user {0}?',
            msgArgs: 'user@email.com',
            onConfirm: jest.fn()
        }
    };
    const newState = modalDialogReducer(config.initialState.confirmDialog, action);
    const expectedState = {
        isVisible: true,
        msg: format(action.payload.msg, action.payload.msgArgs),
        onConfirm: action.payload.onConfirm
    };
    expect(newState).toEqual(expectedState);
});

test('modalDialogReducer: SHOW_MODAL_DIALOG (without msgArgs)', () => {
    const action = {
        type: SHOW_MODAL_DIALOG,
        payload: {
            msg: 'Are you sure you want to delete this user?',
            onConfirm: jest.fn()
        }
    };
    const newState = modalDialogReducer(config.initialState.confirmDialog, action);
    const expectedState = {
        isVisible: true,
        msg: action.payload.msg,
        onConfirm: action.payload.onConfirm
    };
    expect(newState).toEqual(expectedState);
});

test('modalDialogReducer: HIDE_MODAL_DIALOG', () => {
    const initialState = {
        isVisible: true,
        msg: 'Are you sure you want to delete this user?',
        onConfirm: jest.fn()
    };
    const action = {
        type: HIDE_MODAL_DIALOG
    };
    const newState = modalDialogReducer(initialState, action);
    const expectedState = {
        isVisible: false,
        msg: null,
        onConfirm: null
    };
    expect(newState).toEqual(expectedState);
});

test('modalDialogReducer: DEFAULT', () => {
    const initialState = {
        isVisible: true,
        msg: 'Are you sure you want to delete this user?',
        onConfirm: jest.fn()
    };
    const action = {
        type: 'UNLISTENED_ACTION'
    };
    const newState = modalDialogReducer(initialState, action);
    expect(newState).toEqual(initialState);
});
