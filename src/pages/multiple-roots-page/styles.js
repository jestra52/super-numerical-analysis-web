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
    isRelError: {
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30
    },
    multipleRootsPage: {},
    multipleRootsPageParams: {},
    results: {
        marginLeft: 150,
        marginRight: 150,
        marginTop: 20
    },
    texts: {
        paddingBottom: 30,
        paddingTop: 20
    }
}));
