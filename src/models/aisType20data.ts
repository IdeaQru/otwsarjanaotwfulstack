import { Schema, model, Document } from 'mongoose';

interface IAisType20Data extends Document {
  type: number;
  mmsi: number;
  offsetNumber: number;
  numberOfSlots: number;
  timeout: number;
  slotIncrement: number; // Renamed to avoid conflict
}

const AisType20DataSchema = new Schema<IAisType20Data>({
  type: { type: Number, required: true },
  mmsi: { type: Number, required: true },
  offsetNumber: { type: Number, required: true },
  numberOfSlots: { type: Number, required: true },
  timeout: { type: Number, required: true },
  slotIncrement: { type: Number, required: true }, // Updated to new name
});

const AisType20Data = model<IAisType20Data>('AisType20Data', AisType20DataSchema);
export default AisType20Data;
