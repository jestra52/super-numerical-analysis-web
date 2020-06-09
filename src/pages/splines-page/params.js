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
import { format } from '../../util';

// @styles
import styles from './styles';

const CtrlSplinesParams = ({
    className,
    classes,
    id,
    numberPoints,
    onChange,
    onXFieldChange,
    onYFieldChange,
    showErrors,
    visible,
    xFields,
    yFields
}) => {
    if (!visible) {
        return null;
    }

    const splinesParamsClass = classNames(
        className,
        classes.splinesParams
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
        <Paper className={splinesParamsClass} id={id}>
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
                <Grid container item xs={12}>
                    {xFields.length > 0 && renderXPoints()}
                </Grid>
                <Grid container item xs={12}>
                    {yFields.length > 0 && renderYPoints()}
                </Grid>
            </Grid>
        </Paper>
    );
};

CtrlSplinesParams.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    numberPoints: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onXFieldChange: PropTypes.func.isRequired,
    onYFieldChange: PropTypes.func.isRequired,
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

CtrlSplinesParams.defaultProps = {
    className: null,
    numberPoints: null,
    visible: true,
    xFields: [],
    yFields: []
};

export default withStyles(styles)(CtrlSplinesParams);
