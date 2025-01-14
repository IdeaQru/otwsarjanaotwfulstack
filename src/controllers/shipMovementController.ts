import { Request, Response } from "express";
import { ShipMovement } from "../models/shipMovement";

export class ShipMovementController {
  // Tambahkan data pergerakan kapal
  static async addShipMovement(req: Request, res: Response): Promise<Response> {
    try {
      const { 
        shipId, 
        shipName, 
        zoneId, 
        zoneName, 
        zoneType,
        action, 
        latitude, 
        longitude, 
        timestamp, 
        sog, 
        cog, 
        heading, 
        destination 
      } = req.body;

      if (!shipId || !zoneId || !zoneName || !action || latitude == null || longitude == null) {
        return res.status(400).json({ error: "shipId, zoneId, zoneName, action, latitude, and longitude are required." });
      }

      const shipMovement = new ShipMovement({
        shipId,
        shipName: shipName || "Unknown Ship Name",
        zoneId,
        zoneName,
        action,
        zoneType: zoneType || "Unknown Zone Type",
        latitude,
        longitude,
        timestamp: timestamp ? new Date(timestamp) : new Date(),
        sog: sog || null,
        cog: cog || null,
        heading: heading || null,
        destination: destination || null,
      });

      await shipMovement.save();

      return res.status(201).json({ message: "Ship movement recorded successfully." });
    } catch (error) {
      console.error("Error adding ship movement:", error);
      return res.status(500).json({ error: "Failed to record ship movement." });
    }
  }

  // Dapatkan semua data pergerakan kapal
  static async getShipMovements(_: Request, res: Response): Promise<Response> {
    try {
      const movements = await ShipMovement.find();
      return res.status(200).json(movements);
    } catch (error) {
      console.error("Error fetching ship movements:", error);
      return res.status(500).json({ error: "Failed to fetch ship movements." });
    }
  }

  // Perbarui data pergerakan kapal berdasarkan shipId dan zoneId
  static async updateShipMovement(req: Request, res: Response): Promise<Response> {
    try {
      const { shipId, zoneId } = req.params;
      const { latitude, longitude, zoneType, action, timestamp, sog, cog, heading, destination } = req.body;
  
      if (!shipId || !zoneId) {
        return res.status(400).json({ error: "shipId and zoneId are required in the URL parameters." });
      }
  
      if (latitude == null || longitude == null || !action || !timestamp) {
        return res.status(400).json({ error: "latitude, longitude, action, and timestamp are required in the request body." });
      }
  
      const movement = await ShipMovement.findOne({ shipId, zoneId, action: 'enter' });
  
      if (!movement) {
        return res.status(404).json({ error: "No active ship movement found for the given shipId and zoneId." });
      }
  
      const incomingTimestamp = new Date(timestamp);
      const existingTimestamp = new Date(movement.timestamp);
  
      // Periksa apakah timestamp baru lebih besar dari timestamp yang ada
      if (incomingTimestamp <= existingTimestamp) {
        return res.status(400).json({ 
          error: "The provided timestamp is not newer than the existing record's timestamp.",
          currentTimestamp: movement.timestamp
        });
      }
  
      // Perbarui hanya jika timestamp lebih baru
      movement.latitude = latitude;
      movement.longitude = longitude;
      movement.timestamp = incomingTimestamp;
      movement.sog = sog || movement.sog;
      movement.cog = cog || movement.cog;
      movement.heading = heading || movement.heading;
      movement.destination = destination || movement.destination;
      movement.zoneType = zoneType || movement.zoneType;
  
      const updatedMovement = await movement.save();
  
      return res.status(200).json({ 
        message: "Ship movement updated successfully.", 
        data: updatedMovement 
      });
    } catch (error) {
      console.error("Error updating ship movement:", error);
      return res.status(500).json({ error: "Failed to update ship movement due to server error." });
    }
  }
  

  // Ambil data pergerakan kapal terbaru
  static async getLatestMovement(req: Request, res: Response): Promise<Response> {
    try {
      const { shipId, zoneId } = req.query;

      if (!shipId) {
        return res.status(400).json({ error: "shipId is required in the query parameters." });
      }

      const filter: any = { shipId };
      if (zoneId) {
        filter.zoneId = zoneId;
      }

      const latestMovement = await ShipMovement.findOne(filter).sort({ timestamp: -1 });

      if (!latestMovement) {
        return res.status(404).json({ error: "No movement found for the given criteria." });
      }

      return res.status(200).json(latestMovement);
    } catch (error) {
      console.error("Error fetching latest movement:", error);
      return res.status(500).json({ error: "Failed to fetch latest movement due to server error." });
    }
  }
}
