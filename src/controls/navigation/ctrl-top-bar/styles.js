import globals, { zIndex } from '../../../styles/globals';

export default theme => (Object.assign({}, globals(theme), {
    topBar: {
    },
    topBarRoot: {
        flexGrow: 1,
        zIndex: zIndex.TOP_BAR
    },
    topBarIcon: {
        marginLeft: '-13px'
    },
    topBarTitle: {
        flexGrow: 1,
        marginLeft: 19
    },
    appName: {
        display: 'inline-block'
    },
    pageTitle: {
        display: 'inline-block',
        marginLeft: 10
    }
}));
