"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AisType23DataSchema = new mongoose_1.Schema({
    type: { type: Number, required: true },
    mmsi: { type: Number, required: true },
    northeastLongitude: { type: Number, required: true },
    northeastLatitude: { type: Number, required: true },
    southwestLongitude: { type: Number, required: true },
    southwestLatitude: { type: Number, required: true },
    stationType: { type: Number, required: true },
    shipType: { type: Number, required: true },
});
const AisType23Data = (0, mongoose_1.model)('AisType23Data', AisType23DataSchema);
exports.default = AisType23Data;
