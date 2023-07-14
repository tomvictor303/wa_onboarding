import React, { useEffect, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { showBackdrop, hideBackdrop } from 'store/slices/backdrop.slice';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import useGoogleIdentify from "utils/hooks/useGoogleIdentify";
import { APP_CONSTANTS, API_CONSTANTS } from '../../../config/config';
import TextField from '@mui/material/TextField';
import signup_welcome_img from 'assets/images/signup/signup_welcome.jpg';
import logo_img from 'assets/images/logo.png';
import signup_1_img from 'assets/images/signup/signup_1.png';
import Alert from '@mui/material/Alert';
import { Link } from '@mui/material';

const { APP_TITLE, APP_GOOGLE_CLIENT_ID } = APP_CONSTANTS;
const { ONBOARDING_SIGN_URL } = API_CONSTANTS;

export interface OnboardingLoginStep1Props { 
  gmailData: any;
  companyName: string;
  onGmailVerified: (data: any) => void;
  onCompanyNameChange: (new_name: string) => void;
  onSignUpSuccess: (signUpResponse: any) => void;
}

const OnboardingLoginStep1 = ({
  gmailData,
  companyName,
  onGmailVerified,
  onCompanyNameChange,
  onSignUpSuccess,
}: OnboardingLoginStep1Props) => { 
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const gmailCheckedCallback = (data: any) => { 
    onGmailVerified?.(data);
  }

  const { handleGoogle, loading, error } = useGoogleIdentify(
    `${ONBOARDING_SIGN_URL}/check_gmail`,
    gmailCheckedCallback    
  );
  const [error2, setError2] = React.useState<string>("");

  useEffect(() => {
      /* global google */
      if (window.google) {
          window.google.accounts.id.initialize({
              client_id: APP_GOOGLE_CLIENT_ID,
              callback: handleGoogle,
          });

          window.google.accounts.id.renderButton(document.getElementById("loginDiv"), {
              // type: "standard",
              theme: "filled_black",
              // size: "small",
              text: "Sign up with Google",
              shape: "pill",
          });

          // google.accounts.id.prompt()
      }
  }, [handleGoogle]);  

  const handleSubmit = useCallback((): void => { 
    var data = {
      user: gmailData,
      companyName,
    }

    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    dispatch(showBackdrop({message: "Creating account..." }));

    fetch(`${ONBOARDING_SIGN_URL}/setup`, options)
    .then((response) => response.json())
    .then((data) => {
      dispatch(hideBackdrop(null));

      if(data.success) {
        onSignUpSuccess?.(data);
      } else { 
        setError2(data.msg);
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch(hideBackdrop(null));
      setError2(error.toString());
    });
  }, [ gmailData, companyName ]); 

  // Now real render ...
  return (
    <>
      <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
          {
          !gmailData
          // BEGIN render_verify_view 
          ? (<>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6}}>              
              <img
                src={logo_img}
                alt={`Welcome`}
                style={{ width: '100%', maxWidth: '300px', height: 'auto'}}
              />
            </Box>
            <Typography variant='h4' sx={{mt: 6, fontWeight: 200, textAlign: 'center'}}>
              Please start / <Box display={'inline'} color={'primary.main'}>resume</Box> onboarding process with Google account.
            </Typography>
            <Box component="form" noValidate sx={{ mt: 4 }}>
              <main
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {error && <Alert severity="error" sx={{mb: 1}} style={{marginBottom: "1em" }}>{error}</Alert>}
                {loading ? <div>Loading....</div> : <div id="loginDiv"></div>}
              </main>
            </Box>
          </>)
          // END render_verify_view
          // =============================================================      
          // =============================================================
          // BEGIN render_main_view
          : (<> 
            <Grid container spacing={3}  sx={{mt: 0.5}}>
              <Grid item xs={12}>
                <TextField variant="outlined" fullWidth placeholder='First name' value={gmailData.firstName} InputProps={{ readOnly: true }} />
              </Grid>
              <Grid item xs={12}>
                <TextField variant="outlined" fullWidth placeholder='Last name' value={gmailData.lastName} InputProps={{ readOnly: true }} />
              </Grid>
              <Grid item xs={12}>
                <TextField variant="outlined" fullWidth placeholder='Gmail' value={gmailData.email} InputProps={{ readOnly: true }} />
              </Grid>
              <Grid item xs={12}>
                <TextField variant="outlined" fullWidth placeholder='Enter your company name' 
                  value={companyName}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    onCompanyNameChange?.(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{mt: 3}}>
                <Typography variant='body1'>
                  I accept Weekly Accounting 's <Link href='https://www.weeklyaccounting.com/terms-of-use' target='_top'>Terms of Use</Link> and <Link href='https://www.weeklyaccounting.com/privacy-notice' target='_top'>Privacy Policy</Link>
                </Typography>
              </Grid>
              <Grid item xs={12}>                
                {error2 && <Alert severity="error" sx={{mb: 1}} style={{marginBottom: "1em" }}>{error2}</Alert>}
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center">
                  <Button variant="contained" size="large" fullWidth onClick={handleSubmit}>
                    Setup
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </>) 
          // END render_main_view
          }
        </Grid>
        <Grid item sm={6} xs={12} sx={{display: { xs: 'none', sm: 'flex' }}}>
          <img
            src={signup_1_img}
            alt={`Dashboard`}
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>
      </Grid> 
    </>
  );
}

export default memo(OnboardingLoginStep1);