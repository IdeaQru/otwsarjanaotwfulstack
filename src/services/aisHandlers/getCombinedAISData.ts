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
  const dynamicDataEntries = [
    (await AisType1and3Data.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
    (await AisType9Data.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
    (await AisType18Data.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
    (await AisType19Data.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
    (await AisType21Data.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
    (await AisType27Data.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
  ].filter((entry) => entry && (entry as any).timestamp);

  const latestDynamicData = dynamicDataEntries.sort((a, b) =>
    moment((b as any).timestamp).diff(moment((a as any).timestamp))
  )[0];

  const staticDataEntries = [
    (await AisType5Data.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
    (await AisType7Data.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
    (await AisType8Data.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
    (await AisType10Data.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
    (await AisType11Data.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
    (await AisType12Data.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
    (await AisType13Data.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
    (await AisType14Data.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
    (await AisType15Data.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
    (await AisType16Data.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
    (await AisType17Data.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
    (await AisType20Data.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
    (await AisType22Data.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
    (await AisType23Data.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
    (await AisType24AData.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
    (await AisType24BData.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
    (await AisType25Data.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
    (await AisType26Data.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
  ].filter((entry) => entry && (entry as any).timestamp);

  const latestStaticData = staticDataEntries.sort((a, b) =>
    moment((b as any).timestamp).diff(moment((a as any).timestamp))
  )[0];


  if (latestDynamicData && (latestDynamicData as any).longitude && (latestDynamicData as any).latitude) {
    // Gunakan waktu sekarang untuk timestamp
    const now = new Date();
    const formattedTimestamp = moment(now).format('DD-MM-YYYY HH:mm:ss');

    const combinedData = {
      mmsi: (latestDynamicData as any).mmsi,
      lon: (latestDynamicData as any).longitude,
      lat: (latestDynamicData as any).latitude,
      name: (latestStaticData as any)?.name || (latestStaticData as any)?.shipName || undefined,
      type:
        (latestStaticData as any)?.typeAndCargo ||
        (latestStaticData as any)?.shipType ||
        (latestStaticData as any)?.modelType ||
        (latestStaticData as any)?.vesselType || undefined,
      speedOverGround: (latestDynamicData as any).speedOverGround || undefined,
      courseOverGround: (latestDynamicData as any).courseOverGround || undefined,
      heading: 360 -(latestDynamicData as any).heading || 0,
      timestamp: formattedTimestamp, // Waktu saat ini
      destination: (latestStaticData as any)?.destination || undefined,
    };
  
    const existingData = await CombinedAisData.findOne({ mmsi: combinedData.mmsi });
    const existingTimestamp = existingData && (existingData as any).timestamp
      ? moment((existingData as any).timestamp, 'DD-MM-YYYY HH:mm:ss')
      : null;
  
    const newTimestamp = moment(combinedData.timestamp, 'DD-MM-YYYY HH:mm:ss');
  
    if (!existingTimestamp || newTimestamp.isAfter(existingTimestamp)) {
      await CombinedAisData.updateOne({ mmsi: combinedData.mmsi }, combinedData, { upsert: true });
      console.log(`Updated AIS data for MMSI: ${combinedData.mmsi} with timestamp: ${combinedData.timestamp}`);
    } else {
      console.log(`Ignored outdated AIS data for MMSI: ${combinedData.mmsi} with timestamp: ${combinedData.timestamp}`);
    }
  } else {
    console.log(`Dynamic data is incomplete (missing longitude or latitude) for mmsi: ${mmsi}`);
  }
  
};
