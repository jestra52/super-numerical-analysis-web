import globals from '../../styles/globals';

export default theme => (Object.assign({}, globals(theme), {
    appSettingsPage: {},
    fieldPadding: {
        paddingLeft: 30,
        paddingRight: 30
    },
    appSettingSection: {
        marginBottom: 15
    },
    appSettingSectionPaper: {
        paddingTop: 20,
        width: '100%'
    },
    buttonsContainer: {
        textAlign: 'right'
    },
    inputMatrix: {
        marginLeft: 25,
        marginTop: 10
    },
    marginLeftUnit: {
        marginLeft: theme.spacing(1)
    },
    marginRightUnit: {
        marginRight: theme.spacing(1)
    },
    matrixValueField: {
        paddingLeft: 30,
        paddingRight: 25
    }
}));
