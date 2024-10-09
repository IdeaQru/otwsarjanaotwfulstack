import { Schema, model, Document } from 'mongoose';

interface IAisType16Data extends Document {
  type: number;
  mmsi: number;
  destinationMMSI1: number;
  offset1: number;
  destinationMMSI2: number;
  offset2: number;
}

const AisType16DataSchema = new Schema<IAisType16Data>({
  type: { type: Number, required: true },
  mmsi: { type: Number, required: true },
  destinationMMSI1: { type: Number, required: true },
  offset1: { type: Number, required: true },
  destinationMMSI2: { type: Number, required: true },
  offset2: { type: Number, required: true },
});

const AisType16Data = model<IAisType16Data>('AisType16Data', AisType16DataSchema);
export default AisType16Data;
