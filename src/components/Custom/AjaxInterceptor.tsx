import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import fetchIntercept from 'fetch-intercept';
import { showSnackBar, hideSnackBar } from 'store/slices/snackbar.slice';
import { APP_CONSTANTS } from '../../config/config';
import { array_includes } from 'utils/custom';

const AjaxInterceptor = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    
    useEffect(() => {
        const unregister = fetchIntercept.register({ 
            request: function (url, config) {
                if (!config) {
                    config = {};
                }
                // Disabled after using jwt...
                // Session is not compatible with Google Add on integration.
                // if (!config["credentials"]) {
                //     // This is essential !
                //     // Sending Credentials with a Fetch Request
                //     // We can persist cookie id with this option.
                //     // So we can be connected as session in server side...
                //     // https://web.dev/introduction-to-fetch/#sending-credentials-with-a-fetch-request
                //     config["credentials"] = 'include';
                // }
                if (!config.headers) {
                    config.headers = {};
                }
                if (!config.headers["X-Requested-With"]) {
                  // This flag does not include automatically, if you use 'fetch'
                  // It is added automatically only if you use jQuery Ajax.
                  // If this header is absent, req.xhr is not set on node.js server side.
                  config.headers["X-Requested-With"] = "XMLHttpRequest";
                }
                if (!config.headers["Content-Type"]) {
                    config.headers["Content-Type"] = 'application/json';
                }
                if (!config.headers["x-wa-datalinks-authorization"]) {
                    // jwt_token
                    config.headers["x-wa-datalinks-authorization"] = localStorage?.getItem("jwt_token");
                }
                if (!config.headers["x-wa-onboarding-authorization"]) {
                    // jwt_onboarding_token
                    config.headers["x-wa-onboarding-authorization"] = localStorage?.getItem("jwt_onboarding_token");
                }
                return [url, config];
            },
            response: function (response) {
                // Modify the reponse object 
                // BEGIN AJAX_AUTH_CHECK
                if ( 
                  response.status === 401 && 
                  window.location.pathname !== `${APP_CONSTANTS['BASE_PATH']}/login`
                ) {
                  // default
                  alert("Your request is unauthorized! Please login (again).");
                  window.location.href = `${APP_CONSTANTS['BASE_PATH']}/login?redirectUri=${encodeURIComponent(window.location.href)}`;
                }
                // END AJAX_AUTH_CHECK
                return response;
            },
            responseError: function (error) {
                console.log('Error on AJAX fetch')
                console.error(error)
                // Handle an fetch error
                return Promise.reject(error);
            },
        });

        return () => { unregister() };
    }, []);

    return (<></>);
};

export default AjaxInterceptor;
