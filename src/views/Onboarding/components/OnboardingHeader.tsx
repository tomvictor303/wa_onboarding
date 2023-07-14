import React, { useState, useEffect, useCallback, memo } from 'react';
import Box from '@mui/material/Box';
import logo from 'assets/images/logo.png';
import { APP_CONSTANTS, API_CONSTANTS } from '../../../config/config';
const { APP_TITLE } = APP_CONSTANTS;

const OnboardingHeader = () => {
  return (
    <Box sx={{pt: 2, pb: 2, pl: 8, pr: 8, borderBottom: '2px solid #dbe2e6' }}>
      <a href="https://weeklyaccounting.com" target="_top">
        <img
          src={logo}
          alt={APP_TITLE}
          style={{ width: '150px', height: 'auto' }}
          className="AppLogo"
        />
      </a>
    </Box>
  );
}

export default memo(OnboardingHeader);