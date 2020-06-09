import grey from '@material-ui/core/colors/grey';
import globals, { zIndex } from '../../../styles/globals';

export default theme => (Object.assign({}, globals(theme), {
    autocompleteField: {
        marginBottom: 10,
        position: 'relative'
    },
    inputDisabled: {
        color: grey[900]
    },
    inputReadonly: {
        color: grey[500]
    },
    searchIcon: {
        color: grey[500]
    },
    clearIcon: {
        color: grey[800],
        cursor: 'pointer'
    },
    clearIconDisabled: {
        color: grey[500],
        cursor: 'default'
    },
    suggestionsContainer: {
        borderTop: '1px solid rgba(0, 0, 0, 0.14)',
        marginTop: -20,
        position: 'absolute',
        width: '100%',
        zIndex: zIndex.AUTO_COMPLETE
    }
}));
