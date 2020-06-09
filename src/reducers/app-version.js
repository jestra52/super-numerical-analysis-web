// @scripts
import { config } from '../config';

/**
 * We have this appVersionReducer which is no responding
 * to any action just because we want to persist the appVersion
 * into the localStorage at the moment the user is logged in.
 * This way, when there is a new version of the app, we know
 * that version changed and the user is automatically logged out.
 * @return {string}
 */
export const appVersionReducer = (
    state = config.initialState.appVersion, action
) => {
    switch (action.type) {
        default:
            return state;
    }
};
