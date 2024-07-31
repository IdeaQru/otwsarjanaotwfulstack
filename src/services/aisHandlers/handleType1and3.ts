import AisType1and3Data from '../../models/aisType1and3Data';
import { getAndCombineAisData } from '../../services/aisHandlers/getCombinedAISData';

export const handleType1and3 = async (data: any) => {
  const aisType1and3Data = new AisType1and3Data({
    type: data.type,
    mmsi: data.mmsi,
    timestamp: new Date(),
    latitude: data.lat,
    longitude: data.lon,
    speed: data.speedOverGround,
    course: data.courseOverGround,
    heading: data.heading || 0,
    navStatus: data.navStatus,
    rateOfTurn: data.rateOfTurn || 0,
  });

  await aisType1and3Data.save();
  console.log(`AIS Dynamic Data (Type ${data.type}) berhasil disimpan ke database`);
   // Perbarui data gabungan
   await getAndCombineAisData(data.mmsi);
};
