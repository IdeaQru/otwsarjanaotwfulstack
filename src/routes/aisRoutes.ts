import { Router } from 'express';
import net from 'net';
import AisDecoder from 'ais-stream-decoder';
import { processAisMessage } from '../controllers/aisMessageController';
import { parseNmeaSentence } from 'nmea-simple'; // Library untuk mendecode data GPS
import { delay } from '../utils/delay';
import CombinedAisData from '../models/combinedAisData';
import AisLog from '../models/aisLog'; // Import model AisLog

import { gpsAisData } from '../models/gpsAisdata';
const router = Router();
const HOST = '103.24.49.246';
const AIS_PORT = 34567;

const parser = new AisDecoder();
let latestDecodedData: any = null;
let buffer = '';

const client = new net.Socket();
client.connect(AIS_PORT, HOST, () => {
  console.log(`Connected to ${HOST}:${AIS_PORT}`);
});

// Proses data AIS
parser.on('data', async (data) => {
  console.log('Decoded AIS Data:', data); // Log the received data

  try {
    const dataFix = JSON.parse(data); // Safely parse the JSON string
    if ('type' in dataFix) {
      console.log('Data type exists:', dataFix.type);
      latestDecodedData = dataFix;
      await processAisMessage(dataFix); // Simpan data AIS ke MongoDB
    } else {
      console.error('Data received does not have a type property:', dataFix);
    }
  } catch (err) {
    console.error('Error parsing JSON:', err);
  }
  delay(5000);
});

parser.on('error', (err) => {
  console.error('AIS Decoder Error:', err);
});

// Proses data dari server
client.on('data', (data) => {
  console.log('Raw data received from server:', data.toString());
  buffer += data.toString();
  let lines = buffer.split('\n');
  buffer = lines.pop()!; // Keep the last incomplete line in the buffer
  lines.forEach((line) => {
    console.log('Processing line:', line);
    if (isValidNmea(line.trim())) {
      try {
        // Proses data GPS (NMEA) dan AIS
        processNmeaOrAis(line.trim());
      } catch (err) {
        console.error('Failed to decode line:', line, 'Error:', err);
      }
    } else {
      console.error('Invalid NMEA data:', line);
    }
  });
});

client.on('close', () => {
  console.log('Connection closed');
});

client.on('error', (err) => {
  console.error(`Error: ${err.message}`);
});

// Fungsi untuk memproses data NMEA atau AIS
const processNmeaOrAis = (line: string) => {
  if (line.startsWith('$')) {
    // Mendecode data GPS (NMEA)
    try {
      const decodedNmea = parseNmeaSentence(line);
      console.log('Decoded NMEA GPS Data:', decodedNmea);
      saveGpsData(decodedNmea); // Simpan data GPS ke MongoDB
    } catch (err) {
      console.error('Error decoding NMEA GPS data:', err);
    }
  } else {
    // Jika tidak mulai dengan $, anggap data AIS dan masukkan ke parser AIS
    parser.write(line);
  }
};

// Fungsi untuk menyimpan data GPS ke MongoDB
const saveGpsData = async (nmeaData: any) => {
  try {
    // Misalnya ini data dari kalimat NMEA tipe GLL (Latitude/Longitude)
    if (nmeaData.sentenceId === 'GLL') {
      const { latitude, longitude, time, status } = nmeaData;
      if (status === 'A') { // Hanya simpan jika data valid (A untuk valid, V untuk invalid)
        const gpsData = new gpsAisData({
          lat: latitude,
          lon: longitude,
          timestamp: new Date(time),
          type: 'GPS'
        });
        await gpsData.save();
        console.log('Saved GPS data to MongoDB:', gpsData);
      } else {
        console.log('Invalid GPS data, not saving to MongoDB.');
      }
    }
    // Tambahkan penanganan tipe kalimat NMEA lain di sini jika diperlukan
  } catch (error) {
    console.error('Error saving GPS data to MongoDB:', error);
  }
};
// Rute untuk mengambil data log AIS dari collection aisLog
router.get('/ais-log', async (req, res) => {
  try {
    const aisLogs = await AisLog.find({});
    res.json(aisLogs);
  } catch (error) {
    console.error('Error fetching AIS log data:', error);
    res.status(500).send('Internal server error');
  }
});

// Rute untuk mengambil data AIS terbaru
router.get('/ais-data', (req, res) => {
  if (latestDecodedData) {
    res.json(latestDecodedData);
  } else {
    res.status(404).send('No AIS data available');
  }
});

// Rute untuk mengambil semua data kapal yang disimpan
router.get('/ships', async (req, res) => {
  try {
    const ships = await CombinedAisData.find({});
    res.json(ships);
  } catch (error) {
    console.error('Error fetching ships data:', error);
    res.status(500).send('Internal server error');
  }
});

// Fungsi untuk memvalidasi apakah baris data valid sebagai NMEA
function isValidNmea(data: string): boolean {
  return data.startsWith('$') || data.startsWith('!');
}

export default router;
