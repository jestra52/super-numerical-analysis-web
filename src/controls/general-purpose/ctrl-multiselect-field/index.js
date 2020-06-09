// @packages
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlMultiselectCheck from './multiselect-check';
import CtrlMultiselectCheckAll from './multiselect-check-all';
import CtrlMultiselectSearch from './multiselect-search';
import { filterArray, sortArray } from '../../../util';

// @styles
import styles from './styles';

const CtrlMultiselectField = ({
    allowSearch,
    allowSelectAll,
    className,
    classes,
    id,
    itemDesProp,
    itemValProp,
    items,
    listHeight,
    name,
    onChange,
    onChangeSearch,
    placeholder,
    required,
    searchValue,
    selectedItems,
    sortItems
}) => {
    let processedItems = items;

    if (sortItems) {
        processedItems = sortArray({
            sortKey: itemDesProp,
            sortDirection: 'asc',
            source: items
        });
    }

    if (searchValue) {
        processedItems = filterArray({
            filterKey: itemDesProp,
            filterValue: searchValue,
            source: processedItems
        });
    }

    const handleOnChange = (selectedValues) => {
        onChange({
            isValid: !required || selectedValues.length,
            name,
            value: selectedValues
        });
    };

    const handleOnSelectAll = () => {
        handleOnChange(items.map(item => item[itemValProp]));
    };

    const handleOnUnselectAll = () => {
        handleOnChange([]);
    };

    const handleOnSelectItem = (value) => {
        handleOnChange([...selectedItems, value]);
    };

    const handleOnUnselectItem = (value) => {
        handleOnChange(selectedItems.filter(selectedValue => selectedValue !== value));
    };

    const headerStyle = {};
    if (allowSelectAll && !allowSearch) {
        headerStyle.paddingTop = 0;
        headerStyle.paddingBottom = 0;
    } else if (allowSelectAll && allowSearch) {
        headerStyle.paddingBottom = 0;
    }

    const multiselectFieldClass = classNames(
        className,
        classes.multiselectField
    );

    return (
        <div id={id} className={multiselectFieldClass}>
            {(allowSelectAll || allowSearch) && (
                <div className={classes.multiselectHeaderBox} style={headerStyle}>
                    <CtrlMultiselectSearch
                        id={`${id}-search`}
                        name={name}
                        onChange={onChangeSearch}
                        placeholder={placeholder}
                        value={searchValue}
                        visible={allowSearch}
                    />
                    <CtrlMultiselectCheckAll
                        id={`${id}-selectall`}
                        isSelected={items.length === selectedItems.length}
                        onSelect={handleOnSelectAll}
                        onUnselect={handleOnUnselectAll}
                        visible={allowSelectAll}
                    />
                </div>
            )}
            <div className={classes.multiselectContentBox} style={{ height: listHeight }}>
            {
                processedItems.map((item, index) => (
                    <CtrlMultiselectCheck
                        description={item[itemDesProp]}
                        id={`${id}-select-${index}`}
                        isSelected={selectedItems.indexOf(item[itemValProp]) !== -1}
                        itemValue={item[itemValProp]}
                        key={index}
                        name={name}
                        onSelect={handleOnSelectItem}
                        onUnselect={handleOnUnselectItem}
                    />
                ))
            }
            </div>
        </div>
    );
};

CtrlMultiselectField.propTypes = {
    allowSearch: PropTypes.bool,
    allowSelectAll: PropTypes.bool,
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    itemDesProp: PropTypes.string,
    itemValProp: PropTypes.string,
    items: PropTypes.array.isRequired,
    listHeight: PropTypes.number,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onChangeSearch: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    searchValue: PropTypes.string,
    selectedItems: PropTypes.array,
    sortItems: PropTypes.bool
};

CtrlMultiselectField.defaultProps = {
    allowSearch: false,
    allowSelectAll: false,
    className: null,
    itemDesProp: 'description',
    itemValProp: 'id',
    listHeight: 190,
    name: null,
    placeholder: '',
    required: false,
    searchValue: '',
    selectedItems: [],
    sortItems: false
};

export default withStyles(styles)(CtrlMultiselectField);
