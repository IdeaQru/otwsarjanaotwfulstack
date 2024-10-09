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
Object.defineProperty(exports, "__esModule", { value: true });
exports.gpsAisService = void 0;
const gpsAisdata_1 = require("../../models/gpsAisdata");
class gpsAisService {
    // Fungsi untuk membuat atau memperbarui data AIS
    saveAisData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingData = yield gpsAisdata_1.gpsAisData.findOne({ mmsi: data.mmsi });
            if (existingData) {
                // Update data jika sudah ada
                yield gpsAisdata_1.gpsAisData.updateOne({ mmsi: data.mmsi }, data);
                console.log(`Updated AIS data for MMSI: ${data.mmsi}`);
            }
            else {
                // Simpan data baru
                const newData = new gpsAisdata_1.gpsAisData(data);
                yield newData.save();
                console.log(`Saved new AIS data for MMSI: ${data.mmsi}`);
            }
        });
    }
    // Fungsi untuk mengambil data berdasarkan MMSI
    getAisDataByMmsi(mmsi) {
        return __awaiter(this, void 0, void 0, function* () {
            return gpsAisdata_1.gpsAisData.findOne({ mmsi });
        });
    }
    // Fungsi untuk mendapatkan semua data AIS
    getAllAisData() {
        return __awaiter(this, void 0, void 0, function* () {
            return gpsAisdata_1.gpsAisData.find();
        });
    }
}
exports.gpsAisService = gpsAisService;
