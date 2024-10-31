import AisType7Data from '../../models/aisType7data';
import { getAndCombineAisData } from '../../services/aisHandlers/getCombinedAISData';

export const handleType7 = async (data: any) => {
  try{
  const aisType7Data = new AisType7Data({
    type: data.type,
    mmsi: data.mmsi,
    ackMMSI1: data.ackMMSI1,
    ackMMSI2: data.ackMMSI2,
    ackMMSI3: data.ackMMSI3,
    ackMMSI4: data.ackMMSI4,
    timestamp: new Date(),
  });

  await aisType7Data.save();
  // console.log('AIS Type 7 Data berhasil disimpan ke database');
  // Update combined AIS data
  await getAndCombineAisData(data.mmsi);
}catch (error) {
  console.log(error);
}
};
