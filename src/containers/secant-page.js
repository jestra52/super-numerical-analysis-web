// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// @scripts
import SecantPage from '../pages/secant-page';
import { getSecantResult } from '../actions';

const SecantPageContainer = ({
    appSettings,
    secantResult,
    onGetSecantResult
}) =>
    (
        <SecantPage
            appSettings={appSettings}
            secantResult={secantResult}
            onGetSecantResult={onGetSecantResult}
        />
    );

SecantPageContainer.propTypes = {
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
    secantResult: PropTypes.shape({
        aproxValue: PropTypes.object,
        isExact: PropTypes.bool,
        n: PropTypes.number,
        result: PropTypes.shape({
            x: PropTypes.arrayOf(PropTypes.number),
            fx: PropTypes.arrayOf(PropTypes.number),
            den: PropTypes.arrayOf(PropTypes.number),
            error: PropTypes.arrayOf(PropTypes.number)
        }),
        resultMessage: PropTypes.string,
        root: PropTypes.number,
        solutionFailed: PropTypes.bool
    }),
    onGetSecantResult: PropTypes.func.isRequired
};

SecantPageContainer.defaultProps = {
    appSettings: [],
    secantResult: null
};

const mapStateToProps = ({
    openMethods,
    commonData
}) => ({
    appSettings: commonData.appSettingList,
    secantResult: openMethods.secantResult
});

const mapDispatchToProps = dispatch => bindActionCreators({
    onGetSecantResult: getSecantResult
}, dispatch);

export default connect(
    mapStateToProps, mapDispatchToProps
)(SecantPageContainer);
