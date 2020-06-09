import green from '@material-ui/core/colors/green';
import globals from '../../../styles/globals';

export default theme => (Object.assign({}, globals(theme), {
    switchField: {
    },
    switchBase: {
        '&$checked': {
            color: theme.palette.common.white,
            '& + $bar': {
                backgroundColor: '#52d869'
            }
        },
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
            easing: theme.transitions.easing.sharp
        })
    },
    bar: {
        backgroundColor: theme.palette.grey[50],
        border: 'solid 1px',
        borderColor: theme.palette.grey[400],
        borderRadius: 13,
        height: 26,
        marginLeft: -21,
        marginTop: -13,
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
        width: 42
    },
    checked: {
        transform: 'translateX(15px)',
        '& + $bar': {
            opacity: 1,
            border: 'none'
        }
    },
    icon: {
        height: 24,
        width: 24
    },
    iconChecked: {
        boxShadow: theme.shadows[1]
    },
    labelDefault: {
        color: '#000'
    },
    labelGreen: {
        color: green[800]
    }
}));
