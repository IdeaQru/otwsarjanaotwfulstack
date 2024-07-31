import * as mongoose from 'mongoose';

// Interface untuk properties dari shape
interface IShapeProperties {
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
    name: String,
    status: String,
    description: String,
    color: String,
    opacity: Number
  },
  coordinates: {
    type: mongoose.Schema.Types.Mixed,  // Gunakan Mixed untuk tipe data yang beragam
    required: true
  }
});

const Shape = mongoose.model<IShape>('Shape', shapeSchema);
export default Shape;
