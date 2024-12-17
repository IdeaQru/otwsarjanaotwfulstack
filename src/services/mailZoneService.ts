// src/services/mailZoneService.ts
import MailZone from '../models/mailZone';

export class MailZoneService {

  // Function to check for duplicate and create a new SBNP Zone
  async createSbnZone(data: {
    sbnpName: string;
    sbnpType: string;
    selectedApiKey: string;
    mmsi: number;
    baseStationMmsi: number;
    longitude: number;
    latitude: number;
  }) {
    const { sbnpName, sbnpType, selectedApiKey, mmsi,baseStationMmsi, longitude, latitude } = data;

    // Check if the zone already exists based on sbnpName, baseStationMmsi, or selectedApiKey
    const existingZone = await MailZone.findOne({
      $or: [
        { sbnpName },
        { mmsi },
        { selectedApiKey },
      ]
    });

    if (existingZone) {
      throw new Error('SBNP Zone with the same name, MMSI, or API Key already exists.');
    }

    // Create a new SBNP Zone
    const newZone = new MailZone({
      sbnpName,
      sbnpType,
      selectedApiKey,
      mmsi,
      baseStationMmsi,
      longitude,
      latitude,
    });

    // Save the new zone to the database
    await newZone.save();

    return newZone;  // Return the created zone object
  }

  async getAllMailZones(): Promise<any[]> {
    try {
      // Example database call to fetch all mail zones
      const mailZones = await MailZone.find(); // For MongoDB, or your DB equivalent
      return mailZones;
    } catch (error: any) {
      throw new Error('Error fetching mail zones');
    }
  }
}
