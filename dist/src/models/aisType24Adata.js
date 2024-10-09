"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AisType24ADataSchema = new mongoose_1.Schema({
    type: { type: Number, required: true },
    mmsi: { type: Number, required: true },
    partNum: { type: Number, required: true },
    name: { type: String, required: true },
    timestamp: { type: Date, required: true },
});
const AisType24AData = (0, mongoose_1.model)('AisType24AData', AisType24ADataSchema);
exports.default = AisType24AData;
