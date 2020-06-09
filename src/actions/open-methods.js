// @packages
import axios from 'axios';

// @scripts
import { config } from '../config';

// @constants
export const GET_FIXED_POINT_RESULT = 'GET_FIXED_POINT_RESULT';
export const GET_NEWTON_RESULT = 'GET_NEWTON_RESULT';
export const GET_MULTIPLE_ROOTS_RESULT = 'GET_MULTIPLE_ROOTS_RESULT';
export const GET_SECANT_RESULT = 'GET_SECANT_RESULT';

/**
 * @param {{
 *  fx: string,
 *  gx: string,
 *  isRelError: bool,
 *  n: number,
 *  tolerance: number,
 *  x0: number
 * }} params
 */
export const getFixedPointResult = params =>
    dispatch => axios
        .post(config.services.openMethods.getFixedPointResult, params)
        .then((response) => {
            dispatch({
                type: GET_FIXED_POINT_RESULT,
                payload: response
            });
            return response;
        })
        .catch(error => Promise.reject(error));

/**
 * @param {{
 *  fx: string,
 *  isRelError: bool,
 *  n: number,
 *  tolerance: number,
 *  x0: number
 * }} params
 */
export const getNewtonResult = params =>
    dispatch => axios
        .post(config.services.openMethods.getNewtonResult, params)
        .then((response) => {
            dispatch({
                type: GET_NEWTON_RESULT,
                payload: response
            });
            return response;
        })
        .catch(error => Promise.reject(error));

/**
 * @param {{
 *  fx: string,
 *  isRelError: bool,
 *  n: number,
 *  tolerance: number,
 *  x0: number
 * }} params
 */
export const getMultipleRootsResult = params =>
    dispatch => axios
        .post(config.services.openMethods.getMultipleRootsResult, params)
        .then((response) => {
            dispatch({
                type: GET_MULTIPLE_ROOTS_RESULT,
                payload: response
            });
            return response;
        })
        .catch(error => Promise.reject(error));

/**
 * @param {{
 *  fx: string,
 *  isRelError: bool,
 *  n: number,
 *  tolerance: number,
 *  x0: number,
 *  x1: number
 * }} params
 */
export const getSecantResult = params =>
    dispatch => axios
        .post(config.services.openMethods.getSecantResult, params)
        .then((response) => {
            dispatch({
                type: GET_SECANT_RESULT,
                payload: response
            });
            return response;
        })
        .catch(error => Promise.reject(error));
