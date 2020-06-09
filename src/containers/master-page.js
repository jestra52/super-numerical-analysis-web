// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

// @scripts
import MasterPage from '../pages/master-page';
import { config } from '../config';
import { globalUI } from '../core';

import {
    collapseMainMenu,
    collapseMenuItem,
    expandMainMenu,
    expandMenuItem
} from '../actions/main-menu';

const MasterPageContainer = ({
    history,
    loadingPageIsVisible,
    loadingPageMsg,
    location,
    mainMenuExpandedItems,
    mainMenuIsExpanded,
    mainMenuOnCollapse,
    mainMenuOnCollapseItem,
    mainMenuOnExpand,
    mainMenuOnExpandItem,
    modalDialogCancelLabel,
    modalDialogCustomActions,
    modalDialogIsVisible,
    modalDialogMsg,
    modalDialogOkLabel,
    modalDialogOnConfirm,
    modalDialogShowCancel,
    modalDialogTitle,
    modalDialogWidth,
    toastNotificationIsVisible,
    toastNotificationMsg,
    toastNotificationType
}) => {
    globalUI.setBrowserHistory(history);

    const currentUrl = location.pathname;
    const route = config.routes.find(route => route.url === currentUrl);
    const pageTitle = route ? config.text.routes[route.name] : null;

    return (
        <MasterPage
            appName={config.text.appName}
            currentUrl={currentUrl}
            loadingPageProps={{
                isVisible: loadingPageIsVisible,
                msg: loadingPageMsg
            }}
            mainMenuProps={{
                expandedItems: mainMenuExpandedItems,
                isExpanded: mainMenuIsExpanded,
                onCollapse: mainMenuOnCollapse,
                onCollapseItem: mainMenuOnCollapseItem,
                onExpand: mainMenuOnExpand,
                onExpandItem: mainMenuOnExpandItem
            }}
            modalDialogProps={{
                cancelLabel: modalDialogCancelLabel,
                customActions: modalDialogCustomActions,
                isVisible: modalDialogIsVisible,
                msg: modalDialogMsg,
                okLabel: modalDialogOkLabel,
                onConfirm: modalDialogOnConfirm,
                onHide: globalUI.hideModalDialog,
                showCancel: modalDialogShowCancel,
                title: modalDialogTitle,
                width: modalDialogWidth
            }}
            pageTitle={pageTitle}
            toastNotificationProps={{
                isVisible: toastNotificationIsVisible,
                msg: toastNotificationMsg,
                onHide: globalUI.hideToastNotification,
                type: toastNotificationType
            }}
        />
    );
};

MasterPageContainer.propTypes = {
    history: PropTypes.shape({
        location: PropTypes.object.isRequired,
        push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    loadingPageIsVisible: PropTypes.bool.isRequired,
    loadingPageMsg: PropTypes.string,
    mainMenuExpandedItems: PropTypes.arrayOf(PropTypes.string).isRequired,
    mainMenuIsExpanded: PropTypes.bool.isRequired,
    mainMenuOnCollapse: PropTypes.func.isRequired,
    mainMenuOnExpand: PropTypes.func.isRequired,
    mainMenuOnCollapseItem: PropTypes.func.isRequired,
    mainMenuOnExpandItem: PropTypes.func.isRequired,
    modalDialogCancelLabel: PropTypes.string,
    modalDialogCustomActions: PropTypes.element,
    modalDialogIsVisible: PropTypes.bool.isRequired,
    modalDialogMsg: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    modalDialogOkLabel: PropTypes.string,
    modalDialogOnConfirm: PropTypes.func,
    modalDialogShowCancel: PropTypes.bool,
    modalDialogTitle: PropTypes.string,
    modalDialogWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    toastNotificationIsVisible: PropTypes.bool.isRequired,
    toastNotificationMsg: PropTypes.string,
    toastNotificationType: PropTypes.string
};

MasterPageContainer.defaultProps = {
    loadingPageMsg: null,
    modalDialogCancelLabel: null,
    modalDialogCustomActions: null,
    modalDialogMsg: null,
    modalDialogOkLabel: null,
    modalDialogOnConfirm: null,
    modalDialogShowCancel: true,
    modalDialogTitle: null,
    modalDialogWidth: null,
    toastNotificationMsg: null,
    toastNotificationType: null
};

const mapDispatchToProps = dispatch => bindActionCreators({
    mainMenuOnCollapse: collapseMainMenu,
    mainMenuOnCollapseItem: collapseMenuItem,
    mainMenuOnExpand: expandMainMenu,
    mainMenuOnExpandItem: expandMenuItem
}, dispatch);

const mapStateToProps = ({
    modalDialog,
    loadingPage,
    mainMenu,
    toastNotification
}) => ({
    loadingPageIsVisible: loadingPage.isVisible,
    loadingPageMsg: loadingPage.msg,
    mainMenuExpandedItems: mainMenu.expandedItems,
    mainMenuIsExpanded: mainMenu.isExpanded,
    modalDialogCancelLabel: modalDialog.cancelLabel,
    modalDialogIsVisible: modalDialog.isVisible,
    modalDialogMsg: modalDialog.msg,
    modalDialogOkLabel: modalDialog.okLabel,
    modalDialogOnConfirm: modalDialog.onConfirm,
    modalDialogShowCancel: modalDialog.showCancel,
    modalDialogTitle: modalDialog.title,
    modalDialogWidth: modalDialog.width,
    toastNotificationIsVisible: toastNotification.isVisible,
    toastNotificationMsg: toastNotification.msg,
    toastNotificationType: toastNotification.type
});

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(MasterPageContainer);
