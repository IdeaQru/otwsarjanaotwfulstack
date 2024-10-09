"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AisType15DataSchema = new mongoose_1.Schema({
    type: { type: Number, required: true },
    mmsi: { type: Number, required: true },
    interrogatedMMSI: { type: Number, required: true },
    messageType1: { type: Number, required: true },
    messageType2: { type: Number, required: true },
});
const AisType15Data = (0, mongoose_1.model)('AisType15Data', AisType15DataSchema);
exports.default = AisType15Data;
