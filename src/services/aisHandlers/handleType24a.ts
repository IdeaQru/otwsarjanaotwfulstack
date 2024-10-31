import AisType24AData from '../../models/aisType24Adata';
import { getAndCombineAisData } from '../../services/aisHandlers/getCombinedAISData';

export const handleType24a = async (data: any) => {
  const aisType24AData = new AisType24AData({
    type: data.type,
    mmsi: data.mmsi,
    partNum: data.partNum,
    name: data.name,
    timestamp: new Date(),
    sentence: data.sentences,

  });

  await aisType24AData.save();
  // console.log('AIS Type 24 Part A Data berhasil disimpan ke database');
    // Perbarui data gabungan
    await getAndCombineAisData(data.mmsi);
};
