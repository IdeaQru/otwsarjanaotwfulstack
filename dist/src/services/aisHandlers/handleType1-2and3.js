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
exports.handleType1_2_and3 = void 0;
// services/aisHandlers/handleType1-2and3.ts
const aisType1_2and3data_1 = __importDefault(require("../../models/aisType1-2and3data"));
const getCombinedAISData_1 = require("./getCombinedAISData");
const handleType1_2_and3 = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const aisType1_2_and3Data = new aisType1_2and3data_1.default({
            type: data.type,
            mmsi: data.mmsi,
            timestamp: new Date(),
            latitude: data.lat,
            longitude: data.lon,
            speedOverGround: data.speedOverGround,
            courseOverGround: data.courseOverGround,
            heading: data.heading,
            navStatus: data.navStatus,
            rateOfTurn: data.rateOfTurn,
            sentences: data.sentences || [], // Ensure that sentences field is included
        });
        yield aisType1_2_and3Data.save();
        console.log('AIS Type 1, 2, or 3 Data successfully saved to the database.');
        // Update combined AIS data
        yield (0, getCombinedAISData_1.getAndCombineAisData)(data.mmsi);
    }
    catch (error) {
        console.error('Error saving AIS Type 1, 2, or 3 Data:', error);
    }
});
exports.handleType1_2_and3 = handleType1_2_and3;
