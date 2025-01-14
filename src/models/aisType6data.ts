import { Schema, model, Document } from 'mongoose';

interface IAisType6Data extends Document {
  type: number;
  mmsi: number;
  destinationMMSI: number;
  sequenceNumber: number;
  retransmitFlag: boolean;
  spare: number;
  binaryData: string;
}

const AisType6DataSchema = new Schema<IAisType6Data>({
  type: { type: Number, required: true },
  mmsi: { type: Number, required: true },
  destinationMMSI: { type: Number, required: true },
  sequenceNumber: { type: Number, required: true },
  retransmitFlag: { type: Boolean, required: true },
  spare: { type: Number, required: true },
  binaryData: { type: String, required: true },

  
});

const AisType6Data = model<IAisType6Data>('AisType6Data', AisType6DataSchema);
export default AisType6Data;
