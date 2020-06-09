// @packages
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// @styles
import styles from './styles';

// @constants
const INDENT_SPACING = 30;

class CtrlTreeViewItem extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isContextualOptionsVisible: false
        };

        this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
        this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);
        this.toogleIsExpanded = this.toogleIsExpanded.bind(this);
    }

    handleOnMouseEnter() {
        if (!this.props.allowContextualOptions) {
            this.setState({ isContextualOptionsVisible: true });
        }
    }

    handleOnMouseLeave() {
        this.setState({ isContextualOptionsVisible: false });
    }

    toogleIsExpanded() {
        const {
            isExpanded,
            item,
            itemValProp,
            onCollapseItem,
            onExpandItem
        } = this.props;

        if (isExpanded) {
            onCollapseItem(item[itemValProp]);
        } else {
            onExpandItem(item[itemValProp]);
        }
    }

    render() {
        const {
            actions,
            children,
            className,
            classes,
            collapseIcon,
            collapseLabel,
            expandIcon,
            expandLabel,
            isExpanded,
            item,
            level,
            noChildrenIcon,
            renderItem,
            visible
        } = this.props;

        if (!visible) {
            return null;
        }

        const treeViewItemClass = classNames(
            className,
            classes.treeViewItem,
            level === 1 ? classes.treeViewItem : classes.treeViewItemStriped
        );

        const showTooltip = collapseLabel && expandLabel;

        const renderCollapserIconWithoutTooltip = () => (
            <IconButton
                className={classes.button}
                color="inherit"
                id={`${item.id}-button-collapser`}
                onClick={this.toogleIsExpanded}
            >
                <Icon id={`${item.id}-icon-collapse`}>
                    {isExpanded ? collapseIcon : expandIcon}
                </Icon>
            </IconButton>
        );

        const renderCollapserIconWithTooltip = () => (
            <Tooltip title={isExpanded ? collapseLabel : expandLabel}>
                {renderCollapserIconWithoutTooltip()}
            </Tooltip>
        );

        const renderCollapserIcon = () => {
            if (Array.isArray(item.children) && item.children.length) {
                return showTooltip
                    ? renderCollapserIconWithTooltip()
                    : renderCollapserIconWithoutTooltip();
            }

            return (
                <IconButton
                    className={classes.button}
                    color="inherit"
                    disabled
                    id={`${item.id}-button-expand`}
                >
                    <Icon id={`${item.id}-icon-expand`}>{noChildrenIcon}</Icon>
                </IconButton>
            );
        };

        return (
            <div>
                <ListItem
                    className={treeViewItemClass}
                    id={item.id}
                    onMouseEnter={this.handleOnMouseEnter}
                    onMouseLeave={this.handleOnMouseLeave}
                    style={{ paddingLeft: INDENT_SPACING * (level - 1) }}
                >
                    <ListItemIcon>
                        {renderCollapserIcon()}
                    </ListItemIcon>
                    <Grid item onClick={this.toogleIsExpanded} xs={6}>
                        {renderItem(item, level)}
                    </Grid>
                    <Grid className={classes.actions} item xs={6}>
                        {this.state.isContextualOptionsVisible ? (
                            <div className={classes.actions}>
                                {actions.length ? actions.map((action, index) => (
                                    <Tooltip
                                        aria-label={action.tooltip}
                                        key={index}
                                        title={action.tooltip}
                                    >
                                        <ListItemIcon>
                                            <IconButton
                                                className={classes.button}
                                                color="primary"
                                                id={`${item.id}-button-add`}
                                                onClick={() => action.onClick(item)}
                                            >
                                                <Icon id={`${item.id}-icon-add`}>{action.icon}</Icon>
                                            </IconButton>
                                        </ListItemIcon>
                                    </Tooltip>
                                )) : null}
                            </div>
                        ) : null}
                    </Grid>
                </ListItem>
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    {children}
                </Collapse>
            </div>
        );
    }
}

CtrlTreeViewItem.propTypes = {
    actions: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        tooltip: PropTypes.string
    })),
    allowContextualOptions: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    collapseIcon: PropTypes.string,
    collapseLabel: PropTypes.string,
    expandIcon: PropTypes.string,
    expandLabel: PropTypes.string,
    isExpanded: PropTypes.bool.isRequired,
    item: PropTypes.shape({
        id: PropTypes.string,
        children: PropTypes.array
    }).isRequired,
    itemValProp: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    noChildrenIcon: PropTypes.string,
    onCollapseItem: PropTypes.func.isRequired,
    onExpandItem: PropTypes.func.isRequired,
    renderItem: PropTypes.func.isRequired,
    visible: PropTypes.bool
};

CtrlTreeViewItem.defaultProps = {
    actions: [],
    allowContextualOptions: false,
    children: null,
    className: null,
    collapseIcon: 'keyboard_arrow_down',
    collapseLabel: null,
    expandIcon: 'keyboard_arrow_right',
    expandLabel: null,
    noChildrenIcon: 'remove',
    visible: true
};

export default withStyles(styles)(CtrlTreeViewItem);
