import grey from '@material-ui/core/colors/grey';
import globals from '../../../styles/globals';

export default theme => (Object.assign({}, globals(theme), {
    textField: {
        marginBottom: 10
    },
    enabledButton: {
        cursor: 'pointer',
        marginRight: 0,
        color: grey[800]
    },
    disabledButton: {
        marginRight: 0,
        color: grey[500]
    }
}));
