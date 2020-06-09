// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// @scripts
import IntegrationPage from '../pages/integration-page';
import { getIntegrationResult } from '../actions';

const IntegrationPageContainer = ({
    appSettings,
    integrationResult,
    onGetIntegrationResult
}) =>
    (
        <IntegrationPage
            appSettings={appSettings}
            integrationResult={integrationResult}
            onGetIntegrationResult={onGetIntegrationResult}
        />
    );

IntegrationPageContainer.propTypes = {
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
    integrationResult: PropTypes.shape({
        result: PropTypes.object,
        resultMessage: PropTypes.string,
        solutionFailed: PropTypes.bool
    }),
    onGetIntegrationResult: PropTypes.func.isRequired
};

IntegrationPageContainer.defaultProps = {
    appSettings: [],
    integrationResult: null
};

const mapStateToProps = ({ commonData, integration }) => ({
    appSettings: commonData.appSettingList,
    integrationResult: integration.integrationResult
});

const mapDispatchToProps = dispatch => bindActionCreators({
    onGetIntegrationResult: getIntegrationResult
}, dispatch);

export default connect(
    mapStateToProps, mapDispatchToProps
)(IntegrationPageContainer);
