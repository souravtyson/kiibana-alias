import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    }
});

function DataTable({ tableData }) {
    const classes = useStyles();
    return (
        <TableContainer>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>IP Address</TableCell>
                        <TableCell align="right">Domain Name</TableCell>
                        <TableCell align="right">File Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">{row.ip_address}</TableCell>
                            <TableCell align="right">{row.domain_name}</TableCell>
                            <TableCell align="right">{row.file_name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default DataTable;