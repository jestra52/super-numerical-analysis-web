// @packages
import _ from 'lodash';

/**
 * Makes a copy of an object including a list of properties.
 * @param {Object} source - The object to be copied.
 * @param {string[]} includedProperties - The properties to be included.
 * @return {Object}
 */
export const copyObjIncludingProps = (source, includedProperties) =>
    Object.keys(source).reduce((copy, propName) => {
        if (includedProperties.includes(propName)) {
            copy[propName] = source[propName];
        }
        return copy;
    }, {});

/**
 * Makes a copy of an object excluding a list of properties.
 * @param {Object} source - The object to be copied.
 * @param {string[]} excludedProperties - The properties to be excluded.
 * @return {Object}
 */
export const copyObjExludingProps = (source, excludedProperties) =>
    Object.keys(source).reduce((copy, propName) => {
        if (!excludedProperties.includes(propName)) {
            copy[propName] = source[propName];
        }
        return copy;
    }, {});

/**
 * Changes a plain object's keys to camelCase recursively.
 * @param {Object} source - The object to be converted to camelCase.
 * @return {Object}
 */
export const copyObjInCamelCase = (source) => {
    if (Array.isArray(source)) {
        return source.map(item => copyObjInCamelCase(item));
    }
    if (source !== null && source.constructor === Object) {
        return Object.keys(source).reduce((result, key) => ({
            ...result,
            [_.lowerFirst(key)]: copyObjInCamelCase(source[key])
        }), {});
    }
    return source;
};

/**
 * Changes a plain object's keys to PascalCase recursively.
 * @param {Object} source - The object to be converted to camelCase.
 * @return {Object}
 */
export const copyObjInPascalCase = (source) => {
    if (Array.isArray(source)) {
        return source.map(item => copyObjInPascalCase(item));
    }
    if (source !== null && source.constructor === Object) {
        return Object.keys(source).reduce((result, key) => ({
            ...result,
            [_.upperFirst(key)]: copyObjInPascalCase(source[key])
        }), {});
    }
    return source;
};

/**
 * Converts the passed-in object in a validable object.
 * E.g: {a: 1} is converted to {a: {valid: true, value: 1}}
 * @param {Object} source - The object to be converted.
 * @return {Object}
 */
export const toEditableObject = (source) => {
    const editableObject = {};
    if (source) {
        Object.keys(source).forEach((key) => {
            editableObject[key] = {
                isValid: true,
                value: source[key]
            };
        });
    }
    return editableObject;
};
