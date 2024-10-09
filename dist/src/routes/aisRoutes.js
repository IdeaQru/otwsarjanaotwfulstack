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
const nmea_simple_1 = require("nmea-simple"); // Library untuk mendecode data GPS
const delay_1 = require("../utils/delay");
const combinedAisData_1 = __importDefault(require("../models/combinedAisData"));
const aisLog_1 = __importDefault(require("../models/aisLog")); // Import model AisLog
const gpsAisdata_1 = require("../models/gpsAisdata");
const router = (0, express_1.Router)();
const HOST = '103.24.49.246';
const AIS_PORT = 34567;
const parser = new ais_stream_decoder_1.default();
let latestDecodedData = null;
let buffer = '';
const client = new net_1.default.Socket();
client.connect(AIS_PORT, HOST, () => {
    console.log(`Connected to ${HOST}:${AIS_PORT}`);
});
// Proses data AIS
parser.on('data', (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Decoded AIS Data:', data); // Log the received data
    try {
        const dataFix = JSON.parse(data); // Safely parse the JSON string
        if ('type' in dataFix) {
            console.log('Data type exists:', dataFix.type);
            latestDecodedData = dataFix;
            yield (0, aisMessageController_1.processAisMessage)(dataFix); // Simpan data AIS ke MongoDB
        }
        else {
            console.error('Data received does not have a type property:', dataFix);
        }
    }
    catch (err) {
        console.error('Error parsing JSON:', err);
    }
    (0, delay_1.delay)(5000);
}));
parser.on('error', (err) => {
    console.error('AIS Decoder Error:', err);
});
// Proses data dari server
client.on('data', (data) => {
    console.log('Raw data received from server:', data.toString());
    buffer += data.toString();
    let lines = buffer.split('\n');
    buffer = lines.pop(); // Keep the last incomplete line in the buffer
    lines.forEach((line) => {
        console.log('Processing line:', line);
        if (isValidNmea(line.trim())) {
            try {
                // Proses data GPS (NMEA) dan AIS
                processNmeaOrAis(line.trim());
            }
            catch (err) {
                console.error('Failed to decode line:', line, 'Error:', err);
            }
        }
        else {
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
const processNmeaOrAis = (line) => {
    if (line.startsWith('$')) {
        // Mendecode data GPS (NMEA)
        try {
            const decodedNmea = (0, nmea_simple_1.parseNmeaSentence)(line);
            console.log('Decoded NMEA GPS Data:', decodedNmea);
            saveGpsData(decodedNmea); // Simpan data GPS ke MongoDB
        }
        catch (err) {
            console.error('Error decoding NMEA GPS data:', err);
        }
    }
    else {
        // Jika tidak mulai dengan $, anggap data AIS dan masukkan ke parser AIS
        parser.write(line);
    }
};
// Fungsi untuk menyimpan data GPS ke MongoDB
const saveGpsData = (nmeaData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Misalnya ini data dari kalimat NMEA tipe GLL (Latitude/Longitude)
        if (nmeaData.sentenceId === 'GLL') {
            const { latitude, longitude, time, status } = nmeaData;
            if (status === 'A') { // Hanya simpan jika data valid (A untuk valid, V untuk invalid)
                const gpsData = new gpsAisdata_1.gpsAisData({
                    lat: latitude,
                    lon: longitude,
                    timestamp: new Date(time),
                    type: 'GPS'
                });
                yield gpsData.save();
                console.log('Saved GPS data to MongoDB:', gpsData);
            }
            else {
                console.log('Invalid GPS data, not saving to MongoDB.');
            }
        }
        // Tambahkan penanganan tipe kalimat NMEA lain di sini jika diperlukan
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
exports.default = router;
