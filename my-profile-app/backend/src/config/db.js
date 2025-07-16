import sqlite3 from 'sqlite3';
import { config } from './env.js';

sqlite3.verbose();

const db = new sqlite3.Database(config.dbPath, (err) => {
  if (err) {
    console.error('DB Connection failed:', err.message);
    throw err;
  } else {
    console.log('Connected to SQLite DB at', config.dbPath);
  }
});

export default db;
