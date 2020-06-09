// @packages
import PropTypes from 'prop-types';
import React from 'react';

// @scripts
import CtrlMainMenu from '../../controls/navigation/ctrl-main-menu';
import CtrlTopBar from '../../controls/navigation/ctrl-top-bar';

const CtrlRestrictedControls = ({
    appName,
    currentUrl,
    mainMenuProps,
    pageTitle
}) => ([
    <CtrlTopBar
        appName={appName}
        id="ctrl-top-bar"
        key="ctrl-top-bar"
        mainMenuIsExpanded={mainMenuProps.isExpanded}
        mainMenuOnCollapse={mainMenuProps.onCollapse}
        mainMenuOnExpand={mainMenuProps.onExpand}
        pageTitle={pageTitle}
    />,
    <CtrlMainMenu
        currentUrl={currentUrl}
        expandedItems={mainMenuProps.expandedItems}
        id="ctrl-main-menu"
        isExpanded={mainMenuProps.isExpanded}
        key="ctrl-main-menu"
        onCollapseItem={mainMenuProps.onCollapseItem}
        onExpandItem={mainMenuProps.onExpandItem}
        visible
    />
]);

CtrlRestrictedControls.propTypes = {
    appName: PropTypes.string.isRequired,
    currentUrl: PropTypes.string.isRequired,
    mainMenuProps: PropTypes.shape({
        expandedItems: PropTypes.arrayOf(PropTypes.string).isRequired,
        onCollapseItem: PropTypes.func.isRequired,
        onExpandItem: PropTypes.func.isRequired
    }).isRequired,
    pageTitle: PropTypes.string.isRequired
};

export default CtrlRestrictedControls;
