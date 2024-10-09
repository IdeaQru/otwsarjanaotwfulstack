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
exports.handleType22 = void 0;
const aisType22data_1 = __importDefault(require("../../models/aisType22data"));
const getCombinedAISData_1 = require("../../services/aisHandlers/getCombinedAISData");
const handleType22 = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const aisType22Data = new aisType22data_1.default({
        type: data.type,
        mmsi: data.mmsi,
        channelA: data.channelA,
        channelB: data.channelB,
        txRxMode: data.txRxMode,
        power: data.power,
        northeastLongitude: data.northeastLongitude,
        northeastLatitude: data.northeastLatitude,
        southwestLongitude: data.southwestLongitude,
        southwestLatitude: data.southwestLatitude,
        addressed: data.addressed,
        bandwidthA: data.bandwidthA,
        bandwidthB: data.bandwidthB,
        timestamp: new Date(),
    });
    yield aisType22Data.save();
    console.log('AIS Type 22 Data berhasil disimpan ke database');
    // Update combined AIS data
    yield (0, getCombinedAISData_1.getAndCombineAisData)(data.mmsi);
});
exports.handleType22 = handleType22;
