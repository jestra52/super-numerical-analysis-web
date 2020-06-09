// @packages
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from 'prop-types';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import styles from './styles';

const CtrlIcon = ({
    classes,
    helpText,
    icon,
    id,
    onIconClick
}) => {
    const renderIcon = () =>
        onIconClick ? (
            <Icon
                className={classes.enabledButton}
                onClick={onIconClick}
            >
                {icon}
            </Icon>
        ) : (
            <Icon className={classes.disabledButton}>
                {icon}
            </Icon>
        );

    return (
        <InputAdornment id={id} position="end" variant="filled">
            {helpText ? (
                    <Tooltip id={`${id}-tooltip`} title={helpText} placement="right-end">
                        {renderIcon()}
                    </Tooltip>
            ) : renderIcon()}
        </InputAdornment>
    );
};

CtrlIcon.propTypes = {
    classes: PropTypes.object.isRequired,
    helpText: PropTypes.string,
    icon: PropTypes.string,
    id: PropTypes.string.isRequired,
    onIconClick: PropTypes.func
};

CtrlIcon.defaultProps = {
    helpText: null,
    icon: null,
    onIconClick: null
};

export default withStyles(styles)(CtrlIcon);
