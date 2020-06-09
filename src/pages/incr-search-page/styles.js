import globals from '../../styles/globals';

export default theme => (Object.assign({}, globals(theme), {
    actionButtons: {
        marginBottom: 20,
        marginTop: 20
    },
    incrSearchPage: {},
    incrSearchParams: {},
    inputFields: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10
    },
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
