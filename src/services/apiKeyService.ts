import ApiKey from '../models/apiKey';
import { v4 as uuidv4 } from 'uuid';  // Menggunakan UUID untuk menghasilkan API key unik

interface ApiKeyInput {
  userId: string;
  username: string;
  email: string;
  apiKeyCount: number;
}

export class ApiKeyService {
  // Method untuk membuat API Key
  async createApiKeys({ userId, username, email, apiKeyCount }: ApiKeyInput) {
    try {
      const generatedKeys = [];

      // Generate API keys sebanyak count yang diminta
      for (let i = 0; i < apiKeyCount; i++) {
        const apiKey = uuidv4();  // Membuat API key unik
        const newApiKey = new ApiKey({
          key: apiKey,
          userId: userId,
          username: username,
          email: email,
        });

        // Simpan API key ke dalam database
        await newApiKey.save();
        
        // Push API key ke array untuk response
        generatedKeys.push({
          key: apiKey,
          userName: username,
          email: email,
          createdAt: newApiKey.createdAt,
        });
      }

      return { generatedKeys, message: `${apiKeyCount} API keys successfully generated.` };
    } catch (error) {
      throw new Error('Error generating API keys');
    }
  }

  async getApiKeys() {
    try {
      const apiKeys = await ApiKey.find({});
      return apiKeys;
    } catch (error) {
      throw new Error('Error fetching API keys');
    }
  }
  async getApiKeysbyID(userId: string) {
    try {
      const apiKeys = await ApiKey.find({ userId: userId });
      return apiKeys;
    } catch (error) {
      throw new Error('Error fetching API keys');
    }
  }
}

export default new ApiKeyService();
