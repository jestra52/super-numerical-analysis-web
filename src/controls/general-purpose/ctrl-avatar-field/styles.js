// @packages
import deepOrange from '@material-ui/core/colors/deepOrange';

// @scripts
import globals, { colors } from '../../../styles/globals';

export default theme => (Object.assign({}, globals(theme), {
    avatar: {
        display: 'grid',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center'
    },
    icon: {
        backgroundColor: deepOrange[500]
    },
    clickable: {
        cursor: 'pointer'
    },
    helpText: {
        fontSize: '0.75rem',
        color: colors.ERROR_TEXT
    }
}));
