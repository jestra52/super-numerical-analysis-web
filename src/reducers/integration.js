// @scripts
import { GET_INTEGRATION_RESULT } from '../actions';

import { config } from '../config';

export const integrationReducer = (
    state = config.initialState.integration, action
) => {
    switch (action.type) {
        case GET_INTEGRATION_RESULT:
            return { ...state, integrationResult: action.payload };
        default:
            return state;
    }
};
