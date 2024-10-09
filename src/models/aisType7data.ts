import { Schema, model, Document } from 'mongoose';

interface IAisType7Data extends Document {
  type: number;
  mmsi: number;
  destinationMMSI: number;
  sequenceNumber: number;
}

const AisType7DataSchema = new Schema<IAisType7Data>({
  type: { type: Number, required: true },
  mmsi: { type: Number, required: true },
  destinationMMSI: { type: Number, required: true },
  sequenceNumber: { type: Number, required: true },
});

const AisType7Data = model<IAisType7Data>('AisType7Data', AisType7DataSchema);
export default AisType7Data;
