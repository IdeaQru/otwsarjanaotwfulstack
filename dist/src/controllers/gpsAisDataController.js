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
exports.getAllAisData = exports.getAisData = exports.saveAisData = void 0;
const gpsAisData_1 = require("../services/aisHandlers/gpsAisData");
const aisService = new gpsAisData_1.gpsAisService();
// Controller untuk menyimpan atau memperbarui data AIS
const saveAisData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const aisData = req.body;
        yield aisService.saveAisData(aisData);
        res.status(200).json({ message: 'AIS data saved successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving AIS data' });
    }
});
exports.saveAisData = saveAisData;
// Controller untuk mendapatkan data AIS berdasarkan MMSI
const getAisData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mmsi = req.params.mmsi;
        const data = yield aisService.getAisDataByMmsi(mmsi);
        if (!data) {
            res.status(404).json({ message: 'AIS data not found' });
        }
        else {
            res.status(200).json(data);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching AIS data' });
    }
});
exports.getAisData = getAisData;
// Controller untuk mendapatkan semua data AIS
const getAllAisData = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield aisService.getAllAisData();
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching AIS data' });
    }
});
exports.getAllAisData = getAllAisData;
