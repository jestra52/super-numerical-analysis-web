// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// @scripts
import FactorizationLUPage from '../pages/factorization-LU-page';
import { getFactorizationLUResult } from '../actions';

const FactorizationLUPageContainer = ({
    appSettings,
    factorizationLUResult,
    onGetFactorizationLUResult
}) => (
    <FactorizationLUPage
        appSettings={appSettings}
        factorizationLUResult={factorizationLUResult}
        onGetFactorizationLUResult={onGetFactorizationLUResult}
    />
);

FactorizationLUPageContainer.propTypes = {
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
    factorizationLUResult: PropTypes.shape({
        hasInfiniteSolutions: PropTypes.bool,
        result: PropTypes.shape({
            aMatrix: PropTypes.array,
            bMatrix: PropTypes.array,
            lMatrix: PropTypes.array,
            uMatrix: PropTypes.array,
            iterations: PropTypes.array,
            xMatrix: PropTypes.array
        }),
        resultMessage: PropTypes.string,
        solutionFailed: PropTypes.bool
    }),
    onGetFactorizationLUResult: PropTypes.func.isRequired
};

FactorizationLUPageContainer.defaultProps = {
    appSettings: [],
    factorizationLUResult: null
};

const mapStateToProps = ({ commonData, sysOfLinEquations }) => ({
    appSettings: commonData.appSettingList,
    factorizationLUResult: sysOfLinEquations.factorizationLUResult
});

const mapDispatchToProps = dispatch => bindActionCreators({
    onGetFactorizationLUResult: getFactorizationLUResult
}, dispatch);

export default connect(
    mapStateToProps, mapDispatchToProps
)(FactorizationLUPageContainer);
