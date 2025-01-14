"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AisType9DataSchema = new mongoose_1.Schema({
    type: { type: Number, required: true },
    mmsi: { type: Number, required: true },
    altitude: { type: Number, required: true },
    speedOverGround: { type: Number, required: true },
    positionAccuracy: { type: Boolean, required: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    courseOverGround: { type: Number, required: true },
    raimFlag: { type: Boolean, required: true },
    dte: { type: Boolean, required: true },
    expirationTime: { type: Date, default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) },
});
AisType9DataSchema.index({ expirationTime: 1 }, { expireAfterSeconds: 0 });
const AisType9Data = (0, mongoose_1.model)('AisType9Data', AisType9DataSchema);
exports.default = AisType9Data;
