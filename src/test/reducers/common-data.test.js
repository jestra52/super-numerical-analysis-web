// @scripts
import { config } from '../../config';
import { commonDataReducer } from '../../reducers/common-data';

import {
    GET_APP_SETTINGS,
    SAVE_APP_SETTINGS
} from '../../actions';

test('appSettingReducer: GET_APP_SETTINGS', () => {
    const action = {
        type: GET_APP_SETTINGS,
        payload: config.mockData.appSettingGetAllSvcResponse
    };
    const newState = commonDataReducer(config.initialState.commonData, action);
    const expectedState = Object.assign({}, config.initialState.commonData, {
        appSettingList: action.payload
    });
    expect(newState).toEqual(expectedState);
});

test('appSettingListReducer: SAVE_APP_SETTINGS', () => {
    const action = {
        type: SAVE_APP_SETTINGS,
        payload: config.mockData.appSettingGetAllSvcResponse
    };
    const newState = commonDataReducer(config.initialState.commonData, action);
    const expectedState = Object.assign({}, config.initialState.commonData, {
        appSettingList: action.payload
    });
    expect(newState).toEqual(expectedState);
});
