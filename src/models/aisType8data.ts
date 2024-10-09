import { Schema, model, Document } from 'mongoose';

interface IAisType8Data extends Document {
  type: number;
  mmsi: number;
  binaryData: string;
}

const AisType8DataSchema = new Schema<IAisType8Data>({
  type: { type: Number, required: true },
  mmsi: { type: Number, required: true },
  binaryData: { type: String, required: true },
});

const AisType8Data = model<IAisType8Data>('AisType8Data', AisType8DataSchema);
export default AisType8Data;
