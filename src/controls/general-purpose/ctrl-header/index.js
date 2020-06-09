// @packages
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// @styles
import styles from './styles';

const CtrlHeader = ({
    className,
    classes,
    id,
    leftContent,
    rightContent,
    visible
}) => {
    if (!visible) {
        return null;
    }

    const headerClass = classNames(
        className,
        classes.header
    );

    return (
        <Paper
            className={headerClass}
            elevation={2}
            id={id}
            square
        >
            <Grid container direction="row">
                <Grid
                    id={`${id}-left-content`}
                    item
                    xs={6}
                    className={classes.leftContent}
                >
                    {leftContent}
                </Grid>
                <Grid
                    id={`${id}-right-content`}
                    item
                    xs={6}
                    className={classes.rightContent}
                >
                    {rightContent}
                </Grid>
            </Grid>
        </Paper>
    );
};

CtrlHeader.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    leftContent: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    rightContent: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    visible: PropTypes.bool
};

CtrlHeader.defaultProps = {
    className: null,
    leftContent: null,
    rightContent: null,
    visible: true
};

export default withStyles(styles)(CtrlHeader);
