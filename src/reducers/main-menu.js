// @packages
import { combineReducers } from 'redux';

// @scripts
import {
    COLLAPSE_MAIN_MENU,
    COLLAPSE_MENU_ITEM,
    EXPAND_MAIN_MENU,
    EXPAND_MENU_ITEM
} from '../actions/main-menu';

import { config } from '../config';

/**
 * @return {string[]}
 */
export const expandedItemsReducer = (
    state = config.initialState.mainMenu.expandedItems, action
) => {
    switch (action.type) {
        case EXPAND_MENU_ITEM:
            return [...state, action.payload];
        case COLLAPSE_MENU_ITEM:
            return state.filter(item => item !== action.payload);
        case COLLAPSE_MAIN_MENU:
            return [];
        default:
            return state;
    }
};

/**
 * @return {boolean}
 */
export const isExpandedReducer = (
    state = config.initialState.mainMenu.isExpanded, action
) => {
    switch (action.type) {
        case EXPAND_MAIN_MENU:
        case EXPAND_MENU_ITEM:
            return true;
        case COLLAPSE_MAIN_MENU:
            return false;
        default:
            return state;
    }
};

export const mainMenuReducer = combineReducers({
    expandedItems: expandedItemsReducer,
    isExpanded: isExpandedReducer
});
