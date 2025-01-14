import * as GGencode from "ais-decoder";
import { StaticModel, DynamicModel } from "../../models/aisMessage";

export async function decodeAisMessage(nmea: string): Promise<void> {
  try {
    const aisDecoder = new GGencode.AisDecode(nmea, {});
    if (aisDecoder.valid) {
      const messageType = aisDecoder.aistype;
      const data = { mmsi: aisDecoder.mmsi, raw: nmea, data: aisDecoder };

      if ([5, 24].includes(messageType)) {
        await StaticModel.create(data);
        console.log("Static data saved to MongoDB.");
      } else {
        await DynamicModel.create(data);
        console.log("Dynamic data saved to MongoDB.");
      }
    } else {
      console.error("Invalid AIS Message:", nmea);
    }
  } catch (err) {
    console.error("Error decoding AIS Message:", err);
  }
}
