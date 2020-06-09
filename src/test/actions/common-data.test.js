// @scripts
import { config } from '../../config';

import {
    GET_APP_SETTINGS,
    SAVE_APP_SETTINGS,
    getDefaultAppSettings,
    saveAppSettings
} from '../../actions';

test('getDefaultAppSettings', () => {
    const actionCreator = getDefaultAppSettings();
    const expectedAction = {
        type: GET_APP_SETTINGS,
        payload: config.mockData.appSettingGetAllSvcResponse
    };
    expect(actionCreator).toEqual(expectedAction);
});

test('saveAppSettings', () => {
    const actionCreator = saveAppSettings(config.mockData.appSettingGetAllSvcResponse);
    const expectedAction = {
        type: SAVE_APP_SETTINGS,
        payload: config.mockData.appSettingGetAllSvcResponse
    };
    expect(actionCreator).toEqual(expectedAction);
});
