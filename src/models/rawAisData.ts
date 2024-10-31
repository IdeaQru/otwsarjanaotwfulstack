// models/rawAisData.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IRawAisData extends Document {
  rawData: string;
  timestamp: Date;
}

const rawAisDataSchema = new Schema<IRawAisData>({
  rawData: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const RawAisData = mongoose.model<IRawAisData>('RawAisData', rawAisDataSchema);

export default RawAisData;
