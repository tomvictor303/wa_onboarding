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
import OnboardingHeader from '../components/OnboardingHeader';
import { NumberZeroIfNaN } from 'utils/custom';

import { APP_CONSTANTS, API_CONSTANTS } from '../../../config/config';
const { ONBOARDING_SIGN_URL, SIGNATURELY_PATH } = API_CONSTANTS;
const emptyContract = {
  firstName: '',
  lastName: '',
  companyName: '',
  email: '',
  setup_price: 0,
  cleanup_price: 0,
  wa_price: 0,
};

const OnboardingContractPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();  
  const jwtOnboardingToken: string|null = localStorage?.getItem("jwt_onboarding_token");
  const [ contractData, setContractData ] = useState<ContractInfo>(emptyContract);
  const [ currentOnboarding, setCurrentOnboarding ] = useState<any>(null);

  if ( window && window.document ) {
    window.document.title = "Onboarding";
  }

  useEffect(() => {
    // BEGIN initial_loading
    dispatch(showBackdrop({message: `Loading current progress ...` }));

    fetch(ONBOARDING_SIGN_URL + '/current_onboarding')
    .then((response) => response.json())
    .then((data) => {
      dispatch(hideBackdrop(null));
      if(data.success) {
        setCurrentOnboarding(data.current_onboarding);
        setContractData(prev => ({ 
          ...prev,
          firstName: data.current_onboarding?.firstName,
          lastName: data.current_onboarding?.lastName,
          companyName: data.current_onboarding?.companyName,
          email: data.current_onboarding?.email,
          setup_price: data.current_onboarding?.setup_price,
          cleanup_price: data.current_onboarding?.cleanup_price,
          wa_price: data.current_onboarding?.wa_price,
        }));
      } else {
        dispatch(showSnackBar({ type: 'error', message: data.msg })); 
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch(hideBackdrop(null));
      dispatch(showSnackBar({ type: 'error', message: `Error on AJAX call: ${error.toString()}` })); 
    });
    // END initial_loading
  }, []);

  return (
    <Box sx={{minHeight: "100vh", background: 'white'}}> 
      <Box>
        <OnboardingHeader />
      </Box>
      <Container maxWidth="lg"
        sx={{paddingTop: "20px", paddingBottom: "10px"}}>
        <form method='post' action={`${SIGNATURELY_PATH}/public_area/create-signature-request-v2`}>
          <Box display={'none'}>
            <input type='hidden' name="source_page_url" value={window?.location?.href} />
            <input type='hidden' name="jwt_onboarding_token" value={(jwtOnboardingToken ? jwtOnboardingToken : "")} />
          </Box>

          <Typography variant='h4' align='center' mb={1} >
            Thank you for the payment!
          </Typography>
          <Typography variant='h4' align='center' mb={{xs:4, md:4}} >
            Please sign the contract for onboarding.
          </Typography>

          <Box display={'flex'} justifyContent={'center'}>
            <Grid container spacing={2} sx={{mt: 0.5, maxWidth: 500}}>
              <Grid item xs={12}>
                <TextField variant="outlined" fullWidth label='First name' name='firstName'
                  value={contractData?.firstName} 
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setContractData(prev => ({ ...prev, firstName: event.target.value }));
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField variant="outlined" fullWidth label='Last name' name='lastName' 
                  value={contractData?.lastName} 
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setContractData(prev => ({ ...prev, lastName: event.target.value }));
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField variant="outlined" fullWidth label='Company name' name='companyName' 
                  value={contractData?.companyName} 
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setContractData(prev => ({ ...prev, companyName: event.target.value }));
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField variant="outlined" fullWidth label='Gmail' name='email'  
                  type={'email'}
                  value={contractData?.email} 
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setContractData(prev => ({ ...prev, email: event.target.value }));
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField variant="outlined" fullWidth label='Setup Fee' name='setup_price' 
                  type={'number'}
                  value={NumberZeroIfNaN(contractData?.setup_price)} 
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setContractData(prev => ({ ...prev, setup_price: NumberZeroIfNaN(event.target.value) }));
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField variant="outlined" fullWidth label='Transaction Backlog Clean Up' name='cleanup_price' 
                  type={'number'}
                  value={NumberZeroIfNaN(contractData?.cleanup_price)} 
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setContractData(prev => ({ ...prev, cleanup_price: NumberZeroIfNaN(event.target.value) }));
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField variant="outlined" fullWidth label='Weekly Acocunting Monthly Price' name='wa_price' 
                  type={'number'}
                  value={NumberZeroIfNaN(contractData?.wa_price)} 
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setContractData(prev => ({ ...prev, wa_price: NumberZeroIfNaN(event.target.value) }));
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          
          <Box mt={4} textAlign={'center'}>
            <Button type="submit" variant="contained" size="large" >
              Create contract document
            </Button>            
          </Box>
        </form>
      </Container>
    </Box>  
  );
}

export default function WrappedComponent() {
  return (
    <WaThemeWrapper>
      <OnboardingContractPage />
    </WaThemeWrapper>
  );
}
