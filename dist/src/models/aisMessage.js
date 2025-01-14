"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicModel = exports.StaticModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const staticDataSchema = new mongoose_1.default.Schema({
    mmsi: { type: Number, required: true },
    raw: { type: String, required: true },
    data: { type: Object, required: true },
    expirationTime: { type: Date, default: () => new Date(Date.now() + 2 * 60 * 60 * 1000) },
}, { timestamps: true });
exports.StaticModel = mongoose_1.default.model("StaticData", staticDataSchema);
staticDataSchema.index({ expirationTime: 1 }, { expireAfterSeconds: 0 });
const dynamicDataSchema = new mongoose_1.default.Schema({
    mmsi: { type: Number, required: true },
    raw: { type: String, required: true },
    data: { type: Object, required: true },
    expirationTime: { type: Date, default: () => new Date(Date.now() + 2 * 60 * 60 * 1000) },
}, { timestamps: true });
dynamicDataSchema.index({ expirationTime: 1 }, { expireAfterSeconds: 0 });
exports.DynamicModel = mongoose_1.default.model("DynamicData", dynamicDataSchema);
