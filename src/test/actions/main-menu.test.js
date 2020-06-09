// @scripts
import {
    COLLAPSE_MAIN_MENU,
    COLLAPSE_MENU_ITEM,
    EXPAND_MAIN_MENU,
    EXPAND_MENU_ITEM,
    collapseMainMenu,
    collapseMenuItem,
    expandMainMenu,
    expandMenuItem
} from '../../actions/main-menu';

test('expandMainMenu', () => {
    const actionCreator = expandMainMenu();
    const expectedActions = [{
        type: EXPAND_MAIN_MENU
    }];

    return global.testDispatch(actionCreator, expectedActions);
});

test('expandMenuItem', () => {
    const menuItem = 'investmentProject';
    const actionCreator = expandMenuItem(menuItem);
    const expectedActions = [{
        type: EXPAND_MENU_ITEM,
        payload: menuItem
    }];

    return global.testDispatch(actionCreator, expectedActions);
});

test('collapseMainMenu', () => {
    const actionCreator = collapseMainMenu();
    const expectedActions = [{
        type: COLLAPSE_MAIN_MENU
    }];

    return global.testDispatch(actionCreator, expectedActions);
});

test('collapseMenuItem', () => {
    const menuItem = 'investmentProject';
    const actionCreator = collapseMenuItem(menuItem);
    const expectedActions = [{
        type: COLLAPSE_MENU_ITEM,
        payload: menuItem
    }];

    return global.testDispatch(actionCreator, expectedActions);
});
