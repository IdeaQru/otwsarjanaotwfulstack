"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AisType14DataSchema = new mongoose_1.Schema({
    type: { type: Number, required: true },
    mmsi: { type: Number, required: true },
    safetyMessage: { type: String, required: true },
});
const AisType14Data = (0, mongoose_1.model)('AisType14Data', AisType14DataSchema);
exports.default = AisType14Data;
