import { Schema, model, Document } from 'mongoose';

interface IAisType17Data extends Document {
  type: number;
  mmsi: number;
  longitude: number;
  latitude: number;
  data: string; // DGPS correction data
}

const AisType17DataSchema = new Schema<IAisType17Data>({
  type: { type: Number, required: true },
  mmsi: { type: Number, required: true },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
  data: { type: String, required: true },
});

const AisType17Data = model<IAisType17Data>('AisType17Data', AisType17DataSchema);
export default AisType17Data;
