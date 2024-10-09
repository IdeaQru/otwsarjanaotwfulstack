"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AisType7DataSchema = new mongoose_1.Schema({
    type: { type: Number, required: true },
    mmsi: { type: Number, required: true },
    destinationMMSI: { type: Number, required: true },
    sequenceNumber: { type: Number, required: true },
});
const AisType7Data = (0, mongoose_1.model)('AisType7Data', AisType7DataSchema);
exports.default = AisType7Data;
