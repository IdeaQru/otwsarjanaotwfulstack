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
exports.handleType5 = void 0;
const aisType5data_1 = __importDefault(require("../../models/aisType5data"));
const getCombinedAISData_1 = require("../../services/aisHandlers/getCombinedAISData");
const handleType5 = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const aisType5Data = new aisType5data_1.default({
            type: data.type,
            mmsi: data.mmsi,
            aisVersion: data.aisVersion,
            imo: data.imo,
            callsign: data.callsign,
            name: data.name,
            typeAndCargo: data.typeAndCargo,
            dimBow: data.dimBow,
            dimStern: data.dimStern,
            dimPort: data.dimPort,
            dimStarboard: data.dimStarboard,
            epfd: data.epfd,
            etaMonth: data.etaMonth,
            etaDay: data.etaDay,
            etaHour: data.etaHour,
            etaMinute: data.etaMinute,
            draught: data.draught,
            destination: data.destination,
            dte: data.dte,
            timestamp: new Date(),
            sentence: data.sentences,
        });
        yield aisType5Data.save();
        // console.log('AIS Type 5 Data berhasil disimpan ke database');
        // Perbarui data gabungan
        (0, getCombinedAISData_1.getAndCombineAisData)(data.mmsi);
    }
    catch (error) {
        console.error(error);
    }
});
exports.handleType5 = handleType5;
