import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { showSnackBar, hideSnackBar } from 'store/slices/snackbar.slice';
import { showBackdrop, hideBackdrop } from 'store/slices/backdrop.slice';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container/Container';

import WaThemeWrapper from 'components/Custom/Wrappers/WaThemeWrapper';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { CheckCircleOutline as CheckIcon, ErrorOutline as ErrorIcon } from '@mui/icons-material';
import { green, red, blue } from '@mui/material/colors';
import OnboardingHeader from '../components/OnboardingHeader';

import { APP_CONSTANTS, API_CONSTANTS } from '../../../config/config';
const { ONBOARDING_CONTRACT_PAGE_PATH: ONBOARDING_CONTRACT_PAGE } = APP_CONSTANTS;
const { API_URL, STRIPE_PATH } = API_CONSTANTS;

const OnboardingPaymentSuccessPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();  
  const params: any = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop as string),
  });
  const sessionId = params.session_id;

  // state definition 
  const [status, setStatus] = useState<string>("loading");
  const [message, setMessage] = useState<string>("Verifying payment");

  const setErrorMessage = (msg: string) => {
    setStatus("error");
    setMessage(msg);
  };

  const setSuccessMessage = (msg: string) => {
    setStatus("success");
    setMessage(msg);
  };

  if ( window && window.document ) {
    window.document.title = "Onboarding";
  }  
  
  useEffect(() => {
    dispatch(showBackdrop({message: "Verifying payment, please wait ..." }));
    handleVerify();
  }, []);

  const handleVerify = () => {
    var url = `${STRIPE_PATH}/public_area/checkout-session?sessionId=` + sessionId;
    var options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      dispatch(hideBackdrop(null));
      if(data.success) { 
        setSuccessMessage(data.msg);
        setTimeout(() => {
          navigate(ONBOARDING_CONTRACT_PAGE);
        }, 1000);
      } else { 
        setErrorMessage(data.msg);
      }
    })
    .catch((error) => {
      dispatch(hideBackdrop(null));
      setErrorMessage(`Error on AJAX call: ${error.toString()}`);
    });
  }


  return (
    <Box sx={{minHeight: "90vh", background: 'white'}}> 
      <Box>
        <OnboardingHeader />
      </Box>
      <Container maxWidth="md"
        sx={{paddingTop: "20px", paddingBottom: "10px", textAlign: "center"}}>
        {status==="success" && (
          <Box>
            <Box>
              <CheckIcon sx={{ color: green[500], fontSize: '8rem' }} />
            </Box>
            <Typography variant='h4' mt={2} mb={4}>{message}</Typography>
            <Typography variant='h5'>{`Redirecting to next step...`}</Typography>
          </Box>
        )}
        {status==="error" && (
          <Box>
            <Box>
              <ErrorIcon sx={{ color: red[500], fontSize: '8rem' }} />
            </Box>
            <Typography variant='h4' mt={2} mb={4}>Payment verification failed.</Typography>
            <Typography variant='h5' color={red[900]}>{message}</Typography>
            <Typography variant='h5' color={red[900]} mt={8}>Session Id: </Typography>
            <Typography variant='h5' color={red[900]} mt={2} sx={{wordWrap: 'break-word'}}>{sessionId}</Typography>
          </Box>
        )}
      </Container>
    </Box>  
  );
}

export default function WrappedComponent() {
  return (
    <WaThemeWrapper>
      <OnboardingPaymentSuccessPage />
    </WaThemeWrapper>
  );
}
