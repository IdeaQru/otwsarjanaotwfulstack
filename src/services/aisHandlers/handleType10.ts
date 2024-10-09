import AisType10Data from '../../models/aisType10data';
import { getAndCombineAisData } from '../../services/aisHandlers/getCombinedAISData';

export const handleType10 = async (data: any) => {
  const aisType10Data = new AisType10Data({
    type: data.type,
    mmsi: data.mmsi,
    destinationMMSI: data.destinationMMSI,
    timestamp: new Date(),
  });

  await aisType10Data.save();
  console.log('AIS Type 10 Data berhasil disimpan ke database');
  // Update combined AIS data
  await getAndCombineAisData(data.mmsi);
};
