import globals from '../../styles/globals';

export default theme => (Object.assign({}, globals(theme), {
    homePage: {
        backgroundSize: 'cover'
    }
}));
