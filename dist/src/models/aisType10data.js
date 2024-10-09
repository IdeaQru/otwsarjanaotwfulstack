"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AisType10DataSchema = new mongoose_1.Schema({
    type: { type: Number, required: true },
    mmsi: { type: Number, required: true },
    destinationMMSI: { type: Number, required: true },
});
const AisType10Data = (0, mongoose_1.model)('AisType10Data', AisType10DataSchema);
exports.default = AisType10Data;
