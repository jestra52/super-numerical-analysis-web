// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// @scripts
import NewtonPage from '../pages/newton-page';
import { getNewtonResult } from '../actions';

const NewtonPageContainer = ({
    appSettings,
    onGetNewtonResult,
    newtonResult
}) =>
    (
        <NewtonPage
            appSettings={appSettings}
            newtonResult={newtonResult}
            onGetNewtonResult={onGetNewtonResult}
        />
    );

NewtonPageContainer.propTypes = {
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
    newtonResult: PropTypes.shape({
        aproxValue: PropTypes.object,
        isExact: PropTypes.bool,
        n: PropTypes.number,
        result: PropTypes.shape({
            dfxn: PropTypes.arrayOf(PropTypes.number),
            error: PropTypes.arrayOf(PropTypes.number),
            fxn: PropTypes.arrayOf(PropTypes.number),
            xn: PropTypes.arrayOf(PropTypes.number)
        }),
        resultMessage: PropTypes.string,
        root: PropTypes.number,
        solutionFailed: PropTypes.bool
    }),
    onGetNewtonResult: PropTypes.func.isRequired
};

NewtonPageContainer.defaultProps = {
    appSettings: [],
    newtonResult: null
};

const mapStateToProps = ({
    openMethods,
    commonData
}) => ({
    appSettings: commonData.appSettingList,
    newtonResult: openMethods.newtonResult
});

const mapDispatchToProps = dispatch => bindActionCreators({
    onGetNewtonResult: getNewtonResult
}, dispatch);

export default connect(
    mapStateToProps, mapDispatchToProps
)(NewtonPageContainer);
