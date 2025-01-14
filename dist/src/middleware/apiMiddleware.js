"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiKey = exports.updateApiKey = exports.verifyApiKey = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const secretKey = 'your_secret_key';
let apiKey = '';
exports.apiKey = apiKey;
// Middleware untuk verifikasi API key
const verifyApiKey = (req, res, next) => {
    const key = req.header('x-api-key');
    if (key === apiKey) {
        next();
    }
    else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
exports.verifyApiKey = verifyApiKey;
// Fungsi untuk memperbarui API key
const updateApiKey = () => {
    exports.apiKey = apiKey = jsonwebtoken_1.default.sign({ date: new Date() }, secretKey, { expiresIn: '1d' });
    // console.log('API key updated:', apiKey);
    fs_1.default.writeFileSync('apikey.txt', `API key: ${apiKey}\n`, { flag: 'a' });
    console.log('API key updated and saved to apikey.txt');
};
exports.updateApiKey = updateApiKey;
