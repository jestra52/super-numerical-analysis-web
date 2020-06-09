// @packages
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlIterMethodsParams from './params';
import CtrlIterMethodsResults from './results';
import { config } from '../../config';
import { globalUI } from '../../core';
import { initialState } from './state';
import { isAllPropsValid } from '../../util';

// @styles
import styles from './styles';

const IterMethodsPage = ({
    appSettings,
    classes,
    iterativeMethodsResult,
    onGetBestLambdaResult,
    onGetIterativeMethodsResult
}) => {
    const [state, setState] = useState(initialState);

    useEffect(() => {
        const aMatrix = appSettings && appSettings.length > 0 && appSettings.find(item => item.settingId === 3).aMatrix;

        if (aMatrix) {
            const xFields = Array.from(Array(aMatrix.length), (_, index) => ({
                [`x${index}`]: {
                    isValid: false,
                    value: null
                }
            }));
            setState(s => ({
                ...s,
                xFields
            }));
        }
    }, []);

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

    const handleOnXFieldChange = ({ name, isValid, value }) => {
        const regex = /\d+/;
        const currentItemIndex = name.match(regex);
        const { xFields } = state;

        xFields[currentItemIndex] = {
            [name]: {
                isValid,
                value
            }
        };

        setState({
            ...state,
            xFields
        });
    };

    const handleOnRadioChange = event =>
        setState({
            ...state,
            [event.target.name]: {
                isValid: Boolean(event.target.value),
                value: event.target.value
            }
        });

    const handleOnExecute = () => {
        const aMatrix = appSettings && appSettings.length > 0 && appSettings.find(item => item.settingId === 3).aMatrix;
        const bMatrix = appSettings && appSettings.length > 0 && appSettings.find(item => item.settingId === 3).bMatrix;
        const isAMatrixDefined = aMatrix &&
            aMatrix.length > 0 &&
            aMatrix.every(a =>
                a &&
                a.length > 0 &&
                a.every(innerA => innerA && innerA.value && innerA.value !== ''));
        const isBMatrixDefined = bMatrix &&
                bMatrix.length > 0 &&
                bMatrix.every(b => b && b.value && b.value !== '');

        if (!isAMatrixDefined || !isBMatrixDefined) {
            globalUI.showToastNotificationWarning(
                !isAMatrixDefined
                    ? config.text.common.aMatrixNotDefined
                    : config.text.common.bMatrixNotDefined
            );
            return;
        }

        const isXFieldsDefined = state.xFields.every((x) => {
            const keyName = Object.keys(x)[0];
            return x[keyName] && x[keyName].isValid;
        });

        if (isFormValid() && isXFieldsDefined) {
            const {
                isRelError,
                iterations,
                lambda,
                methodType,
                tolerance,
                xFields
            } = state;

            const params = {
                aMatrix: aMatrix.map(a => a.map(innerA => innerA.value)),
                bMatrix: bMatrix.map(b => b.value),
                isRelError: isRelError.value === 'rel',
                l: parseFloat(lambda.value),
                methodType: methodType.value,
                n: parseInt(iterations.value, 10),
                tol: parseFloat(tolerance.value),
                xArray: xFields.map((x) => {
                    const keyName = Object.keys(x)[0];
                    return x[keyName].value;
                })
            };

            onGetIterativeMethodsResult(params)
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

    const handleOnGetBestLambda = () => {
        const aMatrix = appSettings && appSettings.length > 0 && appSettings.find(item => item.settingId === 3).aMatrix;
        const bMatrix = appSettings && appSettings.length > 0 && appSettings.find(item => item.settingId === 3).bMatrix;
        const isAMatrixDefined = aMatrix &&
            aMatrix.length > 0 &&
            aMatrix.every(a =>
                a &&
                a.length > 0 &&
                a.every(innerA => innerA && innerA.value && innerA.value !== ''));
        const isBMatrixDefined = bMatrix &&
                bMatrix.length > 0 &&
                bMatrix.every(b => b && b.value && b.value !== '');

        if (!isAMatrixDefined || !isBMatrixDefined) {
            globalUI.showToastNotificationWarning(
                !isAMatrixDefined
                    ? config.text.common.aMatrixNotDefined
                    : config.text.common.bMatrixNotDefined
            );
            return;
        }

        const isXFieldsDefined = state.xFields.every((x) => {
            const keyName = Object.keys(x)[0];
            return x[keyName] && x[keyName].isValid;
        });

        if (state.isRelError.isValid && state.methodType.isValid && isXFieldsDefined) {
            const {
                isRelError,
                methodType,
                xFields
            } = state;

            const params = {
                aMatrix: aMatrix.map(a => a.map(innerA => innerA.value)),
                bMatrix: bMatrix.map(b => b.value),
                isRelError: isRelError.value === 'rel',
                methodType: methodType.value,
                xArray: xFields.map((x) => {
                    const keyName = Object.keys(x)[0];
                    return x[keyName].value;
                })
            };

            onGetBestLambdaResult(params)
                .then((response) => {
                    const { resultMessage } = response;

                    setState({
                        ...state,
                        bestLambda: resultMessage,
                        showBestLambda: true,
                        showErrors: false,
                        showResults: false
                    });
                })
                .catch(Function.prototype);
        } else {
            setState({ ...state, showErrors: true, showBestLambda: false });
        }
    };

    const { result } = iterativeMethodsResult;
    const {
        bestLambda,
        isRelError,
        iterations,
        lambda,
        methodType,
        resultMessage,
        showBestLambda,
        showErrors,
        showResults,
        tolerance,
        xFields
    } = state;

    return (
        <Grid
            className={classes.iterMethodsPage}
            container
            direction="row"
            id="iter-methods-page"
        >
            <Grid item xs={12}>
                <Typography
                    color="primary"
                    id="iter-methods-title"
                    variant="h5"
                >
                    {config.text.common.iterMethodsTitle}
                </Typography>
            </Grid>
            <Grid className={classes.texts} item xs={12}>
                <Typography
                    id="iterative-methods-help"
                >
                    {config.text.helpMessages.iterativeMethodsHelp}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <CtrlIterMethodsParams
                    id="iter-methods-page-params"
                    isRelError={isRelError.value}
                    iterations={iterations.value}
                    lambda={lambda.value}
                    methodType={methodType.value}
                    numberOfXs={xFields.length}
                    onChange={handleOnFieldChange}
                    onRadioChange={handleOnRadioChange}
                    onXFieldChange={handleOnXFieldChange}
                    showErrors={showErrors}
                    tolerance={tolerance.value}
                    xFields={xFields}
                />
            </Grid>
            <Grid className={classes.actionButtons} item xs={12}>
                <Button
                    color="primary"
                    id="iter-methods-page-execute-button"
                    onClick={handleOnExecute}
                    size="large"
                    variant="contained"
                >
                    {config.text.common.execute}
                </Button>
                <Button
                    className={classes.lambdaButton}
                    color="secondary"
                    id="iter-methods-page-get-best-lambda-button"
                    onClick={handleOnGetBestLambda}
                    size="large"
                    variant="contained"
                >
                    {config.text.common.getBestLambda}
                </Button>
            </Grid>
            {showBestLambda && !showResults && !showErrors && (
                <Grid
                    alignItems="center"
                    container
                    item
                    justify="center"
                    xs={12}
                >
                    <Typography variant="subtitle1" gutterBottom>
                        {bestLambda}
                    </Typography>
                </Grid>
            )}
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
                    <CtrlIterMethodsResults
                        id="iter-methods-page-results"
                        data={result}
                    />
                </Grid>
            )}
        </Grid>
    );
};


IterMethodsPage.propTypes = {
    appSettings: PropTypes.arrayOf(PropTypes.shape({
        aMatrix: PropTypes.array,
        allowedValues: PropTypes.arrayOf(PropTypes.string),
        bMatrix: PropTypes.array,
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
    iterativeMethodsResult: PropTypes.shape({
        result: PropTypes.shape({
            error: PropTypes.arrayOf(PropTypes.number),
            n: PropTypes.number,
            x: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
        }),
        resultMessage: PropTypes.string,
        solutionFailed: PropTypes.bool
    }),
    onGetBestLambdaResult: PropTypes.func.isRequired,
    onGetIterativeMethodsResult: PropTypes.func.isRequired
};

IterMethodsPage.defaultProps = {
    appSettings: [],
    iterativeMethodsResult: null
};

export default withStyles(styles)(IterMethodsPage);
