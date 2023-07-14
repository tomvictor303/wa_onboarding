import React from 'react';
import { ThemeProvider } from '@mui/material';
import wa_theme from 'assets/styles/theme/wa_theme';

const WaThemeWrapper = (props: any) => {
    return (
      <ThemeProvider theme={wa_theme}>
        {props.children}
      </ThemeProvider>
    );
};

export default WaThemeWrapper;
