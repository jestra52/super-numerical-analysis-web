// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// @scripts
import IterMethodsPage from '../pages/iter-methods-page';
import { getBestLambdaResult, getIterativeMethodsResult } from '../actions';

const IterMethodsPageContainer = ({
    appSettings,
    iterativeMethodsResult,
    onGetBestLambdaResult,
    onGetIterativeMethodsResult
}) => (
    <IterMethodsPage
        appSettings={appSettings}
        iterativeMethodsResult={iterativeMethodsResult}
        onGetBestLambdaResult={onGetBestLambdaResult}
        onGetIterativeMethodsResult={onGetIterativeMethodsResult}
    />
);

IterMethodsPageContainer.propTypes = {
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
    iterativeMethodsResult: PropTypes.shape({
        result: PropTypes.shape({
            error: PropTypes.arrayOf(PropTypes.number),
            n: PropTypes.number,
            x: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
        }),
        resultMessage: PropTypes.string,
        solutionFailed: PropTypes.bool
    }),
    onGetBestLambdaResult: PropTypes.func.isRequired,
    onGetIterativeMethodsResult: PropTypes.func.isRequired
};

IterMethodsPageContainer.defaultProps = {
    appSettings: [],
    iterativeMethodsResult: null
};

const mapStateToProps = ({ commonData, sysOfLinEquations }) => ({
    appSettings: commonData.appSettingList,
    iterativeMethodsResult: sysOfLinEquations.iterMethodsResult
});

const mapDispatchToProps = dispatch => bindActionCreators({
    onGetBestLambdaResult: getBestLambdaResult,
    onGetIterativeMethodsResult: getIterativeMethodsResult
}, dispatch);

export default connect(
    mapStateToProps, mapDispatchToProps
)(IterMethodsPageContainer);
