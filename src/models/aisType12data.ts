import { Schema, model, Document } from 'mongoose';

interface IAisType12Data extends Document {
  type: number;
  mmsi: number;
  destinationMMSI: number;
  sequenceNumber: number;
  safetyMessage: string;
}

const AisType12DataSchema = new Schema<IAisType12Data>({
  type: { type: Number, required: true },
  mmsi: { type: Number, required: true },
  destinationMMSI: { type: Number, required: true },
  sequenceNumber: { type: Number, required: true },
  safetyMessage: { type: String, required: true },
});

const AisType12Data = model<IAisType12Data>('AisType12Data', AisType12DataSchema);
export default AisType12Data;
