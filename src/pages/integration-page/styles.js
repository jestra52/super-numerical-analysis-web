import globals from '../../styles/globals';

export default theme => (Object.assign({}, globals(theme), {
    actionButtons: {
        marginBottom: 20,
        marginTop: 20
    },
    formType: {
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30
    },
    integrationPage: {},
    integrationParams: {},
    inputFields: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10
    },
    polynomialEquation: {
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    results: {
        marginLeft: 150,
        marginRight: 150,
        marginTop: 20
    },
    resultsTitle: {
        paddingLeft: 20,
        paddingTop: 20,
        paddingBottom: 20
    },
    texts: {
        paddingBottom: 30,
        paddingTop: 20
    }
}));
