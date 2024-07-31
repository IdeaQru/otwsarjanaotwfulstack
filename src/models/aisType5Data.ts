import { Schema, model, Document } from 'mongoose';

interface IAisType5Data extends Document {
  type: number;
  mmsi: number;
  aisVersion: number;
  imo: number;
  callsign: string;
  name: string;
  typeAndCargo: number;
  dimBow: number;
  dimStern: number;
  dimPort: number;
  dimStarboard: number;
  epfd: number;
  etaMonth: number;
  etaDay: number;
  etaHour: number;
  etaMinute: number;
  draught: number;
  destination: string;
  dte: boolean;
  timestamp: Date;
}

const AisType5DataSchema = new Schema<IAisType5Data>({
  type: { type: Number, required: true },
  mmsi: { type: Number, required: true },
  aisVersion: { type: Number, required: true },
  imo: { type: Number, required: true },
  callsign: { type: String, required: true },
  name: { type: String, required: true },
  typeAndCargo: { type: Number, required: true },
  dimBow: { type: Number, required: true },
  dimStern: { type: Number, required: true },
  dimPort: { type: Number, required: true },
  dimStarboard: { type: Number, required: true },
  epfd: { type: Number, required: true },
  etaMonth: { type: Number, required: true },
  etaDay: { type: Number, required: true },
  etaHour: { type: Number, required: true },
  etaMinute: { type: Number, required: true },
  draught: { type: Number, required: true },
  destination: { type: String, required: true },
  dte: { type: Boolean, required: true },
  timestamp: { type: Date, required: true },
});

const AisType5Data = model<IAisType5Data>('AisType5Data', AisType5DataSchema);
export default AisType5Data;
