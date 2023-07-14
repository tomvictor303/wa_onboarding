import * as React from 'react';
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

export interface CustomBackdropProps {
    open: boolean;
    message: string;
}

export default function CustomBackdrop({ 
    open, 
    message
}: CustomBackdropProps) {

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
            <Stack direction="row" alignItems="center" spacing={2}>
                <CircularProgress color="inherit" /> 
                <Typography variant="h4" color="white">{message}</Typography>
            </Stack>
        </Backdrop>
    );
}
