// @scripts
import { config } from '../../config';

import {
    GET_FIXED_POINT_RESULT,
    GET_MULTIPLE_ROOTS_RESULT,
    GET_NEWTON_RESULT,
    GET_SECANT_RESULT,
    getFixedPointResult,
    getMultipleRootsResult,
    getNewtonResult,
    getSecantResult
} from '../../actions';

test('getFixedPointResult (http success)', () => {
    const actionCreator = getFixedPointResult();
    const expectedActions = [{
        type: GET_FIXED_POINT_RESULT,
        payload: config.mockData.getFixedPointResultSvcResponse
    }];
    return global.testDispatch(actionCreator, expectedActions);
});

test('getFixedPointResult (http fails)', () => {
    const actionCreator = getFixedPointResult();
    const expectedActions = [];
    return global.testDispatchWithNetworkError(actionCreator, expectedActions);
});

test('getNewtonResult (http success)', () => {
    const actionCreator = getNewtonResult();
    const expectedActions = [{
        type: GET_NEWTON_RESULT,
        payload: config.mockData.getNewtonResultSvcResponse
    }];
    return global.testDispatch(actionCreator, expectedActions);
});

test('getNewtonResult (http fails)', () => {
    const actionCreator = getNewtonResult();
    const expectedActions = [];
    return global.testDispatchWithNetworkError(actionCreator, expectedActions);
});

test('getSecantResult (http success)', () => {
    const actionCreator = getSecantResult();
    const expectedActions = [{
        type: GET_SECANT_RESULT,
        payload: config.mockData.getSecantResultSvcResponse
    }];
    return global.testDispatch(actionCreator, expectedActions);
});

test('getSecantResult (http fails)', () => {
    const actionCreator = getSecantResult();
    const expectedActions = [];
    return global.testDispatchWithNetworkError(actionCreator, expectedActions);
});

test('getMultipleRootsResult (http success)', () => {
    const actionCreator = getMultipleRootsResult();
    const expectedActions = [{
        type: GET_MULTIPLE_ROOTS_RESULT,
        payload: config.mockData.getMultipleRootsResultSvcResponse
    }];
    return global.testDispatch(actionCreator, expectedActions);
});

test('getMultipleRootsResult (http fails)', () => {
    const actionCreator = getMultipleRootsResult();
    const expectedActions = [];
    return global.testDispatchWithNetworkError(actionCreator, expectedActions);
});
