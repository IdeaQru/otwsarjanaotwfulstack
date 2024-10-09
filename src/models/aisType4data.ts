import { Schema, model, Document } from 'mongoose';

interface IAisType4Data extends Document {
  type: number;
  mmsi: number;
  timestamp: Date;
  positionAccuracy: boolean;
  longitude: number;
  latitude: number;
  epfd: number;
  raimFlag: boolean;
  radioStatus: number;
}

const AisType4DataSchema = new Schema<IAisType4Data>({
  type: { type: Number, required: true },
  mmsi: { type: Number, required: true },
  timestamp: { type: Date, required: true },
  positionAccuracy: { type: Boolean, required: true },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
  epfd: { type: Number, required: true },
  raimFlag: { type: Boolean, required: true },
  radioStatus: { type: Number, required: true },
});

const AisType4Data = model<IAisType4Data>('AisType4Data', AisType4DataSchema);
export default AisType4Data;
