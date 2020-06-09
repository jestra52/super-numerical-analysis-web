/**
 * Rounds a number with the given decimals.
 * @param {number} number
 * @param {number} decimals
 */
export const round = (number, decimals) =>
    Math.round(number * (10 ** decimals)) / (10 ** decimals);

/**
 * Returns a number in scientific format with the given decimals.
 * @param {number} number
 * @param {number} decimals
 */
export const toExponentialString = (number, decimals) =>
    Number.parseFloat(number).toExponential(decimals);
