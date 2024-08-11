import * as mongoose from 'mongoose';

// Interface untuk properties dari shape
interface IShapeProperties {
  mmsi?: number;
  name?: string;
  status?: string;
  description?: string;
  color?: string;
  opacity?: number;
}

// Interface untuk objek shape
interface IShape {
  type: string;
  properties: IShapeProperties;
  coordinates: any;  // Tentukan tipe data yang lebih spesifik jika diperlukan
}

// Membuat schema menggunakan interface
const shapeSchema = new mongoose.Schema<IShape>({
  type: {
    type: String,
    required: true
  },
  properties: {
    mmsi: { type: Number },  // Properti harus memiliki tipe data yang spesifik
    name: { type: String },
    status: { type: String },
    description: { type: String },
    color: { type: String },
    opacity: { type: Number }
  },
  coordinates: {
    type: mongoose.Schema.Types.Mixed,  // Gunakan Mixed untuk tipe data yang beragam
    required: true
  }
});

// Membuat dan mengekspor model
const Shape = mongoose.model<IShape>('Shape', shapeSchema);
export default Shape;
