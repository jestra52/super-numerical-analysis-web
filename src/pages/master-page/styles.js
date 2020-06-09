import globals from '../../styles/globals';

export default theme => (Object.assign({}, globals(theme), {
    masterPage: {
        marginBottom: theme.spacing(5)
    },
    routes: {
        marginLeft: 265,
        marginRight: 15,
        marginTop: 80
    }
}));
