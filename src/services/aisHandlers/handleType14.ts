import AisType14Data from '../../models/aisType14data';
import { getAndCombineAisData } from '../../services/aisHandlers/getCombinedAISData';

export const handleType14 = async (data: any) => {
  try{
  const aisType14Data = new AisType14Data({
    type: data.type,
    mmsi: data.mmsi,
    safetyRelatedText: data.safetyRelatedText,
    timestamp: new Date(),
  });

  await aisType14Data.save();
  // console.log('AIS Type 14 Data berhasil disimpan ke database');
  // Update combined AIS data
  await getAndCombineAisData(data.mmsi);
}catch (error) {
  console.log(error);
}
};
