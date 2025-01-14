"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AisType4DataSchema = new mongoose_1.Schema({
    type: { type: Number, required: true },
    mmsi: { type: Number, required: true },
    timestamp: { type: Date, required: true },
    positionAccuracy: { type: Boolean, required: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    epfd: { type: Number, required: true },
    raimFlag: { type: Boolean, required: true },
    radioStatus: { type: Number, required: true },
    expirationTime: { type: Date, default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) },
});
AisType4DataSchema.index({ expirationTime: 1 }, { expireAfterSeconds: 0 });
const AisType4Data = (0, mongoose_1.model)('AisType4Data', AisType4DataSchema);
exports.default = AisType4Data;
