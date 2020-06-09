// @packages
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

// @styles
import styles from './styles';

const CtrlIcon = ({
    classes,
    disabled,
    id,
    isSearching,
    onUnselectSuggestion,
    selectedSuggestion,
    setFocusOnInput
}) => (
    <InputAdornment id={id} position="end">
        {isSearching && (
            <CircularProgress
                id={`${id}-progress`}
                size={15}
                color="secondary"
            />
        )}
        {!isSearching && !selectedSuggestion && (
            <Icon
                className={classes.searchIcon}
                id={`${id}-search`}
            >
                search
            </Icon>
        )}
        {!isSearching && Boolean(selectedSuggestion) && (
            <Icon
                id={`${id}-clear`}
                className={disabled ? classes.clearIconDisabled : classes.clearIcon}
                onClick={() => {
                    if (!disabled) {
                        onUnselectSuggestion();
                        setFocusOnInput();
                    }
                }}
            >
                close
            </Icon>
        )}
    </InputAdornment>
);

CtrlIcon.propTypes = {
    classes: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
    isSearching: PropTypes.bool,
    onUnselectSuggestion: PropTypes.func.isRequired,
    selectedSuggestion: PropTypes.any,
    setFocusOnInput: PropTypes.func.isRequired
};

CtrlIcon.defaultProps = {
    disabled: false,
    isSearching: false,
    selectedSuggestion: null
};

export default withStyles(styles)(CtrlIcon);
