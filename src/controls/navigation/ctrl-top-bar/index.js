// @packages
import AppBar from '@material-ui/core/AppBar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import { config } from '../../../config';

// @styles
import styles from './styles';

const CtrlTopBar = ({
    appName,
    className,
    classes,
    id,
    mainMenuIsExpanded,
    mainMenuOnCollapse,
    mainMenuOnExpand,
    pageTitle,
    visible
}) => {
    if (!visible) {
        return null;
    }

    const topBarClass = classNames(
        className,
        classes.topBar
    );

    const handleMenuExpanderOnClick = () => mainMenuIsExpanded ? mainMenuOnCollapse() : mainMenuOnExpand();
    const menuExpanderTooltip = mainMenuIsExpanded ? config.text.topBar.collapse : config.text.topBar.expand;

    return (
        <AppBar
            className={topBarClass}
            classes={{ root: classes.topBarRoot }}
            id={id}
            position="fixed"
        >
            <Toolbar>
                <div className={classes.topBarIcon}>
                    <Tooltip
                        id={`${id}-menuexpander-tooltip`}
                        title={menuExpanderTooltip}
                    >
                        <IconButton
                            id={`${id}-menuexpander-tooltip`}
                            onClick={handleMenuExpanderOnClick}
                            style={{ color: 'white' }}
                        >
                            <Icon>reorder</Icon>
                        </IconButton>
                    </Tooltip>
                </div>
                <div className={classes.topBarTitle}>
                    <Typography
                        className={classes.appName}
                        color="inherit"
                        variant="h6"
                    >
                        {appName}
                    </Typography>
                    {
                        pageTitle && (
                            <Typography
                                className={classes.pageTitle}
                                color="inherit"
                                variant="h6"
                            >
                                {`> ${pageTitle}`}
                            </Typography>
                        )
                    }
                </div>
            </Toolbar>
        </AppBar>
    );
};

CtrlTopBar.propTypes = {
    appName: PropTypes.string.isRequired,
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    mainMenuIsExpanded: PropTypes.bool.isRequired,
    mainMenuOnCollapse: PropTypes.func.isRequired,
    mainMenuOnExpand: PropTypes.func.isRequired,
    pageTitle: PropTypes.string.isRequired,
    visible: PropTypes.bool
};

CtrlTopBar.defaultProps = {
    className: null,
    visible: true
};

export default withStyles(styles)(CtrlTopBar);
