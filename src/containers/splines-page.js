// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// @scripts
import SplinesPage from '../pages/splines-page';
import { getSplinesResult } from '../actions';

const SplinesPageContainer = ({
    splinesResult,
    onGetSplinesResult
}) => (
    <SplinesPage
        splinesResult={splinesResult}
        onGetSplinesResult={onGetSplinesResult}
    />
);

SplinesPageContainer.propTypes = {
    splinesResult: PropTypes.shape({
        result: PropTypes.shape({
            aMatrix: PropTypes.array,
            bMatrix: PropTypes.array,
            xMatrix: PropTypes.array
        }),
        resultMessage: PropTypes.string,
        solutionFailed: PropTypes.bool
    }),
    onGetSplinesResult: PropTypes.func.isRequired
};

SplinesPageContainer.defaultProps = {
    splinesResult: null
};

const mapStateToProps = ({ interpolation }) => ({
    splinesResult: interpolation.splinesResult
});

const mapDispatchToProps = dispatch => bindActionCreators({
    onGetSplinesResult: getSplinesResult
}, dispatch);

export default connect(
    mapStateToProps, mapDispatchToProps
)(SplinesPageContainer);
