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

const CtrlInterpolationNewtonLagrangeParams = ({
    className,
    classes,
    id,
    methodType,
    numberPoints,
    onChange,
    onRadioChange,
    onXFieldChange,
    onYFieldChange,
    showErrors,
    visible,
    x,
    xFields,
    yFields
}) => {
    if (!visible) {
        return null;
    }

    const interpolationNewtonLagrangeParamsClass = classNames(
        className,
        classes.interpolationNewtonLagrangeParams
    );

    const { DECIMALS_FOR_FIELDS } = constants.numbers;

    const renderXPoints = () =>
        xFields.map((x, index) => (
            <Grid key={index} className={classes.inputFields} item xs={2}>
                <CtrlTextField
                    decimals={DECIMALS_FOR_FIELDS}
                    id={`${id}-x${index}`}
                    label={format(config.text.common.currentX, index)}
                    name={`x${index}`}
                    onChange={onXFieldChange}
                    required
                    showErrors={showErrors}
                    type="numeric"
                    value={x.value}
                    variant="standard"
                />
            </Grid>
        ));

    const renderYPoints = () =>
        yFields.map((y, index) => (
            <Grid key={index} className={classes.inputFields} item xs={2}>
                <CtrlTextField
                    decimals={DECIMALS_FOR_FIELDS}
                    id={`${id}-y${index}`}
                    label={format(config.text.common.currentY, index)}
                    name={`y${index}`}
                    onChange={onYFieldChange}
                    required
                    showErrors={showErrors}
                    type="numeric"
                    value={y.value}
                    variant="standard"
                />
            </Grid>
        ));

    return (
        <Paper className={interpolationNewtonLagrangeParamsClass} id={id}>
            <Grid container direction="row">
                <Grid className={classes.inputFields} item xs={4}>
                    <CtrlTextField
                        id={`${id}-numberPoints`}
                        label={config.text.common.pointsQuantity}
                        name="numberPoints"
                        onChange={onChange}
                        required
                        showErrors={showErrors}
                        type="numeric"
                        value={numberPoints}
                        variant="standard"
                    />
                </Grid>
                <Grid className={classes.inputFields} item xs={4}>
                    <CtrlTextField
                        id={`${id}-x`}
                        label={config.text.common.x}
                        name="x"
                        onChange={onChange}
                        required
                        showErrors={showErrors}
                        type="numeric"
                        value={x}
                        variant="standard"
                    />
                </Grid>
                <Grid container item xs={12}>
                    {xFields.length > 0 && renderXPoints()}
                </Grid>
                <Grid container item xs={12}>
                    {yFields.length > 0 && renderYPoints()}
                </Grid>
                <Grid className={classes.methodType} item xs={12}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">{config.text.common.methodType}</FormLabel>
                        <RadioGroup name="methodType" value={methodType} onChange={onRadioChange}>
                            <FormControlLabel
                                value="intNewton"
                                control={<Radio />}
                                label={config.text.interpolationNewtonLagrange.newton}
                            />
                            <FormControlLabel
                                value="intLagrange"
                                control={<Radio />}
                                label={config.text.interpolationNewtonLagrange.lagrange}
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </Paper>
    );
};

CtrlInterpolationNewtonLagrangeParams.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    methodType: PropTypes.string,
    numberPoints: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onRadioChange: PropTypes.func.isRequired,
    onXFieldChange: PropTypes.func.isRequired,
    onYFieldChange: PropTypes.func.isRequired,
    showErrors: PropTypes.bool.isRequired,
    visible: PropTypes.bool,
    x: PropTypes.string,
    xFields: PropTypes.arrayOf(PropTypes.shape({
        isValid: PropTypes.bool,
        value: PropTypes.string
    })),
    yFields: PropTypes.arrayOf(PropTypes.shape({
        isValid: PropTypes.bool,
        value: PropTypes.string
    }))
};

CtrlInterpolationNewtonLagrangeParams.defaultProps = {
    className: null,
    methodType: null,
    numberPoints: null,
    visible: true,
    x: null,
    xFields: [],
    yFields: []
};

export default withStyles(styles)(CtrlInterpolationNewtonLagrangeParams);
