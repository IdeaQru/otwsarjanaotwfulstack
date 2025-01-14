import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
const secretKey = 'your_secret_key';
let apiKey = '';

// Middleware untuk verifikasi API key
export const verifyApiKey = (req: Request, res: Response, next: NextFunction) => {
  const key = req.header('x-api-key');
  if (key === apiKey) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Fungsi untuk memperbarui API key
export const updateApiKey = () => {
  apiKey = jwt.sign({ date: new Date() }, secretKey, { expiresIn: '1d' });
  // console.log('API key updated:', apiKey);
  fs.writeFileSync('apikey.txt', `API key: ${apiKey}\n`, { flag: 'a' });

  console.log('API key updated and saved to apikey.txt');
};

export { apiKey };
