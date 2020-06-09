// @constants
export const COLLAPSE_MAIN_MENU = 'COLLAPSE_MAIN_MENU';
export const COLLAPSE_MENU_ITEM = 'COLLAPSE_MENU_ITEM';
export const EXPAND_MAIN_MENU = 'EXPAND_MAIN_MENU';
export const EXPAND_MENU_ITEM = 'EXPAND_MENU_ITEM';

export const collapseMainMenu = () =>
    ({
        type: COLLAPSE_MAIN_MENU
    });

/**
 * @param {string} name
 */
export const collapseMenuItem = name =>
    ({
        type: COLLAPSE_MENU_ITEM,
        payload: name
    });

export const expandMainMenu = () =>
    ({
        type: EXPAND_MAIN_MENU
    });

/**
 * @param {string} name
 */
export const expandMenuItem = name =>
    ({
        type: EXPAND_MENU_ITEM,
        payload: name
    });
