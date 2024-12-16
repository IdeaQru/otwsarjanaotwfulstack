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
exports.handleType12 = void 0;
const aisType12data_1 = __importDefault(require("../../models/aisType12data"));
const getCombinedAISData_1 = require("../../services/aisHandlers/getCombinedAISData");
const handleType12 = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const aisType12Data = new aisType12data_1.default({
            type: data.type,
            mmsi: data.mmsi,
            sequenceNumber: data.sequenceNumber,
            destinationMMSI: data.destinationMMSI,
            retransmitFlag: data.retransmitFlag,
            spare: data.spare,
            safetyRelatedText: data.safetyRelatedText,
            timestamp: new Date(),
        });
        yield aisType12Data.save();
        // console.log('AIS Type 12 Data berhasil disimpan ke database');
        // Update combined AIS data
        yield (0, getCombinedAISData_1.getAndCombineAisData)(data.mmsi);
    }
    catch (error) {
        console.log(error);
    }
});
exports.handleType12 = handleType12;
