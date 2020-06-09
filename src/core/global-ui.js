// @packages
import { bindActionCreators } from 'redux';

// @scripts
import { config } from '../config';
import { getBaseUrl, navigateToUrl } from '../util';

import {
    hideModalDialog,
    hideLoadingPage,
    hideToastNotification,
    showModalDialog,
    showLoadingPage,
    showToastNotification,
    showToastNotificationError,
    showToastNotificationInfo,
    showToastNotificationSuccess,
    showToastNotificationWarning
} from '../actions';

/**
 * @param {Store} store - The redux store.
 * @return {Object}
 */
export const initializeGlobalUI = (store) => {
    const globalUI = bindActionCreators({
        showLoadingPage,
        showToastNotification,
        showToastNotificationError,
        showToastNotificationInfo,
        showToastNotificationSuccess,
        showToastNotificationWarning
    }, store.dispatch);

    globalUI.showModalDialog = ({
        cancelLabel,
        customActions,
        msg,
        msgArgs,
        okLabel,
        onConfirm,
        showCancel,
        title,
        width
    }) => {
        const onConfirmCallback = onConfirm
            ? () => { globalUI.hideModalDialog(); onConfirm(); }
            : null;

        store.dispatch(showModalDialog({
            cancelLabel: cancelLabel || config.text.modalDialog.cancel,
            customActions,
            msg: msg || config.text.modalDialog.msg,
            msgArgs,
            okLabel: okLabel || config.text.modalDialog.ok,
            onConfirm: onConfirmCallback,
            showCancel,
            title: title || config.text.modalDialog.title,
            width
        }));
    };

    globalUI.hideLoadingPage = () => {
        if (store.getState().loadingPage.isVisible) {
            store.dispatch(hideLoadingPage());
        }
    };

    globalUI.hideToastNotification = () => {
        if (store.getState().toastNotification.isVisible) {
            store.dispatch(hideToastNotification());
        }
    };

    globalUI.hideModalDialog = () => {
        if (store.getState().modalDialog.isVisible) {
            store.dispatch(hideModalDialog());
        }
    };

    globalUI.setBrowserHistory = (browserHistory) => {
        globalUI.browserHistory = browserHistory;
    };

    globalUI.getLoginUrl = () => config.routes.find(
        route => route.name === 'login'
    ).url;

    globalUI.getHomeUrl = () => config.routes.find(
        route => route.name === 'home'
    ).url;

    globalUI.getDefaultUrl = () => {
        const defaultMenu =
            config.mainMenu.find(
                menuItem => menuItem.isDefault === true
            ) || config.mainMenu[0];

        const defaultUrl = defaultMenu
            ? defaultMenu.url
            : globalUI.getHomeUrl();

        return defaultUrl;
    };

    globalUI.navigateToUrl = (url) => {
        if (globalUI.browserHistory) {
            if (globalUI.browserHistory.location.pathname !== url) {
                globalUI.browserHistory.push(url);
            }
        } else {
            navigateToUrl(`${getBaseUrl()}/#${url}`);
        }
    };

    globalUI.navigateToDefaultUrl = () => {
        globalUI.navigateToUrl(globalUI.getDefaultUrl());
    };

    globalUI.exports = [];

    globalUI.attachExport = (name, fn) => {
        globalUI.exports[name] = fn;
    };

    globalUI.executeExport = (name) => {
        globalUI.exports[name]();
    };

    globalUI.getExports = () => globalUI.exports;

    return globalUI;
};
