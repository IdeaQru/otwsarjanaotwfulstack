import mongoose, { Schema, Document } from "mongoose";

export interface IShipMovement extends Document {
  shipId: number;
  shipName: string;
  zoneId: string;
  zoneName: string;
  zoneType: string;
  action: "enter" | "exit";
  latitude: number;
  longitude: number;
  timestamp: Date;
  sog?: number; // Speed Over Ground (optional)
  cog?: number; // Course Over Ground (optional)
  heading?: number; // Heading (optional)
  destination?: string; // Destination (optional)
}

const ShipMovementSchema: Schema = new Schema({
  shipId: { type: Number, required: true },
  shipName: { type: String, default: "Unknown Ship Name" },
  zoneId: { type: String, required: true },
  zoneType: { type: String, required: true },
  zoneName: { type: String, required: true },
  action: { type: String, enum: ["enter", "exit"], required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  timestamp: { type: Date, required: true },
  sog: { type: Number, default: null }, // Speed Over Ground
  cog: { type: Number, default: null }, // Course Over Ground
  heading: { type: Number, default: null }, // Heading
  destination: { type: String, default: null }, // Destination
});

export const ShipMovement = mongoose.model<IShipMovement>(
  "ShipMovement",
  ShipMovementSchema
);
