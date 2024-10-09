"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AisType16DataSchema = new mongoose_1.Schema({
    type: { type: Number, required: true },
    mmsi: { type: Number, required: true },
    destinationMMSI1: { type: Number, required: true },
    offset1: { type: Number, required: true },
    destinationMMSI2: { type: Number, required: true },
    offset2: { type: Number, required: true },
});
const AisType16Data = (0, mongoose_1.model)('AisType16Data', AisType16DataSchema);
exports.default = AisType16Data;
