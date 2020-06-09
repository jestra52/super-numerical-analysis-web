// @packages
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import { config } from '../../config';

// @styles
import styles from './styles';


const CtrlSplinesResults = ({
    classes,
    result
}) => {
    const renderSolution = xMatrix => (
        <>
            <Grid item xs={4} />
            <Grid
                alignContent="center"
                className={classes.solution}
                container
                item
                justify="center"
                xs={4}
            >
                <List component={Paper} subheader={<ListSubheader>{config.text.common.solution}</ListSubheader>}>
                    {xMatrix.map((x, index) => (
                        <ListItem key={index} style={{ alignItems: 'center' }}>
                            <ListItemAvatar>
                                <Typography variant="body1">
                                    {`x${index + 1}`}
                                </Typography>
                            </ListItemAvatar>
                            <ListItemText primary={x} />
                        </ListItem>
                    ))}
                </List>
            </Grid>
        </>
    );

    const {
        aMatrix,
        bMatrix,
        xMatrix
    } = result;

    return (
        <>
            <Grid className={classes.iterationMatrix} component={Paper} item xs={12}>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" colSpan={aMatrix.length}>A</TableCell>
                                <TableCell align="center">|</TableCell>
                                <TableCell align="center">B</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bMatrix.map((b, i) => (
                                <TableRow key={i}>
                                    {aMatrix[i].map((a, j) => (
                                        <TableCell key={j} align="center">{a}</TableCell>
                                    ))}
                                    <TableCell align="center">|</TableCell>
                                    <TableCell align="center">{b}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            {renderSolution(xMatrix)}
        </>
    );
};

CtrlSplinesResults.propTypes = {
    classes: PropTypes.object.isRequired,
    result: PropTypes.shape({
        aMatrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
        bMatrix: PropTypes.arrayOf(PropTypes.number).isRequired,
        xMatrix: PropTypes.arrayOf(PropTypes.number).isRequired
    })
};

CtrlSplinesResults.defaultProps = {
    result: {}
};

export default withStyles(styles)(CtrlSplinesResults);
