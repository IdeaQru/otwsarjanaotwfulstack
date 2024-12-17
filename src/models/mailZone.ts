// src/models/mailZone.ts
import mongoose, { Schema, Document } from 'mongoose';

interface MailZone extends Document {
  sbnpName: string;
  sbnpType: string;
  mmsi: number;
  selectedApiKey: string;
  baseStationMmsi: number;
  longitude: number;
  latitude: number;
}

const mailZoneSchema: Schema = new Schema({
  sbnpName: {
    type: String,
    required: true,
    unique: true,  // Membuat sbnpName harus unik
  },
  sbnpType: {
    type: String,
    required: true,
  },
  selectedApiKey: {
    type: String,
    required: true,
    unique: true,  // Membuat selectedApiKey harus unik
  },
  mmsi: {
    type: Number,
    required: true,
    unique: true,  // Membuat mmsi harus unik

  },
  baseStationMmsi: {
    type: Number,
    required: true,
  },

  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
});

// Membuat index untuk memastikan query lebih cepat saat mencari duplikasi
mailZoneSchema.index({ sbnpName: 1, selectedApiKey: 1, mmsi: 1 }, { unique: true });

const MailZone = mongoose.model<MailZone>('MailZone', mailZoneSchema);

export default MailZone;
