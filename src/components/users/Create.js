import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

export default function Create(props) {
    const classes = useStyles();

    return (
        <Box>
            <Fab
                color="primary"
                aria-label="add"
                className={classes.fab}
                onClick={() => props.createUser()}
            >
                <AddIcon />
            </Fab>
        </Box>
    )
}
