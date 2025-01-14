import { Schema, model, Document } from 'mongoose';

interface ICombinedAisData extends Document {
  mmsi: number;
  lon: number;
  lat: number;
  name?: string;
  type?: number;
  destination?: string;
  speedOverGround: number;
  courseOverGround: number;
  heading: number;
  timestamp: string;
  navStatus?: string;
  draught?: number;
  imo?: number;
  callSign?: string;
  eta?: {
    day: number;
    hour: number;
    minute: number;
    month: number;
  };
  shipDimensions?: {
    toBow: number;
    toStern: number;
    toPort: number;
    toStarboard: number;
  };
  nearestVessels?: Array<{
    mmsi: number;
    name?: string; // Nama kapal terdekat
    distance: number; // Jarak dalam meter atau kilometer
    relativeBearing: number; // Arah relatif (dalam derajat) dari kapal ini
  }>;
  expiresAt: Date;
}

const CombinedAisDataSchema = new Schema<ICombinedAisData>({
  mmsi: { type: Number, required: true, unique: true },
  lon: { type: Number, required: true },
  lat: { type: Number, required: true },
  name: { type: String },
  type: { type: Number },
  destination: { type: String },
  speedOverGround: { type: Number },
  courseOverGround: { type: Number },
  heading: { type: Number },
  timestamp: { type: String },

  // Informasi Navigasi Tambahan
  navStatus: { type: String }, // Status Navigasi
  draught: { type: Number }, // Kedalaman Draft
  imo: { type: Number }, // IMO Number
  callSign: { type: String }, // Tanda Panggil Kapal (Call Sign)

  // Informasi ETA
  eta: {
    day: { type: Number },
    hour: { type: Number },
    minute: { type: Number },
    month: { type: Number },
  },

  // Dimensi Kapal
  shipDimensions: {
    toBow: { type: Number },
    toStern: { type: Number },
    toPort: { type: Number },
    toStarboard: { type: Number },
  },

  // Kapal Terdekat
  nearestVessels: [
    {
      mmsi: { type: Number, required: true },
      name: { type: String },
      distance: { type: Number, required: true }, // Dalam meter atau kilometer
      relativeBearing: { type: Number, required: true }, // Dalam derajat
    },
  ],
  expiresAt: { type: Date, default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) }, 
});
CombinedAisDataSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
const CombinedAisData = model<ICombinedAisData>('CombinedAisData', CombinedAisDataSchema);
export default CombinedAisData;
