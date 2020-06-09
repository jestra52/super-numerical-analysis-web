// @scripts
import { config } from '../../config';
import { integrationReducer } from '../../reducers/integration';

import { GET_INTEGRATION_RESULT } from '../../actions';

test('integrationReducer: GET_INTEGRATION_RESULT', () => {
    const action = {
        type: GET_INTEGRATION_RESULT,
        payload: config.mockData.getIntegrationSimpleResultSvcResponse
    };
    const newState = integrationReducer(config.initialState.integration, action);
    const expectedState = Object.assign({}, config.initialState.integration, {
        integrationResult: action.payload
    });
    expect(newState).toEqual(expectedState);
});
