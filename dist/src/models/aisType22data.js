"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AisType22DataSchema = new mongoose_1.Schema({
    type: { type: Number, required: true },
    mmsi: { type: Number, required: true },
    channelA: { type: Number, required: true },
    channelB: { type: Number, required: true },
    transmitPower: { type: Boolean, required: true },
    northeastLongitude: { type: Number, required: true },
    northeastLatitude: { type: Number, required: true },
    southwestLongitude: { type: Number, required: true },
    southwestLatitude: { type: Number, required: true },
    addressMMSI1: { type: Number },
    addressMMSI2: { type: Number },
});
const AisType22Data = (0, mongoose_1.model)('AisType22Data', AisType22DataSchema);
exports.default = AisType22Data;
