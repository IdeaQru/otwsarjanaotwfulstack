// services/aisHandlers/handleType1-2and3.ts
import AisType1_2and3Data from '../../models/aisType1-2and3data';
import { getAndCombineAisData } from './getCombinedAISData';

export const handleType1_2_and3 = async (data: any) => {
  try {
    const aisType1_2_and3Data = new AisType1_2and3Data({
      type: data.type,
      mmsi: data.mmsi,
      timestamp: new Date(),
      latitude: data.lat,
      longitude: data.lon,
      speedOverGround: data.speedOverGround,
      courseOverGround: data.courseOverGround,
      heading: data.heading,
      navStatus: data.navStatus,
      rateOfTurn: data.rateOfTurn,
      sentences: data.sentences || [], // Ensure that sentences field is included
    });

    await aisType1_2_and3Data.save();
    console.log('AIS Type 1, 2, or 3 Data successfully saved to the database.');

    // Update combined AIS data
    await getAndCombineAisData(data.mmsi);
  } catch (error) {
    console.error('Error saving AIS Type 1, 2, or 3 Data:', error);
  }
};
