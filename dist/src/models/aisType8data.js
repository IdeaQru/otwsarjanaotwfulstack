"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AisType8DataSchema = new mongoose_1.Schema({
    type: { type: Number, required: true },
    mmsi: { type: Number, required: true },
    binaryData: { type: String, required: true },
});
const AisType8Data = (0, mongoose_1.model)('AisType8Data', AisType8DataSchema);
exports.default = AisType8Data;
