// @packages
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// @styles
import styles from './styles';

const CtrlLoadingPage = ({
    className,
    classes,
    id,
    msg,
    visible
}) => {
    if (!visible) {
        return null;
    }

    const loadingPageClass = classNames(
        className,
        classes.loadingPage
    );

    return (
        <div id={id} className={loadingPageClass}>
            <div className={classes.background} />
            <div className={classes.centerPanel}>
                <CircularProgress
                    color="secondary"
                    id={`${id}-progress-icon`}
                    size={50}
                />
                <div id={`${id}-msg`} className={classes.msg}>
                    {msg}
                </div>
            </div>
        </div>
    );
};

CtrlLoadingPage.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    msg: PropTypes.string,
    visible: PropTypes.bool.isRequired
};

CtrlLoadingPage.defaultProps = {
    className: null,
    msg: null
};

export default withStyles(styles)(CtrlLoadingPage);
