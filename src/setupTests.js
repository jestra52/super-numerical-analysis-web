/* eslint jest/no-standalone-expect: 0 */
/**
 * This global setup will be automatically executed before running
 * unit tests.
 */

// @scripts
import { serviceMocker, store } from './core';

/**
 * Function to test successfully dispatched actions.
 * @param {Object|function} actionCreator - Object created by the action creator,
 *  or de action creator itself.
 * @param {Array} expectedActions - List of expected actions.
 */
global.testDispatch = (actionCreator, expectedActions) => {
    store.clearActions();

    return Promise.resolve(store.dispatch(actionCreator))
        .then(() => {
            const dispatchedActions = store.getActions();

            expect(dispatchedActions)
                .toHaveLength(expectedActions.length);

            expectedActions
                .forEach(action => expect(dispatchedActions)
                    .toContainEqual(action));
        })
        .catch(error => Promise.reject(error));
};

/**
 * Function to test unsuccessfully dispatched actions.
 * @param {Object|function} actionCreator - Object created by the action creator,
 *  or de action creator itself.
 * @param {Array} expectedActions - List of expected actions.
 */
global.testDispatchWithNetworkError = (actionCreator, expectedActions) => {
    store.clearActions();
    serviceMocker.replyWithNetworkError();

    return Promise.resolve(store.dispatch(actionCreator))
        .then((response) => {
            serviceMocker.replyWithMockData();

            return Promise.reject(
                new Error(`Unexpected promise resolution: ${response}`)
            );
        })
        .catch(() => {
            const dispatchedActions = store.getActions();

            expect(dispatchedActions)
                .toHaveLength(expectedActions.length);

            expectedActions
                .forEach(action => expect(dispatchedActions)
                    .toContainEqual(action));

            serviceMocker.replyWithMockData();
            return Promise.resolve();
        });
};
