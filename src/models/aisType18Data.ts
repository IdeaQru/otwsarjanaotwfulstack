import { Schema, model, Document } from 'mongoose';

interface IAisType18Data extends Document {
  type: number;
  mmsi: number;
  timestamp: Date;
  speedOverGround: number;
  accuracy: boolean;
  longitude: number;
  latitude: number;
  courseOverGround: number;
  heading: number | null;
  utcSecond: number;
  regional: number;
  unitFlag: boolean;
  displayFlag: boolean;
  dscFlag: boolean;
  bandFlag: boolean;
  msg22Flag: boolean;
  modeFlag: boolean;
  raim: boolean;
  radio: number;
}

const AisType18DataSchema = new Schema<IAisType18Data>({
  type: { type: Number, required: true },
  mmsi: { type: Number, required: true },
  timestamp: { type: Date, required: true },
  speedOverGround: { type: Number, required: true },
  accuracy: { type: Boolean, required: true },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
  courseOverGround: { type: Number, required: true },
  heading: { type: Number, required: false },
  utcSecond: { type: Number, required: true },
  regional: { type: Number, required: true },
  unitFlag: { type: Boolean, required: true },
  displayFlag: { type: Boolean, required: true },
  dscFlag: { type: Boolean, required: true },
  bandFlag: { type: Boolean, required: true },
  msg22Flag: { type: Boolean, required: true },
  modeFlag: { type: Boolean, required: true },
  raim: { type: Boolean, required: true },
  radio: { type: Number, required: true },
});

const AisType18Data = model<IAisType18Data>('AisType18Data', AisType18DataSchema);
export default AisType18Data;
