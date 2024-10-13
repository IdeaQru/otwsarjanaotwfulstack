import AisType16Data from '../../models/aisType16data';
import { getAndCombineAisData } from '../../services/aisHandlers/getCombinedAISData';

export const handleType16 = async (data: any) => {
  try {
    const aisType16Data = new AisType16Data({
      type: data.type,
      mmsi: data.mmsi,
      destinationMMSI1: data.destinationMMSI1,
      offset1: data.offset1,
      increment1: data.increment1,
      destinationMMSI2: data.destinationMMSI2,
      offset2: data.offset2,
      increment2: data.increment2,
      timestamp: new Date(),
    });

    await aisType16Data.save();
    console.log('AIS Type 16 Data berhasil disimpan ke database');
    // Update combined AIS data
    await getAndCombineAisData(data.mmsi);
  } catch (error) {
    console.log(error);
  }
};
