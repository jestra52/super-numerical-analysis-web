// @packages
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import { config } from '../../config';
import { format } from '../../util';

// @styles
import styles from './styles';

const CtrlFactorizationLUResults = ({
    classes,
    onTabChange,
    onTabIndexChange,
    result,
    tabIndex,
    visible
}) => {
    if (!visible) {
        return null;
    }

    const renderAB = (aMatrix, bMatrix) => (
        <>
            <Grid item xs={3} />
            <Grid className={classes.basicSystem} component={Paper} item xs={6}>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" colSpan={aMatrix.length}>A</TableCell>
                                <TableCell align="center" colSpan={bMatrix.length}>B</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bMatrix.map((item, i) => (
                                <TableRow key={i}>
                                    {aMatrix[i].map((a, j) => (
                                        <TableCell key={j} align="center">{a}</TableCell>
                                    ))}
                                    <TableCell align="center">{item}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </>
    );

    const renderIterationResult = (lMatrix, uMatrix, currentIteration) => (
        <TableContainer key={currentIteration} className={classes.iterationMatrix}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={lMatrix.length}>L</TableCell>
                        <TableCell align="center">|</TableCell>
                        <TableCell align="center" colSpan={uMatrix.length}>U</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {uMatrix.map((item, i) => (
                        <TableRow key={i}>
                            {lMatrix[i].map((l, j) => (
                                <TableCell key={j} align="center">{l}</TableCell>
                            ))}
                            <TableCell align="center">|</TableCell>
                            {item.map((u, j) => (
                                <TableCell key={j} align="center">{u}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

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
        lMatrix,
        uMatrix,
        iterations,
        xMatrix
    } = result;

    return (
        <>
            {renderAB(aMatrix, bMatrix)}
            <Grid component={Paper} item xs={12}>
                <Tabs
                    centered
                    indicatorColor="primary"
                    onChange={onTabChange}
                    textColor="primary"
                    value={tabIndex}
                    variant="fullWidth"
                >
                    {iterations.map((_, index) => (
                        <Tab key={index} label={format(config.text.common.currentIteration, index + 1)} />
                    ))}
                    <Tab label={config.text.common.finalIteration} />
                </Tabs>
                <SwipeableViews index={tabIndex} onChangeIndex={onTabIndexChange}>
                    {iterations.map((item, index) => (
                        <Card key={index}>
                            <CardContent>
                                <Typography color="primary" variant="h5">
                                    {format(config.text.common.currentIteration, index + 1)}
                                </Typography>
                                {renderIterationResult(item.lMatrix, item.uMatrix, index)}
                            </CardContent>
                        </Card>
                    ))}
                    <Card>
                        <CardContent>
                            <Typography color="primary" variant="h5">
                                {config.text.common.finalIteration}
                            </Typography>
                            {renderIterationResult(lMatrix, uMatrix, null)}
                        </CardContent>
                    </Card>
                </SwipeableViews>
            </Grid>
            {renderSolution(xMatrix)}
        </>
    );
};

CtrlFactorizationLUResults.propTypes = {
    classes: PropTypes.object.isRequired,
    onTabChange: PropTypes.func.isRequired,
    onTabIndexChange: PropTypes.func.isRequired,
    result: PropTypes.shape({
        aMatrix: PropTypes.array,
        bMatrix: PropTypes.array,
        lMatrix: PropTypes.array,
        uMatrix: PropTypes.array,
        iterations: PropTypes.array,
        xMatrix: PropTypes.array
    }),
    tabIndex: PropTypes.number,
    visible: PropTypes.bool
};

CtrlFactorizationLUResults.defaultProps = {
    result: {},
    tabIndex: 0,
    visible: true
};

export default withStyles(styles)(CtrlFactorizationLUResults);
