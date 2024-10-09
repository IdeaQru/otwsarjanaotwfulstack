import { Schema, model, Document } from 'mongoose';

interface IAisType10Data extends Document {
  type: number;
  mmsi: number;
  destinationMMSI: number;
}

const AisType10DataSchema = new Schema<IAisType10Data>({
  type: { type: Number, required: true },
  mmsi: { type: Number, required: true },
  destinationMMSI: { type: Number, required: true },
});

const AisType10Data = model<IAisType10Data>('AisType10Data', AisType10DataSchema);
export default AisType10Data;
