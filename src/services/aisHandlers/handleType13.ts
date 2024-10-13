import AisType13Data from '../../models/aisType13data';
import { getAndCombineAisData } from '../../services/aisHandlers/getCombinedAISData';

export const handleType13 = async (data: any) => {
  try{
  const aisType13Data = new AisType13Data({
    type: data.type,
    mmsi: data.mmsi,
    ackMMSI1: data.ackMMSI1,
    ackMMSI2: data.ackMMSI2,
    ackMMSI3: data.ackMMSI3,
    ackMMSI4: data.ackMMSI4,
    timestamp: new Date(),
  });

  await aisType13Data.save();
  console.log('AIS Type 13 Data berhasil disimpan ke database');
  // Update combined AIS data
  await getAndCombineAisData(data.mmsi);
}catch (error) {
  console.log(error);
}
};
