"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AisType18DataSchema = new mongoose_1.Schema({
    type: { type: Number, required: true },
    mmsi: { type: Number, required: true },
    timestamp: { type: Date, required: true },
    speedOverGround: { type: Number, required: true },
    accuracy: { type: Boolean, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    courseOverGround: { type: Number, required: true },
    heading: { type: Number, required: false },
    utcSecond: { type: Number, required: true },
    regional: { type: Number, required: true },
    unitFlag: { type: Boolean, required: true },
    displayFlag: { type: Boolean, required: true },
    dscFlag: { type: Boolean, required: true },
    bandFlag: { type: Boolean, required: true },
    msg22Flag: { type: Boolean, required: true },
    modeFlag: { type: Boolean, required: true },
    raim: { type: Boolean, required: true },
    radio: { type: Number, required: true },
});
const AisType18Data = (0, mongoose_1.model)('AisType18Data', AisType18DataSchema);
exports.default = AisType18Data;
