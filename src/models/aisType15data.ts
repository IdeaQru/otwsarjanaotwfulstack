import { Schema, model, Document } from 'mongoose';

interface IAisType15Data extends Document {
  type: number;
  mmsi: number;
  interrogatedMMSI: number;
  messageType1: number;
  messageType2: number;
}

const AisType15DataSchema = new Schema<IAisType15Data>({
  type: { type: Number, required: true },
  mmsi: { type: Number, required: true },
  interrogatedMMSI: { type: Number, required: true },
  messageType1: { type: Number, required: true },
  messageType2: { type: Number, required: true },
});

const AisType15Data = model<IAisType15Data>('AisType15Data', AisType15DataSchema);
export default AisType15Data;
