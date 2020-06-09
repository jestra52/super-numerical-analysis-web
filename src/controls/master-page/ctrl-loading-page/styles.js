import globals, { colors, zIndex } from '../../../styles/globals';

export default theme => (Object.assign({}, globals(theme), {
    loadingPage: {
    },
    background: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        bottom: 0,
        left: 0,
        position: 'fixed',
        right: 0,
        top: 0,
        zIndex: zIndex.LOADING_PAGE
    },
    centerPanel: {
        left: '50%',
        position: 'fixed',
        textAlign: 'center',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: zIndex.LOADING_PAGE + 1
    },
    msg: {
        color: colors.WHITE
    }
}));
