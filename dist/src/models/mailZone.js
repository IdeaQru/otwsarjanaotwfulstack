"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/mailZone.ts
const mongoose_1 = __importStar(require("mongoose"));
const mailZoneSchema = new mongoose_1.Schema({
    sbnpName: {
        type: String,
        required: true,
        unique: true, // Membuat sbnpName harus unik
    },
    sbnpType: {
        type: String,
        required: true,
    },
    selectedApiKey: {
        type: String,
        required: true,
        unique: true, // Membuat selectedApiKey harus unik
    },
    mmsi: {
        type: Number,
        required: true,
        unique: true, // Membuat mmsi harus unik
    },
    baseStationMmsi: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
});
// Membuat index untuk memastikan query lebih cepat saat mencari duplikasi
mailZoneSchema.index({ sbnpName: 1, selectedApiKey: 1, mmsi: 1 }, { unique: true });
const MailZone = mongoose_1.default.model('MailZone', mailZoneSchema);
exports.default = MailZone;
