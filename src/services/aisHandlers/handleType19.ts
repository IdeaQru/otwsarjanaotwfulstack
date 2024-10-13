import AisType19Data from '../../models/aisType19data';
import { getAndCombineAisData } from '../../services/aisHandlers/getCombinedAISData';

export const handleType19 = async (data: any) => {
  try {
  const aisType19Data = new AisType19Data({
    type: data.type,
    mmsi: data.mmsi,
    speedOverGround: data.speedOverGround,
    positionAccuracy: data.positionAccuracy,
    longitude: data.longitude,
    latitude: data.latitude,
    courseOverGround: data.courseOverGround,
    heading: data.heading,
    timestamp: new Date(),
    shipType: data.shipType,
    shipLength: data.shipLength,
    shipWidth: data.shipWidth,
    epfd: data.epfd,
    destination: data.destination,
    dte: data.dte,
  });

  await aisType19Data.save();
  console.log('AIS Type 19 Data berhasil disimpan ke database');
  // Update combined AIS data
  await getAndCombineAisData(data.mmsi);
}catch (error) {
  console.log(error);
}
};
