// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// @scripts
import GaussEliminationPage from '../pages/gauss-elimination-page';
import { getGaussEliminationResult } from '../actions';

const GaussEliminationPageContainer = ({
    appSettings,
    gaussEliminationResult,
    onGetGaussEliminationResult
}) => (
    <GaussEliminationPage
        appSettings={appSettings}
        gaussEliminationResult={gaussEliminationResult}
        onGetGaussEliminationResult={onGetGaussEliminationResult}
    />
);

GaussEliminationPageContainer.propTypes = {
    appSettings: PropTypes.arrayOf(PropTypes.shape({
        aMatrix: PropTypes.array,
        allowedValues: PropTypes.arrayOf(PropTypes.string),
        bMatrix: PropTypes.array,
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
    gaussEliminationResult: PropTypes.shape({
        hasInfiniteSolutions: PropTypes.bool,
        result: PropTypes.shape({
            aMatrix: PropTypes.array,
            bMatrix: PropTypes.array,
            iterations: PropTypes.array,
            sortingIterations: PropTypes.array,
            xMatrix: PropTypes.array
        }),
        resultMessage: PropTypes.string,
        solutionFailed: PropTypes.bool
    }),
    onGetGaussEliminationResult: PropTypes.func.isRequired
};

GaussEliminationPageContainer.defaultProps = {
    appSettings: [],
    gaussEliminationResult: null
};

const mapStateToProps = ({ commonData, sysOfLinEquations }) => ({
    appSettings: commonData.appSettingList,
    gaussEliminationResult: sysOfLinEquations.gaussEliminationResult
});

const mapDispatchToProps = dispatch => bindActionCreators({
    onGetGaussEliminationResult: getGaussEliminationResult
}, dispatch);

export default connect(
    mapStateToProps, mapDispatchToProps
)(GaussEliminationPageContainer);
