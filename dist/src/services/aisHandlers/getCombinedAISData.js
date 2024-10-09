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
exports.getAndCombineAisData = void 0;
const aisType1_2and3data_1 = __importDefault(require("../../models/aisType1-2and3data"));
const aisType5data_1 = __importDefault(require("../../models/aisType5data"));
const aisType24Adata_1 = __importDefault(require("../../models/aisType24Adata"));
const aisType24Bdata_1 = __importDefault(require("../../models/aisType24Bdata"));
const aisType7data_1 = __importDefault(require("../../models/aisType7data"));
const aisType8data_1 = __importDefault(require("../../models/aisType8data"));
const aisType9data_1 = __importDefault(require("../../models/aisType9data"));
const aisType10data_1 = __importDefault(require("../../models/aisType10data"));
const aisType11data_1 = __importDefault(require("../../models/aisType11data"));
const aisType12data_1 = __importDefault(require("../../models/aisType12data"));
const aisType13data_1 = __importDefault(require("../../models/aisType13data"));
const aisType14data_1 = __importDefault(require("../../models/aisType14data"));
const aisType15data_1 = __importDefault(require("../../models/aisType15data"));
const aisType16data_1 = __importDefault(require("../../models/aisType16data"));
const aisType17data_1 = __importDefault(require("../../models/aisType17data"));
const aisType18data_1 = __importDefault(require("../../models/aisType18data"));
const aisType19data_1 = __importDefault(require("../../models/aisType19data"));
const aisType20data_1 = __importDefault(require("../../models/aisType20data"));
const aisType21data_1 = __importDefault(require("../../models/aisType21data"));
const aisType22data_1 = __importDefault(require("../../models/aisType22data"));
const aisType23data_1 = __importDefault(require("../../models/aisType23data"));
const aisType25data_1 = __importDefault(require("../../models/aisType25data"));
const aisType26data_1 = __importDefault(require("../../models/aisType26data"));
const aisType27data_1 = __importDefault(require("../../models/aisType27data"));
const combinedAisData_1 = __importDefault(require("../../models/combinedAisData"));
const aisLogData_1 = require("./aisLogData");
const moment_1 = __importDefault(require("moment"));
const getAndCombineAisData = (mmsi) => __awaiter(void 0, void 0, void 0, function* () {
    // Query dynamic data from Types 1, 2, 3, 9, 18, 19, 21, and 27 (position-related data)
    const dynamicData = (yield aisType1_2and3data_1.default.findOne({ mmsi })) ||
        (yield aisType9data_1.default.findOne({ mmsi })) ||
        (yield aisType18data_1.default.findOne({ mmsi })) ||
        (yield aisType19data_1.default.findOne({ mmsi })) ||
        (yield aisType21data_1.default.findOne({ mmsi })) ||
        (yield aisType27data_1.default.findOne({ mmsi }));
    // Query static data from Types 5, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 20, 22, 23, 24, 25, and 26 (vessel-related data)
    const staticData = (yield aisType5data_1.default.findOne({ mmsi })) ||
        (yield aisType7data_1.default.findOne({ mmsi })) ||
        (yield aisType8data_1.default.findOne({ mmsi })) ||
        (yield aisType10data_1.default.findOne({ mmsi })) ||
        (yield aisType11data_1.default.findOne({ mmsi })) ||
        (yield aisType12data_1.default.findOne({ mmsi })) ||
        (yield aisType13data_1.default.findOne({ mmsi })) ||
        (yield aisType14data_1.default.findOne({ mmsi })) ||
        (yield aisType15data_1.default.findOne({ mmsi })) ||
        (yield aisType16data_1.default.findOne({ mmsi })) ||
        (yield aisType17data_1.default.findOne({ mmsi })) ||
        (yield aisType20data_1.default.findOne({ mmsi })) ||
        (yield aisType22data_1.default.findOne({ mmsi })) ||
        (yield aisType23data_1.default.findOne({ mmsi })) ||
        (yield aisType24Adata_1.default.findOne({ mmsi })) ||
        (yield aisType24Bdata_1.default.findOne({ mmsi })) ||
        (yield aisType25data_1.default.findOne({ mmsi })) ||
        (yield aisType26data_1.default.findOne({ mmsi }));
    // Ensure dynamic data has necessary coordinates before combining
    if (dynamicData && dynamicData.longitude && dynamicData.latitude) {
        const combinedData = {
            mmsi: dynamicData.mmsi,
            lon: dynamicData.longitude,
            lat: dynamicData.latitude,
            name: (staticData === null || staticData === void 0 ? void 0 : staticData.name) || (staticData === null || staticData === void 0 ? void 0 : staticData.shipName) || undefined,
            type: (staticData === null || staticData === void 0 ? void 0 : staticData.typeAndCargo) ||
                (staticData === null || staticData === void 0 ? void 0 : staticData.shipType) ||
                (staticData === null || staticData === void 0 ? void 0 : staticData.modelType) ||
                (staticData === null || staticData === void 0 ? void 0 : staticData.vesselType) || undefined,
            speedOverGround: dynamicData.speedOverGround || undefined,
            courseOverGround: dynamicData.courseOverGround || undefined,
            heading: dynamicData.heading || 0,
            timestamp: (0, moment_1.default)(Date.now()).format('DD-MM-YYYY HH:mm:ss'),
            destination: (staticData === null || staticData === void 0 ? void 0 : staticData.destination) || undefined,
        };
        // Upsert combined data into the database
        yield combinedAisData_1.default.updateOne({ mmsi: combinedData.mmsi }, combinedData, { upsert: true });
        yield (0, aisLogData_1.saveAisLog)(combinedData.mmsi, combinedData.name, combinedData);
        console.log('Combined AIS Data and log successfully saved or updated in the database');
    }
    else {
        console.log('Dynamic data is incomplete (missing longitude or latitude) for mmsi:', mmsi);
    }
});
exports.getAndCombineAisData = getAndCombineAisData;
