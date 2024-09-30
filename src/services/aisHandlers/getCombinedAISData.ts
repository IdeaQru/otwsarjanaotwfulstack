import AisType1and3Data from '../../models/aisType1and3Data';
import AisType5Data from '../../models/aisType5Data';
import AisType18Data from '../../models/aisType18Data';
import AisType24AData from '../../models/aisType24AData';
import AisType24BData from '../../models/aisType24BData';
import CombinedAisData from '../../models/combinedAisData';
import moment from 'moment'; // Import moment.js
export const getAndCombineAisData = async (mmsi: number) => {
  // Query dynamic data from Type 1, 3, and 18
  const dynamicData = await AisType1and3Data.findOne({ mmsi }) || await AisType18Data.findOne({ mmsi });
  
  // Query static data from Type 5 and 24 (A and B)
  const staticData = await AisType5Data.findOne({ mmsi }) || await AisType24AData.findOne({ mmsi }) || await AisType24BData.findOne({ mmsi });

  if (dynamicData && dynamicData.longitude && dynamicData.latitude) {
    const combinedData = {
      mmsi: dynamicData.mmsi,
      lon: dynamicData.longitude,
      lat: dynamicData.latitude,
      name: staticData?.name || (staticData as any)?.shipName || undefined,
      type: staticData?.typeAndCargo || (staticData as any)?.shipType || (staticData as any)?.modelType,
      speedOverGround: dynamicData.speedOverGround,
      courseOverGround: dynamicData.courseOverGround,
      heading: dynamicData.heading || 0,
      timestamp: moment(Date.now()).format('DD-MM-YYYY HH:mm:ss'),
      destination: staticData?.destination || undefined,
    };

    await CombinedAisData.updateOne(
      { mmsi: combinedData.mmsi },
      combinedData,
      { upsert: true }
    );

    console.log('Combined AIS Data berhasil disimpan atau diperbarui di database');
  } else {
    console.log('Data dinamis tidak lengkap (longitude atau latitude hilang) untuk mmsi:', mmsi);
  }
};
