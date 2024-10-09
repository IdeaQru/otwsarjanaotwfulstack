"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AisType21DataSchema = new mongoose_1.Schema({
    type: { type: Number, required: true },
    mmsi: { type: Number, required: true },
    aidType: { type: Number, required: true },
    name: { type: String, required: true },
    positionAccuracy: { type: Boolean, required: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    dimBow: { type: Number, required: true },
    dimStern: { type: Number, required: true },
    dimPort: { type: Number, required: true },
    dimStarboard: { type: Number, required: true },
    epfd: { type: Number, required: true },
    timestamp: { type: Number, required: true },
    offPositionIndicator: { type: Boolean, required: true },
    raimFlag: { type: Boolean, required: true },
    virtualAidFlag: { type: Boolean, required: true },
});
const AisType21Data = (0, mongoose_1.model)('AisType21Data', AisType21DataSchema);
exports.default = AisType21Data;
