/**
 * Formats a text like in C#.
 * @param {string} str - The string to be formated.
 * @param {object|object[]} args - Args to be replaced in the string.
 * @return {string}
 * E.g.: format("Hello {0} {1}", "Pepito", "Perez")
 */
export const format = (str, ...args) => {
    let formatedStr = str;
    args.forEach((value, index) => {
        while (formatedStr.indexOf(`{${index}}`) >= 0) {
            formatedStr = formatedStr.replace(`{${index}}`, value);
        }
    });
    return formatedStr;
};

/**
 * Remove accents from a given string. E.g.: Itagüí => Itagui.
 * @param {string} str - The string to remove the accents.
 */
export const removeAccents = str =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

/**
 * Gets a money representation for a given number.
 * @param {number} number - The number to format.
 * @param {number} decimals - Number of decimals.
 * @return {string}
 */
export const toMoneyString = ({ number, decimals }) =>
    `$ ${number.toFixed(decimals).toString()}`;
