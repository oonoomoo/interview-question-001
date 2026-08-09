import { ENV, MODE } from "@constants/constants";

interface AppEnvConfig {
  env: string;
  baseApi: string;
}

const local: AppEnvConfig = {
  env: ENV.LOCAL,
  baseApi: "http://127.0.0.1:3000",
};

const prd: AppEnvConfig = {
  env: ENV.PRD,
  baseApi: "http://127.0.0.1:3000",
};

let appConfig;

switch (import.meta.env.MODE) {
  case MODE.DEVELOPMENT:
    appConfig = local;
    break;
  default:
    appConfig = prd;
    break;
}

const config = {
  ...appConfig,
};

export default config;
