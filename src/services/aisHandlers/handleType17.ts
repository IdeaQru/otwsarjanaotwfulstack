import AisType17Data from '../../models/aisType17data';
import { getAndCombineAisData } from '../../services/aisHandlers/getCombinedAISData';

export const handleType17 = async (data: any) => {
  try {
  const aisType17Data = new AisType17Data({
    type: data.type,
    mmsi: data.mmsi,
    longitude: data.longitude,
    latitude: data.latitude,
    binaryData: data.binaryData,
    timestamp: new Date(),
  });

  await aisType17Data.save();
  // console.log('AIS Type 17 Data berhasil disimpan ke database');
  // Update combined AIS data
  await getAndCombineAisData(data.mmsi);
}catch (error) {
  console.log(error);
}
};
