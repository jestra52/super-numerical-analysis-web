// @scripts
import { openMethodsReducer } from '../../reducers/open-methods';
import { config } from '../../config';

import {
    GET_FIXED_POINT_RESULT,
    GET_MULTIPLE_ROOTS_RESULT,
    GET_NEWTON_RESULT,
    GET_SECANT_RESULT
} from '../../actions';

test('openMethodsReducer: GET_FIXED_POINT_RESULT', () => {
    const action = {
        type: GET_FIXED_POINT_RESULT,
        payload: config.mockData.getFixedPointResultSvcResponse
    };
    const newState = openMethodsReducer(config.initialState.openMethods, action);
    const expectedState = Object.assign({}, config.initialState.openMethods, {
        fixedPointResult: action.payload
    });
    expect(newState).toEqual(expectedState);
});

test('openMethodsReducer: GET_NEWTON_RESULT', () => {
    const action = {
        type: GET_NEWTON_RESULT,
        payload: config.mockData.getNewtonResultSvcResponse
    };
    const newState = openMethodsReducer(config.initialState.openMethods, action);
    const expectedState = Object.assign({}, config.initialState.openMethods, {
        newtonResult: action.payload
    });
    expect(newState).toEqual(expectedState);
});

test('openMethodsReducer: GET_SECANT_RESULT', () => {
    const action = {
        type: GET_SECANT_RESULT,
        payload: config.mockData.getSecantResultSvcResponse
    };
    const newState = openMethodsReducer(config.initialState.openMethods, action);
    const expectedState = Object.assign({}, config.initialState.openMethods, {
        secantResult: action.payload
    });
    expect(newState).toEqual(expectedState);
});

test('openMethodsReducer: GET_MULTIPLE_ROOTS_RESULT', () => {
    const action = {
        type: GET_MULTIPLE_ROOTS_RESULT,
        payload: config.mockData.getMultipleRootsResultSvcResponse
    };
    const newState = openMethodsReducer(config.initialState.openMethods, action);
    const expectedState = Object.assign({}, config.initialState.openMethods, {
        multipleRootsResult: action.payload
    });
    expect(newState).toEqual(expectedState);
});
