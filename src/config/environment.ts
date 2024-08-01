const IS_PRODUCTION = import.meta.env.PROD;
const AUTH_REDIRECT_URI = import.meta.env.VITE_AUTH0_REDIRECT_URI;

const periodLaterYears= 3;
const periodPreviousYears= 1;

const mediaQueryMobile = "(max-width: 580px)";

const enviroment = {
  CLIENT_ID: import.meta.env.VITE_AUTH0_CLIENT_ID,
  CLIENT_SECRET: import.meta.env.VITE_AUTH0_CLIENT_SECRET,
  AUTH0_DOMAIN: import.meta.env.VITE_AUTH0_DOMAIN,
  REDIRECT_URI: IS_PRODUCTION ? window.location.origin : AUTH_REDIRECT_URI,
  ICLIENT_API_URL_QUERY: import.meta.env.VITE_ICLIENT_API_URL_QUERY,
  ICLIENT_API_URL_QUERY_ENUM: import.meta.env.VITE_ICLIENT_API_URL_QUERY_ENUM,
  ICLIENT_API_URL_PERSISTENCE: import.meta.env.VITE_ICLIENT_API_URL_PERSISTENCE,
  TEMP_BUSINESS_UNIT: "test",
};

export { enviroment, periodLaterYears, periodPreviousYears, mediaQueryMobile };

