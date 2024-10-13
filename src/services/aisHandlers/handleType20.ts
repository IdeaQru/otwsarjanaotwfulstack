import AisType20Data from '../../models/aisType20data';
import { getAndCombineAisData } from '../../services/aisHandlers/getCombinedAISData';

export const handleType20 = async (data: any) => {
  try {
  const aisType20Data = new AisType20Data({
    type: data.type,
    mmsi: data.mmsi,
    offsetNumber1: data.offsetNumber1,
    slotsAllocated1: data.slotsAllocated1,
    increment1: data.increment1,
    offsetNumber2: data.offsetNumber2,
    slotsAllocated2: data.slotsAllocated2,
    increment2: data.increment2,
    offsetNumber3: data.offsetNumber3,
    slotsAllocated3: data.slotsAllocated3,
    increment3: data.increment3,
    offsetNumber4: data.offsetNumber4,
    slotsAllocated4: data.slotsAllocated4,
    increment4: data.increment4,
    timestamp: new Date(),
  });

  await aisType20Data.save();
  console.log('AIS Type 20 Data berhasil disimpan ke database');
  // Update combined AIS data
  await getAndCombineAisData(data.mmsi);
}catch (error) {
  console.log(error);
}
};
