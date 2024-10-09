import { Schema, model, Document } from 'mongoose';

interface IAisType9Data extends Document {
  type: number;
  mmsi: number;
  altitude: number;
  speedOverGround: number;
  positionAccuracy: boolean;
  longitude: number;
  latitude: number;
  courseOverGround: number;
  raimFlag: boolean;
  dte: boolean;
}

const AisType9DataSchema = new Schema<IAisType9Data>({
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
});

const AisType9Data = model<IAisType9Data>('AisType9Data', AisType9DataSchema);
export default AisType9Data;
