/*
    These ajax interceptors are useful for:
        - Process the request to be sent to the server.
        - Process the response received from the server.
        - Show the loading page when the HTTP request is in progress.
        - Show a notification when the server sends a message in the response,
          or when there is an error executing the request.
        - Send the Bearer Authentication Token for all requests.

    Process the request:
        - If ajaxInterceptors.convertRequestDataTo is set to "PascalCase"
          into the globals.json file, all request arguments will be
          sent in PascalCase.
        - If ajaxInterceptors.convertRequestDataTo is set to "camelCase"
          into the globals.json file, all request arguments will be
          sent in camelCase.
        - You can override above configuration for a particular request as
          show bellow. You can use again "PascalCase", "camelCase" or "none"
          (none means no convertion is done):
            axios.post(config.services.user.login, {
                params: { user, password },
                settings: { convertRequestDataTo: "none" }
            })

    Process the response:
        - All responses should follow this format:
            {
                Data | data: object,
                Message | message: string,
                MessageType | messageType: string, // See constants.notificationType
                Success | success: boolean
            }
        - If Success=true, the promise is resolved passing Data as the
          response. Similar logic to convert received data to "PascalCase",
          "camelCase" or "none" will be aplied. Use property: convertResponseDataTo.
        - If Success=false, the promise is rejected passing Message as
          the response.

    Show the loading page:
        - Can be globally activated for all requests by setting
          ajaxInterceptors.showLoadingPage to true into the
          globals.json file.
        - Can be activated/deactivated by each request as follow:
            axios.post(config.services.user.login, {
                settings: {
                    showLoadingPage: true
                }
            })
            axios.post(config.services.user.login, {
                settings: {
                    loadingMsg: 'Authenticating {0}...',
                    loadingMsgArgs: 'user'
                }
            })

    Show notifications:
        - In a similar way as the loading page is shown, to show notifications
          when the server sends a message in the response or when there is an
          error executing the request, use property "showNotifications".
*/

// @packages
import _ from 'lodash';
import axios from 'axios';

// @scripts
import { config } from '../config';
import { environment, globalUI } from '.';
import { copyObjInCamelCase, copyObjInPascalCase, printError } from '../util';

// @constants
const CAMEL_CASE = 'camelCase';
const PASCAL_CASE = 'PascalCase';
const SORT_KEY = 'sortKey';

/**
 * @param {?Object} requestSettings - Settings arguments sent in the request.
 * @param {string} property - 'convertResponseDataTo' or 'convertRequestDataTo'.
 * @param {string} wordCase - CAMEL_CASE or PASCAL_CASE.
 * @return {boolean}
 */
const shouldConvertDataTo = ({ requestSettings, property, wordCase }) =>
    !(
        requestSettings &&
        Boolean(requestSettings[property]) &&
        requestSettings[property] !== wordCase
    )
    &&
    (
        config.settings.ajaxInterceptors[property] === wordCase ||
        (
            requestSettings && requestSettings[property] === wordCase
        )
    );

/**
 * @param {?Object} requestSettings - Settings arguments sent in the request.
 * @return {boolean}
 */
const shouldConvertRequestDataToPascalCase = requestSettings =>
    shouldConvertDataTo({
        requestSettings,
        property: 'convertRequestDataTo',
        wordCase: PASCAL_CASE
    });

/**
 * @param {?Object} requestSettings - Settings arguments sent in the request.
 * @return {boolean}
 */
const shouldConvertRequestDataToCamelCase = requestSettings =>
    shouldConvertDataTo({
        requestSettings,
        property: 'convertRequestDataTo',
        wordCase: CAMEL_CASE
    });

/**
 * @param {?Object} requestSettings - Settings arguments sent in the request.
 * @return {boolean}
 */
const shouldConvertResponseDataToPascalCase = requestSettings =>
    shouldConvertDataTo({
        requestSettings,
        property: 'convertResponseDataTo',
        wordCase: PASCAL_CASE
    });

/**
 * @param {?Object} requestSettings - Settings arguments sent in the request.
 * @return {boolean}
 */
const shouldConvertResponseDataToCamelCase = requestSettings =>
    shouldConvertDataTo({
        requestSettings,
        property: 'convertResponseDataTo',
        wordCase: CAMEL_CASE
    });

/**
 * @param {?Object} requestSettings - Settings arguments sent in the request.
 * @return {boolean}
 */
const shouldDisplayLoadingPage = requestSettings =>
    !environment.isUnitTest &&
    !(
        requestSettings &&
        requestSettings.showLoadingPage === false
    )
    &&
    (
        config.settings.ajaxInterceptors.showLoadingPage ||
        (
            requestSettings &&
            (
                requestSettings.showLoadingPage === true ||
                Boolean(requestSettings.loadingMsg)
            )
        )
    );

/**
 * @param {?Object} requestSettings - Settings arguments sent in the request.
 * @return {boolean}
 */
const shouldDisplayNotifications = requestSettings =>
    !environment.isUnitTest &&
    !(
        requestSettings &&
        requestSettings.showNotifications === false
    )
    &&
    (
        config.settings.ajaxInterceptors.showNotifications ||
        (
            requestSettings &&
            requestSettings.showNotifications === true
        )
    );

/**
 * @param {Object} error - Error object received from Axios.
 * @return {Promise}
 */
const handleError = (error) => {
    const data = JSON.parse(
        (error.config && error.config.data) || null
    );

    globalUI.hideLoadingPage();

    if (shouldDisplayNotifications(data)) {
        globalUI.showToastNotificationError(
            error.response.data.message || error.message || error
        );
    }

    if (!environment.isUnitTest) {
        printError(error);
        printError(JSON.stringify(error));
    }

    return Promise.reject(error);
};

/**
 * @param {Object} request - Request object sent by axios.
 * @param {function} fn - _.upperFist or _.lowerFirst.
 */
const applyFnToSortKeyParam = (request, fn) => {
    const sortKey = fn(SORT_KEY);

    const params = request.data
        ? request.data.params
        : request.params;

    const hasSortKey = params && Object.prototype.hasOwnProperty.call(
        params, sortKey
    );

    if (hasSortKey) {
        params[sortKey] = fn(params[sortKey]);
    }
};

const addRequestInterceptors = () => {
    axios.interceptors.request.use(
        (request) => {
            globalUI.hideToastNotification();

            const settings = request.data
                ? request.data.settings
                : request.settings;

            if (shouldConvertRequestDataToCamelCase(settings)) {
                if (request.data && Boolean(request.data.params)) {
                    request.data.params = copyObjInCamelCase(request.data.params);
                } else if (request.params) {
                    request.params = copyObjInCamelCase(request.params);
                }
                applyFnToSortKeyParam(request, _.lowerFirst);
            } else if (shouldConvertRequestDataToPascalCase(settings)) {
                if (request.data && Boolean(request.data.params)) {
                    request.data.params = copyObjInPascalCase(request.data.params);
                } else if (request.params) {
                    request.params = copyObjInPascalCase(request.params);
                }
                applyFnToSortKeyParam(request, _.upperFirst);
            }

            if (shouldDisplayLoadingPage(settings)) {
                if (settings && Boolean(settings.loadingMsg)) {
                    globalUI.showLoadingPage(
                        settings.loadingMsg,
                        settings.loadingMsgArgs
                    );
                } else {
                    globalUI.showLoadingPage();
                }
            }

            return request;
        },
        error => handleError(error)
    );
};

const addResponseInterceptors = () => {
    axios.interceptors.response.use(
        (response) => {
            globalUI.hideLoadingPage();

            const requestData = JSON.parse(
                response.config.data || null
            );

            const requestSettings = requestData
                ? requestData.settings
                : response.config.settings;

            const responseHasProp = prop =>
                Object.prototype.hasOwnProperty.call(response.data, prop);

            const responseMessage = responseHasProp('Message')
                ? response.data.Message
                : response.data.message;
            const responseMessageType = responseHasProp('MessageType')
                ? response.data.MessageType
                : response.data.messageType;
            const responseSuccess = responseHasProp('Success')
                ? response.data.Success
                : response.data.success;
            const responseData = responseHasProp('Data')
                ? response.data.Data
                : response.data.data;

            const displayNotification =
                shouldDisplayNotifications(requestSettings) &&
                Boolean(responseMessage);

            if (displayNotification) {
                globalUI.showToastNotification({
                    msg: responseMessage,
                    type: responseMessageType
                });
            }

            if (!responseSuccess) {
                return Promise.reject(responseMessage);
            }

            if (shouldConvertResponseDataToCamelCase(requestSettings)) {
                return copyObjInCamelCase(responseData);
            }

            if (shouldConvertResponseDataToPascalCase(requestSettings)) {
                return copyObjInPascalCase(responseData);
            }

            return responseData;
        },
        error => handleError(error)
    );
};

export const addAjaxInterceptors = () => {
    addRequestInterceptors();
    addResponseInterceptors();
};
