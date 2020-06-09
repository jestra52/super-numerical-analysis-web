// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';

// @scripts
import CtrlCommonControls from './common-controls';
import CtrlRestrictedControls from './restricted-controls';
import CtrlRoutes from './routes';
import { theme } from '../../styles/material-ui';

// @styles
import styles from './styles';

const MasterPage = ({
    appName,
    classes,
    currentUrl,
    loadingPageProps,
    mainMenuProps,
    modalDialogProps,
    pageTitle,
    toastNotificationProps
}) => (
    <MuiThemeProvider theme={theme}>
        <div id="master-page" className={classes.masterPage}>
            <Helmet>
                <title>{appName}</title>
            </Helmet>
            <CtrlRoutes
                mainMenuIsExpanded={mainMenuProps.isExpanded}
            />
            <CtrlCommonControls
                modalDialogProps={modalDialogProps}
                loadingPageProps={loadingPageProps}
                toastNotificationProps={toastNotificationProps}
            />
            <CtrlRestrictedControls
                appName={appName}
                currentUrl={currentUrl}
                mainMenuProps={mainMenuProps}
                pageTitle={pageTitle}
            />
        </div>
    </MuiThemeProvider>
);

MasterPage.propTypes = {
    appName: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    mainMenuProps: PropTypes.shape({
        expandedItems: PropTypes.arrayOf(PropTypes.string).isRequired,
        isExpanded: PropTypes.bool.isRequired,
        onCollapse: PropTypes.func.isRequired,
        onCollapseItem: PropTypes.func.isRequired,
        onExpand: PropTypes.func.isRequired,
        onExpandItem: PropTypes.func.isRequired
    }).isRequired,
    modalDialogProps: PropTypes.shape({
        customActions: PropTypes.element,
        cancelLabel: PropTypes.string,
        isVisible: PropTypes.bool.isRequired,
        msg: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        okLabel: PropTypes.string,
        onConfirm: PropTypes.func,
        onHide: PropTypes.func.isRequired,
        title: PropTypes.string
    }).isRequired,
    currentUrl: PropTypes.string.isRequired,
    loadingPageProps: PropTypes.shape({
        isVisible: PropTypes.bool.isRequired,
        msg: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    }).isRequired,
    pageTitle: PropTypes.string.isRequired,
    toastNotificationProps: PropTypes.shape({
        isVisible: PropTypes.bool.isRequired,
        msg: PropTypes.string,
        onHide: PropTypes.func.isRequired,
        type: PropTypes.string
    }).isRequired
};

export default withStyles(styles)(MasterPage);
