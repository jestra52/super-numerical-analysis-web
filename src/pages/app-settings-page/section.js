// @packages
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlTextField from '../../controls/general-purpose/ctrl-text-field';
import { config } from '../../config';

// @styles
import styles from './styles';

const CtrlAppSettingSection = ({
    appSettings,
    category,
    className,
    classes,
    id,
    onChange,
    showErrors,
    variant,
    visible
}) => {
    if (!visible) {
        return null;
    }

    const appSettingSectionClass = classNames(
        className,
        classes.appSettingSection
    );

    const categoryCamel = _.lowerFirst(category);
    const categoryTitle = config.text.appSettings[`${categoryCamel}.title`] || category;

    const getLabelText = key =>
        config.text.appSettings[`${categoryCamel}.${_.lowerFirst(key)}.label`] || key;

    const getHelpText = key =>
        config.text.appSettings[`${categoryCamel}.${_.lowerFirst(key)}.helpText`];

    return (
        <Grid
            className={appSettingSectionClass}
            container
            direction="row"
            id={id}
        >
            <Grid item xs={12}>
                <Typography
                    color="primary"
                    component="h2"
                    gutterBottom
                    id={`${id}-title`}
                    variant="h5"
                >
                    {categoryTitle}
                </Typography>
            </Grid>
            <Paper className={classes.appSettingSectionPaper} id={`${id}-content`}>
                <Grid container direction="row">
                {
                    appSettings.map(appSetting => (
                        <Grid
                            className={classes.fieldPadding}
                            item
                            key={appSetting.settingId}
                            xs={6}
                        >
                            <CtrlTextField
                                decimals={appSetting.decimals}
                                helpText={getHelpText(appSetting.key)}
                                id={`${id}-${appSetting.key}`}
                                label={getLabelText(appSetting.key)}
                                maxValue={appSetting.max}
                                minValue={appSetting.min}
                                name={appSetting.settingId.toString()}
                                onChange={onChange}
                                regexPattern={appSetting.regex}
                                required={appSetting.required}
                                showErrors={showErrors}
                                type={appSetting.type}
                                value={appSetting.value}
                                variant={variant}
                            />
                        </Grid>
                    ))
                }
                </Grid>
            </Paper>
        </Grid>
    );
};

CtrlAppSettingSection.propTypes = {
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
    })).isRequired,
    category: PropTypes.string.isRequired,
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    showErrors: PropTypes.bool.isRequired,
    variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
    visible: PropTypes.bool
};

CtrlAppSettingSection.defaultProps = {
    className: null,
    variant: 'standard',
    visible: true
};

export default withStyles(styles)(CtrlAppSettingSection);
