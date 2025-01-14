import GGencode = require('ais-decoder');

const nmea = "!AIVDM,1,1,,A,15MvlV001S0RQlR>kMJDwwvj0<3E,0*5C";

const aisDecoder = new GGencode.AisDecode(nmea, {}); // `session` di sini bisa berupa objek kosong jika Anda tidak memiliki state sebelumnya

try {
  if (aisDecoder.valid) {
    console.log('Decoded AIS Message:', aisDecoder);
  } else {
    console.error('Failed to decode AIS message: Message is not valid');
  }
} catch (error) {
  console.error('Failed to decode AIS message:', error);
}
