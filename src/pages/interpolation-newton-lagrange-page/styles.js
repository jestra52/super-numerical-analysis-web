import globals from '../../styles/globals';

export default theme => (Object.assign({}, globals(theme), {
    actionButtons: {
        marginBottom: 20,
        marginTop: 20
    },
    inputFields: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10
    },
    interpolationParams: {
        paddingTop: 15
    },
    interpolationPage: {},
    iterationResult: {
        paddingRight: 15,
        marginBottom: 20
    },
    iterationMatrix: {
        paddingLeft: 50,
        paddingRight: 50
    },
    methodType: {
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30
    },
    resultsTitle: {
        paddingLeft: 20,
        paddingTop: 20,
        paddingBottom: 20
    },
    results: {
        marginLeft: 150,
        marginRight: 150,
        marginTop: 20
    },
    polynomialEquation: {
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    solution: {
        marginTop: 20
    },
    sortingIterations: {
        marginBottom: 20
    },
    sortingIterationsTitle: {
        paddingLeft: 20,
        paddingTop: 20,
        paddingBottom: 20
    },
    texts: {
        paddingBottom: 30,
        paddingTop: 20
    }
}));
