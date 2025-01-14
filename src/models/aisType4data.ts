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
  expirationTime: Date;
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
  expirationTime :{ type: Date, default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) }, 

});
AisType4DataSchema.index({ expirationTime: 1 }, { expireAfterSeconds: 0 });
const AisType4Data = model<IAisType4Data>('AisType4Data', AisType4DataSchema);
export default AisType4Data;
