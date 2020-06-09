// @packages
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import { focus } from '../../../util';

// @styles
import styles from './styles';

const CtrlMultiselectSearch = ({
    classes,
    id,
    onChange,
    placeholder,
    value,
    visible
}) => {
    if (!visible) {
        return null;
    }

    const endAdornment = (
        <InputAdornment position="end">
            {value ? (
                <Icon
                    className={classes.multiselectClearIcon}
                    id={`${id}-clear`}
                    onClick={() => {
                        onChange('');
                        focus(id);
                    }}
                >
                    close
                </Icon>
            ) : (
                <Icon
                    id={`${id}-search`}
                    className={classes.multiselectSearchIcon}
                >
                    search
                </Icon>
            )}
        </InputAdornment>
    );

    return (
        <Input
            autoFocus
            className={classes.multiselectSearchInput}
            endAdornment={endAdornment}
            fullWidth
            id={id}
            onChange={(evt) => { onChange(evt.target.value); }}
            placeholder={placeholder}
            value={value}
        />
    );
};

CtrlMultiselectSearch.propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    visible: PropTypes.bool.isRequired
};

CtrlMultiselectSearch.defaultProps = {
    placeholder: '',
    value: ''
};

export default withStyles(styles)(CtrlMultiselectSearch);
