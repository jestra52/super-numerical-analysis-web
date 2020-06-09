// @scripts
import {
    GET_FIXED_POINT_RESULT,
    GET_SECANT_RESULT,
    GET_MULTIPLE_ROOTS_RESULT,
    GET_NEWTON_RESULT
} from '../actions';

import { config } from '../config';

export const openMethodsReducer = (
    state = config.initialState.openMethods, action
) => {
    switch (action.type) {
        case GET_FIXED_POINT_RESULT:
            return { ...state, fixedPointResult: action.payload };
        case GET_SECANT_RESULT:
            return { ...state, secantResult: action.payload };
        case GET_NEWTON_RESULT:
            return { ...state, newtonResult: action.payload };
        case GET_MULTIPLE_ROOTS_RESULT:
            return { ...state, multipleRootsResult: action.payload };
        default:
            return state;
    }
};
