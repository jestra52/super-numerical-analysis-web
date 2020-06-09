// @scripts
import { config } from '../../config';

import {
    GET_BISEC_FALSE_RULE_RESULT,
    GET_INCR_SEARCH_RESULT,
    getBisecFalseRuleResult,
    getIncrSearchResult
} from '../../actions';

test('getIncrSearchResult (http success)', () => {
    const actionCreator = getIncrSearchResult();
    const expectedActions = [{
        type: GET_INCR_SEARCH_RESULT,
        payload: config.mockData.getIncrSearchResultSvcResponse
    }];
    return global.testDispatch(actionCreator, expectedActions);
});

test('getIncrSearchResult (http fails)', () => {
    const actionCreator = getIncrSearchResult();
    const expectedActions = [];
    return global.testDispatchWithNetworkError(actionCreator, expectedActions);
});

test('getBisecFalseRuleResult (http success)', () => {
    const actionCreator = getBisecFalseRuleResult();
    const expectedActions = [{
        type: GET_BISEC_FALSE_RULE_RESULT,
        payload: config.mockData.getBisecFalseRuleResultSvcResponse
    }];
    return global.testDispatch(actionCreator, expectedActions);
});

test('getBisecFalseRuleResult (http fails)', () => {
    const actionCreator = getBisecFalseRuleResult();
    const expectedActions = [];
    return global.testDispatchWithNetworkError(actionCreator, expectedActions);
});
