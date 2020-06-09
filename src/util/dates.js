// @packages
import moment from 'moment';

/**
 * This is the minimun representable date value.
 */
export const MIN_DATE_VALUE = new Date(-864000000000000);

/**
 * This is the maximun representable date value.
 */
export const MAX_DATE_VALUE = new Date(8640000000000000);

/**
 * Gets a short date representation of the given date.
 * @param {Date} date
 * @return {string}
 * */
export const toShortDateString = date =>
    moment(date).format('L');

/**
 * Gets a short time representation of the given date.
 * @param {Date} date
 * @return {string}
 */
export const toShortTimeString = date =>
    moment(date).format('HH:mm:ss');

/**
 * Gets a short date-time representation of the given date.
 * @param {Date} date
 * @return {string}
 * */
export const toShortDateTimeString = date =>
    moment(date).format('L h:mm:ss a');

/**
 * Gets a long date-time representation of the given date.
 * @param {Date} date
 * @return {string}
 * */
export const toLongDateTimeString = date =>
    moment(date).format('LLLL');

/**
 * Removes the time part of the given date.
 * @param {Date} date
 * @return {Date}
 */
export const removeTime = date =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());
