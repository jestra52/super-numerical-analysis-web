// @packages
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import { buildImageSelector, format } from '../../../util';
import { globalUI } from '../../../core';

// @styles
import styles from './styles';

// @constants
const EMPTY_ERROR = ' ';

const CtrlAvatarField = ({
    className,
    classes,
    disabled,
    id,
    lang,
    maxSizeMb,
    name,
    onBlur,
    onChange,
    onFocus,
    readMode,
    required,
    showErrors,
    tooltip,
    value,
    visible
}) => {
    if (!visible) {
        return null;
    }

    const isClickEnabled = !disabled && Boolean(onChange);

    const getErrorMsg = (value) => {
        if (required && !value) {
            return lang.validations.required;
        }

        return EMPTY_ERROR;
    };

    const handleOnClick = () => {
        buildImageSelector({
            maxSizeMb,
            onMaxSizeExceeded: () => {
                const msg = format(
                    lang.users.avatarSizeExceeded, maxSizeMb
                );
                globalUI.showToastNotificationError(msg);
            },
            onImageSelected: (value) => {
                onChange({
                    isValid: getErrorMsg(value) === EMPTY_ERROR,
                    name: name || id,
                    value
                });
            },
            readMode
        });
    };

    const avatarClass = classNames(
        className,
        classes.icon,
        {
            [classes.clickable]: isClickEnabled
        }
    );

    const errorMsg = getErrorMsg(value);
    const hasError = showErrors && errorMsg !== EMPTY_ERROR;
    const helperText = hasError ? errorMsg : EMPTY_ERROR;

    const avatar = (
        <Avatar
            className={avatarClass}
            onBlur={onBlur}
            onClick={isClickEnabled ? handleOnClick : null}
            onFocus={onFocus}
            src={value}
        >
            { !value && <Icon>account_circle</Icon> }
        </Avatar>
    );

    return (
        <div id={id} className={classes.avatar}>
            {tooltip ? (
                <Tooltip id={`${id}-tooltip`} title={tooltip}>
                    { avatar }
                </Tooltip>
            ) : avatar}
            <div className={classes.helpText}>{helperText}</div>
        </div>
    );
};

CtrlAvatarField.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
    lang: PropTypes.object.isRequired,
    maxSizeMb: PropTypes.number,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    readMode: PropTypes.oneOf(['url']),
    required: PropTypes.bool,
    showErrors: PropTypes.bool,
    tooltip: PropTypes.string,
    value: PropTypes.string,
    visible: PropTypes.bool
};

CtrlAvatarField.defaultProps = {
    className: null,
    disabled: false,
    maxSizeMb: null,
    name: null,
    onBlur: null,
    onChange: null,
    onFocus: null,
    readMode: 'url',
    required: false,
    showErrors: true,
    tooltip: null,
    value: null,
    visible: true
};

export default withStyles(styles)(CtrlAvatarField);
