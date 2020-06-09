export const initialState = {
    formType: {
        isValid: true,
        value: 'integrationSimple'
    },
    methodType: {
        isValid: true,
        value: 'integrationTrapeze'
    },
    pointsQuantity: {
        isValid: false,
        value: null
    },
    xFields: [],
    resultMessage: '',
    showErrors: false,
    showResults: false
};
