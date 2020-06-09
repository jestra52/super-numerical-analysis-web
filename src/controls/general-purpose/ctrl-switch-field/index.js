// @packages
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import React from 'react';
import Switch from '@material-ui/core/Switch';
import _ from 'lodash';
import classNames from 'classnames';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import { config } from '../../../config';

// @styles
import styles from './styles';

// @constants
const EMPTY_ERROR = ' ';

const CtrlSwitchField = ({
    autoFocus,
    className,
    classes,
    disabled,
    id,
    label,
    labelColor,
    name,
    onBlur,
    onChange,
    onFocus,
    required,
    showErrors,
    value,
    visible
}) => {
    if (!visible) {
        return null;
    }

    const getErrorMsg = (value) => {
        if (required && !value) {
            return config.text.validations.required;
        }

        return EMPTY_ERROR;
    };

    const handleOnChange = (evt) => {
        const value = evt.target.checked;

        onChange({
            isValid: getErrorMsg(value) === EMPTY_ERROR,
            name: name || id,
            value: evt.target.checked
        });
    };

    const switchFieldClass = classNames(
        className,
        classes.switchField
    );

    const labelClass = labelColor
        ? classes[`label${_.upperFirst(labelColor)}`]
        : 'labelDefault';

    const errorMsg = getErrorMsg(value);
    const hasError = showErrors && errorMsg !== EMPTY_ERROR;
    const helperText = hasError ? errorMsg : EMPTY_ERROR;

    return (
        <div className={switchFieldClass}>
            <FormControlLabel
                classes={{ label: labelClass }}
                control={(
                    <Switch
                        autoFocus={autoFocus}
                        classes={{
                            bar: classes.bar,
                            checked: classes.checked,
                            icon: classes.icon,
                            iconChecked: classes.iconChecked,
                            switchBase: classes.switchBase
                        }}
                        checked={value}
                        disabled={disabled}
                        disableRipple
                        id={id}
                        onBlur={onBlur}
                        onChange={handleOnChange}
                        onFocus={onFocus}
                    />
                )}
                label={label}
            />
            {hasError && (
                <FormHelperText
                    classes={{ root: classes.helperText }}
                    error
                    id={`${id}-helper-text`}
                >
                    {helperText}
                </FormHelperText>
            )}
        </div>
    );
};

CtrlSwitchField.propTypes = {
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    labelColor: PropTypes.oneOf(['default', 'green']),
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    required: PropTypes.bool,
    showErrors: PropTypes.bool,
    value: PropTypes.bool.isRequired,
    visible: PropTypes.bool
};

CtrlSwitchField.defaultProps = {
    autoFocus: false,
    className: null,
    disabled: false,
    labelColor: 'default',
    name: null,
    onBlur: null,
    onFocus: null,
    required: false,
    showErrors: true,
    visible: true
};

export default withStyles(styles)(CtrlSwitchField);
