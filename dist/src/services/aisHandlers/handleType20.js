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
exports.handleType20 = void 0;
const aisType20data_1 = __importDefault(require("../../models/aisType20data"));
const getCombinedAISData_1 = require("../../services/aisHandlers/getCombinedAISData");
const handleType20 = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const aisType20Data = new aisType20data_1.default({
        type: data.type,
        mmsi: data.mmsi,
        offsetNumber1: data.offsetNumber1,
        slotsAllocated1: data.slotsAllocated1,
        increment1: data.increment1,
        offsetNumber2: data.offsetNumber2,
        slotsAllocated2: data.slotsAllocated2,
        increment2: data.increment2,
        offsetNumber3: data.offsetNumber3,
        slotsAllocated3: data.slotsAllocated3,
        increment3: data.increment3,
        offsetNumber4: data.offsetNumber4,
        slotsAllocated4: data.slotsAllocated4,
        increment4: data.increment4,
        timestamp: new Date(),
    });
    yield aisType20Data.save();
    console.log('AIS Type 20 Data berhasil disimpan ke database');
    // Update combined AIS data
    yield (0, getCombinedAISData_1.getAndCombineAisData)(data.mmsi);
});
exports.handleType20 = handleType20;
