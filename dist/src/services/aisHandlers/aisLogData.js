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
exports.saveAisLog = void 0;
const aisLog_1 = __importDefault(require("../../models/aisLog"));
const moment_1 = __importDefault(require("moment"));
/**
 * Fungsi untuk menyimpan log data AIS ke dalam collection AisLog
 * Jika MMSI yang sama sudah ada, data akan ditambahkan ke array details, bukan diperbarui
 * @param {number} mmsi - Nomor identifikasi kapal (MMSI)
 * @param {string} name - Nama kapal
 * @param {object} combinedData - Data gabungan yang berisi informasi dinamis dan statis dari kapal
 */
const saveAisLog = (mmsi, name, combinedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const logTime = (0, moment_1.default)(Date.now()).format('DD-MM-YYYY HH:mm:ss');
        // Tambahkan data details baru jika MMSI sudah ada, atau buat entri baru jika tidak ada
        yield aisLog_1.default.findOneAndUpdate({ mmsi }, // Cari berdasarkan MMSI
        {
            $set: { name, logTime }, // Perbarui atau set nama dan logTime
            $push: { details: combinedData }, // Tambahkan data baru ke dalam array details
        }, { upsert: true, new: true } // Buat entri baru jika tidak ada MMSI yang cocok (upsert)
        );
        console.log('AIS Log successfully saved to the database');
    }
    catch (error) {
        console.error('Error saving AIS Log:', error);
    }
});
exports.saveAisLog = saveAisLog;
