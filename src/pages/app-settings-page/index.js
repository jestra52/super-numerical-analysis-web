// @packages
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlAppSettingSection from './section';
import CtrlTextField from '../../controls/general-purpose/ctrl-text-field';
import { config } from '../../config';
import { constants, globalUI } from '../../core';
import { initialState } from './state';
import { isAllPropsValid, groupArray } from '../../util';

// @styles
import styles from './styles';

class AppSettingsPage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = initialState;

        this.handleFieldOnChange = this.handleFieldOnChange.bind(this);
        this.handleOnDiscard = this.handleOnDiscard.bind(this);
        this.handleOnMatrixFieldChange = this.handleOnMatrixFieldChange.bind(this);
        this.handleOnSave = this.handleOnSave.bind(this);
        this.renderMatrixFields = this.renderMatrixFields.bind(this);
        this.renderRowField = this.renderRowField.bind(this);
    }

    componentDidMount() {
        if (this.props.appSettings.length === 0) {
            const { payload } = this.props.onGetAppSettings();
            const fields = payload.map(item => Object.assign({}, item, {
                isValid: true
            }));
            const originalFields = payload.map(item => Object.assign({}, item));
            const { aMatrix, bMatrix } = fields.find(item => item.key === 'GlobalColRow');
            this.setState({
                aMatrix,
                bMatrix,
                fields,
                originalAMatrix: aMatrix,
                originalBMatrix: bMatrix,
                originalFields
            });
        } else {
            const fields = this.props.appSettings.map(item => Object.assign({}, item, {
                isValid: true
            }));
            const originalFields = this.props.appSettings.map(item => Object.assign({}, item));
            const { aMatrix, bMatrix } = fields.find(item => item.key === 'GlobalColRow');
            this.setState({
                aMatrix,
                bMatrix,
                fields,
                originalAMatrix: aMatrix,
                originalBMatrix: bMatrix,
                originalFields
            });
        }
    }

    get isFormValid() {
        return isAllPropsValid(this.state.fields);
    }

    handleFieldOnChange({ name, isValid, value }) {
        this.setState(({ fields }) => ({
            fields: fields.map((row) => {
                if (row.settingId.toString() === name) {
                    return Object.assign({}, row, {
                        isValid,
                        value
                    });
                }
                return row;
            }),
            hasChanges: true
        }));
    }

    handleOnMatrixFieldChange({ name, isValid, value }) {
        this.setState(({ aMatrix, bMatrix, fields }) => {
            const indexes = name.split('-');
            const nextMatrix = indexes[1] === 'b' ? bMatrix.map((row, index) => {
                if (index.toString() === indexes[0]) {
                    return Object.assign({}, row, {
                        isValid,
                        value
                    });
                }
                return row;
            }) : aMatrix.map((row, index) => {
                if (index.toString() === indexes[0]) {
                    return row.map((innerRow, innerIndex) => {
                        if (innerIndex.toString() === indexes[1]) {
                            return Object.assign({}, innerRow, {
                                isValid,
                                value
                            });
                        }
                        return innerRow;
                    });
                }
                return row;
            });
            const nextState = indexes[1] === 'b' ? {
                bMatrix: nextMatrix,
                fields: fields.map((row) => {
                    if (row.key === 'GlobalColRow') {
                        return Object.assign({}, row, {
                            bMatrix: nextMatrix
                        });
                    }
                    return row;
                }),
                hasChanges: true
            } : {
                aMatrix: nextMatrix,
                fields: fields.map((row) => {
                    if (row.key === 'GlobalColRow') {
                        return Object.assign({}, row, {
                            aMatrix: nextMatrix
                        });
                    }
                    return row;
                }),
                hasChanges: true
            };

            return nextState;
        });
    }

    handleOnSave() {
        globalUI.showLoadingPage();
        if (this.isFormValid) {
            this.setState(({
                aMatrix,
                bMatrix,
                fields,
                originalFields
            }) => {
                const n = parseInt(fields.find(item => item.key === 'GlobalColRow').value, 10);
                const originalN = parseInt(originalFields.find(item => item.key === 'GlobalColRow').value, 10);
                const nextAMatrix = n !== originalN
                    ? [...Array(n)].map((_, i) => [...Array(n)].map((_, j) =>
                        aMatrix[i] && aMatrix[i][j] ? aMatrix[i][j] : ({
                            isValid: false,
                            value: null
                        })))
                    : aMatrix;
                const nextBMatrix = n !== originalN
                    ? [...Array(n)].map((_, i) =>
                        bMatrix[i] ? bMatrix[i] : ({
                            isValid: false,
                            value: null
                        }))
                    : bMatrix;
                const nextFields = fields.map((row) => {
                    if (row.key === 'GlobalColRow') {
                        return Object.assign({}, row, {
                            aMatrix: nextAMatrix,
                            bMatrix: nextBMatrix
                        });
                    }
                    return row;
                });

                return ({
                    aMatrix: nextAMatrix,
                    bMatrix: nextBMatrix,
                    fields: nextFields,
                    hasChanges: false,
                    originalAMatrix: nextAMatrix,
                    originalBMatrix: nextBMatrix,
                    originalFields: nextFields,
                    showErrors: false
                });
            }, () => this.props.onSaveAppSettings(this.state.fields));
        } else {
            this.setState({ showErrors: true });
        }
        globalUI.hideLoadingPage();
    }

    handleOnDiscard() {
        const {
            originalFields,
            originalAMatrix,
            originalBMatrix
        } = this.state;

        this.setState({
            aMatrix: originalAMatrix,
            bMatrix: originalBMatrix,
            fields: originalFields,
            hasChanges: false
        });
    }

    renderRowField(items, bItems, i) {
        const { DECIMALS_FOR_FIELDS } = constants.numbers;
        const { classes } = this.props;
        const { showErrors } = this.state;

        return (
            <tr key={`${i}-row`}>
                {items.map((item, j) => (
                    <td key={`${j}-col`}>
                        <CtrlTextField
                            decimals={DECIMALS_FOR_FIELDS}
                            id={`${i}-${j}`}
                            label={`a${i},${j}`}
                            name={`${i}-${j}`}
                            onChange={this.handleOnMatrixFieldChange}
                            showErrors={showErrors}
                            type="numeric"
                            value={item.value}
                            variant="outlined"
                        />
                    </td>
                ))}
                <td key={`${i}-b`} className={classes.matrixValueField}>
                    <CtrlTextField
                        decimals={DECIMALS_FOR_FIELDS}
                        id={`${i}-b`}
                        label={`b${i}`}
                        name={`${i}-b`}
                        onChange={this.handleOnMatrixFieldChange}
                        showErrors={showErrors}
                        type="numeric"
                        value={bItems[i].value}
                        variant="outlined"
                    />
                </td>
            </tr>
        );
    }

    renderMatrixFields() {
        const { classes } = this.props;
        const { aMatrix, bMatrix } = this.state;

        return (
            <table className={classes.inputMatrix}>
                <tbody>
                    <tr>
                        <th colSpan={aMatrix.length}>A</th>
                        <th>B</th>
                    </tr>
                    {aMatrix.map((item, i) => this.renderRowField(item, bMatrix, i))}
                </tbody>
            </table>
        );
    }

    render() {
        const { classes } = this.props;

        const {
            fields,
            hasChanges,
            showErrors
        } = this.state;

        const globalColRow = this.props.appSettings.find(item => item.key === 'GlobalColRow');

        return (
            <div id="app-settings-page" className={classes.appSettingsPage}>
                <form
                    autoComplete="off"
                    id="app-settings-form"
                    noValidate
                >
                    {
                        groupArray({ key: 'category', source: fields }).map(group => (
                            <CtrlAppSettingSection
                                appSettings={group.items}
                                category={group.key}
                                id={`app-settings-page-${group.key}`}
                                key={group.key}
                                onChange={this.handleFieldOnChange}
                                showErrors={showErrors}
                            />
                        ))
                    }
                    {globalColRow && parseInt(globalColRow.value, 10) >= 0 && (
                        <Grid
                            className={classes.appSettingSection}
                            container
                            direction="row"
                        >
                            <Paper className={classes.appSettingSectionPaper} id="app-settings-page-matrix-content">
                                <Grid item xs={12}>
                                    {this.renderMatrixFields()}
                                </Grid>
                            </Paper>
                        </Grid>
                    )}
                    <div id="app-settings-page-buttons" className={classes.buttonsContainer}>
                        <Button
                            color="primary"
                            disabled={!hasChanges}
                            id="app-settings-page-save-button"
                            onClick={this.handleOnSave}
                            size="large"
                            variant="contained"
                        >
                            <Icon className={classes.marginRightUnit}>check_circle</Icon>
                            {config.text.appSettings.saveButton}
                        </Button>
                        { hasChanges && (
                            <Button
                                className={classes.marginLeftUnit}
                                color="secondary"
                                id="app-settings-page-discard-button"
                                onClick={this.handleOnDiscard}
                                size="large"
                                variant="contained"
                            >
                                <Icon className={classes.marginRightUnit}>cancel</Icon>
                                {config.text.appSettings.discardButton}
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        );
    }
}

AppSettingsPage.propTypes = {
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
    onGetAppSettings: PropTypes.func.isRequired,
    onSaveAppSettings: PropTypes.func.isRequired
};

AppSettingsPage.defaultProps = {
    appSettings: []
};

export default withStyles(styles)(AppSettingsPage);
