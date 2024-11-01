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
let cache = new Map();
const MAX_QUEUE_SIZE = 1000;

// Bersihkan cache secara berkala setiap 60 detik
setInterval(() => {
  cache.clear();
  console.log("Cache cleared to free memory.");
}, 300000); // Setiap 60 detik

// Potong dataQueue setiap 60 detik jika melebihi ukuran maksimum
setInterval(() => {
  if (dataQueue.length > MAX_QUEUE_SIZE) {
    dataQueue = dataQueue.slice(-MAX_QUEUE_SIZE ); // Simpan hanya setengah dari queue
    console.log("Data queue trimmed to reduce memory usage.");
  }
}, 300000); // Setiap 60 detik

// Koneksi ke server AIS
const client = new net.Socket();
client.connect(AIS_PORT, HOST, () => {
  console.log(`Connected to ${HOST}:${AIS_PORT}`);
});

// Fungsi untuk memproses queue data
const processQueue = async () => {
  while (true) {
    if (dataQueue.length > 0) {
      console.log(`Processing queue. Items remaining: ${dataQueue.length}`);
      const line = dataQueue.shift();
      if (line) await processNmeaOrAis(line);
    }
    await delay(1); // Atur delay jika diperlukan
  }
};


parser.on('data', async (data) => {
  try {
    const dataFix = JSON.parse(data);
    if ('type' in dataFix) {
      latestDecodedData = dataFix;
      await processAisMessage(dataFix); // Simpan data AIS ke MongoDB
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
      if (dataQueue.length < MAX_QUEUE_SIZE) {
        dataQueue.push(line.trim()); // Tambahkan ke queue
      } else {
        console.warn("Queue full, skipping data");
      }
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
  const cacheKey = line;
  const now = Date.now();

  // Periksa apakah data sudah ada dalam cache untuk menghindari duplikat
  if (cache.has(cacheKey) && now - cache.get(cacheKey) < 30000) {
    return; // Abaikan data jika duplikat dalam waktu 30 detik
  }

  // Simpan data dalam cache dengan waktu saat ini
  cache.set(cacheKey, now);

  if (line.startsWith('$')) {
    try {
      const decodedNmea = parseNmeaSentence(line);
      await saveGpsData(decodedNmea);
    } catch (err) {
      console.log(line, "Sentence error: failed to decode");
    }
  } else {
    try {
      parser.write(line);
    } catch (err) {
      console.log("Sentence error: failed to decode");
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
  return (data.startsWith('$') || data.startsWith('!')) && data.includes('*') && data.length > 20;
}

// Mulai pemrosesan queue secara terus menerus
processQueue();

export default router;
