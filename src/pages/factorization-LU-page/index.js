// @packages
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlFactorizationLUParams from './params';
import CtrlFactorizationLUResults from './results';
import { config } from '../../config';
import { globalUI } from '../../core';
import { initialState } from './state';
import { isAllPropsValid } from '../../util';

// @styles
import styles from './styles';

const FactorizationLUPage = memo(({
    appSettings,
    classes,
    factorizationLUResult,
    onGetFactorizationLUResult
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

    const handleOnTabChange = (_, value) =>
        setState({
            ...state,
            tabIndex: value
        });

    const handleOnTabIndexChange = index =>
        setState({
            ...state,
            tabIndex: index
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

        if (isFormValid()) {
            const { methodType } = state;

            const params = {
                aMatrix: aMatrix.map(a => a.map(innerA => innerA.value)),
                bMatrix: bMatrix.map(b => b.value),
                methodType: methodType.value
            };

            onGetFactorizationLUResult(params)
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

    const { result } = factorizationLUResult;
    const {
        resultMessage,
        showErrors,
        showResults,
        tabIndex
    } = state;

    return (
        <Grid
            className={classes.factorizationLUPage}
            container
            direction="row"
            id="gauss-elimination-page"
        >
            <Grid item xs={12}>
                <Typography
                    color="primary"
                    id="gauss-elimination-title"
                    variant="h5"
                >
                    {config.text.routes.factorizationLU}
                </Typography>
            </Grid>
            <Grid className={classes.texts} item xs={12}>
                <Typography
                    id="incr-search-help"
                >
                    {config.text.helpMessages.factorizationHelp}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <CtrlFactorizationLUParams
                    id="gauss-elimination-page-params"
                    methodType={state.methodType.value}
                    onRadioChange={handleOnRadioChange}
                    showErrors={false}
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
                    className={classes.resultMessage}
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
                <CtrlFactorizationLUResults
                    id="gauss-elimination-page-results"
                    onTabChange={handleOnTabChange}
                    onTabIndexChange={handleOnTabIndexChange}
                    result={result}
                    tabIndex={tabIndex}
                />
            )}
        </Grid>
    );
});

FactorizationLUPage.propTypes = {
    classes: PropTypes.object.isRequired,
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
    factorizationLUResult: PropTypes.shape({
        hasInfiniteSolutions: PropTypes.bool,
        result: PropTypes.shape({
            lMatrix: PropTypes.array,
            uMatrix: PropTypes.array,
            aMatrix: PropTypes.array,
            bMatrix: PropTypes.array,
            iterations: PropTypes.array,
            xMatrix: PropTypes.array
        }),
        resultMessage: PropTypes.string,
        solutionFailed: PropTypes.bool
    }),
    onGetFactorizationLUResult: PropTypes.func.isRequired
};

FactorizationLUPage.defaultProps = {
    appSettings: [],
    factorizationLUResult: null
};

export default withStyles(styles)(FactorizationLUPage);
