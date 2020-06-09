// @scripts
import {
    HIDE_MODAL_DIALOG,
    SHOW_MODAL_DIALOG,
    hideModalDialog,
    showModalDialog
} from '../../actions';

test('showModalDialog', () => {
    const confirmDialogArgs = {
        msg: 'Are you sure you want to delete user {0}?',
        msgArgs: 'user@email.com',
        onConfirm: jest.fn()
    };
    const actionCreator = showModalDialog(confirmDialogArgs);
    const expectedActions = [{
        type: SHOW_MODAL_DIALOG,
        payload: confirmDialogArgs
    }];
    return global.testDispatch(actionCreator, expectedActions);
});

test('hideModalDialog', () => {
    const actionCreator = hideModalDialog();
    const expectedActions = [{
        type: HIDE_MODAL_DIALOG
    }];
    return global.testDispatch(actionCreator, expectedActions);
});
