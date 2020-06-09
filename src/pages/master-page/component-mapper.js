// @scripts
import AppSettingsPageContainer from '../../containers/app-settings-page';
import BisecFalseRulePageContainer from '../../containers/bisec-false-rule-page';
import FactorizationLUPageContainer from '../../containers/factorization-LU-page';
import FixedPointPageContainer from '../../containers/fixed-point-page';
import GaussEliminationPageContainer from '../../containers/gauss-elimination-page';
import HomePageContainer from '../../containers/home-page';
import IncrSearchPageContainer from '../../containers/incr-search-page';
import IntegrationPageContainer from '../../containers/integration-page';
import InterpolationNewtonLagrangePageContainer from '../../containers/interpolation-newton-lagrange-page';
import IterMethodsPageContainer from '../../containers/iter-methods-page';
import MultipleRootsPageContainer from '../../containers/multiple-roots-page';
import NewtonPageContainer from '../../containers/netwon-page';
import SecantPageContainer from '../../containers/secant-page';
import SplinesPageContainer from '../../containers/splines-page';

// @constants
const components = {
    AppSettingsPageContainer,
    BisecFalseRulePageContainer,
    FactorizationLUPageContainer,
    FixedPointPageContainer,
    GaussEliminationPageContainer,
    HomePageContainer,
    IncrSearchPageContainer,
    IntegrationPageContainer,
    InterpolationNewtonLagrangePageContainer,
    IterMethodsPageContainer,
    MultipleRootsPageContainer,
    NewtonPageContainer,
    SecantPageContainer,
    SplinesPageContainer
};

/**
 * @param {string} componentName
 * @returns {function}
 */
export const mapComponent = componentName =>
    components[componentName];
