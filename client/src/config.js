const config = {};

if (process.env.NODE_ENV === "production") {
  config.baseApiUrl = process.env.REACT_APP_BASE_API_URL;
  config.baseWsUrl = process.env.REACT_APP_BASE_WS_URL;
} else {
  config.baseApiUrl = "https://taxi-demo-backend.herokuapp.com";
  config.baseWsUrl = "wss://taxi-demo-backend.herokuapp.com";
}

export default config;
