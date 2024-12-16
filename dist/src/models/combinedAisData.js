"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CombinedAisDataSchema = new mongoose_1.Schema({
    mmsi: { type: Number, required: true, unique: true },
    lon: { type: Number, required: true },
    lat: { type: Number, required: true },
    name: { type: String },
    type: { type: Number },
    destination: { type: String },
    speedOverGround: { type: Number },
    courseOverGround: { type: Number },
    heading: { type: Number },
    timestamp: { type: String },
    // Informasi Navigasi Tambahan
    navStatus: { type: String }, // Status Navigasi
    draught: { type: Number }, // Kedalaman Draft
    imo: { type: Number }, // IMO Number
    callSign: { type: String }, // Tanda Panggil Kapal (Call Sign)
    // Informasi ETA
    eta: {
        day: { type: Number },
        hour: { type: Number },
        minute: { type: Number },
        month: { type: Number },
    },
    // Dimensi Kapal
    shipDimensions: {
        toBow: { type: Number },
        toStern: { type: Number },
        toPort: { type: Number },
        toStarboard: { type: Number },
    },
    // Kapal Terdekat
    nearestVessels: [
        {
            mmsi: { type: Number, required: true },
            name: { type: String },
            distance: { type: Number, required: true }, // Dalam meter atau kilometer
            relativeBearing: { type: Number, required: true }, // Dalam derajat
        },
    ],
});
const CombinedAisData = (0, mongoose_1.model)('CombinedAisData', CombinedAisDataSchema);
exports.default = CombinedAisData;
