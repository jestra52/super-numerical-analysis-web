// @packages
import { combineReducers } from 'redux';

// @scripts
import { appVersionReducer } from './app-version';
import { closedMethodsReducer } from './closed-methods';
import { commonDataReducer } from './common-data';
import { integrationReducer } from './integration';
import { interpolationReducer } from './interpolation-newton-lagrange';
import { loadingPageReducer } from './loading-page';
import { mainMenuReducer } from './main-menu';
import { modalDialogReducer } from './modal-dialog';
import { openMethodsReducer } from './open-methods';
import { sysOfLinEquationsReducer } from './sys-of-lin-equations';
import { toastNotificationReducer } from './toast-notification';

const appReducer = combineReducers({
    appVersion: appVersionReducer,
    closedMethods: closedMethodsReducer,
    commonData: commonDataReducer,
    integration: integrationReducer,
    interpolation: interpolationReducer,
    loadingPage: loadingPageReducer,
    mainMenu: mainMenuReducer,
    modalDialog: modalDialogReducer,
    openMethods: openMethodsReducer,
    sysOfLinEquations: sysOfLinEquationsReducer,
    toastNotification: toastNotificationReducer
});

/**
 * We wrap the appReducer into this rootReducer in order to easily
 * handle the LOGOUT event, on which we should reset the state back
 * to the to initial state.
 * @param {Object} state - Current application state.
 * @param {Object} action - Current dispatched action.
 * @return {Object}
 */
export const rootReducer = (state, action) =>
    appReducer(state, action);
