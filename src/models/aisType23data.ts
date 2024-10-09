import { Schema, model, Document } from 'mongoose';

interface IAisType23Data extends Document {
  type: number;
  mmsi: number;
  northeastLongitude: number;
  northeastLatitude: number;
  southwestLongitude: number;
  southwestLatitude: number;
  stationType: number;
  shipType: number;
}

const AisType23DataSchema = new Schema<IAisType23Data>({
  type: { type: Number, required: true },
  mmsi: { type: Number, required: true },
  northeastLongitude: { type: Number, required: true },
  northeastLatitude: { type: Number, required: true },
  southwestLongitude: { type: Number, required: true },
  southwestLatitude: { type: Number, required: true },
  stationType: { type: Number, required: true },
  shipType: { type: Number, required: true },
});

const AisType23Data = model<IAisType23Data>('AisType23Data', AisType23DataSchema);
export default AisType23Data;
