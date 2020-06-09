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
import { format } from '../../util';

// @styles
import styles from './styles';

const CtrlIterMethodsParams = ({
    className,
    classes,
    id,
    isRelError,
    iterations,
    lambda,
    methodType,
    onChange,
    onRadioChange,
    onXFieldChange,
    showErrors,
    tolerance,
    visible,
    xFields
}) => {
    if (!visible) {
        return null;
    }

    const iterMethodsParamsClass = classNames(
        className,
        classes.iterMethodsParams
    );

    const { DECIMALS_FOR_FIELDS, DECIMALS_FOR_TOLERANCE } = constants.numbers;

    return (
        <Paper className={iterMethodsParamsClass} id={id}>
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
                        decimals={DECIMALS_FOR_TOLERANCE}
                        id={`${id}-lambda`}
                        label={config.text.common.lambda}
                        name="lambda"
                        onChange={onChange}
                        required
                        showErrors={showErrors}
                        type="numeric"
                        value={lambda}
                        variant="standard"
                    />
                </Grid>
                <Grid className={classes.inputFields} item xs={4}>
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
                <Grid container item xs={12}>
                    {xFields.map((item, index) => {
                        const xkeyName = Object.keys(item)[0];
                        return (
                            <Grid
                                className={classes.inputFields}
                                item
                                key={xkeyName}
                                xs={xFields.length % 2 === 0 ? 3 : 4}
                            >
                                <CtrlTextField
                                    decimals={DECIMALS_FOR_FIELDS}
                                    id={`${id}-${xkeyName}`}
                                    label={format(config.text.common.currentX, index + 1)}
                                    name={xkeyName}
                                    onChange={onXFieldChange}
                                    required
                                    showErrors={showErrors}
                                    type="numeric"
                                    value={item[xkeyName].value}
                                    variant="standard"
                                />
                            </Grid>
                        );
                    })}
                </Grid>
                <Grid className={classes.isRelError} item xs={3}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">{config.text.common.methodType}</FormLabel>
                        <RadioGroup name="methodType" value={methodType} onChange={onRadioChange}>
                            <FormControlLabel
                                value="gauss"
                                control={<Radio />}
                                label={config.text.iterativeMethods.gauss}
                            />
                            <FormControlLabel
                                value="jacobi"
                                control={<Radio />}
                                label={config.text.iterativeMethods.jacobi}
                            />
                        </RadioGroup>
                    </FormControl>
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
            </Grid>
        </Paper>
    );
};

CtrlIterMethodsParams.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    isRelError: PropTypes.string,
    iterations: PropTypes.string,
    lambda: PropTypes.string,
    methodType: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onRadioChange: PropTypes.func.isRequired,
    onXFieldChange: PropTypes.func.isRequired,
    showErrors: PropTypes.bool.isRequired,
    tolerance: PropTypes.string,
    visible: PropTypes.bool,
    xFields: PropTypes.array
};

CtrlIterMethodsParams.defaultProps = {
    className: null,
    isRelError: null,
    iterations: null,
    lambda: null,
    methodType: null,
    tolerance: null,
    visible: true,
    xFields: []
};

export default withStyles(styles)(CtrlIterMethodsParams);
