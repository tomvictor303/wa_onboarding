import React, { useEffect, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { CheckCircleOutline as CheckIcon } from '@mui/icons-material';
import { green } from '@mui/material/colors';

import signup_2_img from 'assets/images/signup/signup_2.jpg';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

import { APP_CONSTANTS, API_CONSTANTS } from '../../../config/config';
const { ONBOARDING_CHECKOUT_PAGE_PATH } = APP_CONSTANTS;

export interface OnboardingSingUpSuccessProps { 
  gmailData: any;
  companyName: string;
  signUpResponse: any;
}

const OnboardingSingUpSuccess = ({
  gmailData,
  companyName,
  signUpResponse,
}: OnboardingSingUpSuccessProps) => { 
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if( signUpResponse?.user) {
      localStorage.setItem('onboardingUser', JSON.stringify(signUpResponse?.user));
      localStorage.setItem('jwt_onboarding_token', signUpResponse?.jwt_onboarding_token);

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
    
  }, [])

  // Now real render ...
  return (
    <>
      <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
          <Box sx={{textAlign: 'center'}}>
            <CheckIcon sx={{ color: green[500], fontSize: '8rem' }} />
          </Box>
          <Typography variant='h4' sx={{textAlign: 'center', marginTop: 5}}>
            Redirecting to next step ... 
          </Typography>
        </Grid>
        <Grid item sm={6} xs={12} sx={{display: { xs: 'none', sm: 'flex' }}}>
          <img
            src={signup_2_img}
            alt={`Dashboard`}
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>
      </Grid> 
    </>
  );
}

export default memo(OnboardingSingUpSuccess);