// @packages
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlBisecFalseRuleParams from './params';
import CtrlBisecFalseRuleResults from './results';
import { config } from '../../config';
import { globalUI } from '../../core';
import { initialState } from './state';
import { isAllPropsValid } from '../../util';

// @styles
import styles from './styles';

const BisecFalseRulePage = memo(({
    appSettings,
    classes,
    bisecFalseRuleResult,
    onGetBisecFalseRuleResult
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
        const isFxDefined = appSettings &&
            appSettings.length > 0 &&
            appSettings.some(item => item.settingId === 1 && item.value);

        if (!isFxDefined) {
            globalUI.showToastNotificationWarning(config.text.common.fxNotDefined);
            return;
        }

        if (isFormValid()) {
            const {
                isFalseRule,
                isRelError,
                iterations,
                tolerance,
                xi,
                xs
            } = state;
            const params = {
                fx: appSettings.find(item => item.settingId === 1).value,
                isFalseRule: isFalseRule.value === 'fal',
                isRelError: isRelError.value === 'rel',
                n: parseInt(iterations.value, 10),
                tol: parseFloat(tolerance.value),
                xi: parseFloat(xi.value),
                xs: parseFloat(xs.value)
            };

            onGetBisecFalseRuleResult(params)
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

    const { result } = bisecFalseRuleResult;
    const {
        isFalseRule,
        isRelError,
        iterations,
        resultMessage,
        showErrors,
        showResults,
        tolerance,
        xi,
        xs
    } = state;

    return (
        <Grid
            className={classes.bisecFalseRulePage}
            container
            direction="row"
            id="bisec-false-rule-page"
        >
            <Grid item xs={12}>
                <Typography
                    color="primary"
                    id="bisec-false-rule-title"
                    variant="h5"
                >
                    {config.text.common.titleBisFalse}
                </Typography>
            </Grid>
            <Grid className={classes.texts} item xs={12}>
                <Typography
                    id="bis-rule-help"
                >
                    {config.text.helpMessages.bisFalseHelp}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <CtrlBisecFalseRuleParams
                    id="bisec-false-rule-page-params"
                    isFalseRule={isFalseRule.value}
                    isRelError={isRelError.value}
                    iterations={iterations.value}
                    onChange={handleOnFieldChange}
                    onRadioChange={handleOnRadioChange}
                    showErrors={showErrors}
                    tolerance={tolerance.value}
                    xi={xi.value}
                    xs={xs.value}
                />
            </Grid>
            <Grid className={classes.actionButtons} item xs={12}>
                <Button
                    color="primary"
                    id="bisec-false-rule-page-execute-button"
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
                    <CtrlBisecFalseRuleResults
                        id="bisec-false-rule-page-results"
                        data={result}
                    />
                </Grid>
            )}
        </Grid>
    );
});

BisecFalseRulePage.propTypes = {
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
    bisecFalseRuleResult: PropTypes.shape({
        aproxValue: PropTypes.object,
        isExact: PropTypes.bool,
        n: PropTypes.number,
        result: PropTypes.shape({
            x: PropTypes.arrayOf(PropTypes.number),
            fx: PropTypes.arrayOf(PropTypes.number)
        }),
        resultMessage: PropTypes.string,
        root: PropTypes.number,
        solutionFailed: PropTypes.bool
    }),
    onGetBisecFalseRuleResult: PropTypes.func.isRequired
};

BisecFalseRulePage.defaultProps = {
    appSettings: [],
    bisecFalseRuleResult: null
};

export default withStyles(styles)(BisecFalseRulePage);
