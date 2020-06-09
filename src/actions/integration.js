// @packages
import axios from 'axios';

// @scripts
import { config } from '../config';

// @constants
export const GET_INTEGRATION_RESULT = 'GET_INTEGRATION_RESULT';

/**
 * @param {{
 *  fx: string,
 *  points: number[],
 *  methodType: string,
 *  formType: string
 * }} params
 */
export const getIntegrationResult = params =>
    dispatch => axios
        .post(config.services.integration.getIntegrationResult, params)
        .then((response) => {
            dispatch({
                type: GET_INTEGRATION_RESULT,
                payload: response
            });
            return response;
        })
        .catch(error => Promise.reject(error));
