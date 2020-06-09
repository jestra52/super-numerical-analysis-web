// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlCheckField from '.';

// @styles
import styles from './styles';

const CtrlMultiselectCheck = ({
    color,
    description,
    id,
    isSelected,
    itemValue,
    name,
    onSelect,
    onUnselect
}) => {
    const onChange = ({ value }) => {
        if (value) {
            onSelect(itemValue);
        } else {
            onUnselect(itemValue);
        }
    };

    return (
        <div id={id}>
            <CtrlCheckField
                color={color}
                id={`${id}-check`}
                name={name}
                label={description}
                onChange={onChange}
                value={isSelected}
            />
        </div>
    );
};

CtrlMultiselectCheck.propTypes = {
    color: PropTypes.oneOf(['default', 'primary', 'secondary']),
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    itemValue: PropTypes.string.isRequired,
    name: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    onUnselect: PropTypes.func.isRequired
};

CtrlMultiselectCheck.defaultProps = {
    color: 'primary',
    name: null
};

export default withStyles(styles)(CtrlMultiselectCheck);
