import AisType26Data from '../../models/aisType26data';
import { getAndCombineAisData } from '../../services/aisHandlers/getCombinedAISData';

export const handleType26 = async (data: any) => {
  try {
  const aisType26Data = new AisType26Data({
    type: data.type,
    mmsi: data.mmsi,
    destinationMMSI: data.destinationMMSI,
    binaryData: data.binaryData,
    applicationIdentifier: data.applicationIdentifier,
    slotIncrement: data.slotIncrement,
    spare: data.spare,
    timestamp: new Date(),
  });

  await aisType26Data.save();
  console.log('AIS Type 26 Data berhasil disimpan ke database');
  // Update combined AIS data
  await getAndCombineAisData(data.mmsi);
}catch (error) {
  console.log(error);
}
};
