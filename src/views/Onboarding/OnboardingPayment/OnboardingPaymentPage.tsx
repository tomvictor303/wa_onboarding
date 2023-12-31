import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { showSnackBar, hideSnackBar } from 'store/slices/snackbar.slice';
import { showBackdrop, hideBackdrop } from 'store/slices/backdrop.slice';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container/Container';

import WaThemeWrapper from 'components/Custom/Wrappers/WaThemeWrapper';
import { red } from '@mui/material/colors';
import OnboardingHeader from '../components/OnboardingHeader';

import wa_cube from 'assets/images/wa_cube.png'
import { APP_CONSTANTS, API_CONSTANTS } from '../../../config/config';
import { Button, Stack, Typography } from '@mui/material';
const { APP_TITLE } = APP_CONSTANTS;
const { STRIPE_PATH } = API_CONSTANTS;

type WaProduct = {
  key: string;
  title: string;
  price: number;
  cleanup_months?: number;
  // calcuated properties from above
  monthly: boolean;
  display_price: number;
  comment: string;
};

const OnboardingPaymentPage = () => {
  if ( window && window.document ) {
    window.document.title = "Onboarding";
  }

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<Array<WaProduct>>([]);
  const jwtOnboardingToken: string|null = localStorage?.getItem("jwt_onboarding_token");

  const getProduct = (key: string): WaProduct|null => {
    for ( let i = 0; i < products.length; i++ ) {
      if ( products[i].key === key) {
        return products[i];
      }
    }
    return null;
  }

  useEffect(()=> {
    let urlParams: any = new URLSearchParams(window.location.search);

    var params = {
      setup_price: urlParams.get('Setup'),
      cleanup_price: urlParams.get('CleanUp'),
      wa_price: urlParams.get('Monthly'),
      cleanup_months: urlParams.get('CleanUpMonths'),
      isDev: urlParams.get('isDev'),
    };

    let newProducts:Array<WaProduct> = [];
    if ( params.setup_price ) {
      let item = { key: 'setup', title: 'Setup Fee', price: Number(params.setup_price), monthly: false};
      newProducts.push({ ...item, display_price: item.price, comment: ''});
    }
    if ( params.cleanup_price ) {
      let item = { 
        key: 'cleanup', 
        title: 'Transaction Backlog Clean Up', 
        price: Number(params.cleanup_price), 
        monthly: params.cleanup_months > 1, 
        cleanup_months: params.cleanup_months
      };
      newProducts.push({ ...item, display_price: item.price, comment: ''});
    }
    if ( params.wa_price ) {
      let item = { key: 'weekly_accounting', title: 'Weekly Accounting', price: Number(params.wa_price), monthly: true};
      newProducts.push({ ...item, display_price: item.price, comment: ''});
    }
    // BEGIN refine_calculation 
    for (let i = 0; i < newProducts.length; i++) {
      let { key, cleanup_months, price} = newProducts[i];
      if (key === 'cleanup' && cleanup_months !== undefined && cleanup_months > 1) {
        newProducts[i].display_price = price / cleanup_months;
        newProducts[i].comment = Number(price).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }) + ' USD over ' + cleanup_months + ' months';
      }
    } // END refine_calculation
    setProducts(newProducts);
  }, [])

  let total_now_price = 0, total_monthly_price = 0;
  for(let i = 0; i < products.length; i++) {
    if ( products[i].monthly ) {
      total_monthly_price += products[i].display_price;
    } else {
      total_now_price += products[i].display_price;
    }
  }

  const now = new Date();
  const first_day_of_next_month = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  return (
    <Box sx={{minHeight: "100vh", background: 'white'}}> 
      <Box>
        <OnboardingHeader />
      </Box>
      <Container maxWidth="lg"
        sx={{paddingTop: "20px", paddingBottom: "10px", maxWidth: '1100px!important'}}>          
          <form action={`${STRIPE_PATH}/public_area/create-checkout-session`} method="POST"> 
            <Typography variant='h4' color={'text.secondary'} align='center' mb={{xs:4, md:4}} >Welcome! Please checkout to get started.</Typography>

            {products.map((product: any, index: number) =>
              <Box py={{xs:2, md:4}} borderBottom={'1px solid'} borderColor={'grey.300'}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'}>
                  <Box>
                    <img
                      src={wa_cube}
                      alt={APP_TITLE}
                      className={'wa-getstarted-image1'}
                    />
                  </Box>
                  <Stack width={'100%'} direction={{xs:'column', md:'row'}} alignItems={{md:'center'}} justifyContent={'space-between'} gap={1}>
                    <Typography variant='h4' fontWeight={100} color={'grey.600'} textAlign={'left'} pl={{xs:2, md:5}}>
                      <Box fontSize={{xs: 16, sm: 'unset'}}>{product.title}</Box>
                    </Typography>
                    <Box>
                      <Stack width={'100%'} direction={'column'} alignItems={'end'} justifyContent={'space-between'} gap={1}>
                        <Typography variant='h5' color={'text.secondary'} textAlign={'right'}>{Number(product.display_price).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2})} USD {product.monthly?'/ month':''}</Typography>
                        { product.comment && (
                          <Typography variant='body1' color={'text.secondary'} textAlign={'right'}>{product.comment}</Typography>
                        )}
                      </Stack>
                    </Box>
                  </Stack>
                </Stack>
              </Box>
            )}

            { !products.length && (
              <Box>
                <Typography variant='h4' color={red[500]} align='center' mb={{xs:4, md:4}} >
                  Sorry. Nothing to checkout.
                </Typography>
                <Typography variant='h5' color={'text.secondary'} align='center' mb={{xs:4, md:4}} >
                  Please get correct <Box display={'inline'} color={'primary.main'}>checkout url</Box> from administrator and open it again with this web browser.
                </Typography>
              </Box>
            )}

            <Box mt={2}>
              <Box textAlign={'right'}>
                <Typography variant='h4' fontWeight={100} color={'grey.600'} align='center' display={'inline-block'}>Total Price Today&nbsp;</Typography>
                <Typography variant='h5' color={'text.secondary'} align='center' display={'inline-block'}>{Number(total_now_price).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2})} USD</Typography>
              </Box>
              <Box textAlign={'right'} mt={1}>
                { total_monthly_price > 0 && (
                    <Typography variant='h6' fontWeight={100} color={'grey.600'} align='center' display={'inline-block'}>
                      {Number(total_monthly_price).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      }) + " USD / month from " + first_day_of_next_month.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                )}
              </Box>            
            </Box>

            <Box display={'hidden'}>
              <input type='hidden' name="wa_price" value={getProduct('weekly_accounting')?.price} /> 
              <input type='hidden' name="setup_price" value={getProduct('setup')?.price} /> 
              <input type='hidden' name="cleanup_price" value={getProduct('cleanup')?.price} />
              <input type='hidden' name="cleanup_months" value={getProduct('cleanup')?.cleanup_months} />
              <input type='hidden' name="source_page_url" value={window?.location?.href} />
              <input type='hidden' name="jwt_onboarding_token" value={(jwtOnboardingToken ? jwtOnboardingToken : "")} />
            </Box>

            <Box mt={4} textAlign={'right'}>
              <Button variant="contained" size="large" type="submit">
                Checkout
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
      <OnboardingPaymentPage />
    </WaThemeWrapper>
  );
}
