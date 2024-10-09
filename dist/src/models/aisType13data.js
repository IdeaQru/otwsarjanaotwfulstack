"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AisType13DataSchema = new mongoose_1.Schema({
    type: { type: Number, required: true },
    mmsi: { type: Number, required: true },
    destinationMMSI: { type: Number, required: true },
    sequenceNumber: { type: Number, required: true },
});
const AisType13Data = (0, mongoose_1.model)('AisType13Data', AisType13DataSchema);
exports.default = AisType13Data;
