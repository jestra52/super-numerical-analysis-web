// @scripts
import { config } from '../config';

// @constants
export const GET_APP_SETTINGS = 'GET_APP_SETTINGS';
export const SAVE_APP_SETTINGS = 'SAVE_APP_SETTINGS';

export const getDefaultAppSettings = () =>
    ({
        type: GET_APP_SETTINGS,
        payload: config.mockData.appSettingGetAllSvcResponse
    });

/**
 * @param {{
 *  allowedValues: ?string
 *  category: string,
 *  decimals: ?number,
 *  key: string,
 *  max: ?number,
 *  min: ?number,
 *  permissionId: number,
 *  regex: ?string,
 *  required: boolean,
 *  settingId: number,
 *  type: string,
 *  value: ?string,
 * }}[] appSettings
 */
export const saveAppSettings = appSettings =>
    ({
        type: SAVE_APP_SETTINGS,
        payload: appSettings
    });
