import { Schema, model, Document } from 'mongoose';

interface IAisType22Data extends Document {
  type: number;
  mmsi: number;
  channelA: number;
  channelB: number;
  transmitPower: boolean;
  northeastLongitude: number;
  northeastLatitude: number;
  southwestLongitude: number;
  southwestLatitude: number;
  addressMMSI1?: number;
  addressMMSI2?: number;
}

const AisType22DataSchema = new Schema<IAisType22Data>({
  type: { type: Number, required: true },
  mmsi: { type: Number, required: true },
  channelA: { type: Number, required: true },
  channelB: { type: Number, required: true },
  transmitPower: { type: Boolean, required: true },
  northeastLongitude: { type: Number, required: true },
  northeastLatitude: { type: Number, required: true },
  southwestLongitude: { type: Number, required: true },
  southwestLatitude: { type: Number, required: true },
  addressMMSI1: { type: Number },
  addressMMSI2: { type: Number },
});

const AisType22Data = model<IAisType22Data>('AisType22Data', AisType22DataSchema);
export default AisType22Data;
