import { Schema, model, Document } from 'mongoose';

interface IAisType1and3Data extends Document {
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
}

const AisType1and3DataSchema = new Schema<IAisType1and3Data>({
  type: { type: Number, required: true },
  mmsi: { type: Number, required: true },
  timestamp: { type: Date, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  speedOverGround: { type: Number, required: false },
  courseOverGround: { type: Number, required: false },
  heading: { type: Number, required: true },
  navStatus: { type: Number, required: true },
  rateOfTurn: { type: Number, required: true },
});

const AisType1and3Data = model<IAisType1and3Data>('AisType1and3Data', AisType1and3DataSchema);
export default AisType1and3Data;
