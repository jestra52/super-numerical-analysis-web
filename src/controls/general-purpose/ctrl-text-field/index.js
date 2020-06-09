// @packages
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlIcon from './icon';
import { config } from '../../../config';

import {
    MAX_DATE_VALUE,
    MIN_DATE_VALUE,
    format,
    isDate,
    isEmail,
    isName,
    isNumber,
    isPhone,
    isZip,
    removeTime,
    toShortDateString
} from '../../../util';

// @styles
import styles from './styles';
import { DEFAULT_FIELD_VARIANT } from '../../../styles/globals';

// @constants
const EMPTY_ERROR = ' ';

const inputType = {
    DATE: 'date',
    EMAIL: 'email',
    NAME: 'name',
    NUMERIC: 'numeric',
    PASSWORD: 'password',
    PHONE: 'phone',
    TEXT: 'text',
    ZIP: 'zip'
};

const transformType = {
    LOWER: 'lowercase',
    NONE: 'none',
    UPPER: 'uppercase'
};

class CtrlTextField extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            showPassword: false
        };

        this.handleInputOnChange = this.handleInputOnChange.bind(this);
        this.handleInputOnKeyPress = this.handleInputOnKeyPress.bind(this);
        this.handlePwdIconOnClick = this.handlePwdIconOnClick.bind(this);
    }

    get inputProps() {
        const {
            helpText,
            icon,
            id,
            onIconClick,
            type
        } = this.props;

        let iconName = icon;
        let iconClick = onIconClick;

        if (helpText && !icon) {
            iconName = 'feedback';
        }

        if (type === inputType.PASSWORD) {
            const { showPassword } = this.state;
            iconName = showPassword ? 'visibility' : 'visibility_off';
            iconClick = this.handlePwdIconOnClick;
        }

        return iconName ? {
            endAdornment: (
                <CtrlIcon
                    helpText={helpText}
                    icon={iconName}
                    id={`${id}-icon`}
                    onIconClick={iconClick}
                />
            )
        } : {};
    }

    get inputType() {
        const { type } = this.props;
        const { showPassword } = this.state;

        if (type === inputType.PASSWORD && !showPassword) {
            return inputType.PASSWORD;
        }

        return inputType.TEXT;
    }

    get placeholder() {
        const { dateFormat, placeholder, type } = this.props;

        if (placeholder) {
            return placeholder;
        }

        switch (type) {
            case inputType.DATE:
                return dateFormat.toLowerCase();
            case inputType.EMAIL:
                return config.text.textFieldPlaceHolders.email;
            case inputType.PHONE:
                return config.text.textFieldPlaceHolders.phone;
            case inputType.ZIP:
                return config.text.textFieldPlaceHolders.zip;
            default:
                return placeholder;
        }
    }

    get minValue() {
        const { minValue, type } = this.props;

        switch (type) {
            case inputType.DATE:
                const date = minValue !== null
                    ? minValue
                    : MIN_DATE_VALUE;
                return removeTime(date);
            case inputType.NUMERIC:
                return minValue !== null
                    ? minValue
                    : Number.MIN_SAFE_INTEGER;
            default:
                return null;
        }
    }

    get maxValue() {
        const { maxValue, type } = this.props;

        switch (type) {
            case inputType.DATE:
                const date = maxValue !== null
                    ? maxValue
                    : MAX_DATE_VALUE;
                return removeTime(date);
            case inputType.NUMERIC:
                return maxValue !== null
                    ? maxValue
                    : Number.MAX_SAFE_INTEGER;
            default:
                return null;
        }
    }

    get allowNegatives() {
        return this.minValue < 0;
    }

    getErrorMsg(value) {
        const {
            dateFormat,
            decimals,
            expectedValue,
            minLength,
            required,
            type
        } = this.props;

        if (required && !value) {
            return config.text.validations.required;
        }

        if (expectedValue !== undefined && (expectedValue || '') !== (value || '')) {
            return config.text.validations.verification;
        }

        if (!value) {
            return EMPTY_ERROR;
        }

        if (value.toString().length < minLength) {
            return format(config.text.validations.minCharacters, minLength);
        }

        if (type === inputType.EMAIL && !isEmail(value)) {
            return config.text.validations.email;
        }

        if (type === inputType.PHONE && !isPhone(value)) {
            return config.text.validations.phone;
        }

        if (type === inputType.ZIP && !isZip(value)) {
            return config.text.validations.zip;
        }

        if (type === inputType.DATE) {
            if (!isDate(value, dateFormat)) {
                return config.text.validations.date;
            }
            if (this.parseValue(value) < this.minValue) {
                const strDate = toShortDateString(this.minValue);
                return format(config.text.validations.minValue, strDate);
            }
            if (this.parseValue(value) > this.maxValue) {
                const strDate = toShortDateString(this.maxValue);
                return format(config.text.validations.maxValue, strDate);
            }
        }

        if (type === inputType.NUMERIC) {
            if (!isNumber(value, decimals, this.allowNegatives)) {
                return config.text.validations.number;
            }
            if (this.parseValue(value) < this.minValue) {
                return format(config.text.validations.minValue, this.minValue);
            }
            if (this.parseValue(value) > this.maxValue) {
                return format(config.text.validations.maxValue, this.maxValue);
            }
        }

        return EMPTY_ERROR;
    }

    getTransformedText(value) {
        const { textTransform } = this.props;

        switch (textTransform) {
            case transformType.UPPER:
                return value.toUpperCase();
            case transformType.LOWER:
                return value.toLowerCase();
            default:
                return value;
        }
    }

    handleInputOnChange(evt) {
        const {
            decimals,
            id,
            maxLength,
            name,
            onChange,
            regexPattern,
            type
        } = this.props;

        const { value } = evt.target;

        if (!onChange) {
            return;
        }

        if (value.length > maxLength) {
            return;
        }

        if (value !== '' &&
            type === inputType.NAME &&
            !isName(value)) {
            return;
        }

        if (value !== '' &&
            type === inputType.NUMERIC &&
            !isNumber(value, decimals, this.allowNegatives)) {
            if (!isNumber(`${value}0`, decimals, this.allowNegatives)) {
                return;
            }
        }

        if (value !== '' &&
            regexPattern &&
            !regexPattern.test(value)) {
            return;
        }

        onChange({
            isValid: this.getErrorMsg(value) === EMPTY_ERROR,
            name: name || id,
            value: this.getTransformedText(value)
        });
    }

    handleInputOnKeyPress(evt) {
        const { onEnter } = this.props;

        if (evt.key === 'Enter' && onEnter) {
            onEnter();
        }
    }

    handlePwdIconOnClick() {
        this.setState(previousState => ({
            showPassword: !previousState.showPassword
        }));
    }

    parseValue(value) {
        const { dateFormat, type } = this.props;

        switch (type) {
            case inputType.DATE:
                const date = moment(value, dateFormat).toDate();
                return removeTime(date);
            case inputType.NUMERIC:
                return parseFloat(value);
            default:
                return value;
        }
    }

    render() {
        const {
            autoFocus,
            className,
            classes,
            disabled,
            id,
            label,
            onBlur,
            onFocus,
            showErrors,
            value,
            variant,
            visible
        } = this.props;

        if (!visible) {
            return null;
        }

        const textFieldClass = classNames(
            className,
            classes.textField
        );

        const errorMsg = this.getErrorMsg(value);
        const hasError = showErrors && errorMsg !== EMPTY_ERROR;
        const helperText = hasError ? errorMsg : EMPTY_ERROR;

        return (
            <TextField
                InputProps={this.inputProps}
                autoComplete="off"
                autoFocus={autoFocus}
                className={textFieldClass}
                disabled={disabled}
                error={hasError}
                fullWidth
                helperText={helperText}
                id={id}
                label={label}
                onBlur={onBlur}
                onChange={this.handleInputOnChange}
                onFocus={onFocus}
                onKeyPress={this.handleInputOnKeyPress}
                placeholder={this.placeholder}
                type={this.inputType}
                value={value || ''}
                variant={variant}
            />
        );
    }
}

CtrlTextField.propTypes = {
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    dateFormat: PropTypes.string,
    decimals: PropTypes.number,
    disabled: PropTypes.bool,
    expectedValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
    helpText: PropTypes.string,
    icon: PropTypes.string,
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    maxLength: PropTypes.number,
    maxValue: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
    minLength: PropTypes.number,
    minValue: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onEnter: PropTypes.func,
    onFocus: PropTypes.func,
    onIconClick: PropTypes.func,
    placeholder: PropTypes.string,
    regexPattern: PropTypes.object,
    required: PropTypes.bool,
    showErrors: PropTypes.bool,
    textTransform: PropTypes.oneOf([...Object.values(transformType)]),
    type: PropTypes.oneOf([...Object.values(inputType)]),
    value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
    variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
    visible: PropTypes.bool
};

CtrlTextField.defaultProps = {
    autoFocus: false,
    className: null,
    dateFormat: 'MM/DD/YYYY',
    decimals: 0,
    disabled: false,
    expectedValue: undefined,
    helpText: null,
    icon: null,
    label: null,
    maxLength: Number.MAX_SAFE_INTEGER,
    maxValue: null,
    minLength: 0,
    minValue: null,
    name: null,
    onBlur: null,
    onChange: null,
    onEnter: null,
    onFocus: null,
    onIconClick: null,
    placeholder: null,
    regexPattern: null,
    required: false,
    showErrors: true,
    textTransform: 'none',
    type: 'text',
    value: null,
    variant: DEFAULT_FIELD_VARIANT,
    visible: true
};

export default withStyles(styles)(CtrlTextField);
