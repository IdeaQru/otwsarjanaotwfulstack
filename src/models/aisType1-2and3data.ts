// models/aisType1-2and3data.ts
import { Schema, model, Document } from 'mongoose';

interface IAisType1_2and3Data extends Document {
  type: number;
  mmsi: number;
  timestamp: Date;
  latitude: number;
  longitude: number;
  speedOverGround: number;
  courseOverGround: number;
  heading: number;
  navStatus: number;
  rateOfTurn: number;
  sentences: string[]; // Changed to 'sentences' to match the correct plural form
  expirationTime: Date;
}

const AisType1_2and3DataSchema = new Schema<IAisType1_2and3Data>({
  type: { type: Number, required: false },
  mmsi: { type: Number, required: true },
  timestamp: { type: Date, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  speedOverGround: { type: Number, required: false },
  courseOverGround: { type: Number, required: false },
  heading: { type: Number, required: false },
  navStatus: { type: Number, required: false },
  rateOfTurn: { type: Number, required: false },
  sentences: { type: [String], required: true }, // Corrected 'sentence' to 'sentences'
  expirationTime :{ type: Date, default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) }, 
});
AisType1_2and3DataSchema.index({ expirationTime: 1 }, { expireAfterSeconds: 0 });
const AisType1_2and3Data = model<IAisType1_2and3Data>('AisType1_2and3Data', AisType1_2and3DataSchema);
export default AisType1_2and3Data;
