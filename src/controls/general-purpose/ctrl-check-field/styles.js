import globals, { colors } from '../../../styles/globals';

export default theme => (Object.assign({}, globals(theme), {
    checkField: {
        display: 'inline-block'
    },
    labelDefault: {
        color: colors.WHITE
    },
    labelPrimary: {
        color: theme.palette.primary.main
    },
    labelSecondary: {
        color: theme.palette.secondary.main
    },
    helperText: {
        margin: 0
    }
}));
