/* Route declarations for the app */

import * as reviews from '../views';
import { APP_CONSTANTS } from '../config/config';

const { BASE_PATH } = APP_CONSTANTS;
const { ONBOARDING_CONTRACT_PAGE_PATH, ONBOARDING_CHECKOUT_PAGE_PATH, ONBOARDING_CHECKOUTSUCCESS_PAGE_PATH } = APP_CONSTANTS

const routData = [
    {
        id: 'route-000',
        path: '*',
        component: reviews.NoPageFound,
        requiresAuth: false,
    },
    {
        id: 'route-wf-002',
        path: '/',
        component: reviews.OnboardingWelcomePage,
        requiresAuth: false,
    },
    {
        id: 'route-wf-002',
        path: '/login',
        component: reviews.OnboardingLoginPage,
        requiresAuth: false,
    },
    {
        id: 'route-wf-003',
        path: ONBOARDING_CHECKOUT_PAGE_PATH,
        component: reviews.OnboardingPaymentPage,
        requiresAuth: false,
    },
    {
        id: 'route-wf-004',
        path: ONBOARDING_CHECKOUTSUCCESS_PAGE_PATH,
        component: reviews.OnboardingPaymentSuccessPage,
        requiresAuth: false,
    },
    {
        id: 'route-wf-005',
        path: ONBOARDING_CONTRACT_PAGE_PATH,
        component: reviews.OnboardingContractPage,
        requiresAuth: false,
    },
];

export default routData;
