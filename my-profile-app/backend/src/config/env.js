import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  dbPath: process.env.DB_PATH || './database.sqlite', // Match your .env
};
