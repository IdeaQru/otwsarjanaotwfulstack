"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gpsAisData = void 0;
const mongoose_1 = require("mongoose");
// Skema untuk data AIS
const gpsAisDataSchema = new mongoose_1.Schema({
    mmsi: { type: String, required: true },
    lat: { type: Number },
    lon: { type: Number },
    type: { type: String },
    speedOverGround: { type: Number },
    courseOverGround: { type: Number },
    heading: { type: Number },
    timestamp: { type: Date, default: Date.now },
    destination: { type: String }
});
exports.gpsAisData = (0, mongoose_1.model)('gpsAisData', gpsAisDataSchema);
