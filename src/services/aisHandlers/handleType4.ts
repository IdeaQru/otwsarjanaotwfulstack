import AisType4Data from '../../models/aisType4data';
import { getAndCombineAisData } from '../../services/aisHandlers/getCombinedAISData';

export const handleType4 = async (data: any) => {
  const aisType4Data = new AisType4Data({
    type: data.type,
    mmsi: data.mmsi,
    timestamp: data.timestamp,
    longitude: data.longitude,
    latitude: data.latitude,
    epfd: data.epfd,
    dateTime: new Date(),
  });

  await aisType4Data.save();
  console.log('AIS Type 4 Data berhasil disimpan ke database');
  // Update combined AIS data
  await getAndCombineAisData(data.mmsi);
};
