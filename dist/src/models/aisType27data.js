"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AisType27DataSchema = new mongoose_1.Schema({
    type: { type: Number, required: true },
    mmsi: { type: Number, required: true },
    positionAccuracy: { type: Boolean, required: true },
    raimFlag: { type: Boolean, required: true },
    navigationStatus: { type: Number, required: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    speedOverGround: { type: Number, required: true },
    courseOverGround: { type: Number, required: true },
    gnssPositionStatus: { type: Boolean, required: true },
});
const AisType27Data = (0, mongoose_1.model)('AisType27Data', AisType27DataSchema);
exports.default = AisType27Data;
