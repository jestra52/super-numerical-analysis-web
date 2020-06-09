// @packages
import axios from 'axios';

// @scripts
import { config } from '../config';

// @constants
export const GET_INTERPOLATION_NEWTON_LAGRANGE_RESULT = 'GET_INTERPOLATION_NEWTON_LAGRANGE_RESULT';
export const GET_SPLINES_RESULT = 'GET_SPLINES_RESULT';

/**
 * @param {{
 *  xMatrix: Array.<number[]>,
 *  yMatrix: number[],
 *  methodType: string
 * }} params
 */
export const getInterpolationNewtonLagrangeResult = params =>
    dispatch => axios
        .post(config.services.interpolation.getInterpolationNewtonLagrangeResult, params)
        .then((response) => {
            dispatch({
                type: GET_INTERPOLATION_NEWTON_LAGRANGE_RESULT,
                payload: response
            });
            return response;
        })
        .catch(error => Promise.reject(error));

/**
 * @param {{
 *  xMatrix: Array.<number[]>,
 *  yMatrix: number[],
 *  methodType: string
 * }} params
 */
export const getSplinesResult = params =>
    dispatch => axios
        .post(config.services.interpolation.getSplinesResult, params)
        .then((response) => {
            dispatch({
                type: GET_SPLINES_RESULT,
                payload: response
            });
            return response;
        })
        .catch(error => Promise.reject(error));
