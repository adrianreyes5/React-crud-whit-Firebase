import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: '15px',
        overflowX: 'auto',
    },
    button: {
        marginLeft: '2px'
    },
    table: {
        minWidth: 650,
    },
}));

export default (props) => {
    const classes = useStyles();
    const users = props.users;

    return (
        <>
            <Paper className={classes.root}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <Hidden Hidden only="xs">
                                <TableCell align="center">Surname</TableCell>
                            </Hidden>
                            <Hidden only="xs">
                                <TableCell align="center">Age</TableCell>
                            </Hidden>
                            <TableCell align="center">Email</TableCell>
                            <Hidden only={["xs","sm"]}>
                                <TableCell align="center">Phone</TableCell>
                            </Hidden>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell component="th" scope="row">
                                    {user.data.nombre}
                                </TableCell>
                                <Hidden only="xs">
                                    <TableCell align="center">{user.data.apellido}</TableCell>
                                </Hidden>
                                <Hidden only="xs">
                                    <TableCell align="center">{user.data.edad}</TableCell>
                                </Hidden>
                                <TableCell align="center">{user.data.email}</TableCell>
                                <Hidden only={["xs","sm"]}>
                                    <TableCell align="center">{user.data.telefono}</TableCell>
                                </Hidden>
                                <TableCell align="center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        onClick={() => props.editUser(user.id)}>

                                        <EditIcon fontSize="small" />
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        onClick={() => props.deleteUser(user.id)}>

                                        <DeleteIcon fontSize="small" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </>
    )
}
