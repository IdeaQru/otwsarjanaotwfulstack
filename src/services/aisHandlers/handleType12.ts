import AisType12Data from '../../models/aisType12data';
import { getAndCombineAisData } from '../../services/aisHandlers/getCombinedAISData';

export const handleType12 = async (data: any) => {
  try{
  const aisType12Data = new AisType12Data({
    type: data.type,
    mmsi: data.mmsi,
    sequenceNumber: data.sequenceNumber,
    destinationMMSI: data.destinationMMSI,
    retransmitFlag: data.retransmitFlag,
    spare: data.spare,
    safetyRelatedText: data.safetyRelatedText,
    timestamp: new Date(),
  });

  await aisType12Data.save();
  console.log('AIS Type 12 Data berhasil disimpan ke database');
  // Update combined AIS data
  await getAndCombineAisData(data.mmsi);
}catch (error) {
  console.log(error);
}
};
