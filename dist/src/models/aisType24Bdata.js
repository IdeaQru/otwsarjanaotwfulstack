"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AisType24BDataSchema = new mongoose_1.Schema({
    type: { type: Number, required: true },
    mmsi: { type: Number, required: true },
    partNum: { type: Number, required: true },
    typeAndCargo: { type: Number, required: true },
    vendorId: { type: String, required: true },
    modelType: { type: Number, required: true },
    serial: { type: Number, required: true },
    callsign: { type: String, required: true },
    dimBow: { type: Number, required: true },
    dimStern: { type: Number, required: true },
    dimPort: { type: Number, required: true },
    dimStarboard: { type: Number, required: true },
    timestamp: { type: Date, required: true },
});
const AisType24BData = (0, mongoose_1.model)('AisType24BData', AisType24BDataSchema);
exports.default = AisType24BData;
