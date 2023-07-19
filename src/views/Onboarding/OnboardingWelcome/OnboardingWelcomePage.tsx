import React, { useCallback, useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { showSnackBar, hideSnackBar } from 'store/slices/snackbar.slice';
import { showBackdrop, hideBackdrop } from 'store/slices/backdrop.slice';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container/Container';

import WaThemeWrapper from 'components/Custom/Wrappers/WaThemeWrapper';

import OnboardingHeader from '../components/OnboardingHeader';
import wa_cube from 'assets/images/wa_cube.png'

import { APP_CONSTANTS, API_CONSTANTS } from '../../../config/config';
import { Grid, Stack, Typography } from '@mui/material';
const { APP_TITLE, BASE_PATH, ONBOARDING_CHECKOUT_PAGE_PATH } = APP_CONSTANTS;

const OnboardingWelcomePage = () => { 

  const location = useLocation();

  // BEGIN default_url
  if ( location.pathname === '/' || location.pathname === '') {
    let default_url: string = ONBOARDING_CHECKOUT_PAGE_PATH;
    default_url += location.search;

    window.location.href = BASE_PATH + default_url;
  }
  // END default_url

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', background: 'white' }}
    >
      <Grid item xs={3}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={2}>
          <Box>
            <img
              src={wa_cube}
              alt={APP_TITLE}
              className={'wa-getstarted-image1'}
            />
          </Box>
          <Typography variant='h2' fontWeight={100} color={'grey.600'} >Loading ...</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default function WrappedComponent() {
  return (
    <WaThemeWrapper>
      <OnboardingWelcomePage />
    </WaThemeWrapper>
  );
}
