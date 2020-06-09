import grey from '@material-ui/core/colors/grey';
import globals, { colors, zIndex } from '../../../styles/globals';

export default theme => (Object.assign({}, globals(theme), {
    footer: {
        backgroundColor: colors.WHITE,
        bottom: 0,
        color: grey[600],
        fontSize: 13,
        padding: 7,
        position: 'fixed',
        right: 0,
        zIndex: zIndex.FOOTER
    }
}));
