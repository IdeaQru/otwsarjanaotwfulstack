import AisType5Data from '../../models/aisType5data';
import { getAndCombineAisData } from '../../services/aisHandlers/getCombinedAISData';

export const handleType5 = async (data: any) => {
  try {
  const aisType5Data = new AisType5Data({
    type: data.type,
    mmsi: data.mmsi,
    aisVersion: data.aisVersion,
    imo: data.imo,
    callsign: data.callsign,
    name: data.name,
    typeAndCargo: data.typeAndCargo,
    dimBow: data.dimBow,
    dimStern: data.dimStern,
    dimPort: data.dimPort,
    dimStarboard: data.dimStarboard,
    epfd: data.epfd,
    etaMonth: data.etaMonth,
    etaDay: data.etaDay,
    etaHour: data.etaHour,
    etaMinute: data.etaMinute,
    draught: data.draught,
    destination: data.destination,
    dte: data.dte,
    timestamp: new Date(),
    sentence: data.sentences,
  });

  await aisType5Data.save();
  console.log('AIS Type 5 Data berhasil disimpan ke database');

    // Perbarui data gabungan
    await getAndCombineAisData(data.mmsi);
} catch (error) {
  console.error(error);
}
};
