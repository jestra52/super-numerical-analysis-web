// @scripts
import { config } from '../../config';

import {
    GET_INTEGRATION_RESULT,
    getIntegrationResult
} from '../../actions';

test('getGaussEliminationResult (simple) (http success)', () => {
    const actionCreator = getIntegrationResult({
        fx: 'exp(4*x) * ln(x+3)',
        points: [3, 3.2, 3.4, 3.6, 3.8, 4, 4.2, 4.4, 4.6, 4.8, 5, 5.2, 5.4],
        methodType: 'simpson38',
        formType: 'integrationSimple'
    });
    const expectedActions = [{
        type: GET_INTEGRATION_RESULT,
        payload: config.mockData.getIntegrationSimpleResultSvcResponse
    }];
    return global.testDispatch(actionCreator, expectedActions);
});

test('getGaussEliminationResult (general) (http success)', () => {
    const actionCreator = getIntegrationResult({
        fx: 'exp(4*x) * ln(x+3)',
        points: [3, 3.2, 3.4, 3.6, 3.8, 4, 4.2, 4.4, 4.6, 4.8, 5, 5.2, 5.4],
        methodType: 'simpson38',
        formType: 'integrationGeneral'
    });
    const expectedActions = [{
        type: GET_INTEGRATION_RESULT,
        payload: config.mockData.getIntegrationGeneralResultSvcResponse
    }];
    return global.testDispatch(actionCreator, expectedActions);
});


test('getGaussEliminationResult (http fails)', () => {
    const actionCreator = getIntegrationResult();
    const expectedActions = [];
    return global.testDispatchWithNetworkError(actionCreator, expectedActions);
});
