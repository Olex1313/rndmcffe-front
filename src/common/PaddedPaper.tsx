import React from "react";
import {Box, Paper} from "@mui/material";

export const PaddedPaper: React.FC<{ children: React.ReactNode }> = (props) => {
    return (
        <Paper elevation={3}>
            <Box p='15px' m='10px'>
                {props.children}
            </Box>
        </Paper>
    )
}