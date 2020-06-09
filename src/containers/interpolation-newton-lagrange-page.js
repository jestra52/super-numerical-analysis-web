// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// @scripts
import InterpolationNewtonLagrangePage from '../pages/interpolation-newton-lagrange-page';
import { getInterpolationNewtonLagrangeResult } from '../actions';

const InterpolationNewtonLagrangePageContainer = ({
    interpolationNewtonLagrangeResult,
    onGetInterpolationNewtonLagrangeResult
}) => (
    <InterpolationNewtonLagrangePage
        interpolationNewtonLagrangeResult={interpolationNewtonLagrangeResult}
        onGetInterpolationNewtonLagrangeResult={onGetInterpolationNewtonLagrangeResult}
    />
);

InterpolationNewtonLagrangePageContainer.propTypes = {
    interpolationNewtonLagrangeResult: PropTypes.shape({
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
    onGetInterpolationNewtonLagrangeResult: PropTypes.func.isRequired
};

InterpolationNewtonLagrangePageContainer.defaultProps = {
    interpolationNewtonLagrangeResult: null
};

const mapStateToProps = ({ interpolation }) => ({
    interpolationNewtonLagrangeResult: interpolation.interpolationNewtonLagrangeResult
});

const mapDispatchToProps = dispatch => bindActionCreators({
    onGetInterpolationNewtonLagrangeResult: getInterpolationNewtonLagrangeResult
}, dispatch);

export default connect(
    mapStateToProps, mapDispatchToProps
)(InterpolationNewtonLagrangePageContainer);
