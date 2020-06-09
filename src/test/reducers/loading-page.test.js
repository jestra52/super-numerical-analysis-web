// @scripts
import { HIDE_LOADING_PAGE, SHOW_LOADING_PAGE } from '../../actions';
import { config } from '../../config';
import { format } from '../../util';
import { loadingPageReducer } from '../../reducers/loading-page';

test('loadingPageReducer: SHOW_LOADING_PAGE (with msgArgs)', () => {
    const action = {
        type: SHOW_LOADING_PAGE,
        payload: {
            msg: 'Updating users {0} and {1}...',
            msgArgs: [1, 2]
        }
    };
    const newState = loadingPageReducer(config.initialState.loadingPage, action);
    const expectedState = {
        isVisible: true,
        msg: format(action.payload.msg, ...action.payload.msgArgs)
    };
    expect(newState).toEqual(expectedState);
});

test('loadingPageReducer: SHOW_LOADING_PAGE (without msgArgs)', () => {
    const action = {
        type: SHOW_LOADING_PAGE,
        payload: {
            msg: 'Updating users...'
        }
    };
    const newState = loadingPageReducer(config.initialState.loadingPage, action);
    const expectedState = {
        isVisible: true,
        msg: action.payload.msg
    };
    expect(newState).toEqual(expectedState);
});

test('loadingPageReducer: HIDE_LOADING_PAGE', () => {
    const initialState = {
        isVisible: true,
        msg: 'Updating users...'
    };
    const action = {
        type: HIDE_LOADING_PAGE
    };
    const newState = loadingPageReducer(initialState, action);
    const expectedState = {
        isVisible: false,
        msg: null
    };
    expect(newState).toEqual(expectedState);
});

test('loadingPageReducer: DEFAULT', () => {
    const initialState = {
        isVisible: true,
        msg: 'Updating users...'
    };
    const action = {
        type: 'UNLISTENED_ACTION'
    };
    const newState = loadingPageReducer(initialState, action);
    expect(newState).toEqual(initialState);
});
