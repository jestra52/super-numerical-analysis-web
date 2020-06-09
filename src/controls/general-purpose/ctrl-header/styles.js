import blue from '@material-ui/core/colors/blue';
import globals, { colors } from '../../../styles/globals';

export default theme => (Object.assign({}, globals(theme), {
    header: {
        backgroundColor: blue[500],
        color: colors.WHITE,
        lineHeight: '20px',
        padding: 20
    },
    leftContent: {
        fontSize: '20px',
        fontWeight: 'bold'
    },
    rightContent: {
        textAlign: 'right'
    }
}));
