"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AisType25DataSchema = new mongoose_1.Schema({
    type: { type: Number, required: true },
    mmsi: { type: Number, required: true },
    destinationIndicator: { type: Boolean, required: true },
    binaryData: { type: String, required: true },
});
const AisType25Data = (0, mongoose_1.model)('AisType25Data', AisType25DataSchema);
exports.default = AisType25Data;
