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
exports.handleType26 = void 0;
const aisType26data_1 = __importDefault(require("../../models/aisType26data"));
const getCombinedAISData_1 = require("../../services/aisHandlers/getCombinedAISData");
const handleType26 = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const aisType26Data = new aisType26data_1.default({
        type: data.type,
        mmsi: data.mmsi,
        destinationMMSI: data.destinationMMSI,
        binaryData: data.binaryData,
        applicationIdentifier: data.applicationIdentifier,
        slotIncrement: data.slotIncrement,
        spare: data.spare,
        timestamp: new Date(),
    });
    yield aisType26Data.save();
    console.log('AIS Type 26 Data berhasil disimpan ke database');
    // Update combined AIS data
    yield (0, getCombinedAISData_1.getAndCombineAisData)(data.mmsi);
});
exports.handleType26 = handleType26;
