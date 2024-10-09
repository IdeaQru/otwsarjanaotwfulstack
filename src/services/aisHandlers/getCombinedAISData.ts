import AisType1and3Data from '../../models/aisType1-2and3data';
import AisType5Data from '../../models/aisType5data';
import AisType24AData from '../../models/aisType24Adata';
import AisType24BData from '../../models/aisType24Bdata';
import AisType7Data from '../../models/aisType7data';
import AisType8Data from '../../models/aisType8data';
import AisType9Data from '../../models/aisType9data';
import AisType10Data from '../../models/aisType10data';
import AisType11Data from '../../models/aisType11data';
import AisType12Data from '../../models/aisType12data';
import AisType13Data from '../../models/aisType13data';
import AisType14Data from '../../models/aisType14data';
import AisType15Data from '../../models/aisType15data';
import AisType16Data from '../../models/aisType16data';
import AisType17Data from '../../models/aisType17data';
import AisType18Data from '../../models/aisType18data';
import AisType19Data from '../../models/aisType19data';
import AisType20Data from '../../models/aisType20data';
import AisType21Data from '../../models/aisType21data';
import AisType22Data from '../../models/aisType22data';
import AisType23Data from '../../models/aisType23data';
import AisType25Data from '../../models/aisType25data';
import AisType26Data from '../../models/aisType26data';
import AisType27Data from '../../models/aisType27data';
import CombinedAisData from '../../models/combinedAisData';
import { saveAisLog } from './aisLogData';
import moment from 'moment';

export const getAndCombineAisData = async (mmsi: number) => {
  // Query dynamic data from Types 1, 2, 3, 9, 18, 19, 21, and 27 (position-related data)
  const dynamicData =
    (await AisType1and3Data.findOne({ mmsi })) ||
    (await AisType9Data.findOne({ mmsi })) ||
    (await AisType18Data.findOne({ mmsi })) ||
    (await AisType19Data.findOne({ mmsi })) ||
    (await AisType21Data.findOne({ mmsi })) ||
    (await AisType27Data.findOne({ mmsi }));

  // Query static data from Types 5, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 20, 22, 23, 24, 25, and 26 (vessel-related data)
  const staticData =
    (await AisType5Data.findOne({ mmsi })) ||
    (await AisType7Data.findOne({ mmsi })) ||
    (await AisType8Data.findOne({ mmsi })) ||
    (await AisType10Data.findOne({ mmsi })) ||
    (await AisType11Data.findOne({ mmsi })) ||
    (await AisType12Data.findOne({ mmsi })) ||
    (await AisType13Data.findOne({ mmsi })) ||
    (await AisType14Data.findOne({ mmsi })) ||
    (await AisType15Data.findOne({ mmsi })) ||
    (await AisType16Data.findOne({ mmsi })) ||
    (await AisType17Data.findOne({ mmsi })) ||
    (await AisType20Data.findOne({ mmsi })) ||
    (await AisType22Data.findOne({ mmsi })) ||
    (await AisType23Data.findOne({ mmsi })) ||
    (await AisType24AData.findOne({ mmsi })) ||
    (await AisType24BData.findOne({ mmsi })) ||
    (await AisType25Data.findOne({ mmsi })) ||
    (await AisType26Data.findOne({ mmsi }));

  // Ensure dynamic data has necessary coordinates before combining
  if (dynamicData && dynamicData.longitude && dynamicData.latitude) {
    const combinedData = {
      mmsi: dynamicData.mmsi,
      lon: dynamicData.longitude,
      lat: dynamicData.latitude,
      name: staticData?.name || (staticData as any)?.shipName || undefined,
      type:
        staticData?.typeAndCargo ||
        (staticData as any)?.shipType ||
        (staticData as any)?.modelType ||
        (staticData as any)?.vesselType || undefined,
      speedOverGround: dynamicData.speedOverGround || undefined,
      courseOverGround: dynamicData.courseOverGround || undefined,
      heading: dynamicData.heading || 0,
      timestamp: moment(Date.now()).format('DD-MM-YYYY HH:mm:ss'),
      destination: staticData?.destination || undefined,
    };

    // Upsert combined data into the database
    await CombinedAisData.updateOne({ mmsi: combinedData.mmsi }, combinedData, { upsert: true });
    await saveAisLog(combinedData.mmsi, combinedData.name, combinedData);

    console.log('Combined AIS Data and log successfully saved or updated in the database');
  } else {
    console.log('Dynamic data is incomplete (missing longitude or latitude) for mmsi:', mmsi);
  }
};


