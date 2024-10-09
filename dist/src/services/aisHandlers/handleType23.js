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
exports.handleType23 = void 0;
const aisType23data_1 = __importDefault(require("../../models/aisType23data"));
const getCombinedAISData_1 = require("../../services/aisHandlers/getCombinedAISData");
const handleType23 = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const aisType23Data = new aisType23data_1.default({
        type: data.type,
        mmsi: data.mmsi,
        northeastLongitude: data.northeastLongitude,
        northeastLatitude: data.northeastLatitude,
        southwestLongitude: data.southwestLongitude,
        southwestLatitude: data.southwestLatitude,
        stationType: data.stationType,
        typeAndPower: data.typeAndPower,
        txRxMode: data.txRxMode,
        reportInterval: data.reportInterval,
        quietTime: data.quietTime,
        timestamp: new Date(),
    });
    yield aisType23Data.save();
    console.log('AIS Type 23 Data berhasil disimpan ke database');
    // Update combined AIS data
    yield (0, getCombinedAISData_1.getAndCombineAisData)(data.mmsi);
});
exports.handleType23 = handleType23;
