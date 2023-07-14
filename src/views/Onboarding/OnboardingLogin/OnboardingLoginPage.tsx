import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { showSnackBar, hideSnackBar } from 'store/slices/snackbar.slice';
import { showBackdrop, hideBackdrop } from 'store/slices/backdrop.slice';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container/Container';

import OnboardingLoginStep1 from './OnboardingLoginStep1';
import OnboardingSingUpSuccess from './OnboardingSingUpSuccess';
import WaThemeWrapper from 'components/Custom/Wrappers/WaThemeWrapper';
import OnboardingHeader from '../components/OnboardingHeader';

import { APP_CONSTANTS, API_CONSTANTS } from '../../../config/config';
const { ONBOARDING_CHECKOUT_PAGE_PATH } = APP_CONSTANTS;

const OnboardingLoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if ( window && window.document ) {
    window.document.title = "Onboarding";
  }

  // BEGIN data_logic  
  const [ gmailData, setGmailData ] = useState<any>(null);
  const [ companyName, setCompanyName ] = useState<string>("");
  const [ signUpSuccessed, setSignUpSuccessed ] = useState<boolean>(false);
  const [ signUpResponse, setSignUpResponse ] = useState<any>(null);

  useEffect(() => {
    if ( process.env.NODE_ENV === 'development') {
      // setGmailData({"firstName":"Thomas","lastName":"Victor","picture":"https://lh3.googleusercontent.com/a/AGNmyxaWKXFjqclkIAKzm3RqTCbHYMopitAMOxo_JJBg=s96-c","email":"tomvictor301@gmail.com"});
      // setCompanyName("Tommy Inc");
    }
  }, []);

  const onGmailVerified = useCallback((data: any): void => {
    if( data?.jwt_onboarding_token) {
      // If logined ...
      localStorage.setItem('onboardingUser', JSON.stringify(data?.user));
      localStorage.setItem('jwt_onboarding_token', data?.jwt_onboarding_token);

      // BEGIN navigate_onboarding_sign_after_page
      let params: any = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop as string),
      });
      if (params.redirectUri) {
        window.location.href = decodeURIComponent(params.redirectUri);
      } else {
        navigate(ONBOARDING_CHECKOUT_PAGE_PATH);
      } // END navigate_onboarding_sign_after_page
    } 
    // =======================================================================
    else {
      // If it is not registered user, just setGmailData to OnboardingLoginStep1
      // So that client can signUp
      localStorage.removeItem('onboardingUser')
      localStorage.removeItem('jwt_onboarding_token')
      if ( data?.user ) {
        setGmailData(data?.user);
      } 
    }
  }, []);
  // END data_logic

  return (
    <Box sx={{minHeight: "100vh", background: 'white'}}> 
      <Box>
        <OnboardingHeader />
      </Box>
      <Container maxWidth="lg"
        sx={{paddingTop: "20px", paddingBottom: "10px"}}>
          {
          !signUpSuccessed
          // BEGIN render_verify_view 
          ? (
            <OnboardingLoginStep1 gmailData={gmailData} companyName={companyName} 
              onGmailVerified={onGmailVerified} 
              onCompanyNameChange={(new_name) => { setCompanyName(new_name);}}
              onSignUpSuccess={(data) => { 
                setSignUpResponse(data);
                setSignUpSuccessed(true); 
              }}
            />
          )
          : (
            <OnboardingSingUpSuccess gmailData={gmailData} companyName={companyName} signUpResponse={signUpResponse}/>
          )}
      </Container>
    </Box>  
  );
}

export default function WrappedComponent() {
  return (
    <WaThemeWrapper>
      <OnboardingLoginPage />
    </WaThemeWrapper>
  );
}
