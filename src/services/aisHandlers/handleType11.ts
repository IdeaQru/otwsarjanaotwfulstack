import AisType11Data from '../../models/aisType11data';
import { getAndCombineAisData } from '../../services/aisHandlers/getCombinedAISData';

export const handleType11 = async (data: any) => {
  try {
    const aisType11Data = new AisType11Data({
      type: data.type,
      mmsi: data.mmsi,
      utcYear: data.utcYear,
      utcMonth: data.utcMonth,
      utcDay: data.utcDay,
      utcHour: data.utcHour,
      utcMinute: data.utcMinute,
      positionAccuracy: data.positionAccuracy,
      longitude: data.longitude,
      latitude: data.latitude,
      epfd: data.epfd,
      timestamp: new Date(),
    });

    await aisType11Data.save();
    console.log('AIS Type 11 Data berhasil disimpan ke database');
    // Update combined AIS data
    await getAndCombineAisData(data.mmsi);
  } catch (error) {
    console.log(error);
  }
};
