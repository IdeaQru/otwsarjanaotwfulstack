import AisType9Data from '../../models/aisType9data';
import { getAndCombineAisData } from '../../services/aisHandlers/getCombinedAISData';

export const handleType9 = async (data: any) => {
  try {
  const aisType9Data = new AisType9Data({
    type: data.type,
    mmsi: data.mmsi,
    altitude: data.altitude,
    speedOverGround: data.speedOverGround,
    positionAccuracy: data.positionAccuracy,
    longitude: data.longitude,
    latitude: data.latitude,
    courseOverGround: data.courseOverGround,
    timestamp: new Date(),
  });

  await aisType9Data.save();
  // console.log('AIS Type 9 Data berhasil disimpan ke database');
  // Update combined AIS data
   getAndCombineAisData(data.mmsi);
}catch (error) {
  console.log(error);
}
};
