import { Schema, model, Document } from 'mongoose';

interface IAisType26Data extends Document {
  type: number;
  mmsi: number;
  destinationIndicator: boolean;
  binaryData: string;
  spare: number;
}

const AisType26DataSchema = new Schema<IAisType26Data>({
  type: { type: Number, required: true },
  mmsi: { type: Number, required: true },
  destinationIndicator: { type: Boolean, required: true },
  binaryData: { type: String, required: true },
  spare: { type: Number, required: true },
});

const AisType26Data = model<IAisType26Data>('AisType26Data', AisType26DataSchema);
export default AisType26Data;
