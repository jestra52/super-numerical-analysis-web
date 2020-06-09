// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// @scripts
import MultipleRootsPage from '../pages/multiple-roots-page';
import { getMultipleRootsResult } from '../actions';

const MultipleRootsPageContainer = ({
    appSettings,
    onGetMultipleRootsResult,
    multipleRootsResult
}) =>
    (
        <MultipleRootsPage
            appSettings={appSettings}
            multipleRootsResult={multipleRootsResult}
            onGetMultipleRootsResult={onGetMultipleRootsResult}
        />
    );

MultipleRootsPageContainer.propTypes = {
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
    multipleRootsResult: PropTypes.shape({
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
    onGetMultipleRootsResult: PropTypes.func.isRequired
};

MultipleRootsPageContainer.defaultProps = {
    appSettings: [],
    multipleRootsResult: null
};

const mapStateToProps = ({
    openMethods,
    commonData
}) => ({
    appSettings: commonData.appSettingList,
    multipleRootsResult: openMethods.multipleRootsResult
});

const mapDispatchToProps = dispatch => bindActionCreators({
    onGetMultipleRootsResult: getMultipleRootsResult
}, dispatch);

export default connect(
    mapStateToProps, mapDispatchToProps
)(MultipleRootsPageContainer);
