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
exports.handleType17 = void 0;
const aisType17data_1 = __importDefault(require("../../models/aisType17data"));
const getCombinedAISData_1 = require("../../services/aisHandlers/getCombinedAISData");
const handleType17 = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const aisType17Data = new aisType17data_1.default({
            type: data.type,
            mmsi: data.mmsi,
            longitude: data.longitude,
            latitude: data.latitude,
            binaryData: data.binaryData,
            timestamp: new Date(),
        });
        yield aisType17Data.save();
        // console.log('AIS Type 17 Data berhasil disimpan ke database');
        // Update combined AIS data
        yield (0, getCombinedAISData_1.getAndCombineAisData)(data.mmsi);
    }
    catch (error) {
        console.log(error);
    }
});
exports.handleType17 = handleType17;
