import AisType21Data from '../../models/aisType21data';
import { getAndCombineAisData } from '../../services/aisHandlers/getCombinedAISData';

export const handleType21 = async (data: any) => {
  try {
  const aisType21Data = new AisType21Data({
    type: data.type,
    mmsi: data.mmsi,
    aidType: data.aidType,
    name: data.name,
    positionAccuracy: data.positionAccuracy,
    longitude: data.longitude,
    latitude: data.latitude,
    dimensionToBow: data.dimensionToBow,
    dimensionToStern: data.dimensionToStern,
    dimensionToPort: data.dimensionToPort,
    dimensionToStarboard: data.dimensionToStarboard,
    epfd: data.epfd,
    secondMark: data.secondMark,
    offPositionIndicator: data.offPositionIndicator,
    virtualAid: data.virtualAid,
    assignedModeFlag: data.assignedModeFlag,
    timestamp: new Date(),
  });

  await aisType21Data.save();
  // console.log('AIS Type 21 Data berhasil disimpan ke database');
  // Update combined AIS data
  await getAndCombineAisData(data.mmsi);
}catch (error) {
  console.log(error);
}
};
