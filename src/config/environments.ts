import ConfigTypes from "./config";

const appConfig: ConfigTypes = {
  app: {
    PORT: Number(process.env.APP_PORT) || 4000,
    HOST: process.env.APP_HOST || '192.168.1.29',
  },
  db: {
    HOST: process.env.DB_HOST || '127.0.0.1',
    PORT: Number(process.env.DB_PORT) || 3306,
    DATABASE: process.env.DB_NAME || 'de_shuni',
    PASSWORD: process.env.DB_PASSWORD || "",
    USER: process.env.DB_USER || 'root',
  },
  cors: {
    allowOrigin: process.env.ALLOW_ORIGIN || 'http://localhost:4000',
  },
  sessions: {
    SECRET: process.env.CLIENT_SECRET || 'sessions',
  },
  passport: {
    JWT: {
      CLIENT_ID: process.env.JWT_CLIENT_ID,
      CLIENT_SECRET: process.env.JWT_CLIENT_SECRET || "lapara01",
      CALLBACK_URL: process.env.JWT_CALLBACK_URL,
    }
  },
};

export default appConfig;