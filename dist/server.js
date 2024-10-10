"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
const index_1 = __importDefault(require("./src/index"));
// Konversi PORT ke tipe number untuk memastikan tidak ada kesalahan tipe
const PORT = Number(process.env.PORT) || 3000;
index_1.default.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
