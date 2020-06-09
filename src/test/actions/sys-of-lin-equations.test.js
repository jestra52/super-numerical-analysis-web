// @scripts
import { config } from '../../config';

import {
    GET_BEST_LAMBDA_RESULT,
    GET_FACTORIZATION_LU_RESULT,
    GET_GAUSS_ELIMINATION_RESULT,
    GET_ITERATIVE_METHODS_RESULT,
    getBestLambdaResult,
    getFactorizationLUResult,
    getGaussEliminationResult,
    getIterativeMethodsResult
} from '../../actions';

test('getGaussEliminationResult (http success)', () => {
    const actionCreator = getGaussEliminationResult();
    const expectedActions = [{
        type: GET_GAUSS_ELIMINATION_RESULT,
        payload: config.mockData.getGaussEliminationResultSvcResponse
    }];
    return global.testDispatch(actionCreator, expectedActions);
});

test('getGaussEliminationResult (http fails)', () => {
    const actionCreator = getGaussEliminationResult();
    const expectedActions = [];
    return global.testDispatchWithNetworkError(actionCreator, expectedActions);
});

test('getFactorizationLUResult (http success)', () => {
    const actionCreator = getFactorizationLUResult();
    const expectedActions = [{
        type: GET_FACTORIZATION_LU_RESULT,
        payload: config.mockData.getFactorizationLUResultSvcResponse
    }];
    return global.testDispatch(actionCreator, expectedActions);
});

test('getFactorizationLUResult (http fails)', () => {
    const actionCreator = getFactorizationLUResult();
    const expectedActions = [];
    return global.testDispatchWithNetworkError(actionCreator, expectedActions);
});

test('getIterativeMethodsResult (http success)', () => {
    const actionCreator = getIterativeMethodsResult();
    const expectedActions = [{
        type: GET_ITERATIVE_METHODS_RESULT,
        payload: config.mockData.getIterativeMethodsResultSvcResponse
    }];
    return global.testDispatch(actionCreator, expectedActions);
});

test('getIterativeMethodsResult (http fails)', () => {
    const actionCreator = getIterativeMethodsResult();
    const expectedActions = [];
    return global.testDispatchWithNetworkError(actionCreator, expectedActions);
});

test('getBestLambdaResult (http success)', () => {
    const actionCreator = getBestLambdaResult();
    const expectedActions = [{
        type: GET_BEST_LAMBDA_RESULT,
        payload: config.mockData.getBestLambdaResultSvc
    }];
    return global.testDispatch(actionCreator, expectedActions);
});

test('getBestLambdaResult (http fails)', () => {
    const actionCreator = getBestLambdaResult();
    const expectedActions = [];
    return global.testDispatchWithNetworkError(actionCreator, expectedActions);
});
