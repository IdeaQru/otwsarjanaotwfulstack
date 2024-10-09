import { Schema, model, Document } from 'mongoose';

interface IAisType14Data extends Document {
  type: number;
  mmsi: number;
  safetyMessage: string;
}

const AisType14DataSchema = new Schema<IAisType14Data>({
  type: { type: Number, required: true },
  mmsi: { type: Number, required: true },
  safetyMessage: { type: String, required: true },
});

const AisType14Data = model<IAisType14Data>('AisType14Data', AisType14DataSchema);
export default AisType14Data;
