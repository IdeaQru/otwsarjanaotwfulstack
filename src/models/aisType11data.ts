import { Schema, model, Document } from 'mongoose';

interface IAisType11Data extends Document {
  type: number;
  mmsi: number;
  utcYear: number;
  utcMonth: number;
  utcDay: number;
  utcHour: number;
  utcMinute: number;
  utcSecond: number;
  positionAccuracy: boolean;
  longitude: number;
  latitude: number;
  epfd: number;
  expirationTime: Date;
}

const AisType11DataSchema = new Schema<IAisType11Data>({
  type: { type: Number, required: true },
  mmsi: { type: Number, required: true },
  utcYear: { type: Number, required: true },
  utcMonth: { type: Number, required: true },
  utcDay: { type: Number, required: true },
  utcHour: { type: Number, required: true },
  utcMinute: { type: Number, required: true },
  utcSecond: { type: Number, required: true },
  positionAccuracy: { type: Boolean, required: true },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
  epfd: { type: Number, required: true },
  expirationTime :{ type: Date, default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) }, 

});
AisType11DataSchema.index({ expirationTime: 1 }, { expireAfterSeconds: 0 });
const AisType11Data = model<IAisType11Data>('AisType11Data', AisType11DataSchema);
export default AisType11Data;
