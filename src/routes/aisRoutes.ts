import { Router } from 'express';
import net from 'net';
import AisDecoder from 'ais-stream-decoder';
import { processAisMessage } from '../controllers/aisMessageController';
import { parseNmeaSentence } from 'nmea-simple';
import { delay } from '../utils/delay';
import CombinedAisData from '../models/combinedAisData';
import AisLog from '../models/aisLog';
import RawAisData from '../models/rawAisData';
import { gpsAisData } from '../models/gpsAisdata';

const router = Router();
const HOST = '103.24.49.238';
const AIS_PORT = 34567;

const parser = new AisDecoder();
let latestDecodedData: any = null;
let buffer = '';
let dataQueue: string[] = [];

// Koneksi ke server AIS
const client = new net.Socket();
client.connect(AIS_PORT, HOST, () => {
  console.log(`Connected to ${HOST}:${AIS_PORT}`);
});

// Fungsi untuk memproses queue data
const processQueue = async () => {
  while (true) {
    if (dataQueue.length > 0) {
      const line = dataQueue.shift(); // Ambil data pertama di queue
      if (line) processNmeaOrAis(line);
    }
    await delay(10); // Delay pendek untuk memberi waktu proses data berikutnya
  }
};

parser.on('data', async (data) => {
  try {
    const dataFix = JSON.parse(data);
    if ('type' in dataFix) {
      latestDecodedData = dataFix;
      await processAisMessage(dataFix); // Simpan data AIS ke MongoDB
      // console.log("Sentence decoded successfully");
    }
  } catch (err) {
    console.log("Sentence error: failed to decode");
  }
});

// Tangani error dari parser
parser.on('error', (err) => {
  console.error('AIS Decoder Error:', err);
});

// Proses data dari server dan masukkan ke queue
client.on('data', (data) => {
  buffer += data.toString();
  const lines = buffer.split('\n');
  buffer = lines.pop() || ''; // Simpan sisa data yang belum lengkap di buffer

  lines.forEach((line) => {
    if (isValidNmea(line.trim())) {
      dataQueue.push(line.trim()); // Tambahkan ke queue
    }
  });
});

// Tangani koneksi tertutup
client.on('close', () => {
  console.log('Connection closed');
});

// Tangani error dari client
client.on('error', (err) => {
  console.error(`Socket Error: ${err.message}`);
});

const processNmeaOrAis = async (line: string) => {
  if (line.startsWith('$')) {
    try {
      const decodedNmea = parseNmeaSentence(line);
      saveGpsData(decodedNmea);
    } catch (err) {
      console.log(line, "Sentence error: failed to decode");
      await new Promise(resolve => setTimeout(resolve, 10));  // Tambahkan delay 10ms
    }
  } else {
    try {
      parser.write(line);
    } catch (err) {
      console.log("Sentence error: failed to decode");
      await new Promise(resolve => setTimeout(resolve, 10));  // Tambahkan delay 10ms
    }
  }
};



// Fungsi untuk menyimpan data GPS ke MongoDB
const saveGpsData = async (nmeaData: any) => {
  try {
    if (nmeaData.sentenceId === 'GLL' && nmeaData.status === 'A') {
      const gpsData = new gpsAisData({
        lat: nmeaData.latitude,
        lon: nmeaData.longitude,
        timestamp: new Date(), // Timestamp saat data diproses
        type: 'GPS'
      });
      await gpsData.save();
      console.log('Saved GPS data to MongoDB:', gpsData);
    }
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

// Mulai pemrosesan queue secara terus menerus
processQueue();

export default router;
