import GGencode = require('ais-decoder');

// Membuat instance dari AisDecode dengan memberikan argumen NMEA ke fungsi
const nmea = '!AIVDM,1,1,,A,E685SA@0b7WHph@@@@@@@@@@@@@41P0D1jrpP00002i@3P';

// Berikan `nmea` sebagai argumen saat membuat instance
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
