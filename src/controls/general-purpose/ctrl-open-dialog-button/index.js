// @packages
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// @style
import styles from './styles';
import { globalUI } from '../../../core';

const CtrlOpenDialogButton = ({
    className,
    classes,
    color,
    content,
    icon,
    id,
    text,
    title,
    tooltip,
    visible
}) => {
    if (!visible) {
        return null;
    }

    const openDialogButtonClass = classNames(
        className,
        classes.openDialogButton
    );

    const handleOnClick = () => {
        globalUI.showModalDialog({
            msg: content,
            showCancel: false,
            title
        });
    };

    const button = text ? (
        <Button
            className={openDialogButtonClass}
            color={color}
            id={id}
            onClick={handleOnClick}
            variant="contained"
        >
            {icon && <Icon id={`${id}-icon`}>{icon}</Icon>}
            {text}
        </Button>
    ) : (
        <IconButton
            className={openDialogButtonClass}
            color={color}
            id={id}
            onClick={handleOnClick}
        >
            <Icon id={`${id}-icon`}>{icon}</Icon>
        </IconButton>
    );

    return tooltip ? (
        <Tooltip id={`${id}-tooltip`} title={tooltip}>
            { button }
        </Tooltip>
    ) : (
        button
    );
};

CtrlOpenDialogButton.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    color: PropTypes.string,
    content: PropTypes.element.isRequired,
    icon: PropTypes.string,
    id: PropTypes.string.isRequired,
    text: PropTypes.string,
    title: PropTypes.string.isRequired,
    tooltip: PropTypes.string,
    visible: PropTypes.bool
};

CtrlOpenDialogButton.defaultProps = {
    className: null,
    color: 'primary',
    icon: null,
    text: null,
    tooltip: null,
    visible: true
};

export default withStyles(styles)(CtrlOpenDialogButton);
