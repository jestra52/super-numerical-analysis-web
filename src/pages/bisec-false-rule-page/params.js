// @packages
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlTextField from '../../controls/general-purpose/ctrl-text-field';
import { config } from '../../config';
import { constants } from '../../core';

// @styles
import styles from './styles';

const CtrlBisecFalseRuleParams = ({
    className,
    classes,
    id,
    isFalseRule,
    isRelError,
    iterations,
    onChange,
    onRadioChange,
    showErrors,
    tolerance,
    visible,
    xi,
    xs
}) => {
    if (!visible) {
        return null;
    }

    const bisecFalseRuleParamsClass = classNames(
        className,
        classes.bisecFalseRuleParams
    );

    const { DECIMALS_FOR_FIELDS, DECIMALS_FOR_TOLERANCE } = constants.numbers;

    return (
        <Paper className={bisecFalseRuleParamsClass} id={id}>
            <Grid container direction="row">
                <Grid className={classes.inputFields} item xs={3}>
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
                <Grid className={classes.inputFields} item xs={3}>
                    <CtrlTextField
                        decimals={DECIMALS_FOR_FIELDS}
                        id={`${id}-xi`}
                        label={config.text.common.xi}
                        name="xi"
                        onChange={onChange}
                        required
                        showErrors={showErrors}
                        type="numeric"
                        value={xi}
                        variant="standard"
                    />
                </Grid>
                <Grid className={classes.inputFields} item xs={3}>
                    <CtrlTextField
                        decimals={DECIMALS_FOR_FIELDS}
                        id={`${id}-xs`}
                        label={config.text.common.xs}
                        name="xs"
                        onChange={onChange}
                        required
                        showErrors={showErrors}
                        type="numeric"
                        value={xs}
                        variant="standard"
                    />
                </Grid>
                <Grid className={classes.inputFields} item xs={3}>
                    <CtrlTextField
                        decimals={DECIMALS_FOR_TOLERANCE}
                        helpText={config.text.common['tolerance.helpText']}
                        id={`${id}-tolerance`}
                        label={config.text.common.tolerance}
                        name="tolerance"
                        onChange={onChange}
                        required
                        showErrors={showErrors}
                        type="numeric"
                        value={tolerance}
                        variant="standard"
                    />
                </Grid>
                <Grid className={classes.isRelError} item xs={3}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">{config.text.common.errorType}</FormLabel>
                        <RadioGroup name="isRelError" value={isRelError} onChange={onRadioChange}>
                            <FormControlLabel
                                value="rel"
                                control={<Radio />}
                                label={config.text.common.relativeError}
                            />
                            <FormControlLabel
                                value="abs"
                                control={<Radio />}
                                label={config.text.common.absoluteError}
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid className={classes.isRelError} item xs={3}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">{config.text.common.methodType}</FormLabel>
                        <RadioGroup name="isFalseRule" value={isFalseRule} onChange={onRadioChange}>
                            <FormControlLabel
                                value="fal"
                                control={<Radio />}
                                label={config.text.common.falseRule}
                            />
                            <FormControlLabel
                                value="bis"
                                control={<Radio />}
                                label={config.text.common.bisection}
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </Paper>
    );
};

CtrlBisecFalseRuleParams.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    isFalseRule: PropTypes.string,
    isRelError: PropTypes.string,
    iterations: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onRadioChange: PropTypes.func.isRequired,
    showErrors: PropTypes.bool.isRequired,
    tolerance: PropTypes.string,
    visible: PropTypes.bool,
    xi: PropTypes.string,
    xs: PropTypes.string
};

CtrlBisecFalseRuleParams.defaultProps = {
    className: null,
    isFalseRule: null,
    isRelError: null,
    iterations: null,
    tolerance: null,
    visible: true,
    xi: null,
    xs: null
};

export default withStyles(styles)(CtrlBisecFalseRuleParams);
