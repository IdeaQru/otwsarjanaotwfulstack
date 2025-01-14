import mongoose from "mongoose";
const staticDataSchema = new mongoose.Schema(
  {
    mmsi: { type: Number, required: true },
    raw: { type: String, required: true },
    data: { type: Object, required: true },
    expirationTime: { type: Date, default: () => new Date(Date.now() + 2 * 60 * 60 * 1000) },
  },
  { timestamps: true } 
);
export const StaticModel = mongoose.model("StaticData", staticDataSchema);
staticDataSchema.index({ expirationTime: 1 }, { expireAfterSeconds: 0 });
const dynamicDataSchema = new mongoose.Schema(
  {
    mmsi: { type: Number, required: true },
    raw: { type: String, required: true },
    data: { type: Object, required: true },
    expirationTime: { type: Date, default: () => new Date(Date.now() + 2 * 60 * 60 * 1000) },
  },
  { timestamps: true } 
);
dynamicDataSchema.index({ expirationTime: 1 }, { expireAfterSeconds: 0 });
export const DynamicModel = mongoose.model("DynamicData", dynamicDataSchema);
