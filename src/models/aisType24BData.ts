import { Schema, model, Document } from 'mongoose';

interface IAisType24BData extends Document {
  type: number;
  mmsi: number;
  partNum: number;
  typeAndCargo: number;
  vendorId: string;
  modelType: number;  // Rename to avoid conflict
  serial: number;
  callsign: string;
  dimBow: number;
  dimStern: number;
  dimPort: number;
  dimStarboard: number;
  timestamp: Date;
}

const AisType24BDataSchema = new Schema<IAisType24BData>({
  type: { type: Number, required: true },
  mmsi: { type: Number, required: true },
  partNum: { type: Number, required: true },
  typeAndCargo: { type: Number, required: true },
  vendorId: { type: String, required: true },
  modelType: { type: Number, required: true },  // Rename to avoid conflict
  serial: { type: Number, required: true },
  callsign: { type: String, required: true },
  dimBow: { type: Number, required: true },
  dimStern: { type: Number, required: true },
  dimPort: { type: Number, required: true },
  dimStarboard: { type: Number, required: true },
  timestamp: { type: Date, required: true },
});

const AisType24BData = model<IAisType24BData>('AisType24BData', AisType24BDataSchema);
export default AisType24BData;
