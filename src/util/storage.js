/**
 * Return the current application state persisted in the local storage.
 * @param {function} getStorage - Function that returns a Storage object
 *  (localStorage or sessionStorage) according to the device name specified
 *  as argument.
 * @param {string} device - Valid values are: 'localStorage' and 'sessionStorage'.
 * @param {string} key - Key used to persist the state in the local storage.
 * @return {Object}
 */
export const loadState = ({
    getStorage, device, key
}) => {
    try {
        const storage = getStorage(device);

        if (!storage) {
            return undefined;
        }

        const serializedState = storage.getItem(key);

        if (!serializedState) {
            return undefined;
        }

        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

/**
 * Persists the current application state into the local storage.
 * @param {function} getStorage - Function that returns a Storage object
 *  (localStorage or sessionStorage) according to the device name specified
 *  as argument.
 * @param {string} device - Valid values are: 'localStorage' and 'sessionStorage'.
 * @param {string} key - Key used to persist the state in the local storage.
 * @param {Object} state - The state to persist.
 */
export const saveState = ({
    getStorage, device, key, state
}) => {
    try {
        const storage = getStorage(device);

        if (storage) {
            const serializedState = JSON.stringify(state);
            storage.setItem(key, serializedState);
        }
    } catch (err) { }
};
