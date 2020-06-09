// @packages
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlSplinesParams from './params';
import CtrlSplinesResults from './results';
import { config } from '../../config';
import { globalUI } from '../../core';
import { initialState } from './state';
import { isAllPropsValid } from '../../util';

// @styles
import styles from './styles';

const SplinesPage = memo(({
    classes,
    splinesResult,
    onGetSplinesResult
}) => {
    const [state, setState] = useState(initialState);

    function isFormValid() {
        return isAllPropsValid(state);
    }

    const handleOnFieldChange = ({ name, isValid, value }) => {
        const intValue = value ? parseInt(value, 10) : 0;

        if (name === 'numberPoints' && !Number.isNaN(intValue)) {
            setState({
                ...state,
                [name]: {
                    isValid,
                    value
                },
                xFields: [...Array(intValue)].map(() => ({
                    isValid: false,
                    value: null
                })),
                yFields: [...Array(intValue)].map(() => ({
                    isValid: false,
                    value: null
                }))
            });
        } else {
            setState({
                ...state,
                [name]: {
                    isValid,
                    value
                }
            });
        }
    };

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

    const handleOnSortingIterationTabChange = (_, value) =>
        setState({
            ...state,
            sortingIterationIndex: value
        });

    const handleOnSortingIterationTabIndexChange = index =>
        setState({
            ...state,
            sortingIterationIndex: index
        });

    const handleOnXFieldChange = ({ name, isValid, value }) => {
        setState((prevState) => {
            const regex = /\d+/;
            const currentItemIndex = name.match(regex);
            const { xFields } = prevState;

            xFields[currentItemIndex] = {
                isValid,
                value
            };

            return ({ ...prevState, xFields });
        });
    };

    const handleOnYFieldChange = ({ name, isValid, value }) => {
        setState((prevState) => {
            const regex = /\d+/;
            const currentItemIndex = name.match(regex);
            const { yFields } = prevState;

            yFields[currentItemIndex] = {
                isValid,
                value
            };

            return ({ ...prevState, yFields });
        });
    };

    const handleOnExecute = () => {
        const isXFieldsDefined = state.xFields.every(x => x && x.isValid);
        const isYFieldsDefined = state.yFields.every(y => y && y.isValid);

        if (isFormValid() && isXFieldsDefined && isYFieldsDefined) {
            const {
                methodType,
                xFields,
                yFields
            } = state;

            const params = {
                methodType: methodType.value,
                points: xFields.map((x, i) => [x.value, yFields[i].value])
            };

            onGetSplinesResult(params)
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

    const { result } = splinesResult;
    const {
        numberPoints,
        resultMessage,
        showErrors,
        showResults,
        sortingIterationIndex,
        tabIndex,
        xFields,
        yFields
    } = state;

    return (
        <Grid
            className={classes.splinesPage}
            container
            direction="row"
            id="splines-lagrange-page"
        >
            <Grid className={classes.title} item xs={12}>
                <Typography
                    color="primary"
                    id="splines-lagrange-title"
                    variant="h5"
                >
                    {config.text.routes.interpolationSplines}
                </Typography>
            </Grid>
            <Grid className={classes.texts} item xs={12}>
                <Typography
                    id="splines-help"
                >
                    {config.text.helpMessages.splineHelp}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <CtrlSplinesParams
                    id="splines-lagrange-page-params"
                    methodType={state.methodType.value}
                    numberPoints={numberPoints.value}
                    onChange={handleOnFieldChange}
                    onRadioChange={handleOnRadioChange}
                    onXFieldChange={handleOnXFieldChange}
                    onYFieldChange={handleOnYFieldChange}
                    showErrors={showErrors}
                    xFields={xFields}
                    yFields={yFields}
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
                        {`${resultMessage}. `}
                    </Typography>
                </Grid>
            )}
            {showResults && !showErrors && (
                <CtrlSplinesResults
                    id="splines-lagrange-page-results"
                    onSortingIterationTabChange={handleOnSortingIterationTabChange}
                    onSortingIterationTabIndexChange={handleOnSortingIterationTabIndexChange}
                    onTabChange={handleOnTabChange}
                    onTabIndexChange={handleOnTabIndexChange}
                    result={result}
                    sortingIterationIndex={sortingIterationIndex}
                    tabIndex={tabIndex}
                />
            )}
        </Grid>
    );
});

SplinesPage.propTypes = {
    classes: PropTypes.object.isRequired,
    splinesResult: PropTypes.shape({
        result: PropTypes.shape({
            aMatrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
            bMatrix: PropTypes.arrayOf(PropTypes.number).isRequired,
            xMatrix: PropTypes.arrayOf(PropTypes.number).isRequired
        }),
        resultMessage: PropTypes.string,
        solutionFailed: PropTypes.bool
    }),
    onGetSplinesResult: PropTypes.func.isRequired
};

SplinesPage.defaultProps = {
    splinesResult: null
};

export default withStyles(styles)(SplinesPage);
