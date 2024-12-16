"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeyService = void 0;
const apiKey_1 = __importDefault(require("../models/apiKey"));
const uuid_1 = require("uuid"); // Menggunakan UUID untuk menghasilkan API key unik
class ApiKeyService {
    // Method untuk membuat API Key
    createApiKeys(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId, username, email, apiKeyCount }) {
            try {
                const generatedKeys = [];
                // Generate API keys sebanyak count yang diminta
                for (let i = 0; i < apiKeyCount; i++) {
                    const apiKey = (0, uuid_1.v4)(); // Membuat API key unik
                    const newApiKey = new apiKey_1.default({
                        key: apiKey,
                        userId: userId,
                        username: username,
                        email: email,
                    });
                    // Simpan API key ke dalam database
                    yield newApiKey.save();
                    // Push API key ke array untuk response
                    generatedKeys.push({
                        key: apiKey,
                        userName: username,
                        email: email,
                        createdAt: newApiKey.createdAt,
                    });
                }
                return { generatedKeys, message: `${apiKeyCount} API keys successfully generated.` };
            }
            catch (error) {
                throw new Error('Error generating API keys');
            }
        });
    }
    getApiKeys() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apiKeys = yield apiKey_1.default.find({});
                return apiKeys;
            }
            catch (error) {
                throw new Error('Error fetching API keys');
            }
        });
    }
    getApiKeysbyID(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apiKeys = yield apiKey_1.default.find({ userId: userId });
                return apiKeys;
            }
            catch (error) {
                throw new Error('Error fetching API keys');
            }
        });
    }
}
exports.ApiKeyService = ApiKeyService;
exports.default = new ApiKeyService();
