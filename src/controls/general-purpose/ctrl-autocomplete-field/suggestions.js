// @packages
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

// @styles
import styles from './styles';

const CtrlSuggestions = ({
    classes,
    highlightedIndex,
    id,
    onSelectSuggestion,
    renderSuggestion,
    suggestions,
    visible
}) => {
    if (!visible) {
        return null;
    }

    return (
        <Paper
            className={classes.suggestionsContainer}
            id={id}
            square
        >
            {
                suggestions.map((suggestion, index) => (
                    <MenuItem
                        id={`${id}-${index}`}
                        key={index}
                        onClick={() => {
                            onSelectSuggestion(suggestion);
                        }}
                        selected={highlightedIndex === index}
                    >
                        {
                            renderSuggestion(suggestion)
                        }
                    </MenuItem>
                ))
            }
        </Paper>
    );
};

CtrlSuggestions.propTypes = {
    classes: PropTypes.object.isRequired,
    highlightedIndex: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    onSelectSuggestion: PropTypes.func.isRequired,
    renderSuggestion: PropTypes.func.isRequired,
    suggestions: PropTypes.array,
    visible: PropTypes.bool.isRequired
};

CtrlSuggestions.defaultProps = {
    suggestions: []
};

export default withStyles(styles)(CtrlSuggestions);
