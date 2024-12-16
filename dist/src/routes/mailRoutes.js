"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/mailZoneRoutes.ts
const express_1 = __importDefault(require("express"));
const mailZoneController_1 = require("controllers/mailZoneController");
const router = express_1.default.Router();
// Endpoint untuk menambah SBNP Zone
router.post('/add-sbnp-zone', mailZoneController_1.addSbnZone);
exports.default = router;
