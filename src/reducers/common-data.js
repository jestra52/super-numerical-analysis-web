// @packages
import { combineReducers } from 'redux';

// @scripts
import { GET_APP_SETTINGS, SAVE_APP_SETTINGS } from '../actions';
import { config } from '../config';

const appSettingListReducer = (
    state = config.initialState.commonData.appSettingList, action
) => {
    switch (action.type) {
        case GET_APP_SETTINGS:
            return action.payload;
        case SAVE_APP_SETTINGS:
            return action.payload;
        default:
            return state;
    }
};

export const commonDataReducer = combineReducers({
    appSettingList: appSettingListReducer
});
