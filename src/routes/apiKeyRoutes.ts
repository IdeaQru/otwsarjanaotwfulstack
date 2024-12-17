import express from 'express';
import { createApiKey, getApiKeys,getApiKeysbyID } from '../controllers/apiKeyController';
import { get } from 'http';

const router = express.Router();

// Route untuk membuat API key
router.post('/api-keys', createApiKey);
router.get('/api-keys', getApiKeys);
router.get('/api-keys/:userId', getApiKeysbyID);
export default router;
