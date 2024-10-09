import { Schema, model, Document } from 'mongoose';

interface IAisType25Data extends Document {
  type: number;
  mmsi: number;
  destinationIndicator: boolean;
  binaryData: string;
}

const AisType25DataSchema = new Schema<IAisType25Data>({
  type: { type: Number, required: true },
  mmsi: { type: Number, required: true },
  destinationIndicator: { type: Boolean, required: true },
  binaryData: { type: String, required: true },
});

const AisType25Data = model<IAisType25Data>('AisType25Data', AisType25DataSchema);
export default AisType25Data;
