// @packages
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import { config } from '../../../config';
import { constants } from '../../../core';

// @styles
import styles from './styles';

// @constants
const icons = {
    error: 'error',
    info: 'info',
    success: 'check_circle',
    warning: 'warning'
};

const CtrlToastNotification = ({
    className,
    classes,
    id,
    msg,
    onHide,
    type,
    visible
}) => {
    if (!visible) {
        return null;
    }

    const toastNotificationClass = classNames(
        className,
        classes.toastNoficiation
    );

    const contentClass = classes[type];

    const iconClass = classNames(
        classes.icon,
        classes.iconVariant
    );

    const settings = config.settings.toastNoficiation;

    return (
        <Snackbar
            anchorOrigin={{
                vertical: settings.verticalPosition,
                horizontal: settings.horizontalPosition
            }}
            autoHideDuration={settings.autoHideDuration}
            className={toastNotificationClass}
            id={id}
            onClose={onHide}
            open
        >
            <SnackbarContent
                aria-describedby={`${id}-msg`}
                className={contentClass}
                message={(
                    <span id={`${id}-msg`} className={classes.message}>
                        <Icon
                            id={`${id}-icon`}
                            className={iconClass}
                        >
                            {icons[type] || icons.info}
                        </Icon>
                        {msg}
                    </span>
                )}
                action={[
                    <IconButton
                        className={classes.close}
                        color="inherit"
                        id={`${id}-close-button`}
                        key="close"
                        onClick={onHide}
                    >
                        <Icon
                            id={`${id}-close-icon`}
                            className={classes.icon}
                        >
                            close
                        </Icon>
                    </IconButton>
                ]}
            />
        </Snackbar>
    );
};

CtrlToastNotification.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    msg: PropTypes.string,
    onHide: PropTypes.func.isRequired,
    type: PropTypes.oneOf(Object.values(constants.notificationType)),
    visible: PropTypes.bool
};

CtrlToastNotification.defaultProps = {
    className: null,
    msg: null,
    type: constants.notificationType.INFO,
    visible: true
};

export default withStyles(styles)(CtrlToastNotification);
