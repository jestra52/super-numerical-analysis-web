// @scripts
import moment from 'moment';

export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
export const NAME_REGEX = /^[A-zÀ-ú ]+$/;
export const PHONE_REGEX = /^(?:\((\+?\d+)?\)|\+?\d+) ?\d*(-?\d{2,3} ?){0,4}$/;
export const ZIP_REGEX = /^[0-9]{5}(?:-[0-9]{4})?$/;

/**
 * Validates if all child objects containing the property
 * "isValid" are set to true.
 * @param {Object} obj - The object to validate.
 * @return {boolean}
 * E.g.: isAllPropsValid({ usr: { isValid: true }, pwd: { isValid: true } });
 */
export const isAllPropsValid = obj =>
    Object.keys(obj).every((key) => {
        const item = obj[key];

        const valid = typeof item !== 'object' ||
            !Object.prototype.hasOwnProperty.call(item, 'isValid') ||
            (Object.prototype.hasOwnProperty.call(item, 'visible') && !item.visible) ||
            item.isValid;

        return valid;
    });

/**
 * Validates if a text is a valid number.
 * @param {string} text - The text to validate.
 * @param {number} decimals - The max allowed decimals.
 * @param {boolean} allowNegative - Indicates if negatives are allowed.
 */
export const isNumber = (text, decimals = 0, allowNegative = false) => {
    let pattern = null;

    if (decimals === 0 && !allowNegative) {
        pattern = '^\\d+$';
    } else if (decimals === 0 && allowNegative) {
        pattern = '^-?\\d+$';
    } else if (decimals > 0 && !allowNegative) {
        pattern = `^\\d+(\\.\\d{1,${decimals}})?$`;
    } else {
        pattern = `^-?\\d+(\\.\\d{1,${decimals}})?$`;
    }

    return new RegExp(pattern).test(text);
};

/**
 * Validates if a text is a valid date agains a format.
 * @param {string} text - The text to validate.
 * @param {?string} format - By default 'DD/MM/YYYY'.
 */
export const isDate = (text, format = 'DD/MM/YYYY') =>
    moment(text, format, true).isValid();

/**
 * Validates if a string is a valid name (only letters and spaces).
 * @param {string} text - The text to validate.
 * @return {boolean}
 */
export const isEmail = text =>
    EMAIL_REGEX.test(text);

/**
 * Validates if a string is a valid email.
 * @param {string} text - The text to validate.
 * @return {boolean}
 */
export const isName = text =>
    NAME_REGEX.test(text);

/**
 * Validates if a string is a valid phone.
 * @param {string} text - The text to validate.
 * @return {boolean}
 */
export const isPhone = text =>
    PHONE_REGEX.test(text);

/**
 * Validates if a string is a valid zip code.
 * @param {string} text - The text to validate.
 * @return {boolean}
 */
export const isZip = text =>
    ZIP_REGEX.test(text);
