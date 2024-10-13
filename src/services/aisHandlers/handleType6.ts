import AisType6Data from '../../models/aisType6data';
import { getAndCombineAisData } from '../../services/aisHandlers/getCombinedAISData';

export const handleType6 = async (data: any) => {
  try {
  const aisType6Data = new AisType6Data({
    type: data.type,
    mmsi: data.mmsi,
    sequenceNumber: data.sequenceNumber,
    destinationMMSI: data.destinationMMSI,
    retransmitFlag: data.retransmitFlag,
    spare: data.spare,
    binaryData: data.binaryData,
    timestamp: new Date(),
  });

  await aisType6Data.save();
  console.log('AIS Type 6 Data berhasil disimpan ke database');
  // Update combined AIS data
  await getAndCombineAisData(data.mmsi);
} catch (error) {
  console.log(error);
}
};
