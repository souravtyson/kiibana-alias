import React from 'react';
import { DataGrid } from "@material-ui/data-grid";


function DataTable({ tableData, columns }) {
    return (
        <DataGrid rows={tableData} columns={columns} pageSize={5} />        
    );
}

export default DataTable;