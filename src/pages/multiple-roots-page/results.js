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

const CtrlMultipleRootsResults = ({
    id,
    data,
    visible
}) => {
    if (!visible) {
        return null;
    }

    const { DECIMALS_FOR_RESULTS } = constants.numbers;
    const {
        dfxn,
        d2fxn,
        error,
        fxn,
        xn
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
                    {xn.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell align="center">{index + 1}</TableCell>
                            <TableCell align="center">{row}</TableCell>
                            <TableCell align="center">
                                {toExponentialString(fxn[index], DECIMALS_FOR_RESULTS)}
                            </TableCell>
                            <TableCell align="center">
                                {toExponentialString(dfxn[index], DECIMALS_FOR_RESULTS)}
                            </TableCell>
                            <TableCell align="center">
                                {toExponentialString(d2fxn[index], DECIMALS_FOR_RESULTS)}
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

CtrlMultipleRootsResults.propTypes = {
    data: PropTypes.shape({
        dfxn: PropTypes.arrayOf(PropTypes.number),
        d2fxn: PropTypes.arrayOf(PropTypes.number),
        error: PropTypes.arrayOf(PropTypes.number),
        fxn: PropTypes.arrayOf(PropTypes.number),
        xn: PropTypes.arrayOf(PropTypes.number)
    }),
    id: PropTypes.string.isRequired,
    visible: PropTypes.bool
};

CtrlMultipleRootsResults.defaultProps = {
    data: [],
    visible: true
};

export default withStyles(styles)(CtrlMultipleRootsResults);
