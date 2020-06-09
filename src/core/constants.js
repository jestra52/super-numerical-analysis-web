export const constants = {
    numbers: {
        DECIMALS_FOR_FIELDS: 6,
        DECIMALS_FOR_RESULTS: 4,
        DECIMALS_FOR_TOLERANCE: 30
    },

    environment: {
        DEVELOPMENT: 'development',
        LOCAL: 'local',
        PRODUCTION: 'production',
        QA: 'qa',
        STAGING: 'staging',
        UNIT_TEST: 'unitTest'
    },

    masterData: {
        COLOR_LIST: 'Accordion Colors',
        LOCK_LOCATION_TYPE_LIST: 'Accordion Lock Location Type',
        TRACK_TYPE_LIST: 'Accordion Track Type'
    },

    notificationType: {
        ERROR: 'error',
        INFO: 'info',
        SUCCESS: 'success',
        WARNING: 'warning'
    },

    orderFlowStep: {
        FILL_FORM: 'fillForm',
        PAY: 'pay',
        REVIEW: 'review'
    },

    orderType: {
        ACCORDION_ORDER: 1
    },

    permissions: {
        mainMenu: {
            APP_SETTINGS: 'MainMenu.AppSettings',
            HOME: 'MainMenu.Home'
        },
        profileMenu: {
            SETTINGS: 'ProfileMenu.Settings'
        },
        topBar: {
            ALERTS: 'TopBar.Alerts',
            PROFILE: 'TopBar.Profile'
        }
    },

    trackType: {
        CEILING: 1,
        FLOOR: 2,
        WALL: 3
    }
};
