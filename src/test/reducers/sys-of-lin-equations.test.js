// @scripts
import { config } from '../../config';
import { sysOfLinEquationsReducer } from '../../reducers/sys-of-lin-equations';

import {
    GET_FACTORIZATION_LU_RESULT,
    GET_GAUSS_ELIMINATION_RESULT,
    GET_ITERATIVE_METHODS_RESULT
} from '../../actions';

test('sysOfLinEquationsReducer: GET_GAUSS_ELIMINATION_RESULT', () => {
    const action = {
        type: GET_GAUSS_ELIMINATION_RESULT,
        payload: config.mockData.getGaussEliminationResultSvcResponse
    };
    const newState = sysOfLinEquationsReducer(config.initialState.sysOfLinEquations, action);
    const expectedState = Object.assign({}, config.initialState.sysOfLinEquations, {
        gaussEliminationResult: action.payload
    });
    expect(newState).toEqual(expectedState);
});

test('sysOfLinEquationsReducer: GET_FACTORIZATION_LU_RESULT', () => {
    const action = {
        type: GET_FACTORIZATION_LU_RESULT,
        payload: config.mockData.getFactorizationLUResultSvcResponse
    };
    const newState = sysOfLinEquationsReducer(config.initialState.sysOfLinEquations, action);
    const expectedState = Object.assign({}, config.initialState.sysOfLinEquations, {
        factorizationLUResult: action.payload
    });
    expect(newState).toEqual(expectedState);
});

test('sysOfLinEquationsReducer: GET_ITERATIVE_METHODS_RESULT', () => {
    const action = {
        type: GET_ITERATIVE_METHODS_RESULT,
        payload: config.mockData.getIterativeMethodsResultSvcResponse
    };
    const newState = sysOfLinEquationsReducer(config.initialState.sysOfLinEquations, action);
    const expectedState = Object.assign({}, config.initialState.sysOfLinEquations, {
        iterMethodsResult: action.payload
    });
    expect(newState).toEqual(expectedState);
});
