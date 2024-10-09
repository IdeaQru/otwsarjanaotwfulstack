import { Schema, model } from 'mongoose';

// Skema untuk data AIS
const gpsAisDataSchema = new Schema({
  mmsi: { type: String, required: true },
  lat: { type: Number },
  lon: { type: Number },
  type: { type: String },
  speedOverGround: { type: Number },
  courseOverGround: { type: Number },
  heading: { type: Number },
  timestamp: { type: Date, default: Date.now },
  destination: { type: String }
});

export const gpsAisData = model('gpsAisData', gpsAisDataSchema);
