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
import { config } from '../../config';

// @styles
import styles from './styles';

const CtrlGaussEliminationParams = ({
    className,
    classes,
    id,
    methodType,
    onRadioChange,
    visible
}) => {
    if (!visible) {
        return null;
    }

    const gaussEliminationParamsClass = classNames(
        className,
        classes.gaussEliminationParams
    );

    return (
        <Paper className={gaussEliminationParamsClass} id={id}>
            <Grid container direction="row">
                <Grid className={classes.methodType} item xs={12}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">{config.text.common.methodType}</FormLabel>
                        <RadioGroup name="methodType" value={methodType} onChange={onRadioChange}>
                            <FormControlLabel
                                value="simple"
                                control={<Radio />}
                                label={config.text.gaussElimination.simple}
                            />
                            <FormControlLabel
                                value="partial"
                                control={<Radio />}
                                label={config.text.gaussElimination.partial}
                            />
                            <FormControlLabel
                                value="complete"
                                control={<Radio />}
                                label={config.text.gaussElimination.complete}
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </Paper>
    );
};

CtrlGaussEliminationParams.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    methodType: PropTypes.string,
    onRadioChange: PropTypes.func.isRequired,
    visible: PropTypes.bool
};

CtrlGaussEliminationParams.defaultProps = {
    className: null,
    methodType: null,
    visible: true
};

export default withStyles(styles)(CtrlGaussEliminationParams);
