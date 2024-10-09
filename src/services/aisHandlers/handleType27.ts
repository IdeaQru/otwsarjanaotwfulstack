import AisType27Data from '../../models/aisType27data';
import { getAndCombineAisData } from '../../services/aisHandlers/getCombinedAISData';

export const handleType27 = async (data: any) => {
  const aisType27Data = new AisType27Data({
    type: data.type,
    mmsi: data.mmsi,
    positionAccuracy: data.positionAccuracy,
    raimFlag: data.raimFlag,
    longitude: data.longitude,
    latitude: data.latitude,
    positionStatus: data.positionStatus,
    timestamp: new Date(),
  });

  await aisType27Data.save();
  console.log('AIS Type 27 Data berhasil disimpan ke database');
  // Update combined AIS data
  await getAndCombineAisData(data.mmsi);
};
