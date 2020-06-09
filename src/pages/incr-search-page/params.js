// @packages
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlTextField from '../../controls/general-purpose/ctrl-text-field';
import { config } from '../../config';
import { constants } from '../../core';

// @styles
import styles from './styles';

const CtrlIncrSearchParams = ({
    className,
    classes,
    delta,
    id,
    iterations,
    onChange,
    showErrors,
    visible,
    x0
}) => {
    if (!visible) {
        return null;
    }

    const incrSearchParamsClass = classNames(
        className,
        classes.incrSearchParams
    );

    const { DECIMALS_FOR_FIELDS, DECIMALS_FOR_TOLERANCE } = constants.numbers;

    return (
        <Paper className={incrSearchParamsClass} id={id}>
            <Grid container direction="row">
                <Grid className={classes.inputFields} item xs={4}>
                    <CtrlTextField
                        id={`${id}-iterations`}
                        label={config.text.common.iterations}
                        name="iterations"
                        onChange={onChange}
                        required
                        showErrors={showErrors}
                        type="numeric"
                        value={iterations}
                        variant="standard"
                    />
                </Grid>
                <Grid className={classes.inputFields} item xs={4}>
                    <CtrlTextField
                        decimals={DECIMALS_FOR_FIELDS}
                        id={`${id}-x0`}
                        label={config.text.common.x0}
                        name="x0"
                        onChange={onChange}
                        required
                        showErrors={showErrors}
                        type="numeric"
                        value={x0}
                        variant="standard"
                    />
                </Grid>
                <Grid className={classes.inputFields} item xs={4}>
                    <CtrlTextField
                        decimals={DECIMALS_FOR_TOLERANCE}
                        helpText={config.text.common['delta.helpText']}
                        id={`${id}-delta`}
                        label={config.text.common.delta}
                        name="delta"
                        onChange={onChange}
                        required
                        showErrors={showErrors}
                        type="numeric"
                        value={delta}
                        variant="standard"
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

CtrlIncrSearchParams.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    delta: PropTypes.string,
    id: PropTypes.string.isRequired,
    iterations: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    showErrors: PropTypes.bool.isRequired,
    visible: PropTypes.bool,
    x0: PropTypes.string
};

CtrlIncrSearchParams.defaultProps = {
    className: null,
    delta: null,
    iterations: null,
    visible: true,
    x0: null
};

export default withStyles(styles)(CtrlIncrSearchParams);
