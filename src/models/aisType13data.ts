import { Schema, model, Document } from 'mongoose';

interface IAisType13Data extends Document {
  type: number;
  mmsi: number;
  destinationMMSI: number;
  sequenceNumber: number;
}

const AisType13DataSchema = new Schema<IAisType13Data>({
  type: { type: Number, required: true },
  mmsi: { type: Number, required: true },
  destinationMMSI: { type: Number, required: true },
  sequenceNumber: { type: Number, required: true },
});

const AisType13Data = model<IAisType13Data>('AisType13Data', AisType13DataSchema);
export default AisType13Data;
