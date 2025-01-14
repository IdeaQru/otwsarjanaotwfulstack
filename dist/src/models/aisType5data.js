"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AisType5DataSchema = new mongoose_1.Schema({
    type: { type: Number, required: true },
    mmsi: { type: Number, required: true },
    aisVersion: { type: Number, required: true },
    imo: { type: Number, required: true },
    callsign: { type: String, required: true },
    name: { type: String, required: true },
    typeAndCargo: { type: Number, required: true },
    dimBow: { type: Number, required: true },
    dimStern: { type: Number, required: true },
    dimPort: { type: Number, required: true },
    dimStarboard: { type: Number, required: true },
    epfd: { type: Number, required: true },
    etaMonth: { type: Number, required: true },
    etaDay: { type: Number, required: true },
    etaHour: { type: Number, required: true },
    etaMinute: { type: Number, required: true },
    draught: { type: Number, required: true },
    destination: { type: String, required: true },
    dte: { type: Boolean, required: true },
    timestamp: { type: Date, required: true },
    expirationTime: { type: Date, default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) },
});
AisType5DataSchema.index({ expirationTime: 1 }, { expireAfterSeconds: 0 });
const AisType5Data = (0, mongoose_1.model)('AisType5Data', AisType5DataSchema);
exports.default = AisType5Data;
