import { useState } from "react";
import { APP_CONSTANTS } from "../../config/config";
const { BASE_PATH } = APP_CONSTANTS;

// Pass URL
const useGoogleIdentify = (url, customSuccessCallback) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogle = async (response) => {
    setLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ credential: response.credential }),
    })
      .then((res) => {
        setLoading(false);

        return res.json();
      })
      .then((data) => {
        if (customSuccessCallback) {
          customSuccessCallback(data);
        } else {
          // BEGIN default_success_callback
          // default, callback actions for login...
          if (data?.user) {
            localStorage.setItem("user", JSON.stringify(data?.user));
            localStorage.setItem("jwt_token", data?.jwt_token);

            let params = new Proxy(new URLSearchParams(window.location.search), {
              get: (searchParams, prop) => searchParams.get(prop),
            });

            if (params.redirectUri) {
              window.location.href = decodeURIComponent(params.redirectUri);
            } else {
              window.location.href = BASE_PATH;
            }
          } // END default_success_callback
        }

        throw new Error(data?.message || data);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };
  return { loading, error, handleGoogle };
};

export default useGoogleIdentify;
