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
exports.handleType19 = void 0;
const aisType19data_1 = __importDefault(require("../../models/aisType19data"));
const getCombinedAISData_1 = require("../../services/aisHandlers/getCombinedAISData");
const handleType19 = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const aisType19Data = new aisType19data_1.default({
        type: data.type,
        mmsi: data.mmsi,
        speedOverGround: data.speedOverGround,
        positionAccuracy: data.positionAccuracy,
        longitude: data.longitude,
        latitude: data.latitude,
        courseOverGround: data.courseOverGround,
        heading: data.heading,
        timestamp: new Date(),
        shipType: data.shipType,
        shipLength: data.shipLength,
        shipWidth: data.shipWidth,
        epfd: data.epfd,
        destination: data.destination,
        dte: data.dte,
    });
    yield aisType19Data.save();
    console.log('AIS Type 19 Data berhasil disimpan ke database');
    // Update combined AIS data
    yield (0, getCombinedAISData_1.getAndCombineAisData)(data.mmsi);
});
exports.handleType19 = handleType19;
