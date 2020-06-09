// @packages
import configureMockStore from 'redux-mock-store';
import throttle from 'lodash/throttle';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

// @scripts
import { config } from '../config';
import { rootReducer } from '../reducers';

import {
    copyObjIncludingProps,
    getStorage,
    loadState,
    saveState
} from '../util';

/**
 * @param {Store} store - The redux store.
 */
const configureLocalStorage = (store) => {
    if (config.settings.localStorage.isEnabled) {
        store.subscribe(
            throttle(
                () => {
                    const state = copyObjIncludingProps(
                        store.getState(),
                        config.settings.localStorage.savableState
                    );
                    saveState({
                        getStorage,
                        device: config.settings.localStorage.device,
                        key: config.settings.localStorage.key,
                        state
                    });
                },
                config.settings.localStorage.throttleWait
            )
        );
    }
};

/**
 * @param {{isUnitTest: boolean}} environment
 * @return {Store}
 */
export const initializeReduxStore = (environment) => {
    const middleware = [thunk];
    if (config.settings.reduxLogger.isEnabled) {
        middleware.push(createLogger());
    }

    const state = config.settings.localStorage.isEnabled
        ? loadState({
            getStorage,
            device: config.settings.localStorage.device,
            key: config.settings.localStorage.key
        })
        : undefined;

    const store = environment.isUnitTest
        ? configureMockStore(middleware)(state || config.initialState)
        : createStore(
            rootReducer,
            state,
            applyMiddleware(...middleware)
        );

    configureLocalStorage(store);
    return store;
};
