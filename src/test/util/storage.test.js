// @scripts
import { loadState, saveState } from '../../util';

const storage = { current: {} };
const getStorage = deviceName =>
    !['localStorage', 'sessionStorage'].includes(deviceName) ? null : {
        setItem: (key, value) => { storage.current[key] = value; },
        getItem: key => storage.current[key],
        clear: () => { storage.current = {}; }
    };

describe('loadState', () => {
    test('loadState (getStorage is invalid)', () => {
        const loadedState = loadState({
            getStorage: undefined, device: 'mongoStorage', key: 'state'
        });
        expect(loadedState).toEqual(undefined);
    });

    test('loadState (device is invalid)', () => {
        const loadedState = loadState({
            getStorage, device: 'mongoStorage', key: 'state'
        });
        expect(loadedState).toEqual(undefined);
    });

    test('loadState (state doesn´t exist)', () => {
        const loadedState = loadState({
            getStorage, device: 'localStorage', key: 'state'
        });
        expect(loadedState).toEqual(undefined);
    });

    test('loadState (state exists)', () => {
        const state = { a: 1, b: 2, c: 3 };
        saveState({
            getStorage, device: 'localStorage', key: 'state', state
        });
        const loadedState = loadState({
            getStorage, device: 'localStorage', key: 'state'
        });
        expect(loadedState).toEqual(state);
        getStorage('localStorage').clear();
    });
});

describe('saveState', () => {
    test('saveState (device is invalid)', () => {
        const state = { a: 1, b: 2, c: 3 };
        saveState({
            getStorage, device: 'mongoStorage', key: 'state', state
        });
        const loadedState = loadState({
            getStorage, device: 'localStorage', key: 'state'
        });
        expect(loadedState).toEqual(undefined);
    });
});
