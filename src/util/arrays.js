// @packages
import _ from 'lodash';

// @scripts
import { removeAccents } from './strings';

/**
 * Sorts an array by a property.
 *  - The sort is case insensitive
 *  - The sort is accent insensitive.
 * @param {?string} sortDirection - 'asc' or 'desc'.
 * @param {string} sortKey - Property name to sort the array.
 * @param {Object[]} source - The array to be sorted.
 */
export const sortArray = ({
    sortDirection = 'asc',
    sortKey,
    source
}) => {
    const arrayCopy = [...source];

    arrayCopy.sort((i1, i2) => {
        const item1Val = String(i1[sortKey]);
        const unaccentItem1Val = removeAccents(item1Val);
        const lowerCaseItem1Val = unaccentItem1Val.toLowerCase();

        const item2Val = String(i2[sortKey]);
        const unaccentItem2Val = removeAccents(item2Val);
        const lowerCaseItem2Val = unaccentItem2Val.toLowerCase();

        if (lowerCaseItem1Val > lowerCaseItem2Val) {
            return sortDirection === 'asc' ? 1 : -1;
        }

        if (lowerCaseItem1Val < lowerCaseItem2Val) {
            return sortDirection === 'asc' ? -1 : 1;
        }

        return 0;
    });

    return arrayCopy;
};

/**
 * Filter an array by a property that contains a given text.
 *  - The filter is case insensitive
 *  - The filter is accent insensitive.
 * @param {string} filterKey - The property to be evaluated.
 * @param {?string} filterValue - The text to be searched.
 * @param {Object[]} source - The array to be filtered.
 */
export const filterArray = ({
    filterKey,
    filterValue,
    source
}) =>
    source.filter((item) => {
        const itemVal = String(item[filterKey]);
        const unaccentItemVal = removeAccents(itemVal);
        const lowerCaseItemVal = unaccentItemVal.toLowerCase();

        const filterVal = filterValue || '';
        const unaccentFilterVal = removeAccents(filterVal);
        const lowerCaseFilterVal = unaccentFilterVal.toLowerCase();

        return lowerCaseItemVal.indexOf(lowerCaseFilterVal) >= 0;
    });

/**
 * Applies pagination over an array of objects.
 *  - The sort is case insensitive
 *  - The sort is accent insensitive.
 * @param {?number} pageNumber - The page number to be returned.
 * @param {number} pageSize - The size of each page.
 * @param {?string} sortDirection - 'asc' or 'desc'.
 * @param {?string} sortKey - Property name to sort the array.
 * @param {Object[]} source - The array to paginate.
 */
export const paginateArray = ({
    pageNumber = 1,
    pageSize,
    sortDirection = 'asc',
    sortKey = null,
    source
}) =>
    _.take(
        _.drop(
            sortKey
                ? sortArray({
                    source, sortKey, sortDirection
                })
                : source,
            (pageNumber - 1) * pageSize
        ),
        pageSize
    );

/**
 * Gets the minimun value of a property in a given array.
 * @param {Object} defaultValue - Value to return by default if the
 *  given array is undefined, null or empty.
 * @param {string} minKey - The property to get the min value.
 * @param {Object[]} source - The array to get the min value.
 */
export const getMinFromArray = ({
    defaultValue = null,
    minKey,
    source
}) =>
    source && source.length
        ? source.reduce((min, nextElement) =>
            Math.min(min, nextElement[minKey]), source[0][minKey])
        : defaultValue;

/**
 * Gets the maximun value of a property in a given array.
 * @param {Object} defaultValue - Value to return by default if the
 *  given array is undefined, null or empty.
 * @param {string} maxKey - The property to get the max value.
 * @param {Object[]} source - The array to get the max value.
 */
export const getMaxFromArray = ({
    defaultValue = null,
    maxKey,
    source
}) =>
    source && source.length
        ? source.reduce((max, nextElement) =>
            Math.max(max, nextElement[maxKey]), source[0][maxKey])
        : defaultValue;

/**
 * Group an array by a property.
 * @param {string} key - The property to grouping by.
 * @param {Object[]} source - The array to be grouped.
 */
export const groupArray = ({
    key,
    source
}) => source.reduce((prevElement, nextElement) => {
    const item = prevElement.find(item => item.key === nextElement[key]);
    if (item) {
        item.items.push(nextElement);
    } else {
        prevElement.push({
            key: nextElement[key],
            items: [nextElement]
        });
    }
    return prevElement;
}, []);
