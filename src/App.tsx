import React from 'react';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';

import routes from './routes';
import { AppContent } from './views';
import theme from './assets/styles/theme';
import { APP_CONSTANTS } from './config/config';
import AjaxInterceptor from 'components/Custom/AjaxInterceptor';

const App = () => {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <Router basename={APP_CONSTANTS['BASE_PATH']}>
                    <AjaxInterceptor />
                    <AppContent routes={routes} />
                </Router>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
