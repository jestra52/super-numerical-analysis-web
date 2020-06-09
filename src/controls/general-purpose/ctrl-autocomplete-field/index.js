// @packages
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlIcon from './icon';
import CtrlSuggestions from './suggestions';
import { config } from '../../../config';
import { focus } from '../../../util';

// @styles
import styles from './styles';
import { DEFAULT_FIELD_VARIANT } from '../../../styles/globals';

// @constants
const EMPTY_ERROR = ' ';
const AUTOFOCUS_DELAY_IN_MILLIS = 2000;

class CtrlAutocompleteField extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            highlightedIndex: 0,
            inputHasFocus: false
        };

        this.setFocusOnInput = this.setFocusOnInput.bind(this);
        this.handleInputOnBlur = this.handleInputOnBlur.bind(this);
        this.handleInputOnChange = this.handleInputOnChange.bind(this);
        this.handleInputOnFocus = this.handleInputOnFocus.bind(this);
        this.handleInputOnKeyUp = this.handleInputOnKeyUp.bind(this);
        this.handleSuggestionOnChange = this.handleSuggestionOnChange.bind(this);
    }

    componentDidMount() {
        const { autoFocus } = this.props;

        if (autoFocus) {
            this.setFocusOnInput(AUTOFOCUS_DELAY_IN_MILLIS);
        }
    }

    componentWillUnmount() {
        this.isUnmounted = true;
    }

    get inputId() {
        return `${this.props.id}-input`;
    }

    get inputProps() {
        const {
            classes,
            disabled,
            id,
            isSearching,
            value
        } = this.props;

        return {
            classes: {
                disabled: disabled ? classes.inputReadonly : classes.inputDisabled
            },
            endAdornment: (
                <CtrlIcon
                    disabled={disabled}
                    id={`${id}-icon`}
                    isSearching={isSearching}
                    onUnselectSuggestion={() => {
                        this.handleSuggestionOnChange(null);
                    }}
                    selectedSuggestion={value}
                    setFocusOnInput={this.setFocusOnInput}
                />
            )
        };
    }

    get suggestionsIsOpen() {
        const { inputHasFocus } = this.state;

        const {
            minQueryLength,
            query,
            suggestions,
            value
        } = this.props;

        return (
            inputHasFocus &&
            query.length >= minQueryLength &&
            Boolean(suggestions) &&
            Boolean(suggestions.length) &&
            !value
        );
    }

    getErrorMsg(value, query) {
        const { required } = this.props;

        if (required && query && !value) {
            return config.text.validations.search;
        }
        if (required && !value) {
            return config.text.validations.required;
        }

        return EMPTY_ERROR;
    }

    setFocusOnInput(delayInMillis = 0) {
        focus(this.inputId, delayInMillis);
    }

    handleInputOnChange(event) {
        this.setState({ highlightedIndex: 0 });
        this.props.onSearch(event.target.value);
    }

    handleInputOnFocus() {
        const { onFocus } = this.props;
        if (onFocus) {
            onFocus();
        }

        this.setState({ inputHasFocus: true });
    }

    handleInputOnBlur() {
        const { onBlur } = this.props;
        if (onBlur) {
            onBlur();
        }

        const thisRef = this;
        setTimeout(() => {
            if (!thisRef.isUnmounted) {
                thisRef.setState({ inputHasFocus: false });
            }
        }, 500);
    }

    handleInputOnKeyUp(evt) {
        if (!this.suggestionsIsOpen) {
            return;
        }

        const { itemDesProp, itemValProp, suggestions } = this.props;

        if (evt.key === 'ArrowDown') {
            this.setState(({ highlightedIndex }) => ({
                highlightedIndex: Math.min(
                    highlightedIndex + 1, suggestions.length - 1
                )
            }));
        } else if (evt.key === 'ArrowUp') {
            this.setState(({ highlightedIndex }) => ({
                highlightedIndex: Math.max(
                    highlightedIndex - 1, 0
                )
            }));
        } else if (evt.key === 'Enter') {
            const { highlightedIndex } = this.state;
            const suggestion = suggestions[highlightedIndex];
            const value = suggestion[itemValProp];
            const description = suggestion[itemDesProp];
            this.handleSuggestionOnChange(value, description, suggestion);
        }
    }

    handleSuggestionOnChange(value, description = '', item = null) {
        const { id, name, onChange } = this.props;

        onChange({
            description,
            isValid: this.getErrorMsg(value, description) === EMPTY_ERROR,
            item,
            name: name || id,
            value
        });
    }

    render() {
        const {
            autoFocus,
            className,
            classes,
            disabled,
            id,
            itemDesProp,
            itemValProp,
            label,
            placeholder,
            query,
            renderSuggestion,
            showErrors,
            suggestions,
            value,
            variant,
            visible
        } = this.props;

        if (!visible) {
            return null;
        }

        const autocompleteFieldClass = classNames(
            className,
            classes.autocompleteField
        );

        const errorMsg = this.getErrorMsg(value, query);
        const hasError = showErrors && errorMsg !== EMPTY_ERROR;
        const helperText = hasError ? errorMsg : EMPTY_ERROR;

        return (
            <div id={id} className={autocompleteFieldClass}>
                <TextField
                    InputProps={this.inputProps}
                    autoComplete="off"
                    autoFocus={autoFocus}
                    disabled={Boolean(value) || disabled}
                    error={hasError}
                    fullWidth
                    helperText={helperText}
                    id={this.inputId}
                    label={label}
                    onBlur={this.handleInputOnBlur}
                    onChange={this.handleInputOnChange}
                    onFocus={this.handleInputOnFocus}
                    onKeyUp={this.handleInputOnKeyUp}
                    placeholder={placeholder}
                    value={query}
                    variant={variant}
                />
                <CtrlSuggestions
                    highlightedIndex={this.state.highlightedIndex}
                    id={`${id}-suggestions`}
                    onSelectSuggestion={(suggestion) => {
                        const value = suggestion[itemValProp];
                        const description = suggestion[itemDesProp];
                        this.handleSuggestionOnChange(value, description, suggestion);
                    }}
                    renderSuggestion={
                        renderSuggestion ||
                        (suggestion => <div>{suggestion[itemDesProp]}</div>)
                    }
                    suggestions={suggestions}
                    visible={this.suggestionsIsOpen}
                />
            </div>
        );
    }
}

CtrlAutocompleteField.propTypes = {
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
    isSearching: PropTypes.bool,
    itemDesProp: PropTypes.string,
    itemValProp: PropTypes.string,
    label: PropTypes.string,
    minQueryLength: PropTypes.number,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    onSearch: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    query: PropTypes.string.isRequired,
    renderSuggestion: PropTypes.func,
    required: PropTypes.bool,
    showErrors: PropTypes.bool,
    suggestions: PropTypes.array,
    value: PropTypes.any,
    variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
    visible: PropTypes.bool
};

CtrlAutocompleteField.defaultProps = {
    autoFocus: false,
    className: null,
    disabled: false,
    isSearching: false,
    itemDesProp: 'description',
    itemValProp: 'id',
    label: null,
    minQueryLength: 1,
    name: null,
    onBlur: null,
    onFocus: null,
    placeholder: '',
    renderSuggestion: null,
    required: false,
    showErrors: true,
    suggestions: [],
    value: null,
    variant: DEFAULT_FIELD_VARIANT,
    visible: true
};

export default withStyles(styles)(CtrlAutocompleteField);
