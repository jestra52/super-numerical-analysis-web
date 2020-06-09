// @scripts
import {
    HIDE_LOADING_PAGE,
    SHOW_LOADING_PAGE,
    hideLoadingPage,
    showLoadingPage
} from '../../actions';

test('showLoadingPage', () => {
    const msg = 'Updating user {0}...';
    const msgArgs = 'user@email.com';
    const actionCreator = showLoadingPage(msg, msgArgs);
    const expectedActions = [{
        type: SHOW_LOADING_PAGE,
        payload: {
            msg,
            msgArgs
        }
    }];
    return global.testDispatch(actionCreator, expectedActions);
});

test('hideLoadingPage', () => {
    const actionCreator = hideLoadingPage();
    const expectedActions = [{
        type: HIDE_LOADING_PAGE
    }];
    return global.testDispatch(actionCreator, expectedActions);
});
