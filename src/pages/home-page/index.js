// @packages
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

// @styles
import logo from '../../styles/home.jpeg';
import styles from './styles';


const HomePage = ({ classes }) =>
    (
        <Grid className={classes.homePage} container>
            <Grid item xs={12}>
                <img src={logo} height="100%" width="100%" />
            </Grid>
        </Grid>
    );

HomePage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomePage);
