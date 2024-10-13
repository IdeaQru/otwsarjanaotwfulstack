import AisType23Data from '../../models/aisType23data';
import { getAndCombineAisData } from '../../services/aisHandlers/getCombinedAISData';

export const handleType23 = async (data: any) => {
  try {
  const aisType23Data = new AisType23Data({
    type: data.type,
    mmsi: data.mmsi,
    northeastLongitude: data.northeastLongitude,
    northeastLatitude: data.northeastLatitude,
    southwestLongitude: data.southwestLongitude,
    southwestLatitude: data.southwestLatitude,
    stationType: data.stationType,
    typeAndPower: data.typeAndPower,
    txRxMode: data.txRxMode,
    reportInterval: data.reportInterval,
    quietTime: data.quietTime,
    timestamp: new Date(),
  });

  await aisType23Data.save();
  console.log('AIS Type 23 Data berhasil disimpan ke database');
  // Update combined AIS data
  await getAndCombineAisData(data.mmsi);
}catch (error) {
  console.log(error);
}
};
