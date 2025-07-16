import db from '../config/db.js';

export const createUserTable = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      firstName TEXT,
      lastName TEXT,
      phone TEXT,
      city TEXT,
      pincode TEXT
    )
  `);
};

export const saveUser = (user, callback) => {
  const { email, firstName, lastName, phone, city, pincode } = user;
  db.run(
    `INSERT OR REPLACE INTO users (email, firstName, lastName, phone, city, pincode)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [email, firstName, lastName, phone, city, pincode],
    callback
  );
};

export const getUserByEmail = (email, callback) => {
  db.get(`SELECT * FROM users WHERE email = ?`, [email], callback);
};
