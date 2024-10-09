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
exports.handleType6 = void 0;
const aisType6data_1 = __importDefault(require("../../models/aisType6data"));
const getCombinedAISData_1 = require("../../services/aisHandlers/getCombinedAISData");
const handleType6 = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const aisType6Data = new aisType6data_1.default({
        type: data.type,
        mmsi: data.mmsi,
        sequenceNumber: data.sequenceNumber,
        destinationMMSI: data.destinationMMSI,
        retransmitFlag: data.retransmitFlag,
        spare: data.spare,
        binaryData: data.binaryData,
        timestamp: new Date(),
    });
    yield aisType6Data.save();
    console.log('AIS Type 6 Data berhasil disimpan ke database');
    // Update combined AIS data
    yield (0, getCombinedAISData_1.getAndCombineAisData)(data.mmsi);
});
exports.handleType6 = handleType6;
