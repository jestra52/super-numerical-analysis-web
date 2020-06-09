// @scripts
import { GET_INTERPOLATION_NEWTON_LAGRANGE_RESULT, GET_SPLINES_RESULT } from '../actions';

import { config } from '../config';


export const interpolationReducer = (
    state = config.initialState.interpolation, action
) => {
    switch (action.type) {
        case GET_INTERPOLATION_NEWTON_LAGRANGE_RESULT:
            return { ...state, interpolationNewtonLagrangeResult: action.payload };
        case GET_SPLINES_RESULT:
            return { ...state, splinesResult: action.payload };
        default:
            return state;
    }
};
