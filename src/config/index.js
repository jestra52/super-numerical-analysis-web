/**
 * Join all configuration files in a unique config object which
 * can be used across the app.
 */

// @packages
import merge from 'deepmerge';

// @json
import appData from '../../package.json';
import envDevelopment from './settings/env-development.json';
import envLocal from './settings/env-local.json';
import envProduction from './settings/env-production.json';
import envQA from './settings/env-qa.json';
import envStaging from './settings/env-staging.json';
import envUnitTest from './settings/env-unit-test.json';
import globals from './settings/globals.json';
import initialState from './state/initial-state.json';
import mainMenu from './menu/main-menu.json';
import mockData from './data/mock-data.json';
import routes from './urls/routes.json';
import services from './urls/services.json';
import textEn from './text/text-en.json';

// @scripts
import { constants } from '../core/constants';

// @constants
const BASE_URL_PLACEHOLDER_FOR_SERVICES = '{root}';

const text = {
    en: textEn
};

/**
 * @return {Object}
 */
const getInitialState = () => {
    initialState.appVersion = appData.version;
    return initialState;
};

/**
 * @return {Object}
 */
const getSettings = () => {
    switch (process.env.REACT_APP_ENV) {
        case constants.environment.DEVELOPMENT:
            return merge(globals, envDevelopment);
        case constants.environment.LOCAL:
            return merge(globals, envLocal);
        case constants.environment.PRODUCTION:
            return merge(globals, envProduction);
        case constants.environment.QA:
            return merge(globals, envQA);
        case constants.environment.STAGING:
            return merge(globals, envStaging);
        case constants.environment.UNIT_TEST:
            return merge(globals, envUnitTest);
        default:
            return globals;
    }
};

/**
 * @param {string} rootUrl - The base service url for the current environment.
 * @return {Object}
 */
const getServices = rootUrl =>
    JSON.parse(
        JSON.stringify(services)
            .replace(
                new RegExp(BASE_URL_PLACEHOLDER_FOR_SERVICES, 'g'),
                rootUrl
            )
    );

/**
 * @return {Object}
 */
const getRoute = name =>
    routes.find(route => route.name === name);

/**
 * @param {string} languageCode - E.g: 'en', 'es'.
 */
function applyLanguage(languageCode) {
    const config = this;

    if (config.languageCode === languageCode) {
        return;
    }

    config.languageCode = languageCode;
    config.text = text[languageCode];
    config.masterData = {};

    const buildMainMenu = mainMenu =>
        mainMenu.map((menuItem) => {
            if (Array.isArray(menuItem.submenuItems)) {
                menuItem.submenuItems = buildMainMenu(menuItem.submenuItems);
            }

            const route = getRoute(menuItem.name);

            return Object.assign({}, menuItem, {
                description: config.text.routes[menuItem.name],
                url: route && route.url
            });
        });

    config.mainMenu = buildMainMenu(mainMenu);
}

/**
 * @return {{
 *  appVersion: string,
 *  applyLanguage: function,
 *  initialState: Object,
 *  languageCode: string,
 *  mainMenu: Array,
 *  mockData: Object,
 *  routes: Array,
 *  services: Object,
 *  settings: Object,
 *  text: Object
 * }}
 */
const getConfiguration = () => {
    if (global.config) {
        return global.config;
    }

    const appVersion = appData.version;
    const initialState = getInitialState();
    const settings = getSettings();
    const services = getServices(settings.services.root);

    const config = {
        appVersion,
        applyLanguage,
        initialState,
        mockData,
        routes,
        services,
        settings
    };

    config.applyLanguage('en');

    global.config = config;
    return config;
};

export const config = getConfiguration();
