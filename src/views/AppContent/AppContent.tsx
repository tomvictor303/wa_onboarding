import React, { useEffect, Fragment } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { AppBarComponent } from '../../components/AppBarComponent';
import CustomReduxBackdrop from '../../components/Custom/Backdrop/CustomReduxBackdrop';
import Footer from '../../components/Footer/Footer';
import CustomReduxSnackbar from '../../components/Custom/Snackbar/CustomReduxSnackbar';
import { APP_CONSTANTS, API_CONSTANTS } from '../../config/config';
import { array_includes } from 'utils/custom';

const { APP_TITLE, BASE_PATH } = APP_CONSTANTS;

export interface AppContentProps {
    routes: Array<any>;
}

const AppContent = ({ 
    routes 
}: AppContentProps) => {
    window.document.title = APP_TITLE;

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // BEGIN wf_onboarding_lock
        if ( 
          location.pathname !== '' &&
          location.pathname !== '/' &&
          location.pathname !== '/login' &&
          !localStorage?.getItem("onboardingUser") 
        ) {
          navigate(`/login?redirectUri=${encodeURIComponent(window.location.href)}`);
        } // END wf_onboarding_lock

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log('here we go', location.pathname)

    const renderHeader = () => {
      return (<></>)
    }

    const renderFooter = () => {
        // login page renders Footer itself.
        return (<><Footer /></>); 
    }

    return (
        <Fragment>
            {renderHeader()}
            <CustomReduxSnackbar />
            <CustomReduxBackdrop />
            <Routes>
                {routes.map((route: any) => (
                    <Route key={route.id} path={route.path} element={<route.component />} />
                ))}
            </Routes>
            {renderFooter()}
        </Fragment>
    );
};

export default AppContent;
