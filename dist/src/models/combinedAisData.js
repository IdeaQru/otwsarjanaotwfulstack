"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CombinedAisDataSchema = new mongoose_1.Schema({
    mmsi: { type: Number, required: true, unique: true },
    lon: { type: Number, required: true },
    lat: { type: Number, required: true },
    name: { type: String },
    type: { type: Number },
    destination: { type: String },
    speedOverGround: { type: Number },
    courseOverGround: { type: Number, required: false },
    heading: { type: Number, },
    timestamp: { type: String, },
});
const CombinedAisData = (0, mongoose_1.model)('CombinedAisData', CombinedAisDataSchema);
exports.default = CombinedAisData;
