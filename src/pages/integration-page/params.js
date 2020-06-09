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

const CtrlIntegrationParams = ({
    className,
    classes,
    formType,
    id,
    methodType,
    onChange,
    onRadioChange,
    onXFieldChange,
    onYFieldChange,
    pointsQuantity,
    showErrors,
    visible,
    xFields,
    yFields
}) => {
    if (!visible) {
        return null;
    }

    const integrationParamsClass = classNames(
        className,
        classes.integrationParams
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
        <Grid
            className={integrationParamsClass}
            component={Paper}
            container
            direction="row"
            id={id}
            item
            xs={12}
        >
            <Grid className={classes.inputFields} item xs={3}>
                <CtrlTextField
                    id={`${id}-points-quantity`}
                    label={config.text.common.pointsQuantity}
                    name="pointsQuantity"
                    onChange={onChange}
                    required
                    showErrors={showErrors}
                    type="numeric"
                    value={pointsQuantity}
                    variant="standard"
                />
            </Grid>
            <Grid container item xs={12}>
                {xFields.length > 0 && renderXPoints()}
            </Grid>
            <Grid container item xs={12}>
                    {yFields.length > 0 && renderYPoints()}
            </Grid>
            <Grid className={classes.formType} item xs={3}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">{config.text.common.methodType}</FormLabel>
                    <RadioGroup name="methodType" value={methodType} onChange={onRadioChange}>
                        <FormControlLabel
                            value="integrationTrapeze"
                            control={<Radio />}
                            label={config.text.integration.trapeze}
                        />
                        <FormControlLabel
                            value="simpson13"
                            control={<Radio />}
                            label={config.text.integration.simpson13}
                        />
                        <FormControlLabel
                            value="simpson38"
                            control={<Radio />}
                            label={config.text.integration.simpson38}
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid className={classes.formType} item xs={3}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">{config.text.common.formType}</FormLabel>
                    <RadioGroup name="formType" value={formType} onChange={onRadioChange}>
                        <FormControlLabel
                            value="integrationSimple"
                            control={<Radio />}
                            label={config.text.integration.simple}
                        />
                        <FormControlLabel
                            value="integrationGeneral"
                            control={<Radio />}
                            label={config.text.integration.general}
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
        </Grid>
    );
};

CtrlIntegrationParams.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    formType: PropTypes.string,
    id: PropTypes.string.isRequired,
    methodType: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onRadioChange: PropTypes.func.isRequired,
    onXFieldChange: PropTypes.func.isRequired,
    onYFieldChange: PropTypes.func.isRequired,
    pointsQuantity: PropTypes.string,
    showErrors: PropTypes.bool.isRequired,
    visible: PropTypes.bool,
    xFields: PropTypes.arrayOf(PropTypes.shape({
        isValid: PropTypes.bool,
        value: PropTypes.string
    })),
    yFields: PropTypes.arrayOf(PropTypes.shape({
        isValid: PropTypes.bool,
        value: PropTypes.string
    }))
};

CtrlIntegrationParams.defaultProps = {
    className: null,
    formType: null,
    methodType: null,
    pointsQuantity: null,
    visible: true,
    xFields: [],
    yFields: []
};

export default withStyles(styles)(CtrlIntegrationParams);
