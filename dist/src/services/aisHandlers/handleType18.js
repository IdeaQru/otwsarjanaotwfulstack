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
exports.handleType18 = void 0;
const aisType18data_1 = __importDefault(require("../../models/aisType18data"));
const handleType18 = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const aisType18Data = new aisType18data_1.default({
            type: data.type,
            mmsi: data.mmsi,
            timestamp: new Date(),
            speedOverGround: data.speedOverGround,
            accuracy: data.accuracy,
            longitude: data.lon,
            latitude: data.lat,
            courseOverGround: data.courseOverGround,
            heading: data.heading,
            utcSecond: data.utcSecond,
            regional: data.regional,
            unitFlag: data.unitFlag,
            displayFlag: data.displayFlag,
            dscFlag: data.dscFlag,
            bandFlag: data.bandFlag,
            msg22Flag: data.msg22Flag,
            modeFlag: data.modeFlag,
            raim: data.raim,
            radio: data.radio,
            sentence: data.sentences,
        });
        yield aisType18Data.save();
        // console.log('AIS Type 18 Data berhasil disimpan ke database');
        // Perbarui data gabungan
    }
    catch (error) {
        console.log(error);
    }
});
exports.handleType18 = handleType18;
