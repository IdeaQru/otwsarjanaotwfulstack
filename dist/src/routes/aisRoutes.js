"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const net_1 = __importDefault(require("net"));
const ais_stream_decoder_1 = __importDefault(require("ais-stream-decoder"));
const aisMessageController_1 = require("../controllers/aisMessageController");
const nmea_simple_1 = require("nmea-simple");
const delay_1 = require("../utils/delay");
const combinedAisData_1 = __importDefault(require("../models/combinedAisData"));
const aisLog_1 = __importDefault(require("../models/aisLog"));
const gpsAisdata_1 = require("../models/gpsAisdata");
const router = (0, express_1.Router)();
const HOST = '103.24.49.238';
const AIS_PORT = 21279;
const parser = new ais_stream_decoder_1.default();
let latestDecodedData = null;
let buffer = '';
let dataQueue = [];
// Koneksi ke server AIS
const client = new net_1.default.Socket();
client.connect(AIS_PORT, HOST, () => {
    console.log(`Connected to ${HOST}:${AIS_PORT}`);
});
// Fungsi untuk memproses queue data
const processQueue = () => __awaiter(void 0, void 0, void 0, function* () {
    while (true) {
        if (dataQueue.length > 0) {
            const line = dataQueue.shift(); // Ambil data pertama di queue
            if (line)
                processNmeaOrAis(line);
        }
        yield (0, delay_1.delay)(10); // Delay pendek untuk memberi waktu proses data berikutnya
    }
});
parser.on('data', (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataFix = JSON.parse(data);
        if ('type' in dataFix) {
            latestDecodedData = dataFix;
            yield (0, aisMessageController_1.processAisMessage)(dataFix); // Simpan data AIS ke MongoDB
            // console.log("Sentence decoded successfully");
        }
    }
    catch (err) {
        console.log("Sentence error: failed to decode");
    }
}));
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
const processNmeaOrAis = (line) => __awaiter(void 0, void 0, void 0, function* () {
    if (line.startsWith('$')) {
        try {
            const decodedNmea = (0, nmea_simple_1.parseNmeaSentence)(line);
            saveGpsData(decodedNmea);
        }
        catch (err) {
            console.log(line, "Sentence error: failed to decode");
            yield new Promise(resolve => setTimeout(resolve, 10)); // Tambahkan delay 10ms
        }
    }
    else {
        try {
            parser.write(line);
        }
        catch (err) {
            console.log("Sentence error: failed to decode");
            yield new Promise(resolve => setTimeout(resolve, 10)); // Tambahkan delay 10ms
        }
    }
});
// Fungsi untuk menyimpan data GPS ke MongoDB
const saveGpsData = (nmeaData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (nmeaData.sentenceId === 'GLL' && nmeaData.status === 'A') {
            const gpsData = new gpsAisdata_1.gpsAisData({
                lat: nmeaData.latitude,
                lon: nmeaData.longitude,
                timestamp: new Date(), // Timestamp saat data diproses
                type: 'GPS'
            });
            yield gpsData.save();
            console.log('Saved GPS data to MongoDB:', gpsData);
        }
    }
    catch (error) {
        console.error('Error saving GPS data to MongoDB:', error);
    }
});
// Rute untuk mengambil data log AIS dari collection aisLog
router.get('/ais-log', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const aisLogs = yield aisLog_1.default.find({});
        res.json(aisLogs);
    }
    catch (error) {
        console.error('Error fetching AIS log data:', error);
        res.status(500).send('Internal server error');
    }
}));
// Rute untuk mengambil data AIS terbaru
router.get('/ais-data', (req, res) => {
    if (latestDecodedData) {
        res.json(latestDecodedData);
    }
    else {
        res.status(404).send('No AIS data available');
    }
});
// Rute untuk mengambil semua data kapal yang disimpan
router.get('/ships', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ships = yield combinedAisData_1.default.find({});
        res.json(ships);
    }
    catch (error) {
        console.error('Error fetching ships data:', error);
        res.status(500).send('Internal server error');
    }
}));
// Fungsi untuk memvalidasi apakah baris data valid sebagai NMEA
function isValidNmea(data) {
    return data.startsWith('$') || data.startsWith('!');
}
// Mulai pemrosesan queue secara terus menerus
processQueue();
exports.default = router;
