// @packages
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import { config } from '../../../config';

// @scripts
import styles from './styles';

const CtrlFooter = ({
    className,
    classes,
    id,
    visible
}) => {
    if (!visible) {
        return null;
    }

    const footerClass = classNames(
        className,
        classes.footer
    );

    return (
        <Paper
            className={footerClass}
            elevation={1}
            id={id}
        >
            <span>
                <a
                    className={classes.gblLink}
                    href="https://github.com/jestra52"
                    id={`${id}-about-link`}
                    target="blank"
                >
                    <span>{config.text.footer.copyright}</span>
                </a>
            </span>
        </Paper>
    );
};

CtrlFooter.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    visible: PropTypes.bool
};

CtrlFooter.defaultProps = {
    className: null,
    visible: true
};

export default withStyles(styles)(CtrlFooter);
