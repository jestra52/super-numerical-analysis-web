// @packages
import axios from 'axios';

// @scripts
import { config } from '../config';

// @constants
export const GET_BISEC_FALSE_RULE_RESULT = 'GET_BISEC_FALSE_RULE_RESULT';
export const GET_INCR_SEARCH_RESULT = 'GET_INCR_SEARCH_RESULT';

/**
 * @param {{
 *  delta: number,
 *  fx: string,
 *  n: number,
 *  x0: number
 * }} params
 */
export const getIncrSearchResult = params =>
    dispatch => axios
        .post(config.services.closedMethods.getIncrSearchResult, params)
        .then((response) => {
            dispatch({
                type: GET_INCR_SEARCH_RESULT,
                payload: response
            });
            return response;
        })
        .catch(error => Promise.reject(error));

/**
 * @param {{
 *  fx: string,
 *  n: number,
 *  xi: number,
 *  xs: number,
 *  xm: number
 *  tolerance: number,
 *  isRelError: bool,
 *  isFalseRule: bool
 * }} params
 */
export const getBisecFalseRuleResult = params =>
    dispatch => axios
        .post(config.services.closedMethods.getBisecFalseRuleResult, params)
        .then((response) => {
            dispatch({
                type: GET_BISEC_FALSE_RULE_RESULT,
                payload: response
            });
            return response;
        })
        .catch(error => Promise.reject(error));
