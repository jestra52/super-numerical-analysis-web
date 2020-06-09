// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

// @styles
import styles from './styles';

const NotFoundPage = ({ classes, content }) =>
    (
        <div id="notfound-page" className={classes.notFoundPage}>
            {content}
        </div>
    );

NotFoundPage.propTypes = {
    classes: PropTypes.object.isRequired,
    content: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired
};

export default withStyles(styles)(NotFoundPage);
