"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AisType19DataSchema = new mongoose_1.Schema({
    type: { type: Number, required: true },
    mmsi: { type: Number, required: true },
    speedOverGround: { type: Number, required: true },
    positionAccuracy: { type: Boolean, required: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    courseOverGround: { type: Number, required: true },
    heading: { type: Number, required: true },
    timestamp: { type: Number, required: true },
    name: { type: String, required: true },
    shipType: { type: Number, required: true },
    dimensionToBow: { type: Number, required: true },
    dimensionToStern: { type: Number, required: true },
    dimensionToPort: { type: Number, required: true },
    dimensionToStarboard: { type: Number, required: true },
    epfd: { type: Number, required: true },
});
const AisType19Data = (0, mongoose_1.model)('AisType19Data', AisType19DataSchema);
exports.default = AisType19Data;
