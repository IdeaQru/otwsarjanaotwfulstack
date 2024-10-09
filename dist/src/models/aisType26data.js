"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AisType26DataSchema = new mongoose_1.Schema({
    type: { type: Number, required: true },
    mmsi: { type: Number, required: true },
    destinationIndicator: { type: Boolean, required: true },
    binaryData: { type: String, required: true },
    spare: { type: Number, required: true },
});
const AisType26Data = (0, mongoose_1.model)('AisType26Data', AisType26DataSchema);
exports.default = AisType26Data;
