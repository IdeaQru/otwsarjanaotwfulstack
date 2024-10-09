import AisLog, { IAisLog } from '../../models/aisLog';
import moment from 'moment';

/**
 * Fungsi untuk menyimpan log data AIS ke dalam collection AisLog
 * Jika MMSI yang sama sudah ada, data akan ditambahkan ke array details, bukan diperbarui
 * @param {number} mmsi - Nomor identifikasi kapal (MMSI)
 * @param {string} name - Nama kapal
 * @param {object} combinedData - Data gabungan yang berisi informasi dinamis dan statis dari kapal
 */
export const saveAisLog = async (mmsi: number, name: string, combinedData: object): Promise<void> => {
  try {
    const logTime = moment(Date.now()).format('DD-MM-YYYY HH:mm:ss');

    // Tambahkan data details baru jika MMSI sudah ada, atau buat entri baru jika tidak ada
    await AisLog.findOneAndUpdate(
      { mmsi }, // Cari berdasarkan MMSI
      {
        $set: { name, logTime }, // Perbarui atau set nama dan logTime
        $push: { details: combinedData }, // Tambahkan data baru ke dalam array details
      },
      { upsert: true, new: true } // Buat entri baru jika tidak ada MMSI yang cocok (upsert)
    );

    console.log('AIS Log successfully saved to the database');
  } catch (error) {
    console.error('Error saving AIS Log:', error);
  }
};
