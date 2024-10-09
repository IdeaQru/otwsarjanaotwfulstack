"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AisType11DataSchema = new mongoose_1.Schema({
    type: { type: Number, required: true },
    mmsi: { type: Number, required: true },
    utcYear: { type: Number, required: true },
    utcMonth: { type: Number, required: true },
    utcDay: { type: Number, required: true },
    utcHour: { type: Number, required: true },
    utcMinute: { type: Number, required: true },
    utcSecond: { type: Number, required: true },
    positionAccuracy: { type: Boolean, required: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    epfd: { type: Number, required: true },
});
const AisType11Data = (0, mongoose_1.model)('AisType11Data', AisType11DataSchema);
exports.default = AisType11Data;
