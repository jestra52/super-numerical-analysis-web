// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// @scripts
import AppSettingsPage from '../pages/app-settings-page';
import { getDefaultAppSettings, saveAppSettings } from '../actions';

const AppSettingsPageContainer = ({
    appSettings,
    onGetAppSettings,
    onSaveAppSettings
}) =>
    (
        <AppSettingsPage
            appSettings={appSettings}
            onGetAppSettings={onGetAppSettings}
            onSaveAppSettings={onSaveAppSettings}
        />
    );

AppSettingsPageContainer.propTypes = {
    appSettings: PropTypes.arrayOf(PropTypes.shape({
        allowedValues: PropTypes.arrayOf(PropTypes.string),
        decimals: PropTypes.number,
        key: PropTypes.string.isRequired,
        max: PropTypes.number,
        min: PropTypes.number,
        regex: PropTypes.string,
        required: PropTypes.bool.isRequired,
        settingId: PropTypes.number.isRequired,
        type: PropTypes.oneOf(['date', 'email', 'name', 'numeric', 'password', 'phone', 'text', 'zip']).isRequired,
        value: PropTypes.string
    })),
    onGetAppSettings: PropTypes.func.isRequired,
    onSaveAppSettings: PropTypes.func.isRequired
};

AppSettingsPageContainer.defaultProps = {
    appSettings: []
};

const mapStateToProps = ({
    commonData
}) => ({
    appSettings: commonData.appSettingList
});

const mapDispatchToProps = dispatch => bindActionCreators({
    onGetAppSettings: getDefaultAppSettings,
    onSaveAppSettings: saveAppSettings
}, dispatch);

export default connect(
    mapStateToProps, mapDispatchToProps
)(AppSettingsPageContainer);
