// @packages
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlSecantParams from './params';
import CtrlSecantResults from './results';
import { config } from '../../config';
import { initialState } from './state';
import { isAllPropsValid } from '../../util';
import { globalUI } from '../../core';

// @styles
import styles from './styles';

const SecantPage = memo(({
    appSettings,
    classes,
    secantResult,
    onGetSecantResult
}) => {
    const [state, setState] = useState(initialState);

    function isFormValid() {
        return isAllPropsValid(state);
    }

    const handleOnRadioChange = event =>
        setState({
            ...state,
            [event.target.name]: {
                isValid: Boolean(event.target.value),
                value: event.target.value
            }
        });

    const handleOnExecute = () => {
        const isFxDefined = appSettings &&
            appSettings.length > 0 &&
            appSettings.some(item => item.settingId === 1 && item.value);

        if (!isFxDefined) {
            globalUI.showToastNotificationWarning(config.text.common.fxNotDefined);
            return;
        }

        if (isFormValid()) {
            const {
                iterations,
                isRelError,
                tolerance,
                x0,
                x1
            } = state;
            const params = {
                fx: appSettings.find(item => item.settingId === 1).value,
                isRelError: isRelError.value === 'rel',
                n: parseInt(iterations.value, 10),
                tol: parseFloat(tolerance.value),
                x0: parseFloat(x0.value),
                x1: parseFloat(x1.value)
            };

            onGetSecantResult(params)
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

    const handleOnFieldChange = ({ name, isValid, value }) =>
        setState({
            ...state,
            [name]: {
                isValid,
                value
            }
        });

    const { result } = secantResult;
    const {
        isRelError,
        iterations,
        resultMessage,
        showErrors,
        showResults,
        tolerance,
        x0,
        x1
    } = state;

    return (
        <Grid
            className={classes.SecantPage}
            container
            direction="row"
            id="secant-page"
        >
            <Grid item xs={12}>
                <Typography
                    color="primary"
                    id="secant-title"
                    variant="h5"
                >
                    {config.text.common.titleSecant}
                </Typography>
            </Grid>
            <Grid className={classes.texts} item xs={12}>
                <Typography
                    id="secant-help"
                >
                    {config.text.helpMessages.secantHelp}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <CtrlSecantParams
                    id="secant-page-params"
                    isRelError={isRelError.value}
                    iterations={iterations.value}
                    onChange={handleOnFieldChange}
                    onRadioChange={handleOnRadioChange}
                    showErrors={showErrors}
                    tolerance={tolerance.value}
                    x0={x0.value}
                    x1={x1.value}
                />
            </Grid>
            <Grid className={classes.actionButtons} item xs={12}>
                <Button
                    color="primary"
                    id="secant-page-execute-button"
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
                    <CtrlSecantResults
                        id="secant-page-results"
                        data={result}
                    />
                </Grid>
            )}
        </Grid>
    );
});


SecantPage.propTypes = {
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
    secantResult: PropTypes.shape({
        aproxValue: PropTypes.object,
        isExact: PropTypes.bool,
        n: PropTypes.number,
        result: PropTypes.shape({
            x: PropTypes.arrayOf(PropTypes.number),
            fx: PropTypes.arrayOf(PropTypes.number),
            den: PropTypes.arrayOf(PropTypes.number),
            error: PropTypes.arrayOf(PropTypes.number)
        }),
        resultMessage: PropTypes.string,
        root: PropTypes.number,
        solutionFailed: PropTypes.bool
    }),
    onGetSecantResult: PropTypes.func.isRequired
};

SecantPage.defaultProps = {
    appSettings: [],
    secantResult: null
};

export default withStyles(styles)(SecantPage);
