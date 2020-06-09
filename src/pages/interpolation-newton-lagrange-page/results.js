// @packages
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import { config } from '../../config';

// @styles
import styles from './styles';

const CtrlInterpolationNewtonLagrangeResults = ({
    classes,
    result,
    visible
}) => {
    if (!visible) {
        return null;
    }

    const {
        polynomial,
        terms
    } = result;

    return (
        <>
            <Grid className={classes.results} component={Paper} container item xs={12}>
                <Grid item xs={12}>
                    <Typography className={classes.resultsTitle} color="primary" variant="h5">
                        {config.text.common.polynomialEquation}
                    </Typography>
                </Grid>
                <Grid className={classes.polynomialEquation} container item xs={12}>
                    {polynomial.map(item => (
                        <Typography key={item} variant="body1" style={{ marginLeft: 5 }}>
                            {item}
                        </Typography>
                    ))}
                </Grid>
            </Grid>
            <Grid className={classes.results} component={Paper} container item xs={12}>
                <Grid item xs={12}>
                    <Typography className={classes.resultsTitle} color="primary" variant="h5">
                        {config.text.common.terms}
                    </Typography>
                </Grid>
                <Grid className={classes.polynomialEquation} item xs={12}>
                    {terms.map(item => (
                        <Typography key={item} variant="body1" style={{ marginLeft: 5 }}>
                            {item}
                        </Typography>
                    ))}
                </Grid>
            </Grid>
        </>
    );
};

CtrlInterpolationNewtonLagrangeResults.propTypes = {
    classes: PropTypes.object.isRequired,
    result: PropTypes.shape({
        functionOutput: PropTypes.number,
        polynomial: PropTypes.arrayOf(PropTypes.string).isRequired,
        terms: PropTypes.arrayOf(PropTypes.string).isRequired
    }),
    visible: PropTypes.bool
};

CtrlInterpolationNewtonLagrangeResults.defaultProps = {
    result: {},
    visible: true
};

export default withStyles(styles)(CtrlInterpolationNewtonLagrangeResults);
