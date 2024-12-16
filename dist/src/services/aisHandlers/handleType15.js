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
exports.handleType15 = void 0;
const aisType15data_1 = __importDefault(require("../../models/aisType15data"));
const getCombinedAISData_1 = require("../../services/aisHandlers/getCombinedAISData");
const handleType15 = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const aisType15Data = new aisType15data_1.default({
            type: data.type,
            mmsi: data.mmsi,
            interrogatedMMSI1: data.interrogatedMMSI1,
            interrogatedMMSI2: data.interrogatedMMSI2,
            type1_1: data.type1_1,
            offset1_1: data.offset1_1,
            type1_2: data.type1_2,
            offset1_2: data.offset1_2,
            type2_1: data.type2_1,
            offset2_1: data.offset2_1,
            timestamp: new Date(),
        });
        yield aisType15Data.save();
        // console.log('AIS Type 15 Data berhasil disimpan ke database');
        // Update combined AIS data
        yield (0, getCombinedAISData_1.getAndCombineAisData)(data.mmsi);
    }
    catch (error) {
        console.log(error);
    }
});
exports.handleType15 = handleType15;
