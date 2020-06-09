import grey from '@material-ui/core/colors/grey';
import globals from '../../../styles/globals';

export default theme => (Object.assign({}, globals(theme), {
    multiselectField: {
        padding: 0,
        paddingBottom: 10,
        width: '100%'
    },
    multiselectHeaderBox: {
        backgroundColor: grey[200],
        border: `1px solid ${grey[400]}`,
        borderBottom: 'none',
        padding: 15
    },
    multiselectSearchInput: {
        backgroundColor: '#fff',
        padding: '5px 10px'
    },
    multiselectContentBox: {
        backgroundColor: grey[50],
        border: `1px solid ${grey[400]}`,
        overflowY: 'auto',
        paddingLeft: 15
    },
    multiselectClearIcon: {
        color: grey[900],
        cursor: 'pointer'
    }
}));
