// @packages
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import { config } from '../../../config';

// @styles
import styles from './styles';
import { DEFAULT_FIELD_VARIANT } from '../../../styles/globals';

// @constants
const EMPTY_ERROR = ' ';

const CtrlSelectField = ({
    allowUnselect,
    autoFocus,
    className,
    classes,
    disabled,
    id,
    itemDesProp,
    itemValProp,
    items,
    label,
    name,
    onBlur,
    onChange,
    onFocus,
    renderItem,
    required,
    showErrors,
    value,
    variant,
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

    const handleSelectOnChange = (evt) => {
        const { value } = evt.target;
        const item = items.find(item => item[itemValProp] === value);

        onChange({
            description: item ? item[itemDesProp] : null,
            isValid: getErrorMsg(value) === EMPTY_ERROR,
            item,
            name: name || id,
            value
        });
    };

    const selectFieldClass = classNames(
        className,
        classes.selectField
    );

    const selectFieldItems = allowUnselect
        ? [{ [itemValProp]: '', [itemDesProp]: '' }, ...items]
        : items;

    const errorMsg = getErrorMsg(value);
    const hasError = showErrors && errorMsg !== EMPTY_ERROR;
    const helperText = hasError ? errorMsg : EMPTY_ERROR;

    return (
        <TextField
            autoComplete="off"
            autoFocus={autoFocus}
            className={selectFieldClass}
            disabled={disabled}
            error={hasError}
            fullWidth
            helperText={helperText}
            id={id}
            label={label}
            onBlur={onBlur}
            onChange={handleSelectOnChange}
            onFocus={onFocus}
            select
            value={value !== null ? value : ''}
            variant={variant}
        >
            {
                selectFieldItems.map((selectItem, index) => (
                    <MenuItem
                        id={`${id}-option-${index}`}
                        key={index}
                        value={selectItem[itemValProp]}
                    >
                        {
                            renderItem
                                ? renderItem(selectItem)
                                : selectItem[itemDesProp]
                        }
                    </MenuItem>
                ))
            }
        </TextField>
    );
};

CtrlSelectField.propTypes = {
    allowUnselect: PropTypes.bool,
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
    itemDesProp: PropTypes.string,
    itemValProp: PropTypes.string,
    items: PropTypes.array.isRequired,
    label: PropTypes.string,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    renderItem: PropTypes.func,
    required: PropTypes.bool,
    showErrors: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
    visible: PropTypes.bool
};

CtrlSelectField.defaultProps = {
    allowUnselect: false,
    autoFocus: false,
    className: null,
    disabled: false,
    itemDesProp: 'description',
    itemValProp: 'id',
    label: null,
    name: null,
    onBlur: null,
    onFocus: null,
    renderItem: null,
    required: false,
    showErrors: true,
    value: null,
    variant: DEFAULT_FIELD_VARIANT,
    visible: true
};

export default withStyles(styles)(CtrlSelectField);
