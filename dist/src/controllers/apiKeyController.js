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
exports.getApiKeysbyID = exports.getApiKeys = exports.createApiKey = void 0;
const apiKeyService_1 = __importDefault(require("../services/apiKeyService"));
// Controller untuk membuat API Key
const createApiKey = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, username, email, apiKeyCount } = req.body; // Mengambil data dari request body
        // Memanggil ApiKeyService untuk membuat API keys
        const result = yield apiKeyService_1.default.createApiKeys({
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error generating API keys' });
    }
});
exports.createApiKey = createApiKey;
const getApiKeys = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiKeys = yield apiKeyService_1.default.getApiKeys();
        res.status(200).json(apiKeys);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching API keys' });
    }
});
exports.getApiKeys = getApiKeys;
const getApiKeysbyID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiKeys = yield apiKeyService_1.default.getApiKeysbyID(req.params.userId);
        res.status(200).json(apiKeys);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching API keys' });
    }
});
exports.getApiKeysbyID = getApiKeysbyID;
