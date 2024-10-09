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
exports.handleType7 = void 0;
const aisType7data_1 = __importDefault(require("../../models/aisType7data"));
const getCombinedAISData_1 = require("../../services/aisHandlers/getCombinedAISData");
const handleType7 = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const aisType7Data = new aisType7data_1.default({
        type: data.type,
        mmsi: data.mmsi,
        ackMMSI1: data.ackMMSI1,
        ackMMSI2: data.ackMMSI2,
        ackMMSI3: data.ackMMSI3,
        ackMMSI4: data.ackMMSI4,
        timestamp: new Date(),
    });
    yield aisType7Data.save();
    console.log('AIS Type 7 Data berhasil disimpan ke database');
    // Update combined AIS data
    yield (0, getCombinedAISData_1.getAndCombineAisData)(data.mmsi);
});
exports.handleType7 = handleType7;
