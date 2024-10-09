"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AisType20DataSchema = new mongoose_1.Schema({
    type: { type: Number, required: true },
    mmsi: { type: Number, required: true },
    offsetNumber: { type: Number, required: true },
    numberOfSlots: { type: Number, required: true },
    timeout: { type: Number, required: true },
    slotIncrement: { type: Number, required: true }, // Updated to new name
});
const AisType20Data = (0, mongoose_1.model)('AisType20Data', AisType20DataSchema);
exports.default = AisType20Data;
