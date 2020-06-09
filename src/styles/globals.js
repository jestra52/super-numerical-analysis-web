// @packages
import classNames from 'classnames';
import grey from '@material-ui/core/colors/grey';

/**
 * Allowed field variants:
 *  - filled
 *  - outlined
 *  - standard
 */
export const DEFAULT_FIELD_VARIANT = 'standard';

/**
 * Common colors.
 */
export const colors = {
    BLACK: '#000000',
    ERROR_TEXT: grey[900],
    ROW_ALTERN: '#FFFFFF',
    ROW_HOVER: '#EDEDED',
    ROW_NORMAL: '#F5F5F5',
    WHITE: '#FFFFFF'
};

/**
 * Common z-indexes.
 */
export const zIndex = {
    AUTO_COMPLETE: 3000,
    FOOTER: 1000,
    LOADING_PAGE: 4000,
    PROFILE_MENU: 2000,
    TOP_BAR: 1000
};

/**
 * Common dimensions.
 */
export const dimensions = {
    FOOTER_HEIGHT: 40,
    MAIN_MENU_COLLAPSED_WIDTH: 70,
    MAIN_MENU_WIDTH: 340,
    TOP_BAR_HEIGHT: 64
};

/**
 * Mixing to get the style of a table row.
 * @param {object} cell
 * @param {object} classes
 * @return {object}
 */
export const getRowClass = (cell, classes) =>
    classNames({
        [classes.gblFixTableCol]: cell.dataIndex % 2 === 0,
        [classes.gblFixTableColAltern]: cell.dataIndex % 2 !== 0
    });

/**
 * Global classes.
 */
export default theme => ({
    gblAlignLeft: {
        textAlign: 'left'
    },
    gblAlignRight: {
        textAlign: 'right'
    },
    gblCenterCell: {
        display: 'flex',
        justifyContent: 'center'
    },
    gblFixTableCol: {
        background: colors.ROW_NORMAL,
        left: 0,
        position: 'sticky',
        right: 0,
        zIndex: 1,
        '&:hover': {
            background: colors.ROW_HOVER
        }
    },
    gblFixTableColAltern: {
        background: colors.ROW_ALTERN,
        left: 0,
        position: 'sticky',
        right: 0,
        zIndex: 1,
        '&:hover': {
            background: colors.ROW_HOVER
        }
    },
    gblLink: {
        '&:hover': {
            textDecoration: 'underline'
        },
        color: theme.palette.primary.main,
        textDecoration: 'none'
    }
});
