import { Request, Response } from 'express';
import ApiKeyService from '../services/apiKeyService';

// Controller untuk membuat API Key
export const createApiKey = async (req: Request, res: Response) => {
  try {
    const { userId, username, email, apiKeyCount } = req.body;  // Mengambil data dari request body

    // Memanggil ApiKeyService untuk membuat API keys
    const result = await ApiKeyService.createApiKeys({
      userId,
      username,
      email,
      apiKeyCount,
    });

    // Mengirimkan response dengan API keys yang berhasil dibuat
    res.status(201).json({
      message: result.message,
      generatedKeys: result.generatedKeys,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating API keys' });
  }
};

export const getApiKeys = async (req: Request, res: Response) => {
  try {
    const apiKeys = await ApiKeyService.getApiKeys();
    res.status(200).json(apiKeys);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching API keys' });
  }
};

export const getApiKeysbyID = async (req: Request, res: Response) => {
  try {
    const apiKeys = await ApiKeyService.getApiKeysbyID(req.params.userId);
    res.status(200).json(apiKeys);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching API keys' });
  }
};