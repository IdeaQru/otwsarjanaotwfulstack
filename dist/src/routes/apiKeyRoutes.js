"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiKeyController_1 = require("../controllers/apiKeyController");
const router = express_1.default.Router();
// Route untuk membuat API key
router.post('/api-keys', apiKeyController_1.createApiKey);
router.get('/api-keys', apiKeyController_1.getApiKeys);
router.get('/api-keys/:userId', apiKeyController_1.getApiKeysbyID);
exports.default = router;
