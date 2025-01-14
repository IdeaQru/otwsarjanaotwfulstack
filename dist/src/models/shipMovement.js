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
exports.ShipMovement = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ShipMovementSchema = new mongoose_1.Schema({
    shipId: { type: Number, required: true },
    shipName: { type: String, default: "Unknown Ship Name" },
    zoneId: { type: String, required: true },
    zoneType: { type: String, required: true },
    zoneName: { type: String, required: true },
    action: { type: String, enum: ["enter", "exit"], required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    timestamp: { type: Date, required: true },
    sog: { type: Number, default: null }, // Speed Over Ground
    cog: { type: Number, default: null }, // Course Over Ground
    heading: { type: Number, default: null }, // Heading
    destination: { type: String, default: null }, // Destination
});
exports.ShipMovement = mongoose_1.default.model("ShipMovement", ShipMovementSchema);
