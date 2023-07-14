/* Constants to be used across the app */

export const APP_CONSTANTS = {
  APP_TITLE: process.env.NODE_ENV !== 'development'? 'Weekly Accounting' : 'Dev - DataAdmin',
  PAGE_NOT_FOUND: 'Page Not found',
  BASE_PATH: '/onboard', 
  IS_DEV: process.env.NODE_ENV === 'development',
  APP_GOOGLE_CLIENT_ID: "696306601495-81is0pg479ppjfolupl9dau2rsgcuklv.apps.googleusercontent.com",
  MB_BASE_PATH: process.env.NODE_ENV !== 'development'? 'https://data.weeklyaccounting.com' : 'http://localhost:3000',

  // page route constants
  ONBOARDING_CHECKOUT_PAGE_PATH: '/checkout',
  ONBOARDING_CHECKOUTSUCCESS_PAGE_PATH: '/checkoutSuccess',
  ONBOARDING_CONTRACT_PAGE_PATH: '/contract',
};

const app_path = process.env.NODE_ENV !== 'development'? 'https://data.weeklyaccounting.com/integration' : 'http://localhost:8011/integration'; 

export const API_CONSTANTS = {
  API_URL: app_path + '/api',
  QB_PATH: app_path + '/apps/quickbooks',
  SIGNATURELY_PATH: app_path + '/apps/signaturely',
  DESTINATION_GOOGLE_SHEET_PATH: app_path + '/apps/destination_google_sheet',
  STRIPE_PATH: app_path + '/apps/stripe',
  // onboarding_sign
  ONBOARDING_SIGN_URL: app_path + '/sign/onboarding_sign',
  // customer_sign for metabase account setup ; will be deprecated
  CUSTOMER_SIGN_URL: app_path + '/sign/customer_sign',
  CHECK_CUSTOMER_SIGN_GMAIL_URL: app_path + '/sign/customer_sign/check_customer_sign_gmail',
};
