// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// @scripts
import BisecFalseRulePage from '../pages/bisec-false-rule-page';
import { getBisecFalseRuleResult } from '../actions';

const BisecFalseRulePageContainer = ({
    appSettings,
    bisecFalseRuleResult,
    onGetBisecFalseRuleResult
}) =>
    (
        <BisecFalseRulePage
            appSettings={appSettings}
            bisecFalseRuleResult={bisecFalseRuleResult}
            onGetBisecFalseRuleResult={onGetBisecFalseRuleResult}
        />
    );

BisecFalseRulePageContainer.propTypes = {
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
    bisecFalseRuleResult: PropTypes.shape({
        aproxValue: PropTypes.object,
        isExact: PropTypes.bool,
        n: PropTypes.number,
        result: PropTypes.shape({
            error: PropTypes.arrayOf(PropTypes.number),
            fxm: PropTypes.arrayOf(PropTypes.number),
            xi: PropTypes.arrayOf(PropTypes.number),
            xm: PropTypes.arrayOf(PropTypes.number),
            xs: PropTypes.arrayOf(PropTypes.number)
        }),
        resultMessage: PropTypes.string,
        root: PropTypes.number,
        solutionFailed: PropTypes.bool
    }),
    onGetBisecFalseRuleResult: PropTypes.func.isRequired
};

BisecFalseRulePageContainer.defaultProps = {
    appSettings: [],
    bisecFalseRuleResult: null
};

const mapStateToProps = ({
    closedMethods,
    commonData
}) => ({
    appSettings: commonData.appSettingList,
    bisecFalseRuleResult: closedMethods.bisecFalseRuleResult
});

const mapDispatchToProps = dispatch => bindActionCreators({
    onGetBisecFalseRuleResult: getBisecFalseRuleResult
}, dispatch);

export default connect(
    mapStateToProps, mapDispatchToProps
)(BisecFalseRulePageContainer);
