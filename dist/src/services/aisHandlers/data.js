"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nmea_simple_1 = require("nmea-simple");
// Contoh data NMEA
const nmeaLines = [
    '$GPVTG,,,,,,,,,N*30',
    '$GPGGA,,,,,,0,00,99.99,,,,,,*48',
    '$GPGSA,A,1,,,,,,,,,,,,,99.99,99.99,99.99*30',
    '$GPRMC,,V,,,,,,,,,,N*53',
    '$GPGLL,,,,,,V,N*64'
];
// Fungsi untuk mendecode setiap kalimat NMEA
const decodeNmeaLine = (line) => {
    try {
        const sentence = (0, nmea_simple_1.parseNmeaSentence)(line); // Parse NMEA sentence
        console.log('Decoded Sentence:', sentence);
    }
    catch (error) {
        console.error('Error parsing NMEA sentence:', error);
    }
};
// Mendecode setiap baris NMEA
nmeaLines.forEach(decodeNmeaLine);
