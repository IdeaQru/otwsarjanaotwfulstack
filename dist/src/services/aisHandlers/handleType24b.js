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
exports.handleType24b = void 0;
const aisType24Bdata_1 = __importDefault(require("../../models/aisType24Bdata"));
const getCombinedAISData_1 = require("../../services/aisHandlers/getCombinedAISData");
const handleType24b = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const aisType24BData = new aisType24Bdata_1.default({
        type: data.type,
        mmsi: data.mmsi,
        partNum: data.partNum,
        typeAndCargo: data.typeAndCargo,
        vendorId: data.vendorId || '',
        modelType: data.model, // Use renamed property
        serial: data.serial,
        callsign: data.callsign,
        dimBow: data.dimBow,
        dimStern: data.dimStern,
        dimPort: data.dimPort,
        dimStarboard: data.dimStarboard,
        timestamp: new Date(),
        sentence: data.sentences,
    });
    yield aisType24BData.save();
    console.log('AIS Type 24 Part B Data berhasil disimpan ke database');
    // Perbarui data gabungan
    yield (0, getCombinedAISData_1.getAndCombineAisData)(data.mmsi);
});
exports.handleType24b = handleType24b;
