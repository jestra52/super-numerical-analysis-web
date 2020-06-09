// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import NotFoundPageContainer from '../../containers/not-found-page';
import { config } from '../../config';
import { mapComponent } from './component-mapper';
import { dimensions } from '../../styles/globals';

// @styles
import styles from './styles';

const CtrlRoutes = ({
    classes,
    mainMenuIsExpanded
}) => {
    const containerMarginLeft = mainMenuIsExpanded
        ? dimensions.MAIN_MENU_WIDTH + 15
        : dimensions.MAIN_MENU_COLLAPSED_WIDTH + 15;
    const { routes } = config;

    return (
        <div className={classes.routes} style={{ marginLeft: containerMarginLeft }}>
            <Switch>
                {
                    routes.map((route, index) => (
                        <Route
                            component={mapComponent(route.component)}
                            exact
                            key={index}
                            path={route.url}
                        />
                    ))
                }
                <Route component={NotFoundPageContainer} />
            </Switch>
        </div>
    );
};

CtrlRoutes.propTypes = {
    classes: PropTypes.object.isRequired,
    mainMenuIsExpanded: PropTypes.bool.isRequired
};

export default withStyles(styles)(CtrlRoutes);
