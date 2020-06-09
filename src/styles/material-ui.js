import deepPurple from '@material-ui/core/colors/deepPurple';
import pink from '@material-ui/core/colors/pink';
import { createMuiTheme } from '@material-ui/core/styles';
import { colors } from './globals';

export const theme = createMuiTheme({
    overrides: {
        MuiTooltip: {
            tooltip: {
                fontSize: 13
            }
        },
        MuiSelect: {
            icon: {
                marginRight: 10
            }
        },
        MuiFormHelperText: {
            contained: {
                margin: 0,
                marginTop: 3
            },
            root: {
                '&$error': {
                    color: colors.ERROR_TEXT
                }
            }
        }
    },
    palette: {
        primary: deepPurple,
        secondary: pink
    }
});
