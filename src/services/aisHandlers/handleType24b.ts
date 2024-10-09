import AisType24BData from '../../models/aisType24Bdata';
import { getAndCombineAisData } from '../../services/aisHandlers/getCombinedAISData';

export const handleType24b = async (data: any) => {
  const aisType24BData = new AisType24BData({
    type: data.type,
    mmsi: data.mmsi,
    partNum: data.partNum,
    typeAndCargo: data.typeAndCargo,
    vendorId: data.vendorId || '',
    modelType: data.model,  // Use renamed property
    serial: data.serial,
    callsign: data.callsign,
    dimBow: data.dimBow,
    dimStern: data.dimStern,
    dimPort: data.dimPort,
    dimStarboard: data.dimStarboard,
    timestamp: new Date(),
    sentence: data.sentences,

  });

  await aisType24BData.save();
  console.log('AIS Type 24 Part B Data berhasil disimpan ke database');
    // Perbarui data gabungan
    await getAndCombineAisData(data.mmsi);
};
