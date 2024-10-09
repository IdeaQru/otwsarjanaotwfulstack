import { Schema, model, Document } from 'mongoose';

interface IAisType27Data extends Document {
  type: number;
  mmsi: number;
  positionAccuracy: boolean;
  raimFlag: boolean;
  navigationStatus: number;
  longitude: number;
  latitude: number;
  speedOverGround: number;
  courseOverGround: number;
  gnssPositionStatus: boolean;
}

const AisType27DataSchema = new Schema<IAisType27Data>({
  type: { type: Number, required: true },
  mmsi: { type: Number, required: true },
  positionAccuracy: { type: Boolean, required: true },
  raimFlag: { type: Boolean, required: true },
  navigationStatus: { type: Number, required: true },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
  speedOverGround: { type: Number, required: true },
  courseOverGround: { type: Number, required: true },
  gnssPositionStatus: { type: Boolean, required: true },
});

const AisType27Data = model<IAisType27Data>('AisType27Data', AisType27DataSchema);
export default AisType27Data;
