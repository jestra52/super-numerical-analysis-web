// @packages
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// @styles
import styles from './styles';

const CtrlModalDialog = ({
    cancelLabel,
    className,
    classes,
    customActions,
    id,
    msg,
    okLabel,
    onConfirm,
    onHide,
    showCancel,
    title,
    visible,
    width
}) => {
    const modalDialogClass = classNames(
        className,
        classes.modalDialog
    );

    const style = width && { width };

    return (
        <Dialog
            className={modalDialogClass}
            id={id}
            onBackdropClick={onHide}
            onEscapeKeyDown={onHide}
            open={visible}
        >
            <DialogTitle id={`${id}-title`}>{title}</DialogTitle>
            <DialogContent id={`${id}-msg`} style={style}>{msg}</DialogContent>
            {(showCancel || onConfirm || customActions) && (
                <DialogActions>
                    {showCancel && (
                        <Button
                            action={(actions) => { actions.focusVisible(); }}
                            color="secondary"
                            id={`${id}-cancel-button`}
                            onClick={onHide}
                        >
                            {cancelLabel}
                        </Button>
                    )}
                    {onConfirm && (
                        <Button
                            color="primary"
                            id={`${id}-ok-button`}
                            onClick={onConfirm}
                        >
                            {okLabel}
                        </Button>
                    )}
                    {customActions}
                </DialogActions>
            )}
        </Dialog>
    );
};

CtrlModalDialog.propTypes = {
    cancelLabel: PropTypes.string,
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    customActions: PropTypes.element,
    id: PropTypes.string.isRequired,
    msg: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    okLabel: PropTypes.string,
    onConfirm: PropTypes.func,
    onHide: PropTypes.func.isRequired,
    showCancel: PropTypes.bool,
    title: PropTypes.string,
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

CtrlModalDialog.defaultProps = {
    cancelLabel: null,
    className: null,
    customActions: null,
    msg: null,
    okLabel: null,
    onConfirm: null,
    showCancel: true,
    title: null,
    visible: true,
    width: null
};

export default withStyles(styles)(CtrlModalDialog);
