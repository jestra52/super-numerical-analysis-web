// @packages
import Badge from '@material-ui/core/Badge';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// @styles
import styles from './styles';

class CtrlIconButton extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            menuTarget: null,
            showTooltip: false
        };

        this.showMenu = this.showMenu.bind(this);
        this.showTooltip = this.showTooltip.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
    }

    showMenu(evt) {
        this.setState({
            menuTarget: evt.target,
            showTooltip: false
        });
    }

    showTooltip() {
        this.setState({ showTooltip: true });
    }

    hideMenu() {
        this.setState({ menuTarget: null });
    }

    hideTooltip() {
        this.setState({ showTooltip: false });
    }

    render() {
        const {
            badgeContent,
            className,
            classes,
            contextMenu,
            icon,
            id,
            tooltip,
            visible
        } = this.props;

        if (!visible) {
            return null;
        }

        const iconButtonClass = classNames(
            className,
            classes.autocomplete
        );

        const { menuTarget, showTooltip } = this.state;

        return ([
            <Tooltip
                id={`${id}-tooltip`}
                key="tooltip"
                open={showTooltip}
                title={tooltip}
            >
                <IconButton
                    className={iconButtonClass}
                    color="inherit"
                    id={`${id}-button`}
                    onBlur={() => {}}
                    onClick={this.showMenu}
                    onFocus={() => {}}
                    onMouseOut={this.hideTooltip}
                    onMouseOver={this.showTooltip}
                >
                    { badgeContent ? (
                        <Badge
                            badgeContent={badgeContent}
                            color="secondary"
                            id={`${id}-badge`}
                        >
                            <Icon id={`${id}-icon`}>{icon}</Icon>
                        </Badge>
                    ) :
                        <Icon id={`${id}-icon`}>{icon}</Icon>}
                </IconButton>
            </Tooltip>,
            Boolean(contextMenu) && (
                <contextMenu.component
                    key="context-menu"
                    onClose={this.hideMenu}
                    target={menuTarget}
                    {...contextMenu.props}
                />
            )
        ]);
    }
}

CtrlIconButton.propTypes = {
    badgeContent: PropTypes.number,
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    contextMenu: PropTypes.shape({
        component: PropTypes.func,
        props: PropTypes.object
    }),
    icon: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
    visible: PropTypes.bool
};

CtrlIconButton.defaultProps = {
    badgeContent: null,
    className: null,
    contextMenu: null,
    visible: true
};

export default withStyles(styles)(CtrlIconButton);
