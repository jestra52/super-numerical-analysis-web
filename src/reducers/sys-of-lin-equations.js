// @scripts
import {
    GET_FACTORIZATION_LU_RESULT,
    GET_GAUSS_ELIMINATION_RESULT,
    GET_ITERATIVE_METHODS_RESULT
} from '../actions';

import { config } from '../config';

export const sysOfLinEquationsReducer = (
    state = config.initialState.sysOfLinEquations, action
) => {
    switch (action.type) {
        case GET_GAUSS_ELIMINATION_RESULT:
            return { ...state, gaussEliminationResult: action.payload };
        case GET_FACTORIZATION_LU_RESULT:
            return { ...state, factorizationLUResult: action.payload };
        case GET_ITERATIVE_METHODS_RESULT:
            return { ...state, iterMethodsResult: action.payload };
        default:
            return state;
    }
};
