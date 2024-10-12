const IS_PRODUCTION = import.meta.env.PROD;
const AUTH_REDIRECT_URI = import.meta.env.VITE_AUTH0_REDIRECT_URI;

const periodLaterYears = 3;
const periodPreviousYears = 1;

const mediaQueryMobile = "(max-width: 580px)";

const maxRetriesServices = 5;
const fetchTimeoutServices = 3000;

const enviroment = {
  CLIENT_ID: import.meta.env.VITE_AUTH0_CLIENT_ID,
  CLIENT_SECRET: import.meta.env.VITE_AUTH0_CLIENT_SECRET,
  AUTH0_DOMAIN: import.meta.env.VITE_AUTH0_DOMAIN,
  REDIRECT_URI: IS_PRODUCTION ? window.location.origin : AUTH_REDIRECT_URI,
  IPROCESS_API_URL_QUERY: import.meta.env.VITE_IPROCESS_API_URL_QUERY,
  IPROCESS_API_URL_QUERY_ENUM: import.meta.env.VITE_IPROCESS_API_URL_QUERY_ENUM,
  IPROCESS_API_URL_PERSISTENCE: import.meta.env
    .VITE_IPROCESS_API_URL_PERSISTENCE,
    IREQUER_API_URL_QUERY: import.meta.env.VITE_IREQUER_API_URL_QUERY,  
  TEMP_BUSINESS_UNIT: "test",
  IVITE_ISAAS_QUERY_PROCESS_SERVICE: import.meta.env
    .VITE_ISAAS_QUERY_PROCESS_SERVICE,
};

export {
  enviroment,
  periodLaterYears,
  periodPreviousYears,
  mediaQueryMobile,
  maxRetriesServices,
  fetchTimeoutServices,
};



