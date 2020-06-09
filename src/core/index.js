// @packages
import WebFontLoader from 'webfontloader';

// @scripts
import { addAjaxInterceptors } from './ajax-interceptors';
import { config } from '../config';
import { constants } from './constants';
import { initializeGlobalUI } from './global-ui';
import { initializeReduxStore } from './redux-store';
import { initializeServiceMocker } from './service-mocker';

// @exports
export * from './constants';

const getEnvironment = () => ({
    isDevelopment: config.settings.environment.name ===
        constants.environment.DEVELOPMENT,
    isLocal: config.settings.environment.name ===
        constants.environment.LOCAL,
    isProduction: config.settings.environment.name ===
        constants.environment.PRODUCTION,
    isQa: config.settings.environment.name ===
        constants.environment.QA,
    isStaging: config.settings.environment.name ===
        constants.environment.STAGING,
    isUnitTest: config.settings.environment.name ===
        constants.environment.UNIT_TEST
});

/**
 * @param {Object} store - The redux store.
 * @param {Object} globalUI - The global ui object.
 */
const verifyAppVersion = (store, globalUI) => {
    if (store.getState().appVersion !== config.appVersion) {
        globalUI.logout();
    }
};

/**
 * @param {{isUnitTest: bool}} environment - The redux store.
 */
const loadFonts = (environment) => {
    if (!environment.isUnitTest) {
        WebFontLoader.load({
            google: {
                families: ['Roboto:300,400,500,700', 'Material Icons']
            },
            custom: {
                families: ['FontAwesome'],
                urls: ['https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css']
            }
        });
    }
};

const initializeApp = () => {
    if (global.core) {
        return global.core;
    }

    const environment = getEnvironment();
    const store = initializeReduxStore(environment);
    const globalUI = initializeGlobalUI(store);
    const serviceMocker = initializeServiceMocker();

    addAjaxInterceptors();
    verifyAppVersion(store, globalUI);
    loadFonts(environment);
    config.applyLanguage('en');

    global.core = {
        environment,
        globalUI,
        serviceMocker,
        store
    };

    return global.core;
};

export const {
    environment,
    globalUI,
    serviceMocker,
    store
} = initializeApp();
