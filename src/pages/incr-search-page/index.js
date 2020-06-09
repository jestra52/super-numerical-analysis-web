// @packages
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlIncrSearchParams from './params';
import CtrlIncrSearchResults from './results';
import { config } from '../../config';
import { globalUI } from '../../core';
import { initialState } from './state';
import { isAllPropsValid } from '../../util';

// @styles
import styles from './styles';

const IncrSearchPage = memo(({
    appSettings,
    classes,
    incrSearchResult,
    onGetIncrSearchResult
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
                delta,
                iterations,
                x0
            } = state;
            const params = {
                delta: parseFloat(delta.value),
                fx: appSettings.find(item => item.settingId === 1).value,
                n: parseInt(iterations.value, 10),
                x0: parseFloat(x0.value)
            };

            onGetIncrSearchResult(params)
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

    const { result } = incrSearchResult;
    const {
        resultMessage,
        showErrors,
        showResults,
        delta,
        iterations,
        x0
    } = state;

    return (
        <Grid
            className={classes.incrSearchPage}
            container
            direction="row"
            id="incr-search-page"
        >
            <Grid item xs={12}>
                <Typography
                    color="primary"
                    id="incr-search-title"
                    variant="h5"
                >
                    {config.text.common.titleIncrSearch}
                </Typography>
            </Grid>
            <Grid className={classes.texts} item xs={12}>
                <Typography
                    id="incr-search-help"
                >
                    {config.text.helpMessages.incrSearchHelp}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <CtrlIncrSearchParams
                    delta={delta.value}
                    id="incr-search-page-params"
                    iterations={iterations.value}
                    onChange={handleOnFieldChange}
                    showErrors={showErrors}
                    x0={x0.value}
                />
            </Grid>
            <Grid className={classes.actionButtons} item xs={12}>
                <Button
                    color="primary"
                    id="incr-search-page-execute-button"
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
                    <CtrlIncrSearchResults
                        id="incr-search-page-results"
                        data={result}
                    />
                </Grid>
            )}
        </Grid>
    );
});

IncrSearchPage.propTypes = {
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
    incrSearchResult: PropTypes.shape({
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
    onGetIncrSearchResult: PropTypes.func.isRequired
};

IncrSearchPage.defaultProps = {
    appSettings: [],
    incrSearchResult: null
};

export default withStyles(styles)(IncrSearchPage);
