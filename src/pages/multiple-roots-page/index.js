// @packages
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlMultipleRootsParams from './params';
import CtrlMultipleRootsResults from './results';
import { config } from '../../config';
import { globalUI } from '../../core';
import { initialState } from './state';
import { isAllPropsValid } from '../../util';

// @styles
import styles from './styles';


const MultipleRootsPage = memo(({
    appSettings,
    classes,
    multipleRootsResult,
    onGetMultipleRootsResult
}) => {
    const [state, setState] = useState(initialState);

    function isFormValid() {
        return isAllPropsValid(state);
    }

    const handleOnFieldChange = ({ name, isValid, value }) =>
        setState({
            ...state,
            [name]: {
                isValid,
                value
            }
        });

    const handleOnRadioChange = event =>
        setState({
            ...state,
            [event.target.name]: {
                isValid: Boolean(event.target.value),
                value: event.target.value
            }
        });

    const handleOnExecute = () => {
        const {
            isRelError,
            iterations,
            tolerance,
            x0
        } = state;

        const isFxDefined = appSettings &&
            appSettings.length > 0 &&
            appSettings.some(item => item.settingId === 1 && item.value);

        if (!isFxDefined) {
            globalUI.showToastNotificationWarning(
                !isFxDefined
                    ? config.text.common.fxNotDefined
                    : config.text.common.gxNotDefined
            );
            return;
        }

        if (isFormValid()) {
            const params = {
                fx: appSettings.find(item => item.settingId === 1).value,
                isRelError: isRelError.value === 'rel',
                n: parseInt(iterations.value, 10),
                tol: parseFloat(tolerance.value),
                x0: parseFloat(x0.value)
            };

            onGetMultipleRootsResult(params)
                .then((response) => {
                    const { resultMessage, solutionFailed } = response;

                    if (solutionFailed) {
                        globalUI.showToastNotificationWarning(resultMessage);
                    }

                    setState({
                        ...state,
                        resultMessage,
                        showErrors: false,
                        showResults: !solutionFailed
                    });
                })
                .catch(Function.prototype);
        } else {
            setState({ ...state, showErrors: true, showResults: false });
        }
    };

    const { result } = multipleRootsResult;
    const {
        iterations,
        isRelError,
        resultMessage,
        showErrors,
        showResults,
        tolerance,
        x0
    } = state;

    return (
        <Grid
            className={classes.multipleRootsPage}
            container
            direction="row"
            id="multipleRoots-page"
        >
            <Grid item xs={12}>
                <Typography
                    color="primary"
                    id="multipleRoots-title"
                    variant="h5"
                >
                    {config.text.common.titleMultRoots}
                </Typography>
            </Grid>
            <Grid className={classes.texts} item xs={12}>
                <Typography
                    id="multiple-roots-help"
                >
                    {config.text.helpMessages.multRootsHelp}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <CtrlMultipleRootsParams
                    id="multipleRoots-page-params"
                    iterations={iterations.value}
                    isRelError={isRelError.value}
                    onChange={handleOnFieldChange}
                    onRadioChange={handleOnRadioChange}
                    showErrors={showErrors}
                    tolerance={tolerance.value}
                    x0={x0.value}
                />
            </Grid>
            <Grid className={classes.actionButtons} item xs={12}>
                <Button
                    color="primary"
                    id="multipleRoots-page-execute-button"
                    onClick={handleOnExecute}
                    size="large"
                    variant="contained"
                >
                    {config.text.common.execute}
                </Button>
            </Grid>
            {showResults && !showErrors && (
                <Grid
                    alignItems="center"
                    container
                    item
                    justify="center"
                    xs={12}
                >
                    <Typography variant="subtitle1" gutterBottom>
                        {resultMessage}
                    </Typography>
                </Grid>
            )}
            {showResults && !showErrors && (
                <Grid className={classes.results} item xs={12}>
                    <CtrlMultipleRootsResults
                        id="multipleRoots-page-results"
                        data={result}
                    />
                </Grid>
            )}
        </Grid>
    );
});

MultipleRootsPage.propTypes = {
    appSettings: PropTypes.arrayOf(PropTypes.shape({
        allowedValues: PropTypes.arrayOf(PropTypes.string),
        decimals: PropTypes.number,
        key: PropTypes.string.isRequired,
        max: PropTypes.number,
        min: PropTypes.number,
        regex: PropTypes.string,
        required: PropTypes.bool.isRequired,
        settingId: PropTypes.number.isRequired,
        type: PropTypes.oneOf(['date', 'email', 'name', 'numeric', 'password', 'phone', 'text', 'zip']).isRequired,
        value: PropTypes.string
    })),
    classes: PropTypes.object.isRequired,
    multipleRootsResult: PropTypes.shape({
        aproxValue: PropTypes.object,
        isExact: PropTypes.bool,
        n: PropTypes.number,
        result: PropTypes.shape({
            dfxn: PropTypes.arrayOf(PropTypes.number),
            error: PropTypes.arrayOf(PropTypes.number),
            fxn: PropTypes.arrayOf(PropTypes.number),
            xn: PropTypes.arrayOf(PropTypes.number)
        }),
        resultMessage: PropTypes.string,
        root: PropTypes.number,
        solutionFailed: PropTypes.bool
    }),
    onGetMultipleRootsResult: PropTypes.func.isRequired
};

MultipleRootsPage.defaultProps = {
    appSettings: [],
    multipleRootsResult: null
};

export default withStyles(styles)(MultipleRootsPage);
