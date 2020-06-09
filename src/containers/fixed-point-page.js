// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// @scripts
import FixedPointPage from '../pages/fixed-point-page';
import { getFixedPointResult } from '../actions';

const FixedPointPageContainer = ({
    appSettings,
    fixedPointResult,
    onGetFixedPointResult
}) =>
    (
        <FixedPointPage
            appSettings={appSettings}
            fixedPointResult={fixedPointResult}
            onGetFixedPointResult={onGetFixedPointResult}
        />
    );

FixedPointPageContainer.propTypes = {
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
    fixedPointResult: PropTypes.shape({
        aproxValue: PropTypes.object,
        isExact: PropTypes.bool,
        n: PropTypes.number,
        result: PropTypes.shape({
            error: PropTypes.arrayOf(PropTypes.number),
            fxn: PropTypes.arrayOf(PropTypes.number),
            xn: PropTypes.arrayOf(PropTypes.number)
        }),
        resultMessage: PropTypes.string,
        root: PropTypes.number,
        solutionFailed: PropTypes.bool
    }),
    onGetFixedPointResult: PropTypes.func.isRequired
};

FixedPointPageContainer.defaultProps = {
    appSettings: [],
    fixedPointResult: null
};

const mapStateToProps = ({
    openMethods,
    commonData
}) => ({
    appSettings: commonData.appSettingList,
    fixedPointResult: openMethods.fixedPointResult
});

const mapDispatchToProps = dispatch => bindActionCreators({
    onGetFixedPointResult: getFixedPointResult
}, dispatch);

export default connect(
    mapStateToProps, mapDispatchToProps
)(FixedPointPageContainer);
