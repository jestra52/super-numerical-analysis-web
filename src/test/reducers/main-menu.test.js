// @scripts
import {
    COLLAPSE_MENU_ITEM,
    COLLAPSE_MAIN_MENU,
    EXPAND_MENU_ITEM,
    EXPAND_MAIN_MENU
} from '../../actions/main-menu';
import { config } from '../../config';
import { mainMenuReducer } from '../../reducers/main-menu';

test('mainMenuReducer: EXPAND_MENU_ITEM', () => {
    const menuItem = 'investmentProject';
    const action = {
        type: EXPAND_MENU_ITEM,
        payload: menuItem
    };
    const initialState = config.initialState.mainMenu;
    const newState = mainMenuReducer(initialState, action);
    const expectedState = Object.assign({}, initialState, {
        expandedItems: [...initialState.expandedItems, action.payload],
        isExpanded: true
    });
    expect(newState).toEqual(expectedState);
});

test('mainMenuReducer: COLLAPSE_MENU_ITEM', () => {
    const menuItem = 'investmentProject';
    const action = {
        type: COLLAPSE_MENU_ITEM,
        payload: menuItem
    };
    const initialState = config.initialState.mainMenu;
    const newState = mainMenuReducer(initialState, action);
    const expectedState = Object.assign({}, initialState, {
        expandedItems: initialState.expandedItems.filter(item => item !== action.payload),
        isExpanded: true
    });
    expect(newState).toEqual(expectedState);
});

test('mainMenuReducer: EXPAND_MAIN_MENU', () => {
    const action = {
        type: EXPAND_MAIN_MENU
    };
    const initialState = config.initialState.mainMenu;
    const newState = mainMenuReducer(initialState, action);
    const expectedState = {
        expandedItems: [],
        isExpanded: true
    };
    expect(newState).toEqual(expectedState);
});

test('mainMenuReducer: COLLAPSE_MAIN_MENU', () => {
    const action = {
        type: COLLAPSE_MAIN_MENU
    };
    const initialState = config.initialState.mainMenu;
    const newState = mainMenuReducer(initialState, action);
    const expectedState = {
        expandedItems: [],
        isExpanded: false
    };
    expect(newState).toEqual(expectedState);
});
