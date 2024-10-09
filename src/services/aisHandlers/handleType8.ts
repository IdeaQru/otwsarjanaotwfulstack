import AisType8Data from '../../models/aisType8data';
import { getAndCombineAisData } from '../../services/aisHandlers/getCombinedAISData';

export const handleType8 = async (data: any) => {
  const aisType8Data = new AisType8Data({
    type: data.type,
    mmsi: data.mmsi,
    binaryData: data.binaryData,
    timestamp: new Date(),
  });

  await aisType8Data.save();
  console.log('AIS Type 8 Data berhasil disimpan ke database');
  // Update combined AIS data
  await getAndCombineAisData(data.mmsi);
};
