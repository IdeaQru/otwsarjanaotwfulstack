"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/aisType1-2and3data.ts
const mongoose_1 = require("mongoose");
const AisType1_2and3DataSchema = new mongoose_1.Schema({
    type: { type: Number, required: false },
    mmsi: { type: Number, required: true },
    timestamp: { type: Date, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    speedOverGround: { type: Number, required: false },
    courseOverGround: { type: Number, required: false },
    heading: { type: Number, required: false },
    navStatus: { type: Number, required: false },
    rateOfTurn: { type: Number, required: false },
    sentences: { type: [String], required: true }, // Corrected 'sentence' to 'sentences'
});
const AisType1_2and3Data = (0, mongoose_1.model)('AisType1_2and3Data', AisType1_2and3DataSchema);
exports.default = AisType1_2and3Data;
