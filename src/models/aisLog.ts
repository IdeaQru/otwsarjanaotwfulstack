import mongoose, { Document, Schema } from 'mongoose';

// Definisikan interface untuk AisLog
export interface IAisLog extends Document {
  mmsi: number;
  name: string;
  logTime: string;
  details: object;
}

// Skema Mongoose untuk AisLog
const AisLogSchema: Schema = new Schema({
  mmsi: { type: Number, required: true },
  name: { type: String, required: false },
  logTime: { type: String, required: true },  // Format waktu log
  details: { type: Schema.Types.Mixed, required: true }  // Menyimpan detail data gabungan
});

// Buat model berdasarkan skema
export default mongoose.model<IAisLog>('AisLog', AisLogSchema);
