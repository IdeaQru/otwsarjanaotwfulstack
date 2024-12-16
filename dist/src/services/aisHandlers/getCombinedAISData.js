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
const moment_1 = __importDefault(require("moment"));
const combinedAisData_1 = __importDefault(require("../../models/combinedAisData"));
const aisLogData_1 = require("./aisLogData");
const aisType1_2and3data_1 = __importDefault(require("../../models/aisType1-2and3data"));
const aisType5data_1 = __importDefault(require("../../models/aisType5data"));
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
const aisType24Adata_1 = __importDefault(require("../../models/aisType24Adata"));
const aisType24Bdata_1 = __importDefault(require("../../models/aisType24Bdata"));
const aisType25data_1 = __importDefault(require("../../models/aisType25data"));
const aisType26data_1 = __importDefault(require("../../models/aisType26data"));
const aisType27data_1 = __importDefault(require("../../models/aisType27data"));
const getAndCombineAisData = (mmsi) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dynamicDataEntries = [
            (yield aisType1_2and3data_1.default.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
            (yield aisType9data_1.default.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
            (yield aisType18data_1.default.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
            (yield aisType19data_1.default.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
            (yield aisType21data_1.default.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
            (yield aisType27data_1.default.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
        ].filter((entry) => entry && entry.timestamp);
        const latestDynamicData = dynamicDataEntries.sort((a, b) => (0, moment_1.default)(b.timestamp).diff((0, moment_1.default)(a.timestamp)))[0];
        const staticDataEntries = [
            (yield aisType5data_1.default.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
            (yield aisType7data_1.default.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
            (yield aisType8data_1.default.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
            (yield aisType10data_1.default.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
            (yield aisType11data_1.default.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
            (yield aisType12data_1.default.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
            (yield aisType13data_1.default.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
            (yield aisType14data_1.default.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
            (yield aisType15data_1.default.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
            (yield aisType16data_1.default.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
            (yield aisType17data_1.default.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
            (yield aisType20data_1.default.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
            (yield aisType22data_1.default.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
            (yield aisType23data_1.default.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
            (yield aisType24Adata_1.default.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
            (yield aisType24Bdata_1.default.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
            (yield aisType25data_1.default.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
            (yield aisType26data_1.default.find({ mmsi }).sort({ timestamp: -1 }).limit(1))[0],
        ].filter((entry) => entry && entry.timestamp);
        const latestStaticData = staticDataEntries.sort((a, b) => (0, moment_1.default)(b.timestamp).diff((0, moment_1.default)(a.timestamp)))[0];
        if (latestDynamicData && latestDynamicData.longitude && latestDynamicData.latitude) {
            const now = new Date();
            const formattedTimestamp = (0, moment_1.default)(now).format('DD-MM-YYYY HH:mm:ss');
            const combinedData = {
                mmsi: latestDynamicData.mmsi,
                lon: latestDynamicData.longitude,
                lat: latestDynamicData.latitude,
                name: (latestStaticData === null || latestStaticData === void 0 ? void 0 : latestStaticData.name) || (latestStaticData === null || latestStaticData === void 0 ? void 0 : latestStaticData.shipName) || undefined,
                type: (latestStaticData === null || latestStaticData === void 0 ? void 0 : latestStaticData.typeAndCargo) ||
                    (latestStaticData === null || latestStaticData === void 0 ? void 0 : latestStaticData.shipType) ||
                    (latestStaticData === null || latestStaticData === void 0 ? void 0 : latestStaticData.modelType) ||
                    (latestStaticData === null || latestStaticData === void 0 ? void 0 : latestStaticData.vesselType) || undefined,
                speedOverGround: latestDynamicData.speedOverGround || undefined,
                courseOverGround: latestDynamicData.courseOverGround || undefined,
                heading: latestDynamicData.heading ? (360 - latestDynamicData.heading) : 0,
                timestamp: formattedTimestamp,
                destination: (latestStaticData === null || latestStaticData === void 0 ? void 0 : latestStaticData.destination) || undefined,
                navStatus: (latestDynamicData === null || latestDynamicData === void 0 ? void 0 : latestDynamicData.navStatus) || undefined,
                draught: (latestStaticData === null || latestStaticData === void 0 ? void 0 : latestStaticData.draught) || undefined,
                imo: (latestStaticData === null || latestStaticData === void 0 ? void 0 : latestStaticData.imo) || undefined,
                callSign: (latestStaticData === null || latestStaticData === void 0 ? void 0 : latestStaticData.callSign) || undefined,
                eta: (latestStaticData === null || latestStaticData === void 0 ? void 0 : latestStaticData.eta) || undefined,
                shipDimensions: (latestStaticData === null || latestStaticData === void 0 ? void 0 : latestStaticData.shipDimensions) || undefined,
                nearestVessels: (latestDynamicData === null || latestDynamicData === void 0 ? void 0 : latestDynamicData.nearestVessels) || []
            };
            const existingData = yield combinedAisData_1.default.findOne({ mmsi: combinedData.mmsi });
            const existingTimestamp = existingData && existingData.timestamp
                ? (0, moment_1.default)(existingData.timestamp, 'DD-MM-YYYY HH:mm:ss')
                : null;
            const newTimestamp = (0, moment_1.default)(combinedData.timestamp, 'DD-MM-YYYY HH:mm:ss');
            if (!existingTimestamp || newTimestamp.isAfter(existingTimestamp)) {
                yield combinedAisData_1.default.updateOne({ mmsi: combinedData.mmsi }, combinedData, { upsert: true });
                yield (0, aisLogData_1.saveAisLog)(combinedData.mmsi, combinedData.name, combinedData);
                console.log(`Updated AIS data for MMSI: ${combinedData.mmsi} with timestamp: ${combinedData.timestamp}`);
            }
            else {
                console.log(`Ignored outdated AIS data for MMSI: ${combinedData.mmsi} with timestamp: ${combinedData.timestamp}`);
            }
        }
        else {
            console.log(`Dynamic data is incomplete (missing longitude or latitude) for MMSI: ${mmsi}`);
        }
    }
    catch (error) {
        console.error(`Error in getAndCombineAisData for MMSI: ${mmsi}`, error);
    }
});
exports.getAndCombineAisData = getAndCombineAisData;
