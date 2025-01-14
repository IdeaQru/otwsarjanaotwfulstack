import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

import app from './index';

// Konversi PORT ke tipe number untuk memastikan tidak ada kesalahan tipe
const PORT = Number(process.env.PORT) || 80;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});


