import { Schema, model, Document } from 'mongoose';

interface ICombinedAisData extends Document {
    mmsi: number;
    lon: number;
    lat: number;
    name?: string;
    type?: number;
    destination?: string;
    timestamp: string;
}

const CombinedAisDataSchema = new Schema<ICombinedAisData>({
    mmsi: { type: Number, required: true, unique: true },
    lon: { type: Number, required: true },
    lat: { type: Number, required: true },
    name: { type: String },
    type: { type: Number },
    destination: { type: String },
    timestamp: { type: String, required: true },
});

const CombinedAisData = model<ICombinedAisData>('CombinedAisData', CombinedAisDataSchema);
export default CombinedAisData;
