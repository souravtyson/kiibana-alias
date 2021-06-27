import React from 'react'
import { Box } from "@material-ui/core";

function NoData() {
    return (
        <Box height="100%" display="flex" alignItems="center" justifyContent="center">
            <p>Data not available</p>
        </Box>
    )
}

export default NoData
