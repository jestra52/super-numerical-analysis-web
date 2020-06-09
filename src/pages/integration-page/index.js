// @packages
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlIntegrationParams from './params';
import CtrlIntegrationResults from './results';
import { config } from '../../config';
import { globalUI } from '../../core';
import { initialState } from './state';
import { isAllPropsValid } from '../../util';

// @styles
import styles from './styles';

class IntegrationPage extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;

        this.handleOnExecute = this.handleOnExecute.bind(this);
        this.handleOnFieldChange = this.handleOnFieldChange.bind(this);
        this.handleOnRadioChange = this.handleOnRadioChange.bind(this);
        this.handleOnXFieldChange = this.handleOnXFieldChange.bind(this);
        this.handleOnYFieldChange = this.handleOnYFieldChange.bind(this);
    }

    get isFormValid() {
        return isAllPropsValid(this.state);
    }

    handleOnFieldChange({ name, isValid, value }) {
        const intValue = value ? parseInt(value, 10) : 0;

        if (name === 'pointsQuantity' && !Number.isNaN(intValue)) {
            this.setState({
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
            this.setState({
                [name]: {
                    isValid,
                    value
                }
            });
        }
    }

    handleOnRadioChange(event) {
        this.setState({
            [event.target.name]: {
                isValid: Boolean(event.target.value),
                value: event.target.value
            }
        });
    }

    handleOnXFieldChange({ name, isValid, value }) {
        this.setState((prevState) => {
            const regex = /\d+/;
            const currentItemIndex = name.match(regex);
            const { xFields } = prevState;

            xFields[currentItemIndex] = {
                isValid,
                value
            };

            return ({ xFields });
        });
    }

    handleOnYFieldChange({ name, isValid, value }) {
        this.setState((prevState) => {
            const regex = /\d+/;
            const currentItemIndex = name.match(regex);
            const { yFields } = prevState;

            yFields[currentItemIndex] = {
                isValid,
                value
            };

            return ({ yFields });
        });
    }

    handleOnExecute() {
        const { appSettings } = this.props;

        const isXFieldsDefined = this.state.xFields.every(x => x && x.isValid);
        const isYFieldsDefined = this.state.yFields.every(y => y && y.isValid);

        if (this.isFormValid && isXFieldsDefined && isYFieldsDefined) {
            const {
                formType,
                methodType,
                xFields,
                yFields
            } = this.state;

            const params = {
                formType: formType.value,
                fx: appSettings.find(item => item.settingId === 1).value,
                methodType: methodType.value,
                points: xFields.map((x, i) => [x.value, yFields[i].value])
            };

            this.props.onGetIntegrationResult(params)
                .then((response) => {
                    const { resultMessage, solutionFailed } = response;

                    if (solutionFailed) {
                        globalUI.showToastNotificationWarning(resultMessage);
                    }

                    this.setState({
                        resultMessage,
                        showErrors: false,
                        showResults: !solutionFailed
                    });
                })
                .catch(Function.prototype);
        } else {
            this.setState({ showErrors: true, showResults: false });
        }
    }

    render() {
        const { classes, integrationResult } = this.props;

        const {
            formType,
            methodType,
            pointsQuantity,
            resultMessage,
            showErrors,
            showResults,
            xFields,
            yFields
        } = this.state;

        return (
            <Grid
                className={classes.integrationPage}
                container
                direction="row"
                id="integration-page"
            >
                <Grid item xs={12}>
                    <Typography
                        color="primary"
                        id="integration-title"
                        variant="h5"
                    >
                        {config.text.routes.integration}
                    </Typography>
                </Grid>
                <Grid className={classes.texts} item xs={12}>
                    <Typography
                        id="integration-help"
                    >
                        {config.text.helpMessages.integrationHelp}
                    </Typography>
                </Grid>
                <CtrlIntegrationParams
                    formType={formType.value}
                    id="integration-page-params"
                    methodType={methodType.value}
                    onChange={this.handleOnFieldChange}
                    onRadioChange={this.handleOnRadioChange}
                    onXFieldChange={this.handleOnXFieldChange}
                    onYFieldChange={this.handleOnYFieldChange}
                    pointsQuantity={pointsQuantity.value}
                    showErrors={showErrors}
                    xFields={xFields}
                    yFields={yFields}
                />
                <Grid className={classes.actionButtons} item xs={12}>
                    <Button
                        color="primary"
                        id="integration-page-execute-button"
                        onClick={this.handleOnExecute}
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
                            {`${resultMessage}. This is the result: ${integrationResult.result.functionOutput}`}
                        </Typography>
                    </Grid>
                )}
                {showResults && !showErrors && (
                    <CtrlIntegrationResults
                        data={integrationResult.result}
                        id="integration-page-results"
                    />
                )}
            </Grid>
        );
    }
}

IntegrationPage.propTypes = {
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
    integrationResult: PropTypes.shape({
        result: PropTypes.object,
        resultMessage: PropTypes.string,
        solutionFailed: PropTypes.bool
    }),
    onGetIntegrationResult: PropTypes.func.isRequired
};

IntegrationPage.defaultProps = {
    appSettings: [],
    integrationResult: null
};

export default withStyles(styles)(IntegrationPage);
