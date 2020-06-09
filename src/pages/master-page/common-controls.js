// @packages
import PropTypes from 'prop-types';
import React from 'react';

// @scripts
import CtrlModalDialog from '../../controls/master-page/ctrl-modal-dialog';
// import CtrlFooter from '../../controls/navigation/ctrl-footer';
import CtrlLoadingPage from '../../controls/master-page/ctrl-loading-page';
import CtrlToastNotification from '../../controls/master-page/ctrl-toast-notification';

const CtrlCommonControls = ({
    modalDialogProps,
    loadingPageProps,
    toastNotificationProps
}) => ([
    <CtrlLoadingPage
        id="ctrl-loading-page"
        key="ctrl-loading-page"
        msg={loadingPageProps.msg}
        visible={loadingPageProps.isVisible}
    />,
    <CtrlModalDialog
        cancelLabel={modalDialogProps.cancelLabel}
        customActions={modalDialogProps.customActions}
        id="ctrl-confirm-dialog"
        key="ctrl-confirm-dialog"
        msg={modalDialogProps.msg}
        okLabel={modalDialogProps.okLabel}
        onConfirm={modalDialogProps.onConfirm}
        onHide={modalDialogProps.onHide}
        showCancel={modalDialogProps.showCancel}
        title={modalDialogProps.title}
        visible={modalDialogProps.isVisible}
        width={modalDialogProps.width}
    />,
    <CtrlToastNotification
        id="ctrl-toast-notification"
        key="ctrl-toast-notification"
        msg={toastNotificationProps.msg}
        onHide={toastNotificationProps.onHide}
        type={toastNotificationProps.type}
        visible={toastNotificationProps.isVisible}
    />
    // <CtrlFooter
    //     id="ctrl-footer"
    //     key="ctrl-footer"
    // />
]);

CtrlCommonControls.propTypes = {
    modalDialogProps: PropTypes.shape({
        isVisible: PropTypes.bool.isRequired,
        msg: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        onConfirm: PropTypes.func,
        onHide: PropTypes.func.isRequired
    }).isRequired,
    loadingPageProps: PropTypes.shape({
        isVisible: PropTypes.bool.isRequired,
        msg: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    }).isRequired,
    toastNotificationProps: PropTypes.shape({
        isVisible: PropTypes.bool.isRequired,
        msg: PropTypes.string,
        onHide: PropTypes.func.isRequired,
        type: PropTypes.string
    }).isRequired
};

export default CtrlCommonControls;
