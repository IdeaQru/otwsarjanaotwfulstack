import { Request, Response } from 'express';
import { gpsAisService } from '../services/aisHandlers/gpsAisData';

const aisService = new gpsAisService();

// Controller untuk menyimpan atau memperbarui data AIS
export const saveAisData = async (req: Request, res: Response) => {
  try {
    const aisData = req.body;
    await aisService.saveAisData(aisData);
    res.status(200).json({ message: 'AIS data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving AIS data' });
  }
};

// Controller untuk mendapatkan data AIS berdasarkan MMSI
export const getAisData = async (req: Request, res: Response) => {
  try {
    const mmsi = req.params.mmsi;
    const data = await aisService.getAisDataByMmsi(mmsi);
    if (!data) {
      res.status(404).json({ message: 'AIS data not found' });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching AIS data' });
  }
};

// Controller untuk mendapatkan semua data AIS
export const getAllAisData = async (_req: Request, res: Response) => {
  try {
    const data = await aisService.getAllAisData();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching AIS data' });
  }
};
