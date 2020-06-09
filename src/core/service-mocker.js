// @packages
import MockAdapter from 'axios-mock-adapter';
import _ from 'lodash';
import axios from 'axios';

// @scripts
import { config } from '../config';
import { constants } from '.';
import { copyObjInCamelCase } from '../util';

// @constants
const HTTP_SUCCESS_CODE = 200;

const getParams = (call) => {
    const params = copyObjInCamelCase(
        call.params || JSON.parse(call.data).params || JSON.parse(call.data)
    );

    if (params.sortKey) {
        params.sortKey = _.lowerFirst(params.sortKey);
    }

    return params;
};

const createHttpResponse = ({
    data = null,
    httpCode = HTTP_SUCCESS_CODE,
    message = null,
    messageType = null,
    success = true
}) => ([httpCode, {
    data,
    message,
    messageType,
    success
}]);

const mockMethodResultSvc = (url, data, mockAdapter) =>
    mockAdapter.onPost(url).reply(() =>
        createHttpResponse({
            data,
            message: config.text.common.executeMethodSuccess,
            messageType: constants.notificationType.SUCCESS
        }));

const mockAppSettingGetAllSvc = (mockAdapter) => {
    const url = config.services.setting.getAll;

    mockAdapter.onGet(url).reply(() =>
        createHttpResponse({
            data: config.mockData.appSettingGetAllSvcResponse
        }));
};

const mockAppSettingSaveSvc = (mockAdapter) => {
    const url = config.services.setting.save;

    mockAdapter.onPatch(url).reply((call) => {
        const settings = getParams(call);

        return createHttpResponse({
            data: settings,
            message: config.text.appSettings.saveSuccess,
            messageType: constants.notificationType.SUCCESS
        });
    });
};

const mockIntegrationResultSvc = (mockAdapter) => {
    const url = config.services.integration.getIntegrationResult;

    mockAdapter.onPost(url).reply((call) => {
        const { formType } = getParams(call);

        return createHttpResponse({
            data: formType === 'integrationSimple'
                ? config.mockData.getIntegrationSimpleResultSvcResponse
                : config.mockData.getIntegrationGeneralResultSvcResponse,
            message: config.text.common.executeMethodSuccess,
            messageType: constants.notificationType.SUCCESS
        });
    });
};

export const initializeServiceMocker = () => {
    if (config.settings.serviceMocker.isEnabled) {
        const mockAdapter = new MockAdapter(
            axios, {
                delayResponse: config.settings.serviceMocker.delayResponse
            }
        );

        const {
            getIncrSearchResult,
            getBisecFalseRuleResult
        } = config.services.closedMethods;

        const {
            getFixedPointResult,
            getNewtonResult,
            getMultipleRootsResult,
            getSecantResult
        } = config.services.openMethods;

        const {
            getBestLambdaResult,
            getFactorizationLUResult,
            getGaussEliminationResult,
            getIterativeMethodsResult
        } = config.services.sysOfLinEquations;

        const {
            getInterpolationNewtonLagrangeResult,
            getSplinesResult
        } = config.services.interpolation;

        const {
            getBestLambdaResultSvc,
            getBisecFalseRuleResultSvcResponse,
            getFactorizationLUResultSvcResponse,
            getFixedPointResultSvcResponse,
            getGaussEliminationResultSvcResponse,
            getIncrSearchResultSvcResponse,
            getInterpolationNewtonLagrangeResultSvcResponse,
            getIterativeMethodsResultSvcResponse,
            getMultipleRootsResultSvcResponse,
            getNewtonResultSvcResponse,
            getSecantResultSvcResponse,
            getSplinesResultSvcResponse
        } = config.mockData;

        const serviceMocker = {
            replyWithMockData: () => {
                mockAdapter.reset();
                mockAppSettingGetAllSvc(mockAdapter);
                mockAppSettingSaveSvc(mockAdapter);
                mockIntegrationResultSvc(mockAdapter);
                mockMethodResultSvc(getBisecFalseRuleResult, getBisecFalseRuleResultSvcResponse, mockAdapter);
                mockMethodResultSvc(getFactorizationLUResult, getFactorizationLUResultSvcResponse, mockAdapter);
                mockMethodResultSvc(getFixedPointResult, getFixedPointResultSvcResponse, mockAdapter);
                mockMethodResultSvc(getGaussEliminationResult, getGaussEliminationResultSvcResponse, mockAdapter);
                mockMethodResultSvc(getIncrSearchResult, getIncrSearchResultSvcResponse, mockAdapter);
                mockMethodResultSvc(
                    getInterpolationNewtonLagrangeResult,
                    getInterpolationNewtonLagrangeResultSvcResponse,
                    mockAdapter
                );
                mockMethodResultSvc(getBestLambdaResult, getBestLambdaResultSvc, mockAdapter);
                mockMethodResultSvc(getIterativeMethodsResult, getIterativeMethodsResultSvcResponse, mockAdapter);
                mockMethodResultSvc(getMultipleRootsResult, getMultipleRootsResultSvcResponse, mockAdapter);
                mockMethodResultSvc(getMultipleRootsResult, getMultipleRootsResultSvcResponse, mockAdapter);
                mockMethodResultSvc(getNewtonResult, getNewtonResultSvcResponse, mockAdapter);
                mockMethodResultSvc(getSecantResult, getSecantResultSvcResponse, mockAdapter);
                mockMethodResultSvc(getSplinesResult, getSplinesResultSvcResponse, mockAdapter);
            },
            replyWithNetworkError: () => {
                mockAdapter.reset();
                mockAdapter.onAny().networkError();
            }
        };

        serviceMocker.replyWithMockData();
        return serviceMocker;
    }

    return null;
};
