// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// @scripts
import IncrSearchPage from '../pages/incr-search-page';
import { getIncrSearchResult } from '../actions';

const IncrSearchPageContainer = ({
    appSettings,
    incrSearchResult,
    onGetIncrSearchResult
}) =>
    (
        <IncrSearchPage
            appSettings={appSettings}
            incrSearchResult={incrSearchResult}
            onGetIncrSearchResult={onGetIncrSearchResult}
        />
    );

IncrSearchPageContainer.propTypes = {
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
    incrSearchResult: PropTypes.shape({
        aproxValue: PropTypes.object,
        isExact: PropTypes.bool,
        n: PropTypes.number,
        result: PropTypes.shape({
            x: PropTypes.arrayOf(PropTypes.number),
            fx: PropTypes.arrayOf(PropTypes.number)
        }),
        resultMessage: PropTypes.string,
        root: PropTypes.number,
        solutionFailed: PropTypes.bool
    }),
    onGetIncrSearchResult: PropTypes.func.isRequired
};

IncrSearchPageContainer.defaultProps = {
    appSettings: [],
    incrSearchResult: null
};

const mapStateToProps = ({
    closedMethods,
    commonData
}) => ({
    appSettings: commonData.appSettingList,
    incrSearchResult: closedMethods.incrSearchResult
});

const mapDispatchToProps = dispatch => bindActionCreators({
    onGetIncrSearchResult: getIncrSearchResult
}, dispatch);

export default connect(
    mapStateToProps, mapDispatchToProps
)(IncrSearchPageContainer);
