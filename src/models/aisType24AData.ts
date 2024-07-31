import { Schema, model, Document } from 'mongoose';

interface IAisType24AData extends Document {
  type: number;
  mmsi: number;
  partNum: number;
  name: string;
  timestamp: Date;
}

const AisType24ADataSchema = new Schema<IAisType24AData>({
  type: { type: Number, required: true },
  mmsi: { type: Number, required: true },
  partNum: { type: Number, required: true },
  name: { type: String, required: true },
  timestamp: { type: Date, required: true },
});

const AisType24AData = model<IAisType24AData>('AisType24AData', AisType24ADataSchema);
export default AisType24AData;
