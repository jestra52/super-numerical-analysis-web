// @packages
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import { config } from '../../../config';

// @styles
import styles from './styles';

// @constants
const EMPTY_ERROR = ' ';

const CtrlCheckField = ({
    autoFocus,
    className,
    classes,
    color,
    disabled,
    id,
    label,
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
            value
        });
    };

    const checkFieldClass = classNames(
        className,
        classes.checkField
    );

    const labelClass = value
        ? classes[`label${_.upperFirst(color)}`]
        : 'labelDefault';

    const errorMsg = getErrorMsg(value);
    const hasError = showErrors && errorMsg !== EMPTY_ERROR;
    const helperText = hasError ? errorMsg : EMPTY_ERROR;

    return (
        <div className={checkFieldClass}>
            <FormControlLabel
                classes={{ label: labelClass }}
                control={(
                    <Checkbox
                        autoFocus={autoFocus}
                        checked={value}
                        color={color}
                        disabled={disabled}
                        id={id}
                        onChange={handleOnChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                    />
                )}
                label={label}
            />
            {
                hasError && (
                    <FormHelperText
                        classes={{ root: classes.helperText }}
                        error
                        id={`${id}-helper-text`}
                    >
                        {helperText}
                    </FormHelperText>
                )
            }
        </div>
    );
};

CtrlCheckField.propTypes = {
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf(['default', 'primary', 'secondary']),
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    required: PropTypes.bool,
    showErrors: PropTypes.bool,
    value: PropTypes.bool.isRequired,
    visible: PropTypes.bool
};

CtrlCheckField.defaultProps = {
    autoFocus: false,
    className: null,
    color: 'secondary',
    disabled: false,
    name: null,
    onBlur: null,
    onFocus: null,
    required: false,
    showErrors: true,
    visible: true
};

export default withStyles(styles)(CtrlCheckField);
