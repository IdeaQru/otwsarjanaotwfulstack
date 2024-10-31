import AisType22Data from '../../models/aisType22data';
import { getAndCombineAisData } from '../../services/aisHandlers/getCombinedAISData';

export const handleType22 = async (data: any) => {
  try {
  const aisType22Data = new AisType22Data({
    type: data.type,
    mmsi: data.mmsi,
    channelA: data.channelA,
    channelB: data.channelB,
    txRxMode: data.txRxMode,
    power: data.power,
    northeastLongitude: data.northeastLongitude,
    northeastLatitude: data.northeastLatitude,
    southwestLongitude: data.southwestLongitude,
    southwestLatitude: data.southwestLatitude,
    addressed: data.addressed,
    bandwidthA: data.bandwidthA,
    bandwidthB: data.bandwidthB,
    timestamp: new Date(),
  });

  await aisType22Data.save();
  // console.log('AIS Type 22 Data berhasil disimpan ke database');
  // Update combined AIS data
  await getAndCombineAisData(data.mmsi);
}catch (error) {
  console.log(error);
}
};
