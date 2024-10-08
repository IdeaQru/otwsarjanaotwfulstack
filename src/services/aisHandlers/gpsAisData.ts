import { gpsAisData } from '../../models/gpsAisdata';

interface AisDataInput {
  mmsi: string;
  lat: number;
  lon: number;
  type: string;
  speedOverGround?: number;
  courseOverGround?: number;
  heading?: number;
  destination?: string;
}

export class gpsAisService {
  // Fungsi untuk membuat atau memperbarui data AIS
  async saveAisData(data: AisDataInput): Promise<void> {
    const existingData = await gpsAisData.findOne({ mmsi: data.mmsi });
    if (existingData) {
      // Update data jika sudah ada
      await gpsAisData.updateOne({ mmsi: data.mmsi }, data);
      console.log(`Updated AIS data for MMSI: ${data.mmsi}`);
    } else {
      // Simpan data baru
      const newData = new gpsAisData(data);
      await newData.save();
      console.log(`Saved new AIS data for MMSI: ${data.mmsi}`);
    }
  }

  // Fungsi untuk mengambil data berdasarkan MMSI
  async getAisDataByMmsi(mmsi: string) {
    return gpsAisData.findOne({ mmsi });
  }

  // Fungsi untuk mendapatkan semua data AIS
  async getAllAisData() {
    return gpsAisData.find();
  }
}
