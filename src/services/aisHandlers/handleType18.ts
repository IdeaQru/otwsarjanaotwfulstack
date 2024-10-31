import AisType18Data from '../../models/aisType18data';
import { getAndCombineAisData } from '../../services/aisHandlers/getCombinedAISData';

export const handleType18 = async (data: any) => {
  try {
    const aisType18Data = new AisType18Data({
      type: data.type,
      mmsi: data.mmsi,
      timestamp: new Date(),
      speedOverGround: data.speedOverGround,
      accuracy: data.accuracy,
      longitude: data.lon,
      latitude: data.lat,
      courseOverGround: data.courseOverGround,
      heading: data.heading,
      utcSecond: data.utcSecond,
      regional: data.regional,
      unitFlag: data.unitFlag,
      displayFlag: data.displayFlag,
      dscFlag: data.dscFlag,
      bandFlag: data.bandFlag,
      msg22Flag: data.msg22Flag,
      modeFlag: data.modeFlag,
      raim: data.raim,
      radio: data.radio,
      sentence: data.sentences,

    });

    await aisType18Data.save();


    // console.log('AIS Type 18 Data berhasil disimpan ke database');
    // Perbarui data gabungan
    getAndCombineAisData(data.mmsi);
  } catch (error) {
    console.log(error);
  }
};
