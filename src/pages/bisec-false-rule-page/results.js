// @packages
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import columns from './columns';
import { constants } from '../../core';
import { toExponentialString } from '../../util';

// @styles
import styles from './styles';

const CtrlBisecFalseRuleResults = ({
    id,
    data,
    visible
}) => {
    if (!visible) {
        return null;
    }

    const { DECIMALS_FOR_RESULTS } = constants.numbers;
    const {
        error,
        fxm,
        xi,
        xm,
        xs
    } = data;

    return (
        <TableContainer id={id} component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {columns.map(col => (
                            <TableCell align="center" key={col.id}>{col.label}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {xi.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell align="center">{index + 1}</TableCell>
                            <TableCell align="center">{row}</TableCell>
                            <TableCell align="center">{xs[index]}</TableCell>
                            <TableCell align="center">{xm[index]}</TableCell>
                            <TableCell align="center">
                                {toExponentialString(fxm[index], DECIMALS_FOR_RESULTS)}
                            </TableCell>
                            <TableCell align="center">
                                {error[index] ? toExponentialString(error[index], DECIMALS_FOR_RESULTS) : null}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

CtrlBisecFalseRuleResults.propTypes = {
    data: PropTypes.shape({
        error: PropTypes.arrayOf(PropTypes.number).isRequired,
        fxm: PropTypes.arrayOf(PropTypes.number).isRequired,
        xi: PropTypes.arrayOf(PropTypes.number).isRequired,
        xm: PropTypes.arrayOf(PropTypes.number).isRequired,
        xs: PropTypes.arrayOf(PropTypes.number).isRequired
    }),
    id: PropTypes.string.isRequired,
    visible: PropTypes.bool
};

CtrlBisecFalseRuleResults.defaultProps = {
    data: {},
    visible: true
};

export default withStyles(styles)(CtrlBisecFalseRuleResults);
