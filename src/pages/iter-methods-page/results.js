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

const CtrlIterMethodsResults = ({
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
        x
    } = data;

    return (
        <TableContainer id={id} component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {columns(x).map(col => (
                            <TableCell align="center" key={col.id}>{col.label}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {error.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell align="center">{index + 1}</TableCell>
                            {x.map((_, j) => (
                                <TableCell key={`${j}-${index}`} align="center">{x[j][index]}</TableCell>
                            ))}
                            <TableCell align="center">
                                {row ? toExponentialString(row, DECIMALS_FOR_RESULTS) : null}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

CtrlIterMethodsResults.propTypes = {
    data: PropTypes.shape({
        error: PropTypes.arrayOf(PropTypes.number),
        x: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
    }),
    id: PropTypes.string.isRequired,
    visible: PropTypes.bool
};

CtrlIterMethodsResults.defaultProps = {
    data: [],
    visible: true
};

export default withStyles(styles)(CtrlIterMethodsResults);
