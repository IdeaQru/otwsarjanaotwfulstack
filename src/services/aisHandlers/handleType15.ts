import AisType15Data from '../../models/aisType15data';
import { getAndCombineAisData } from '../../services/aisHandlers/getCombinedAISData';

export const handleType15 = async (data: any) => {
  try {
  const aisType15Data = new AisType15Data({
    type: data.type,
    mmsi: data.mmsi,
    interrogatedMMSI1: data.interrogatedMMSI1,
    interrogatedMMSI2: data.interrogatedMMSI2,
    type1_1: data.type1_1,
    offset1_1: data.offset1_1,
    type1_2: data.type1_2,
    offset1_2: data.offset1_2,
    type2_1: data.type2_1,
    offset2_1: data.offset2_1,
    timestamp: new Date(),
  });

  await aisType15Data.save();
  // console.log('AIS Type 15 Data berhasil disimpan ke database');
  // Update combined AIS data
  await getAndCombineAisData(data.mmsi);
}catch (error) {
  console.log(error);
}
};
