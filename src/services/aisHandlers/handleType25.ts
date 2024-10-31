import AisType25Data from '../../models/aisType25data';
import { getAndCombineAisData } from '../../services/aisHandlers/getCombinedAISData';

export const handleType25 = async (data: any) => {
  try {
  const aisType25Data = new AisType25Data({
    type: data.type,
    mmsi: data.mmsi,
    destinationMMSI: data.destinationMMSI,
    binaryData: data.binaryData,
    applicationIdentifier: data.applicationIdentifier,
    timestamp: new Date(),
  });

  await aisType25Data.save();
  // console.log('AIS Type 25 Data berhasil disimpan ke database');
  // Update combined AIS data
  await getAndCombineAisData(data.mmsi);
}catch (error) {
  console.log(error);
}
};
