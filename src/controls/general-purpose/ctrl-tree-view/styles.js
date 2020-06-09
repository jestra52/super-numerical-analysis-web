// @packages
import grey from '@material-ui/core/colors/grey';

// @scripts
import globals from '../../../styles/globals';

export default theme => (Object.assign({}, globals(theme), {
    treeView: {
        paddingBottom: 0,
        paddingTop: 0
    },
    treeViewItem: {
        padding: 0,
        backgroundColor: grey[200],
        borderBottom: `1px solid ${grey[300]}`,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: grey[300]
        }
    },
    treeViewItemStriped: {
        padding: 0,
        backgroundColor: grey[50],
        borderBottom: `1px solid ${grey[300]}`,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: grey[300]
        }
    },
    title: {},
    actions: {
        float: 'right'
    }
}));
