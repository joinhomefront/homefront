const isProduction = process.env.NODE_ENV === "production";

const PRODUCTION_BASE_URL = "https://d1a1w7ulyz8ubg.cloudfront.net";
const DEVELOPMENT_BASE_URL = "http://localhost:3000";

export const getBaseUrl = () => {
  return isProduction ? PRODUCTION_BASE_URL : DEVELOPMENT_BASE_URL;
};
