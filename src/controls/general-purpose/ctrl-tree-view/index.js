// @packages
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlTreeViewItem from './tree-view-item';

// @styles
import styles from './styles';
import { config } from '../../../config';

const CtrlTreeView = ({
    actions,
    allowContextualOptions,
    className,
    classes,
    collapseIcon,
    collapseLabel,
    expandIcon,
    expandLabel,
    expandedItems,
    id,
    itemValProp,
    items,
    noChildrenIcon,
    onCollapseItem,
    onExpandItem,
    renderItem,
    visible
}) => {
    if (!visible) {
        return null;
    }

    const treeViewClass = classNames(
        className,
        classes.treeView
    );

    const renderItems = (items, level = 1) => (
        <List className={treeViewClass} id={id}>
            {items.map((item, index) => (
                <CtrlTreeViewItem
                    actions={actions}
                    allowContextualOptions={allowContextualOptions}
                    collapseIcon={collapseIcon}
                    collapseLabel={collapseLabel}
                    expandIcon={expandIcon}
                    expandLabel={expandLabel}
                    isExpanded={expandedItems.includes(item[itemValProp])}
                    item={item}
                    itemValProp={itemValProp}
                    key={index}
                    level={level}
                    noChildrenIcon={noChildrenIcon}
                    onCollapseItem={onCollapseItem}
                    onExpandItem={onExpandItem}
                    renderItem={renderItem}
                >
                    {Array.isArray(item.children) && item.children.length > 0 && renderItems(item.children, level + 1)}
                </CtrlTreeViewItem>
            ))}
        </List>
    );

    return items.length ? renderItems(items) : config.text.table.noData;
};

CtrlTreeView.propTypes = {
    actions: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        tooltip: PropTypes.string
    })),
    allowContextualOptions: PropTypes.bool,
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    collapseAll: PropTypes.bool,
    collapseIcon: PropTypes.string,
    collapseLabel: PropTypes.string,
    expandIcon: PropTypes.string,
    expandLabel: PropTypes.string,
    expandedItems: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    itemValProp: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        children: PropTypes.array
    })).isRequired,
    noChildrenIcon: PropTypes.string,
    onCollapseItem: PropTypes.func.isRequired,
    onExpandItem: PropTypes.func.isRequired,
    renderItem: PropTypes.func.isRequired,
    visible: PropTypes.bool
};

CtrlTreeView.defaultProps = {
    actions: [],
    allowContextualOptions: false,
    className: null,
    collapseIcon: 'keyboard_arrow_down',
    collapseLabel: null,
    expandAll: false,
    expandIcon: 'keyboard_arrow_right',
    expandLabel: null,
    noChildrenIcon: 'remove',
    visible: true
};

export default withStyles(styles)(CtrlTreeView);
