import globals from '../../styles/globals';

export default theme => (Object.assign({}, globals(theme), {
    actionButtons: {
        marginBottom: 20,
        marginTop: 20
    },
    basicSystem: {
        marginBottom: 20
    },
    factorizationLUParams: {
        paddingTop: 15
    },
    factorizationLUPage: {},
    iterationResult: {
        paddingRight: 15,
        marginBottom: 20
    },
    iterationMatrix: {
        paddingLeft: 10,
        paddingRight: 10
    },
    methodType: {
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30
    },
    resultMessage: {
        marginBottom: 15
    },
    solution: {
        marginTop: 20
    },
    texts: {
        paddingBottom: 30,
        paddingTop: 20
    }
}));
