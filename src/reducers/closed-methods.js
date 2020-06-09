// @scripts
import { GET_BISEC_FALSE_RULE_RESULT, GET_INCR_SEARCH_RESULT } from '../actions';
import { config } from '../config';

export const closedMethodsReducer = (
    state = config.initialState.closedMethods, action
) => {
    switch (action.type) {
        case GET_INCR_SEARCH_RESULT:
            return { ...state, incrSearchResult: action.payload };
        case GET_BISEC_FALSE_RULE_RESULT:
            return { ...state, bisecFalseRuleResult: action.payload };
        default:
            return state;
    }
};
