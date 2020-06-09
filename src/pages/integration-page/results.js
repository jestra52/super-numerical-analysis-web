// @packages
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import { config } from '../../config';

// @styles
import styles from './styles';

const CtrlIntegrationResults = ({
    classes,
    data,
    id,
    visible
}) => {
    if (!visible) {
        return null;
    }
    const { equation } = data;

    return (
        <Grid className={classes.results} id={id} component={Paper} container item xs={12}>
            <Grid item xs={12}>
                <Typography className={classes.resultsTitle} color="primary" variant="h5">
                    {config.text.common.polynomialEquation}
                </Typography>
            </Grid>
            <Grid className={classes.polynomialEquation} container item xs={12}>
                {Array.isArray(equation) ? equation.map(item => (
                    <Typography key={item} variant="body1" style={{ marginLeft: 10 }}>
                        {item}
                    </Typography>
                )) : (
                    <Typography variant="body1">
                        {equation}
                    </Typography>
                )}
            </Grid>
        </Grid>
    );
};

CtrlIntegrationResults.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object,
    id: PropTypes.string.isRequired,
    visible: PropTypes.bool
};

CtrlIntegrationResults.defaultProps = {
    data: {},
    visible: true
};

export default withStyles(styles)(CtrlIntegrationResults);
