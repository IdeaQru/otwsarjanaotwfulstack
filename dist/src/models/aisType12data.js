"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AisType12DataSchema = new mongoose_1.Schema({
    type: { type: Number, required: true },
    mmsi: { type: Number, required: true },
    destinationMMSI: { type: Number, required: true },
    sequenceNumber: { type: Number, required: true },
    safetyMessage: { type: String, required: true },
});
const AisType12Data = (0, mongoose_1.model)('AisType12Data', AisType12DataSchema);
exports.default = AisType12Data;
