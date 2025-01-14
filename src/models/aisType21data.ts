import { Schema, model, Document } from 'mongoose';

interface IAisType21Data extends Document {
  type: number;
  mmsi: number;
  aidType: number;
  name: string;
  positionAccuracy: boolean;
  longitude: number;
  latitude: number;
  dimBow: number;
  dimStern: number;
  dimPort: number;
  dimStarboard: number;
  epfd: number;
  timestamp: number;
  offPositionIndicator: boolean;
  raimFlag: boolean;
  virtualAidFlag: boolean;
  expirationTime: Date;
}

const AisType21DataSchema = new Schema<IAisType21Data>({
  type: { type: Number, required: true },
  mmsi: { type: Number, required: true },
  aidType: { type: Number, required: true },
  name: { type: String, required: true },
  positionAccuracy: { type: Boolean, required: true },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
  dimBow: { type: Number, required: true },
  dimStern: { type: Number, required: true },
  dimPort: { type: Number, required: true },
  dimStarboard: { type: Number, required: true },
  epfd: { type: Number, required: true },
  timestamp: { type: Number, required: true },
  offPositionIndicator: { type: Boolean, required: true },
  raimFlag: { type: Boolean, required: true },
  virtualAidFlag: { type: Boolean, required: true },
  expirationTime :{ type: Date, default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) }, 
});
AisType21DataSchema.index({ expirationTime: 1 }, { expireAfterSeconds: 0 });
const AisType21Data = model<IAisType21Data>('AisType21Data', AisType21DataSchema);
export default AisType21Data;
