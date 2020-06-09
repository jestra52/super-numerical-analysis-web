// @scripts
import { appVersionReducer } from '../../reducers/app-version';

test('appVersionReducer: DEFAULT', () => {
    const initialState = '1.0.0.0';
    const action = {
        type: 'UNLISTENED_ACTION'
    };
    const newState = appVersionReducer(initialState, action);
    expect(newState).toEqual(initialState);
});
