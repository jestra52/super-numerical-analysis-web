/* eslint no-redeclare: 0 */
/* global console */
/* global document */
/* global localStorage */
/* global navigator */
/* global sessionStorage */
/* global window */

/**
 * Returns a reference to the first object with the specified
 * value of the ID or NAME attribute.
 * @param {string} elementId - String that specifies the ID value.
 * @return {HTMLElement}
 */
export const getElementById = elementId =>
    document.getElementById(elementId);

/**
 * Returns the base URL of the current site.
 * @return {string}
 */
export const getBaseUrl = () =>
    window.location.origin;

/**
 * Returns the language of the browser.
 * @return {string}
 */
export const getNavigatorLanguage = () =>
    navigator.language || navigator.userLanguage;

/**
 * Returns a Storage object (localStorage or sessionStorage)
 * according to the device name specified as argument.
 * @param {string} device - Valid values are: 'localStorage' and
 * 'sessionStorage'.
 * @return {Storage}
 */
export const getStorage = (device) => {
    switch (device) {
        case 'localStorage':
            return localStorage;
        case 'sessionStorage':
            return sessionStorage;
        default:
            return null;
    }
};

/**
 * Gets the window inner width.
 * @return {number}
 */
export const getWindowInnerWidth = () =>
    window.innerWidth;

/**
 * Gets the window inner height.
 * @return {number}
 */
export const getWindowInnerHeight = () =>
    window.innerHeight;

/**
 * Returns a reference to the current PayPal API object.
 * @returns {Object}
 */
export const getPaypalApi = () =>
    window.paypal;

/**
 * Encodes a string to Base64.
 * @param {string} str - The string to be encoded.
 * @return {string}
 */
export const encodeBase64String = str =>
    window.btoa(str);

/**
 * Decodes a Base64 string.
 * @param {string} str - The string to be decoded.
 * @return {string}
 */
export const decodeBase64String = str =>
    window.atob(str);

/**
 * Sets the focus on the given element.
 * @param {string} elementId - Element to set the focus.
 * @param {?number} delayInMillis - The delay in milliseconds to set the focus.
 */
export const focus = (elementId, delayInMillis = 0) => {
    const focus = () => {
        const element = document.getElementById(elementId);
        if (element) {
            element.focus();
        }
    };
    setTimeout(focus, delayInMillis);
};

/**
 * Navigates to the given Url.
 * @param {string} url - The Url to navigate.
 */
export const navigateToUrl = (url) => {
    window.location.href = url;
};

/**
 * Prints a message into the javascript console.
 * @param {Object} obj - The object to print
 */
export const print = (obj) => {
    /* eslint-disable no-console */
    console.log(obj);
};

/**
 * Prints an error into the javascript console.
 * @param {Object} obj - The object to print
 */
export const printError = (obj) => {
    /* eslint-disable no-console */
    console.error(obj);
};

/**
 * Adds an event listener to the current window object.
 * @param {string} type - A case-sensitive string representing
 *  the event type to listen for.
 * @param {function} callback - The callback function.
 */
export const addEventListener = (type, callback) => {
    window.addEventListener(type, callback);
};

/**
 * Removes an event listener from the current window object.
 * @param {string} type - A case-sensitive string representing
 *  the event type to listen for.
 * @param {function} callback - The callback function.
 */
export const removeEventListener = (type, callback) => {
    window.removeEventListener(type, callback);
};

/**
 * Adds an action to be exectued every time the window is closed.
 * @param {function} callback - The callback function.
 */
export const addActionOnWindowClose = (callback) => {
    window.addEventListener('beforeunload', callback);
};

/**
 * Builds an image selector.
 * @param {number} maxSizeMb - The max size allowed in MB.
 * @param {function} onMaxSizeExceeded - Function called when the
 *  maximun size of the image is exceeded.
 * @param {function} onImageSelected - Function called when the
 *  image is selected.
 * @param {string} readMode - The way the image is read.
 *  Allowed values are: 'url'.
 */
export const buildImageSelector = ({
    maxSizeMb,
    onMaxSizeExceeded,
    onImageSelected,
    readMode
}) => {
    const imageSelector = document.createElement('input');

    imageSelector.setAttribute('type', 'file');
    imageSelector.setAttribute('accept', 'image/*');

    imageSelector.click();
    imageSelector.onchange = (evt) => {
        const fileReader = new global.FileReader();
        const maxBytes = maxSizeMb * 1000000;

        if (evt.target.files[0].size > maxBytes) {
            onMaxSizeExceeded();
            return;
        }

        if (readMode === 'url') {
            fileReader.readAsDataURL(evt.target.files[0]);
            fileReader.onload = (e) => {
                onImageSelected(e.target.result);
            };
        }
    };
};
