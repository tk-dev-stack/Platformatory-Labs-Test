// server.js
import dotenv from 'dotenv';
import app from './src/app.js';
import { config } from './src/config/env.js';
import { createUserTable } from './src/models/user.model.js';

dotenv.config();
createUserTable();

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
