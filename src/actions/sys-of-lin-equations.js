// @packages
import axios from 'axios';

// @scripts
import { config } from '../config';

// @constants
export const GET_BEST_LAMBDA_RESULT = 'GET_BEST_LAMBDA_RESULT';
export const GET_FACTORIZATION_LU_RESULT = 'GET_FACTORIZATION_LU_RESULT';
export const GET_GAUSS_ELIMINATION_RESULT = 'GET_GAUSS_ELIMINATION_RESULT';
export const GET_ITERATIVE_METHODS_RESULT = 'GET_ITERATIVE_METHODS_RESULT';

/**
 * @param {{
 *  aMatrix: Array.<number[]>,
 *  bMatrix: number[],
 *  methodType: string
 * }} params
 */
export const getGaussEliminationResult = params =>
    dispatch => axios
        .post(config.services.sysOfLinEquations.getGaussEliminationResult, params)
        .then((response) => {
            dispatch({
                type: GET_GAUSS_ELIMINATION_RESULT,
                payload: response
            });
            return response;
        })
        .catch(error => Promise.reject(error));

/**
 * @param {{
 *  aMatrix: Array.<number[]>,
 *  bMatrix: number[],
 *  methodType: string
 * }} params
 */
export const getFactorizationLUResult = params =>
    dispatch => axios
        .post(config.services.sysOfLinEquations.getFactorizationLUResult, params)
        .then((response) => {
            dispatch({
                type: GET_FACTORIZATION_LU_RESULT,
                payload: response
            });
            return response;
        })
        .catch(error => Promise.reject(error));

/**
 * @param {{
 *  aMatrix: Array.<number[]>,
 *  bMatrix: number[],
 *  isRelError: bool,
 *  methodType: string
 *  n: number,
 *  tolerance: number,
 *  xArray: number[]
 * }} params
 */
export const getIterativeMethodsResult = params =>
    dispatch => axios
        .post(config.services.sysOfLinEquations.getIterativeMethodsResult, params)
        .then((response) => {
            dispatch({
                type: GET_ITERATIVE_METHODS_RESULT,
                payload: response
            });
            return response;
        })
        .catch(error => Promise.reject(error));

/**
 * @param {{
 *  aMatrix: Array.<number[]>,
 *  bMatrix: number[],
 *  isRelError: bool,
 *  methodType: string
 *  xArray: number[]
 * }} params
 */
export const getBestLambdaResult = params =>
    dispatch => axios
        .post(config.services.sysOfLinEquations.getBestLambdaResult, params)
        .then((response) => {
            dispatch({
                type: GET_BEST_LAMBDA_RESULT,
                payload: response
            });
            return response;
        })
        .catch(error => Promise.reject(error));
