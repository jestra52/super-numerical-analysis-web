// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlCheckField from '.';
import { config } from '../../../config';

// @styles
import styles from './styles';

const CtrlMultiselectCheckAll = ({
    id,
    onSelect,
    onUnselect,
    isSelected,
    visible
}) => {
    if (!visible) {
        return null;
    }

    const onChange = ({ value }) => {
        if (value) {
            onSelect();
        } else {
            onUnselect();
        }
    };

    return (
        <CtrlCheckField
            id={`${id}-check-all`}
            label={config.text.multiselect.selectAll}
            onChange={onChange}
            value={isSelected}
        />
    );
};

CtrlMultiselectCheckAll.propTypes = {
    id: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
    onUnselect: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    visible: PropTypes.bool
};

CtrlMultiselectCheckAll.defaultProps = {
    visible: true
};

export default withStyles(styles)(CtrlMultiselectCheckAll);
