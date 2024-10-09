import { Schema, model, Document } from 'mongoose';

interface IAisType19Data extends Document {
  type: number;
  mmsi: number;
  speedOverGround: number;
  positionAccuracy: boolean;
  longitude: number;
  latitude: number;
  courseOverGround: number;
  heading: number;
  timestamp: number;
  name: string;
  shipType: number;
  dimensionToBow: number;
  dimensionToStern: number;
  dimensionToPort: number;
  dimensionToStarboard: number;
  epfd: number;
}

const AisType19DataSchema = new Schema<IAisType19Data>({
  type: { type: Number, required: true },
  mmsi: { type: Number, required: true },
  speedOverGround: { type: Number, required: true },
  positionAccuracy: { type: Boolean, required: true },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
  courseOverGround: { type: Number, required: true },
  heading: { type: Number, required: true },
  timestamp: { type: Number, required: true },
  name: { type: String, required: true },
  shipType: { type: Number, required: true },
  dimensionToBow: { type: Number, required: true },
  dimensionToStern: { type: Number, required: true },
  dimensionToPort: { type: Number, required: true },
  dimensionToStarboard: { type: Number, required: true },
  epfd: { type: Number, required: true },
});

const AisType19Data = model<IAisType19Data>('AisType19Data', AisType19DataSchema);
export default AisType19Data;
