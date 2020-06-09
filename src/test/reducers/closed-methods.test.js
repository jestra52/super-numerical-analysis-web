// @scripts
import { closedMethodsReducer } from '../../reducers/closed-methods';
import { config } from '../../config';

import { GET_BISEC_FALSE_RULE_RESULT, GET_INCR_SEARCH_RESULT } from '../../actions';

test('closedMethodsReducer: GET_INCR_SEARCH_RESULT', () => {
    const action = {
        type: GET_INCR_SEARCH_RESULT,
        payload: config.mockData.getIncrSearchResultSvcResponse
    };
    const newState = closedMethodsReducer(config.initialState.closedMethods, action);
    const expectedState = Object.assign({}, config.initialState.closedMethods, {
        incrSearchResult: action.payload
    });
    expect(newState).toEqual(expectedState);
});

test('closedMethodsReducer: GET_BISEC_FALSE_RULE_RESULT', () => {
    const action = {
        type: GET_BISEC_FALSE_RULE_RESULT,
        payload: config.mockData.getBisecFalseRuleResultSvcResponse
    };
    const newState = closedMethodsReducer(config.initialState.closedMethods, action);
    const expectedState = Object.assign({}, config.initialState.closedMethods, {
        bisecFalseRuleResult: action.payload
    });
    expect(newState).toEqual(expectedState);
});
