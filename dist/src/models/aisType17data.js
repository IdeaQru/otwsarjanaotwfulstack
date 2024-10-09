"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AisType17DataSchema = new mongoose_1.Schema({
    type: { type: Number, required: true },
    mmsi: { type: Number, required: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    data: { type: String, required: true },
});
const AisType17Data = (0, mongoose_1.model)('AisType17Data', AisType17DataSchema);
exports.default = AisType17Data;
