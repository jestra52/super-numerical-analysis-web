export const initialState = {
    bestLambda: '',
    isRelError: {
        isValid: true,
        value: 'rel'
    },
    iterations: {
        isValid: false,
        value: null
    },
    lambda: {
        isValid: false,
        value: null
    },
    methodType: {
        isValid: true,
        value: 'gauss'
    },
    resultMessage: '',
    showBestLambda: false,
    showErrors: false,
    showResults: false,
    tolerance: {
        isValid: false,
        value: null
    },
    xFields: []
};
